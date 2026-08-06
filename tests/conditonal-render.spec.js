import { test, expect } from '@playwright/test';

test('Dynamic ID Handling', async ({ browser }) => {

    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9");

    //accept the cookies
    const cookieBtn = page.getByRole('button', { name: /accept/i });

    if (await cookieBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await cookieBtn.click();
    }


    const frame = page.frameLocator('iframe').first();

    // Navigate to Flaky Selectors tab
    await frame.locator('[data-tab="selectors"]').click();
    await frame.getByRole('button', { name: 'Admin User' }).click();
    await expect(frame.locator('[data-testid="loading-section"]')).toBeHidden();

    await expect(frame.locator('[data-testid="user-type"]')).toHaveText('admin');
    await expect(frame.locator('[data-testid="admin-panel"]')).toBeVisible();

    await expect(frame.locator('[data-testid="standard-panel"]')).toBeHidden();

    await frame.getByRole('button', { name: 'Logout' }).click();

    await frame.getByRole('button', { name: 'Standard User' }).click();
    await expect(frame.locator('[data-testid="loading-section"]')).toBeHidden();

    await expect(frame.locator('[data-testid="user-type"]')).toHaveText('standard');
    await expect(frame.locator('[data-testid="admin-panel"]')).toBeHidden();

    await expect(frame.locator('[data-testid="standard-panel"]')).toBeVisible();
    await frame.getByRole('button', { name: 'Logout' }).click();
   

});