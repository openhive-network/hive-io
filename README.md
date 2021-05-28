# Hive on!

For all changes, make a PR to develop branch, which goes to staging.hive.io. Afterwards we'll PR from develop into master.

## How to add new apps

1.) Add app here: https://gitlab.syncad.com/hive/hive-io/-/blob/develop/src/helpers/ecosystem.ts (it's ordered based on dapp usage, dau, how the logo looks like, etc.)
2.) Add image here (preferred svg, if png => use tinypng.com and keep at around 250px): https://gitlab.syncad.com/hive/hive-io/-/tree/develop/src/assets/images/apps

## How to add contributors

1.) Add contributor here: https://gitlab.syncad.com/hive/hive-io/-/blob/develop/src/helpers/contributors.ts
2.) If there is no image in https://gitlab.syncad.com/hive/hive-io/-/tree/develop/src/assets/images/apps and image attribute is empty, it uses image from hive based on social.hive.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org)
