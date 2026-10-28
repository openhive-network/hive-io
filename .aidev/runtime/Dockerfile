# The image AIDEV runs this project's suites in (`environment.image` in
# .aidev/project.yaml). Suites run with `--network none` and the caller's uid, so
# everything they need is in the image:
#
# * common-ci-configuration's node-test-tools, the hive-wide Node (the one
#   NODE_VERSION of ccc's docker-bake.hcl); this file names no Node version of
#   its own;
# * pnpm 11.6.0, the pnpm .gitlab-ci.yml's build job activates (`corepack
#   prepare pnpm@11.6.0`; the base image's pnpm is 10.x, which does not read
#   pnpm-workspace.yaml's `allowBuilds`);
# * make and g++ (the base has python3), and node-gyp's Node headers for that
#   Node in /opt/node-gyp (npm_config_devdir): pnpm-workspace.yaml's
#   `allowBuilds` packages (secp256k1) build from source, offline in the sandbox;
# * a pnpm store filled from pnpm-lock.yaml (`pnpm fetch`, with .npmrc's
#   @hiveio registry: ccc's hiveio-toolset builds are only in GitLab's) in /opt/pnpm-store,
#   so `pnpm install --offline --frozen-lockfile` works in the sandbox. pnpm 11
#   verifies the lockfile against its release-age policy by asking the registry
#   for every package's metadata, which an offline install cannot do:
#   pnpm_config_minimum_release_age=0 turns that check off in the image (the
#   `pnpm fetch` that filled the store ran it with the network). For the same
#   reason pnpm_config_trust_lockfile=true skips pnpm 11's check of the
#   lockfile's non-npmjs tarball URLs (the @hiveio GitLab registry) against
#   registry metadata; `pnpm fetch` and CI's online install still run it.
#
# Build and pin it with .aidev/runtime/build.sh --push; see .aidev/README.md.
ARG BASE_IMAGE=registry.gitlab.syncad.com/hive/common-ci-configuration/node-test-tools:develop
FROM ${BASE_IMAGE}
USER root
ENV HOME=/tmp \
    pnpm_config_store_dir=/opt/pnpm-store \
    npm_config_store_dir=/opt/pnpm-store \
    npm_config_manage_package_manager_versions=false \
    npm_config_devdir=/opt/node-gyp \
    pnpm_config_minimum_release_age=0 \
    NEXT_TELEMETRY_DISABLED=1 \
    DO_NOT_TRACK=1
RUN apt-get update \
    && apt-get install -y --no-install-recommends make g++ \
    && apt-get clean && rm -rf /var/lib/apt/lists/* \
    && npm install -g --no-fund --no-audit pnpm@11.6.0 \
    && hash -r && pnpm --version \
    && npx --yes node-gyp@11 install \
    && ls /opt/node-gyp
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc /tmp/pnpm-fetch/
RUN cd /tmp/pnpm-fetch \
    && pnpm fetch \
    && cd / && rm -rf /tmp/pnpm-fetch /tmp/.npm /tmp/.cache \
    && chmod -R a+rwX /opt/pnpm-store /opt/node-gyp
# Last, so the store layers above stay cached when only this changes
ENV pnpm_config_trust_lockfile=true
