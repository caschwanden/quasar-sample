const js = require("@eslint/js");
const globals = require("globals");
const pluginVue = require("eslint-plugin-vue");
const { defineConfig } = require("eslint/config");

module.exports = defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  pluginVue.configs["flat/essential"],
]);
