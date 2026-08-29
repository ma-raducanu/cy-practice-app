/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/') // Visit the base URL defined in cypress.config.js
  cy.contains('Forms').click() // Click the 'Forms' link
  cy.contains('Form Layouts').click() // Click the 'Form Layouts' link
})

describe('Test Suite 1', () => {
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

it('Cypress Locator Methods', () => {
  // get() - find an element in the page
  // find() - find an element within another element
  // contains() - find an element with specific text
  cy.contains('Sign in') // it will find the first element with the text 'Sign in'; it's case-sensitive by default, but you can make it case-insensitive by passing the option {matchCase: true}; it can locate elements by partial text match.
  cy.contains('[status="warning"]', 'Sign in') // it will find the first element with the text 'Sign in' and the attribute status="warning"
  cy.contains('nb-card', 'Horizontal form').find('button') // it will find the first nb-card element with the text 'Horizontal form' and then find the button element within that card
  cy.contains('nb-card', 'Horizontal form').contains('Sign in') // it will find the first nb-card element with the text 'Horizontal form' and then find the element with the text 'Sign in' within that card
  cy.contains('nb-card', 'Horizontal form').get() // it will always return all the elements in the page, regardless of the previous command; it will not find the button element within that card.
})

it('Child Elements', () => {
  cy.contains('nb-card', 'Using the Grid').find('.row').find('button') // it will find the first nb-card element with the text 'Using the Grid', then find the first element with the class 'row' within that card, and then find the button element within that row
  cy.get('nb-card').find('nb-radio-group').find('label').contains('Option 1') // it will find all the nb-card elements, then find the nb-radio-group element within each card, then find the label element within each radio group, and then find the label with the text 'Option 1' within those labels
  cy.get('nb-card nb-radio-group').find('label').contains('Option 1') // it will find all the nb-radio-group elements that are descendants of the nb-card elements, then find the label element within each radio group, and then find the label with the text 'Option 1' within those labels
  cy.get('nb-card > nb-card-body [placeholder="Jane Doe"]') // it will find all the nb-card-body elements that are direct children of the nb-card elements
})

it.only('Parent Elements', () => {
  cy.get('#inputEmail1').parents('form').find('button') // it will find the parent form element of the input with id 'inputEmail1' and then find the button element within that form
  cy.contains('Using the Grid').parent().find('button') // it will find the parent element of the element with the text 'Using the Grid' and then find the button element within that parent
  cy.get('#inputEmail1').parentsUntil('nb-card-body').find('button') // it will find all the parent elements of the input with id 'inputEmail1' until it reaches the form element, and then find the button element within those parents
})

