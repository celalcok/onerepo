/// //////////////////////////////////////////////////////////////////// ///
///                                                                      ///
///                          03. LOCATORS                                ///
///            branch: onboarding/<username>/03-locators                 ///
///                                                                      ///
/// //////////////////////////////////////////////////////////////////// ///

import { test } from '@playwright/test'

test.describe('OB-03. Locators', { tag: ['@onboarding'] }, () => {
  test('OB-03-01. should built-in locators be visible', async () => {
    // TODO:
    // - [ ] Read the documentation on https://playwright.dev/docs/locators
    //
    // Try to find the locators for the following elements throughout the github.com website
    // NOTE: If you are unable to find the locator, you can always find an alternative website or skip the locator and move to the next one
    // - [ ] expect getByRole locator toBeVisible
    // - [ ] expect getByText locator toBeVisible
    // - [ ] expect getByLabel locator toBeVisible
    // - [ ] expect getByPlaceholder locator toBeVisible
    // - [ ] expect getByAltText locator toBeVisible
    // - [ ] expect getByTitle locator toBeVisible
    // - [ ] expect getByTestId locator toBeVisible
  })

  test('OB-03-02. should custom locators be visible', async () => {
    // TODO:
    // Read the documentation on
    //   - https://playwright.dev/docs/locators#locate-by-css-or-xpath
    //   - https://playwright.dev/docs/other-locators
    //
    // Try to find the locators by CSS or XPath throughout the github.com website
    // - [ ] expect locator by CSS toBeVisible
    // - [ ] expect locator by XPath toBeVisible
  })

  test('OB-03-03. should filtered locators be visible', async () => {
    // https://playwright.dev/docs/locators#filtering-locators
    // TODO:
    // Try to find the locators by locator.filter throughout the github.com website
    // - [ ] expect locator.filter toBeVisible
  })
})
