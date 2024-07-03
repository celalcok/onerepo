import { faker } from '@faker-js/faker/locale/en'
import { expect, test } from '@playwright/test'

import { PASSWORD, USERNAME } from '../constants'
import { HomePage, LoginPage } from '../pages'
import { getVercelUrl } from '../utils'

test('should not upload art without logging in', async ({ page }) => {
  await page.goto(getVercelUrl('kunsthalte'))

  await page.getByRole('link', { name: 'Arts' }).first().click()
  await page.getByText('Upload Art').click()
  const warning = page.locator('.chakra-modal__body p')
  await page.waitForTimeout(1000)
  expect(warning).toContainText(
    'You must be logged in in order to be able to upload an art!',
  )
})

test('should upload art with logging in', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page, 'kunsthalte')

  await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
  await homePage.gotoLogin()
  await loginPage.login(USERNAME, PASSWORD)
  await page.getByRole('link', { name: 'Arts' }).first().click()
  await page.getByText('Upload Art').click()
  await page.waitForTimeout(1000)
  expect(page.locator('.uppy-Dashboard-AddFiles-title')).toBeVisible()
})

test('should fill required fields for upload art', async ({ page }) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page, 'kunsthalte')

  await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
  await homePage.gotoLogin()
  await loginPage.login(USERNAME, PASSWORD)
  await page.waitForTimeout(1000)

  await page.getByRole('link', { name: 'Arts' }).first().click()
  await page.getByText('Upload Art').click()
  await page.waitForTimeout(1000)
  const filePath = 'apps/kunsthalte/public/arts.jpeg'
  await page.locator('.uppy-Dashboard-input').first().setInputFiles(filePath)
  await page.waitForTimeout(1000)

  await page.locator('#title').click()
  await page.locator('#description').click()
  await page.locator('#title').click()

  expect(page.locator('.chakra-form__error-message').first()).toContainText(
    'title is a required field',
  )
  expect(page.locator('.chakra-form__error-message').last()).toContainText(
    'description is a required field',
  )
})

test('The uploaded image should be displayed in the pending arts section.', async ({
  page,
}) => {
  const loginPage = new LoginPage(page)
  const homePage = new HomePage(page, 'kunsthalte')

  await page.goto(homePage.url, { waitUntil: 'domcontentloaded' })
  await homePage.gotoLogin()
  await loginPage.login(USERNAME, PASSWORD)
  await page.waitForTimeout(2000)

  await page.getByRole('link', { name: 'Arts' }).first().click()
  await page.getByText('Upload Art').click()
  await page.waitForTimeout(1000)
  const filePath = 'apps/kunsthalte/public/arts.jpeg'
  await page.locator('.uppy-Dashboard-input').first().setInputFiles(filePath)
  await page.waitForTimeout(1000)
  await page.locator('.uppy-DashboardContent-save').click()

  const title = faker.internet.userName().toString()

  await page.locator('#title').fill(title)
  await page.locator('#description').fill('Description Test')
  expect(page.locator("//*[@type='submit']")).toBeEnabled()

  await page.locator("//*[@type='submit']").click()

  expect(page.getByText('Art successfully submitted')).toBeVisible()

  await page.waitForTimeout(1000)

  await page.getByText('Go to my profile').click()

  await page.locator('.chakra-tabs__tab').last().click()

  await page.waitForTimeout(5000)

  await page.getByText('Pending Arts').click()

  await page.waitForTimeout(5000)

  expect(
    page.locator('.chakra-aspect-ratio div div img').first(),
  ).toHaveAttribute('src')
})
