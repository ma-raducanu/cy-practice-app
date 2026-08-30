class FormLayotsPage {

  /**
   * Method used to submit the "Using the Grid" form with valid user credentials
   * @param {string} email valid user email
   * @param {string} password valid user password
   * @param {number} optionIndex index of the radio button, starting from 0
   */
  submitUsingTheGridForm(email, password, optionIndex) {
    cy.contains('nb-card', 'Using the Grid').then(form => {
      cy.wrap(form).find('[placeholder="Email"]').type(email)
      cy.wrap(form).find('[placeholder="Password"]').type(password)
      cy.wrap(form).find('[type="radio"]').eq(optionIndex).check({ force: true })
      cy.wrap(form).contains('Sign in').click()
    })
  }

  /**
   * Method used to submit the "Basic form" form with valid user credentials
   * @param {string} email valid user email
   * @param {string} password valid user password
   * @param {boolean} isCheckboxSelected check/don't check the box, depending on boolean
   */
  submitBasicForm(email, password, isCheckboxSelected) {
    cy.contains('nb-card', 'Basic form').then(form => {
      cy.wrap(form).find('[placeholder="Email"]').type(email)
      cy.wrap(form).find('[placeholder="Password"]').type(password)
      if (isCheckboxSelected) {
        cy.wrap(form).find('[type="checkbox"]').check({ force: true })
      }
      cy.wrap(form).contains('Submit').click()
    })
  }
}

export const onFormLayoutsPage = new FormLayotsPage()