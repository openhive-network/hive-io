# Automated contributions

This directory configures the automated development platform that contributes to this
repository. This note says which branches it uses here and how its work reaches the
project's main line.

## Branches

- `aidev/integration` — the integration branch. Automated work lands here and nowhere else.
- `master` — the project's main line (`develop` is its staging branch); reached from `aidev/integration` only by merge request (`aidev handoff`). Merge it keeping the source branch (`aidev/integration` is protected, so GitLab will not delete it).
- `ai/*` — one branch per task, created and deleted by the platform. Do not commit to them.
- `session/*` — a session's accumulated work, landed on the integration branch as a batch.

## How work reaches the main line

Task and session branches never reach `aidev/integration` through merge requests; the platform
lands them after its own verification. `aidev/integration` reaches `master` by this project's
usual process, merge requests included — the platform never merges into any other branch.

Whether this project's CI pipelines skip `ai/*` and `session/*` branches is decided by the
project's CI rules; maintainers record that decision here.

## Suites run before work lands

Declared in `.aidev/project.yaml` under `verification`, all through `.aidev/run-checks.sh`,
which writes `test-results/<slot>/junit.xml` (one case per step):

- `quick` — `.aidev/run-checks.sh quick typecheck build`
- `full` — `.aidev/run-checks.sh full typecheck build`
- `baseline` — `.aidev/run-checks.sh baseline build`
- `canary` — `.aidev/run-checks.sh canary typecheck build`
- `static` — `.aidev/run-checks.sh static typecheck lint`
- `coverage` — `.aidev/run-checks.sh coverage typecheck build`
- `system` — `.aidev/run-checks.sh system build`

The repository has no test suite, so the slots run CI's build and the workspace's own
checks; `coverage` measures nothing and runs the same steps as `quick`. Every run first
installs `node_modules` offline from the image's pnpm store (`install`). Steps: `typecheck`
is `tsc --noEmit` of `packages/hive-lib` and `packages/auth-components` (their `type-check`
scripts), `lint` is `pnpm lint` (eslint of `apps/web`; CI does not run it), `build` is
`pnpm build` with `SITE_NOINDEX=1` (the workspace packages, `next build`'s static export
into `apps/web/out/` and `scripts/post-build.js`), what CI's `build` job runs on a
non-master branch.

## Test runtime

`.aidev/runtime/Dockerfile` builds on common-ci-configuration's `node-test-tools:develop`,
which carries the hive-wide Node version (ccc's `NODE_VERSION`); this repository names no
Node version for it. It adds pnpm 11.6.0 (the version `.gitlab-ci.yml` activates),
`make`/`g++`, node-gyp's headers for that Node and a pnpm store filled from
`pnpm-lock.yaml` (`/opt/pnpm-store`). pnpm 11's release-age check of the lockfile needs the
registry, so the image sets `pnpm_config_minimum_release_age=0` for the offline install.
Rebuild and re-pin it with `.aidev/runtime/build.sh --push` when the Dockerfile,
`package.json`, `pnpm-lock.yaml` or `pnpm-workspace.yaml` changes, or ccc's image moves, and
put the printed `repo@sha256:…` into `environment.image`.

## Known state at onboarding (2026-10-26)

On Node v24.22.1, offline: `install`, `typecheck` and `build` pass, so every slot passes
except `static`, whose `lint` fails on the existing code (60 errors, 47 warnings, mostly
`@typescript-eslint/no-explicit-any`). `.gitlab-ci.yml` runs on the floating `node:24` image
rather than ccc's Node; that is the open Node issue.
