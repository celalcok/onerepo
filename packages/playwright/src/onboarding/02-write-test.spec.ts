/// //////////////////////////////////////////////////////////////////// ///
///                                                                      ///
///                          02. WRITE TEST                              ///
///           branch: onboarding/<username>/02-write-test                ///
///                                                                      ///
/// //////////////////////////////////////////////////////////////////// ///

/**
 * 02. WRITE TEST
 */

import { test } from '@playwright/test'

// 02-01. Test
// TODO: Check how `pwtest` snippet works
test('Example', { tag: ['@onboarding'] }, async () => {
  // TODO: Go to the URL `https://playwright.dev` and verify the page title contains 'Playwright'
  // (For example title is: "Fast and reliable end-to-end testing for modern web apps | Playwright") and contains 'Playwright'
})

/**
 * ========================================================================
 */

// 02-02. Group of Tests
// TODO: Check how `pwdescribe` snippet works
test.describe('opentable.com', { tag: ['@onboarding'] }, () => {
  // TODO:
  // - [ ] Write `pwtest` snippet to generate a test code block
  // - [ ] Update the test title to "should display page title"
  // - [ ] Goto the URL https://www.opentable.com
  // - [ ] Verify the first title element (h2) has the correct text
  //
  // TODO:
  // - [ ] Write `pwtest` snippet to generate a test code block
  // - [ ] Update the test title to "should search for a location"
  // - [ ] Goto the URL https://www.opentable.com
  // - [ ] Type "Amsterdam" in the search input field (Location, Restaurant, or Cuisine)
  // - [ ] Click the "Let's go" button or press Enter
  // - [ ] Verify it navigates to the search results page and the title contains "Amsterdam"
})
