import { baseUrl } from '../utils/config.js';
import { expect } from '@playwright/test';

export const login = async (page, username, password) => {
    await page.goto(`${baseUrl}/account/login`);
    await page.locator('#nameOrEmail').fill(username);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: '󰍂 Masuk' }).click();
    await page.waitForTimeout(3000);
};

export const logout = async (page, username, password) => {
    await page.goto(`${baseUrl}/account/login`);
    await page.locator('#nameOrEmail').fill(username);
    await page.locator('#password').fill(password);
    await page.getByRole('button', { name: '󰍂 Masuk' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(`${baseUrl}/dashboard/project`);

    await page.getByRole('button', { name: 'user Januari admin' }).click();
    await page.getByRole('link', { name: '󰍃 Logout' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(`${baseUrl}/account/logout`)
};
