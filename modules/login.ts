import { baseUrl, username, password } from '../utils/config.js';
import { expect } from '@playwright/test';

export const login = async (page) => {
    await page.goto(`${baseUrl}/account/login`);
    await page.locator('#nameOrEmail').fill(username || '');
    await page.locator('#password').fill(password || '');
    await page.getByRole('button', { name: '󰍂 Masuk' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/dashboard/project`);
};