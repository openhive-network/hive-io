#!/bin/sh
# Uploads the static export to S3 in three passes, each with its own
# Cache-Control. Every file lands in exactly one pass:
#   1. _next/static/*  hashed build output, cached for a year
#   2. everything else except pass 3 (images, fonts, icons, video, downloads):
#      30 days
#   3. HTML, .xml, .txt, .json, .webmanifest, sw.js: always revalidated, edge
#      copies kept a day (the deploy invalidates /* afterwards)
# --delete only removes files inside a pass's own filters, so no pass deletes
# another's files. Old _next/static files are removed by "prune", which runs
# after the invalidation so a cached page never points at a deleted chunk.
#
#   s3-deploy.sh upload SRC DEST [--dryrun]
#   s3-deploy.sh prune  SRC DEST [--dryrun]
# DEST is an s3:// URL (a local directory works for a dry run).
set -eu
set -f

MODE=$1
SRC=$2
DEST=$3
EXTRA=${4:-}

STATIC='_next/static/*'
REVALIDATE='*.html *.xml *.txt *.json *.webmanifest sw.js'

# Filters for the pass-2 remainder: skip pass 1 and pass 3.
remainder_filters() {
  printf '%s\n' --exclude "$STATIC"
  for p in $REVALIDATE; do printf '%s\n' --exclude "$p"; done
}

# Filters for pass 3: only the revalidated types, never pass 1.
revalidate_filters() {
  printf '%s\n' --exclude '*'
  for p in $REVALIDATE; do printf '%s\n' --include "$p"; done
  printf '%s\n' --exclude "$STATIC"
}

sync_pass() {
  # $1 = filter function, $2 = cache-control, $3 = delete flag or empty
  filters=$(eval "$1")
  # shellcheck disable=SC2086
  aws s3 sync --acl public-read $3 --cache-control "$2" $EXTRA \
    $(printf '%s' "$filters" | tr '\n' ' ') "$SRC" "$DEST"
}

case "$MODE" in
  upload)
    aws s3 sync --acl public-read --exclude '*' --include "$STATIC" \
      --cache-control 'public, max-age=31536000, immutable' $EXTRA "$SRC" "$DEST"
    sync_pass remainder_filters 'public, max-age=2592000' --delete
    sync_pass revalidate_filters \
      'public, max-age=0, s-maxage=86400, must-revalidate' --delete
    ;;
  prune)
    aws s3 sync --acl public-read --delete --exclude '*' --include "$STATIC" \
      --cache-control 'public, max-age=31536000, immutable' $EXTRA "$SRC" "$DEST"
    ;;
  *)
    echo "usage: s3-deploy.sh upload|prune SRC DEST [--dryrun]" >&2
    exit 2
    ;;
esac
