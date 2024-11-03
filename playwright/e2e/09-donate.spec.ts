import { expect } from '@playwright/test'

import { test } from '../fixtures'

test.beforeEach(async ({ layoutPage, page }) => {
  await layoutPage.gotoHome('kunsthalte')
  await page.waitForLoadState()
  await layoutPage.switchLanguage('en')
  await page.waitForTimeout(1000)
})

test.describe('01. Donate', { tag: ['@mutation'] }, () => {
  test('TC-01: should donation page', async ({ page, layoutPage }) => {
    // TODO: Use locators in Donate.ts
    await layoutPage.gotoPage('donation')
    await page.getByTestId('button-donation-10').click()

    const inputElement = await page.getByTestId('input-donation').inputValue()
    expect(inputElement).toContain('10')

    await page.getByTestId('button-donation-5').click()
    await page.getByTestId('button-donation-20').click()
    await page.getByTestId('button-donation-50').click()
    await page.getByTestId('button-donation-100').click()
    await page.getByTestId('button-donation-10').click()
    await page.getByTestId('button-donation-increment').click()
    await page.waitForLoadState('networkidle')

    const chakraNumberInputDivvalue = await page
      .getByTestId('input-donation')
      .inputValue()
    expect(chakraNumberInputDivvalue).toContain('11')
    await page.getByTestId('button-donation-decrement').click()

    const inputLocatorvaluee = await page
      .getByTestId('input-donation')
      .inputValue()

    expect(inputLocatorvaluee).toContain('10')

    await page.getByTestId('input-name').click()
    await page.getByTestId('input-email').click()
    await page.getByTestId('input-name').click()

    await expect(page.getByTestId('error-text-name')).toBeVisible()

    await page.getByTestId('input-name').fill('Mustafa Budak')
    await expect(page.getByTestId('error-text-email')).toBeVisible()

    const emailInput = page.getByTestId('input-email')
    const testEmailError = 'test_example.com'
    await emailInput.fill(testEmailError)
    await page.waitForTimeout(1000)
    await expect(page.getByTestId('error-text-email')).toBeVisible()

    const testEmail = 'test@example.com'
    await emailInput.fill(testEmail)

    await page.getByTestId('button-donation-submit').click()
    const newUrl = page.url()
    expect(newUrl.length).toBeGreaterThan(0)
  })
})
