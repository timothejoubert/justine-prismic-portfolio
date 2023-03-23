module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  // ignorePatterns: ['src/app/router.scrollBehavior.js'],
  extends: ['prettier', '@nuxtjs/eslint-config-typescript', 'plugin:prettier/recommended', 'plugin:nuxt/recommended'],
  plugins: ['prettier'],
  // add your custom rules here
  rules: {
    // indent: ['error', 2],
    // deactivate temp because of this issue https://github.com/typescript-eslint/typescript-eslint/issues/2477
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'vue/require-default-prop': 'off',
    camelcase: 'off',
  },
}
