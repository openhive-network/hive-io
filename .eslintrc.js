module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  extends: [
    '@nuxtjs/eslint-config-typescript',
    'prettier',
    'prettier/vue',
    'plugin:prettier/recommended',
    'plugin:nuxt/recommended'
  ],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    'vue/require-default-prop': 0,
    'vue/component-definition-name-casing': 0,
    'prettier/prettier': 0,
    'vue/no-unused-components': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-unused-vars': 0

  }
}
