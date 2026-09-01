/// <reference types="cypress" />

import { onDatepickerPage } from "../page-objects/datepicker.page"
import { onFormLayoutsPage } from "../page-objects/form-layouts.page"
import { navigateTo } from "../page-objects/navigation.page"

beforeEach(() => {
  // cy.visit('/')
  cy.openHomePage() // from commands, but it will not appear in the suggestions and you can't ctrl + click to go to the method unless you declare it in index.d.ts
})

it('Navigation test', () => {
  navigateTo.formLayoutsPage()
  navigateTo.datepickerPage()
  navigateTo.toastrPage()
  navigateTo.tooltipPage()
})

it.only('Testing page objects', () => {
  navigateTo.formLayoutsPage()
  onFormLayoutsPage.submitUsingTheGridForm('test@test.com', 'hello', 0)
  onFormLayoutsPage.submitBasicForm('test@test.com', 'hello', true)
  navigateTo.datepickerPage()
  onDatepickerPage.selectFormPickerDateFromToday(5)
  onDatepickerPage.selectRangePickerDateFromToday(10, 50)
})
