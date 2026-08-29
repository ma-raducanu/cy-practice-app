/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/') // Visit the base URL defined in cypress.config.js
  cy.contains('Forms').click() // Click the 'Forms' link
  cy.contains('Form Layouts').click() // Click the 'Form Layouts' link
})

it('Hello World 1', () => {
  // by Tag
  cy.get('input')
  // by ID
  cy.get('#inputEmail1')
  // by Class
  cy.get('.input-full-width')
  // by Attribute
  cy.get('[fullwidth]')
  // by Attribute and Value
  cy.get('[placeholder="Email"]')
  // by Whole Class Value
  cy.get('[class="input-full-width size-medium status-basic shape-rectangle nb-transition"]')
  // by Multiple Attributes
  cy.get('[placeholder="Email"][fullwidth]')
  cy.get('input[placeholder="Email"]')
  // by data-cy Attribute
  cy.get('[data-cy="inputEmail1"]')
})

it.only('Cypress Locator Methods', () => {
  // get() - find an element in the page
  // find() - find an element within another element
  // contains() - find an element with specific text
  cy.contains('Sign in') // it will find the first element with the text 'Sign in'; it's case-sensitive by default, but you can make it case-insensitive by passing the option {matchCase: true}; it can locate elements by partial text match.
  cy.contains('[status="warning"]', 'Sign in') // it will find the first element with the text 'Sign in' and the attribute status="warning"
  cy.contains('nb-card', 'Horizontal form').find('button') // it will find the first nb-card element with the text 'Horizontal form' and then find the button element within that card
  cy.contains('nb-card', 'Horizontal form').contains('Sign in') // it will find the first nb-card element with the text 'Horizontal form' and then find the element with the text 'Sign in' within that card
  cy.contains('nb-card', 'Horizontal form').get() // it will always return all the elements in the page, regardless of the previous command; it will not find the button element within that card.
})

describe.skip('Test Suite 1', () => {
  afterEach(() => {
    // This will run after each test in this suite
  })
  it('Hello World 2', () => {
    // This test will run after the beforeEach hook and before the afterEach hook
  })
  it('Hello World 3', () => {
    // This test will also run after the beforeEach hook and before the afterEach hook
  })
  describe('Test Suite 2', () => {
    it('Hello World 4', () => {
      // This test will run after the beforeEach hook and before the afterEach hook of the parent suite
    })
    it('Hello World 5', () => {
      // This test will also run after the beforeEach hook and before the afterEach hook of the parent suite
    })
  })
})