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

    const frame = page.frameLocator('iframe').first({timeout:10000});

    const timingTab = frame.locator('button[data-tab="timing"]').click();
    const load_Moreitems = frame.locator('button[data-testid="load-more"]');
    const itemscount= frame.locator('[data-testid="item-count"]');

    await expect(itemscount).toHaveText('0');
    for(let i=1; i<=3; i++)
    {
        await load_Moreitems.click();
        await expect(load_Moreitems).toBeDisabled();
        await expect(load_Moreitems).toBeEnabled();
        await expect(itemscount).toHaveText(String(i*5));
    }

    // const items=await frame.locator('button[data-testid="item-list"]');
    // await items.first().waitFor();
    // expect(await items.count()).toHaveCount(15);
    await expect(itemscount).toHaveText('15');

    await expect(frame.locator('.text-yellow-300')).toHaveCount(1);

    await expect(frame.locator('.text-green-300')).not.toHaveCount(0);

})