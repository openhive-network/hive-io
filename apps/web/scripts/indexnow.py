"""IndexNow ping for the production deploy (Bing, Yandex, Naver, Seznam; not
Google). Runs on the deploy image (python:3.5), so no f-strings and no
third-party packages.

  indexnow.py snapshot FILE       save the live sitemap before the S3 sync
  indexnow.py submit NEW [OLD]    submit URLs that are new or whose lastmod
                                  changed versus OLD (all of NEW without OLD)

Never fails the deploy: errors are printed and the exit code is 0.
"""
import json
import sys
import urllib.request
import xml.etree.ElementTree as ET

HOST = 'hive.io'
KEY = 'f48883fc9f0670e233e0c934d4ff3043'
LIVE_SITEMAP = 'https://hive.io/sitemap.xml'
ENDPOINT = 'https://api.indexnow.org/indexnow'
NS = '{http://www.sitemaps.org/schemas/sitemap/0.9}'


def parse(xml_bytes):
    urls = {}
    for url in ET.fromstring(xml_bytes).iter(NS + 'url'):
        loc = url.findtext(NS + 'loc')
        if loc:
            urls[loc.strip()] = (url.findtext(NS + 'lastmod') or '').strip()
    return urls


def snapshot(path):
    with urllib.request.urlopen(LIVE_SITEMAP, timeout=20) as response:
        data = response.read()
    with open(path, 'wb') as f:
        f.write(data)
    print('IndexNow: saved live sitemap to {}'.format(path))


def submit(new_path, old_path=None):
    with open(new_path, 'rb') as f:
        new = parse(f.read())
    old = {}
    if old_path:
        try:
            with open(old_path, 'rb') as f:
                old = parse(f.read())
        except Exception as error:
            print('IndexNow: no previous sitemap ({}), submitting all'.format(error))
    changed = sorted(url for url, lastmod in new.items()
                     if url not in old or old[url] != lastmod)
    if not changed:
        print('IndexNow: no changed URLs')
        return
    body = json.dumps({
        'host': HOST,
        'key': KEY,
        'keyLocation': 'https://{}/{}.txt'.format(HOST, KEY),
        'urlList': changed,
    }).encode('utf-8')
    request = urllib.request.Request(
        ENDPOINT, data=body,
        headers={'Content-Type': 'application/json; charset=utf-8'})
    with urllib.request.urlopen(request, timeout=20) as response:
        print('IndexNow: HTTP {} for {} URLs'.format(response.status, len(changed)))
    for url in changed:
        print('  ' + url)


if __name__ == '__main__':
    try:
        if sys.argv[1] == 'snapshot':
            snapshot(sys.argv[2])
        elif sys.argv[1] == 'submit':
            submit(sys.argv[2], sys.argv[3] if len(sys.argv) > 3 else None)
        else:
            raise ValueError('unknown command ' + sys.argv[1])
    except Exception as error:
        print('IndexNow: skipped ({})'.format(error))
