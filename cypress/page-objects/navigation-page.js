function selectGroupMenuItem(groupItemName) { // this function checks whether the menu item is expanded or collapsed
  cy.contains('a', groupItemName).invoke('attr', 'aria-expanded').then(attr => {
    if (attr.includes('false')) {
      cy.contains('a', groupItemName).click()
    }
  })
}

class NavigationPage {
  formLayoutsPage() {
    selectGroupMenuItem('Forms')
    cy.contains('Form Layouts').click()
  }

  datepickerPage() {
    selectGroupMenuItem('Forms')
    cy.contains('Datepicker').click()
  }

  dialogPage() {
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Dialog').click()
  }

  toastrPage() {
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Toastr').click()
  }

  tooltipPage() {
    selectGroupMenuItem('Modal & Overlays')
    cy.contains('Tooltip').click()
  }

  dragAndDropPage() {
    selectGroupMenuItem('Extra Components')
    cy.contains('Drag & Drop').click()
  }

  tablesAndDataPage() {
    selectGroupMenuItem('Tables & Data')
    cy.contains('Smart Table').click()
  }
}

export const navigateTo = new NavigationPage()