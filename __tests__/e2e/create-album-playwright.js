const { chromium } = require('playwright');

//
(async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test2@test.com');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('testtest');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByRole('button', { name: 'New' }).click();
    await page.getByPlaceholder('My Holiday 2022').click();
    await page.getByPlaceholder('My Holiday 2022').fill('TestingAlbum');
    await page.locator('input[type="file"]').click();
    await page.locator('input[type="file"]').setInputFiles("\__tests__/e2e/chateu.jpg");
    await page.getByRole('button', { name: 'Create' }).click();
    await page.getByRole('link', { name: 'Hi TestingAlbum' }).click();
    await page.getByRole('button', { name: 'Delete' }).click();
    await context.close();
    await browser.close();
})();