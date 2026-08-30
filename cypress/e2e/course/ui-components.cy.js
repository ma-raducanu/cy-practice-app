/// <reference types="cypress" />

beforeEach(() => {
  cy.visit('/')
})

it('Input Fields', () => {
  cy.contains('Forms').click()
  cy.contains('Form Layouts').click()
  cy.get('#inputEmail1').type('test@example.com', { delay: 200 }).clear().type('hello').clear() // this will add a delay to cypress's typing speed, and after it has finished typing, it will clear the input field and enter the other text
  const name = 'mircea'
  cy.contains('nb-card', 'Using the Grid').contains('Email').type(`${name}@test.com`)
  cy.get('#inputEmail1').should('have.value', `${name}@test.com`).clear().type('test@example.com').press(Cypress.Keyboard.Keys.TAB)
  cy.contains('Auth').click()
  cy.contains('Login').click()
  cy.get('#input-email').type('test@example.com')
  cy.get('#input-password').type('Password{enter}') // this will press enter after the last input
})

it('Radio Buttons', () => {
  cy.contains('Forms').click()
  cy.contains('Form Layouts').click()
  cy.contains('nb-card', 'Using the Grid').find('[type="radio"]').then(allRadioButtons => {
    cy.wrap(allRadioButtons).eq(0).check({ force: true }).should('be.checked') // "eq" is index, and use force true only if no alternative is viable, as it will cause flakiness
    cy.wrap(allRadioButtons).eq(1).check({ force: true })
    cy.wrap(allRadioButtons).eq(0).should('not.be.checked')
    cy.wrap(allRadioButtons).eq(2).should('be.disabled')
  })
  cy.contains('nb-card', 'Using the Grid').contains('Option 1').click({ force: true }) // you can check a radio button using its label, however, you will have to user click() instead of check()
  cy.contains('nb-card', 'Using the Grid').contains('label', 'Option 1').find('input').check({ force: true })
})

it('Checkboxes', () => {
  cy.contains('Modal & Overlays').click()
  cy.contains('Toastr').click()
  cy.get('[type="checkbox"]').check({ force: true })
  cy.get('[type="checkbox"]').should('be.checked')
  cy.get('[type="checkbox"]').click({ force: true, multiple: true }) // check() will check all boxes when no specific box is targetted, and click() can be used to click multiple elements at the same time but needs the {multiple: true} argument
  cy.get('[type="checkbox"]').should('not.be.checked')
})

it('Lists and Dropdowns', () => {
  cy.contains('Modal & Overlays').click()
  cy.contains('Toastr').click()
  cy.contains('div', 'Toast type:').find('select').select('info').should('have.value', 'info') // select is the native selector for dropdown fields, also, it's smart and it will select either the value attribute's value or the label
  cy.contains('div', 'Position:').find('nb-select').click()
  cy.get('.option-list').contains('bottom-right').click()
  cy.contains('div', 'Position:').find('nb-select').should('have.text', 'bottom-right')
  cy.contains('div', 'Position:').find('nb-select').then(dropdown => {
    cy.wrap(dropdown).click()
    cy.get('.option-list nb-option').each((option, index, list) => { // each is a loop, and can contain multiple arguments
      cy.wrap(option).click()
      if (index < list.length - 1) // index starts with 0, but the list returns the actual number, which is 8, so at the end it will skip the final item as the 7 is not < 7
        cy.wrap(dropdown).click()
    })
  })
})

it.only('Tooltips', () => {
  cy.contains('Modal & Overlays').click()
  cy.contains('Tooltip').click()
  cy.contains('button', 'Top').trigger('mouseenter') // inspect > "Elements" > "Event Listeners" and check all available events to determine which one is required as cypress does not support hover
  cy.get('nb-tooltip').should('have.text', 'This is a tooltip')
})