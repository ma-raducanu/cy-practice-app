/// <reference types="cypress" />

import { navigateTo } from "../../page-objects/navigation-page"

beforeEach(() => {
  cy.visit('/')
})

it('Navigation Test', () => {
  navigateTo.formLayoutsPage()
  navigateTo.datepickerPage()
  navigateTo.toastrPage()
  navigateTo.tooltipPage()
})
