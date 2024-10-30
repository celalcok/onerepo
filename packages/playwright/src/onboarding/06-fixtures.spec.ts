/// //////////////////////////////////////////////////////////////////// ///
///                                                                      ///
///                          06. FIXTURES                                ///
///          branch: onboarding/<username>/06-fixtures                   ///
///                                                                      ///
/// //////////////////////////////////////////////////////////////////// ///

// Import the fixture from the 05-fixture file not from @playwright/test
import { test } from './06-fixture'

// https://playwright.dev/docs/pom
test.describe('OB-05. Fixtures', { tag: ['@onboarding'] }, () => {
  // TODO:
  // - [ ] Use the fixture and write the same test as in 01-write-test.spec.ts
})
