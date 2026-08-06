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

    await frame.locator('[data-tab="responsive"]').click();
    await frame.getByRole('button', { name: 'Open Modal' }).click();

    const firstmodal=frame.locator('[data-testid="modal-content"]')
    await expect(firstmodal).toBeVisible();
    await firstmodal.getByRole('button', {name: 'Show Details'}).click();

    const secondmodal=frame.locator('[data-testid="nested-modal-content"]');
     await expect(secondmodal).toBeVisible();
    await secondmodal.getByRole('button', {name: 'Confirm'}).click();

    await expect(firstmodal).toBeHidden();
    await expect(secondmodal).toBeHidden();

  await expect(
    frame.locator('[data-testid="modal-result"]')
).toHaveText('Result: confirmed');
    

});