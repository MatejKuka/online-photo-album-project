const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch({
        headless: false
    });
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('http://localhost:3000/');
    await page.getByRole('link', { name: 'Sign In' }).click();
    await page.getByLabel('Email Address *').fill('rewrersdaf');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('rewrdvsdv');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByText('auth/invalid-email').click();
    await page.getByLabel('Email Address *').click();
    await page.getByLabel('Email Address *').fill('test2@test.com');
    await page.getByLabel('Password *').click();
    await page.getByLabel('Password *').fill('testtest');
    await page.getByRole('button', { name: 'Sign In' }).click();
    await page.getByText('MatoTest').click();
    // ---------------------
    await context.close();
    await browser.close();
})();