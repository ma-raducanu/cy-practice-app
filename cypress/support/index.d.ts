declare namespace Cypress {
  interface Chainable {
    /**
     * Opens the home page of the application.
     */
    openHomePage(): Chainable<void>
  }
}