const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'zcfpw8',
  allowCypressEnv: false,
  e2e: {
    baseUrl: 'https://playground.bondaracademy.com/',
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
  viewportWidth: 1920,
  viewportHeight: 1080,
  // defaultCommandTimeout: 11000 // this overwrites the default timeout of 4000
});
