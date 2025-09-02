const { defineConfig } = require('vitest/config');

module.exports = defineConfig({
  test: {
    environment: 'node',
    watch: false,
    globals: true,
    include: ['**/__tests__/**/*.test.{js,ts}'],
  },
});