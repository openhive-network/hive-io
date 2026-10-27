#!/usr/bin/env bash
# Run the checks named after the suite and write test-results/<suite>/junit.xml.
#
#   .aidev/run-checks.sh <suite> <step>...
#
# The repository has no test suite: the slots run what CI's build job runs and
# the checks the workspace defines. Every run first installs node_modules
# offline from the image's pnpm store (`pnpm install --offline
# --frozen-lockfile`) as the `install` case. Steps, one junit case each:
#
#   typecheck  `tsc --noEmit` of packages/hive-lib and packages/auth-components
#              (their `type-check` scripts)
#   lint       `pnpm lint`: eslint of apps/web (eslint.config.mjs)
#   build      `pnpm build`: the workspace packages, then `next build` (static
#              export into apps/web/out/) and scripts/post-build.js; what CI's
#              build job runs, with SITE_NOINDEX=1 as on a non-master branch
#
# Runs offline in the image of .aidev/runtime/Dockerfile (Node from
# common-ci-configuration's node-test-tools).
set -uo pipefail
cd "$(dirname "$0")/.." || exit 1
root="$PWD"
suite="${1:?usage: $0 <suite> <step>...}"; shift
out="$root/test-results/$suite"
rm -rf "$out"; mkdir -p "$out"
cases="$out/cases.tsv"; : > "$cases"
source .aidev/junit-helpers.sh
printf 'property\tnode\t%s\n' "$(node --version)" >> "$cases"

status=0
step() {
    local name="$1"; shift
    local log="$out/$name.log" t0=$SECONDS rc=0
    echo "== $name" >&2
    ( cd "$root" && "$@" ) > "$log" 2>&1 < /dev/null || rc=$?
    if [ "$rc" -eq 0 ]; then
        printf 'case\t%s\tpass\t%s\t\n' "$name" "$((SECONDS - t0))" >> "$cases"
    else
        status=1; tail -40 "$log" >&2
        printf 'case\t%s\tfail\t%s\texit %s\t%s\n' "$name" "$((SECONDS - t0))" "$rc" "$log" >> "$cases"
    fi
    return "$rc"
}

if ! step install pnpm install --offline --frozen-lockfile; then
    junit_write_cases "$out/junit.xml" "$suite" "$cases"
    exit 1
fi

for s in "$@"; do
    case "$s" in
        typecheck) step typecheck pnpm --filter @hiveio/hive-lib --filter @hiveio/auth-components run type-check ;;
        lint) step lint pnpm lint ;;
        build) step build env SITE_NOINDEX=1 pnpm build ;;
        *) printf 'case\t%s\tfail\t0\tunknown step\n' "$s" >> "$cases"; status=1 ;;
    esac
done
junit_write_cases "$out/junit.xml" "$suite" "$cases"
exit "$status"
