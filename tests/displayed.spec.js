import {test,expect} from '@playwright/test';

test("displayed button ", async({browser})=>{
    const context=await browser.newContext();
    const page=await context.newPage();
    await page.goto("https://claude.ai/public/artifacts/1e02a9a5-4f20-4f19-a7ba-6c3f16c6eab9");

    //accept the cookies
    const cookieBtn = page.getByRole('button', { name: /accept/i });

    if (await cookieBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
    await cookieBtn.click();
    }

    const frame = page.frameLocator('iframe').first();

    const timingTab = frame.locator('button[data-tab="timing"]').click();

    //click start process
    await frame.locator('button[data-testid="start-process"]').click();
    const confirmButton = frame.locator('button[data-testid="confirm-button"]');

    //wait for confirm button
    await expect(confirmButton).toBeEnabled({timeout :80000});
      await confirmButton.click();

    // Verify success message
    await expect(
        frame.locator('[data-testid="success-message"]')
    ).toBeVisible();

})