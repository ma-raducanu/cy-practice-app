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

it('Tooltips', () => {
  cy.contains('Modal & Overlays').click()
  cy.contains('Dialog').click()
  cy.contains('button', 'Top').trigger('mouseenter') // inspect > "Elements" > "Event Listeners" and check all available events to determine which one is required as cypress does not support hover
  cy.get('nb-tooltip').should('have.text', 'This is a tooltip')
})

it('Dialog Boxes', () => {
  cy.contains('Tables & Data').click()
  cy.contains('Smart Table').click()
  // 1. This method won't guarantee that the dialog box is displayed
  cy.get('.nb-trash').first().click()
  cy.on('window:confirm', confirm => {
    expect(confirm).to.equal('Are you sure you want to delete?')
  })
  // 2.
  cy.window().then(win => {
    cy.stub(win, 'confirm').as('dialogBox').returns(false) // stub remembers if the confirmed event took place or not; true will confirm and perform the action while false will dismiss the action
  })
  cy.get('.nb-trash').first().click()
  cy.get('@dialogBox').should('be.calledWith', 'Are you sure you want to delete?')
})

it('Web Tables', () => {
  cy.contains('Tables & Data').click()
  cy.contains('Smart Table').click()
  // 1. This method will find a specific row that contains a unique value, like text
  cy.get('tbody').contains('tr', 'Larry').then(tableRow => {
    cy.wrap(tableRow).find('.nb-edit').click()
    cy.wrap(tableRow).find('[placeholder="Age"]').clear().type('35')
    cy.wrap(tableRow).find('.nb-checkmark').click()
    cy.wrap(tableRow).find('td').last().should('have.text', '35') // last targets the last row in this case, as the rows do not have a unique identifier
  })
  // 2. This method will find a specific row by index
  cy.get('.nb-plus').click()
  cy.get('thead tr').eq(2).then(tableRow => {
    cy.wrap(tableRow).find('[placeholder="First Name"]').type('John')
    cy.wrap(tableRow).find('[placeholder="Last Name"]').type('Smith')
    cy.wrap(tableRow).find('.nb-checkmark').click()
  })
  cy.get('tbody tr').first().find('td').then(tableColumns => {
    cy.wrap(tableColumns).eq(2).should('have.text', 'John')
    cy.wrap(tableColumns).eq(3).should('have.text', 'Smith')
  })
  // 3. This method will loop through the rows
  const ages = [20, 30, 40, 200]
  cy.wrap(ages).each(age => {
    cy.get('[placeholder="Age"]').clear().type(age)
    cy.wait(500)
    cy.get('tbody tr').each(tableRows => { // cypress remembers this data so if you save the dom data before asserting, it will fail as it will compare the old dom data to the new dom data, which is now filtered, so a hard wait may be required for the dom data to be updated before making the assertion, although you may want to think of a different solution in a real scenario
      if (age == 200) {
        cy.wrap(tableRows).should('contain.text', 'No data found')
      } else {
        cy.wrap(tableRows).find('td').last().should('have.text', age)
      }
    })
  })
})

it('Datepickers', () => {
  cy.contains('Forms').click()
  cy.contains('Datepicker').click()
  function selectDateFromCurrentDay(day) {
    let date = new Date()
    date.setDate(date.getDate() + day)
    let futureDay = date.getDate()
    let futureMonthShort = date.toLocaleDateString('en-US', { month: 'short' })
    let futureMonthLong = date.toLocaleDateString('en-US', { month: 'long' })
    let futureYear = date.getFullYear()
    let dateToAssert = `${futureMonthShort} ${futureDay}, ${futureYear}`
    cy.get('nb-calendar-view-mode').invoke('text').then(calendarMonthAndYear => {
      if (!calendarMonthAndYear.includes(futureMonthLong) || !calendarMonthAndYear.includes(futureYear)) {
        cy.get('[data-name="chevron-right"]').click()
        selectDateFromCurrentDay(day) // the function will call and re-execute itself
      } else {
        cy.get('.day-cell').not('.bounding-month').contains(futureDay).click()
      }
    })
    return dateToAssert
  }
  cy.get('[placeholder="Form Picker"]').then(input => {
    cy.wrap(input).click()
    const dateToAssert = selectDateFromCurrentDay(200)
    cy.wrap(input).should('have.value', dateToAssert)
  })
})

it('Sliders', () => {
  cy.get('[tabtitle="Temperature"] circle')
    .invoke('attr', 'cx', '42.87')
    .invoke('attr', 'cy', '52.49')
    .click()
  cy.get('.value.temperature.h1').should('contain.text', '18')
})

it.only('Drag and Drop', () => {
  cy.contains('Extra Components').click()
  cy.contains('Drag & Drop').click()
  cy.get('#todo-list div').first().trigger('dragstart')
  cy.get('#drop-list').trigger('drop')
})