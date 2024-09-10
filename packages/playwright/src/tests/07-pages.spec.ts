import { test, expect } from '@playwright/test'

import { getUrl } from '../utils'
test.beforeEach(async ({ page }) => {
  await page.goto(getUrl('kunsthalte'))
  await page.waitForTimeout(1000)
  await page.click('button:has-text("EN")')
})
test.describe('07. Pages', () => {
  test('TC-01: should Arts ', async ({ page }) => {
    await page.getByTestId('link-d/club/arts').click()
    const pageTitle = await page.title()
    expect(pageTitle).toContain('Art Station') // 01. On the Arts page, does the title match the page name?
  })
  test('TC-02: should Collections', async ({ page }) => {
    await page.getByTestId('link-d/club/collections').click()
    await page.waitForTimeout(1000)
    const titleEN = await page.textContent('h2.chakra-heading')
    expect(titleEN).toContain('Collections') // 01. Does the Collections page open?
    const pageTitleEN = await page.title()
    expect(pageTitleEN).toContain('Collections') // 02. On the Collections page, Does the title match the page name?
  })
  test('TC-03: should Activities ', async ({ page }) => {
    await page.getByTestId('link-d/activities').click()
    await page.waitForTimeout(1000)
    const titleEN = await page.textContent('h2.chakra-heading')
    expect(titleEN).toBe('Activities') // 01. Does the Activities page open?
    const pageTitleEN = await page.title()
    expect(pageTitleEN).toContain('Activities') // 02. On the Activities page, Does the title match the page name?
  })
  test('TC-01: should About Us', async ({ page }) => {
    await page.getByRole('link', { name: 'About Us' }).first().click()
    await page.waitForTimeout(1000)
    const titleEN = await page.textContent('h2.chakra-heading')
    expect(titleEN).toContain('About Us') // 01. Does the About Us page open?
    const pageTitleEN = await page.title()
    expect(pageTitleEN).toContain('About Us') // 02. On the About Us page, Does the title match the page name?
  })
})
