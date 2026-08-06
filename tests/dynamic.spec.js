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


    const frame = page.frameLocator('iframe').first({timeout:10000});

    // Navigate to Flaky Selectors tab
    await frame.locator('[data-tab="selectors"]').click();
    await frame.locator('[data-testid="regenerate-ids"]').click();
    const betaItem = frame.locator('[data-name="Beta"]');

    await betaItem.click();

    // Verify Beta is selected
    await expect(betaItem).toHaveClass("p-3 rounded-lg cursor-pointer transition-all bg-purple-900 border-2 border-purple-500");
    

});