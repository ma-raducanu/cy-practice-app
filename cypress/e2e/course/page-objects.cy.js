/// <reference types="cypress" />

import { onDatepickerPage } from "../../page-objects/datepicker.page"
import { onFormLayoutsPage } from "../../page-objects/form-layouts.page"
import { navigateTo } from "../../page-objects/navigation.page"

beforeEach(() => {
  cy.visit('/')
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
