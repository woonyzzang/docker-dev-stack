module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    requireConfigFile: false,
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended',
    'prettier'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-useless-computed-key': 'off',
    'import/named': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/this-in-template': 'off',
    'vue/no-v-html': 'off',
    '@typescript-eslint/no-unused-vars': 'off'
  }
}
