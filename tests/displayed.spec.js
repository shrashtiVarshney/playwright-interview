import {test,expect} from '@playwright/test';
import { login } from './Login/login';

test("displayed button ", async({page})=>{

    const pageload= new login(page);
    await pageload.gotopage();
    const frame=await page.frameLocator('iframe').first();;
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