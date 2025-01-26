import { baseUrl, username, password } from '../utils/config.js';
import { expect } from '@playwright/test';

export const navigateToRequestPage = async (page) => {
    await page.getByRole('link', { name: ' Permintaan Pelayanan' }).click();
    await page.waitForTimeout(6000);
    await page.waitForURL(`${baseUrl}/apps/request-service`);
};

export const createServiceRequest = async (page, title = '', details = '') => {
    await page.getByRole('button', { name: ' Tambah Permintaan Pelayanan' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service/add`);

    await page.locator('#billing_requestService').fill(title);
    await page.locator('.ck-placeholder').fill(details);
    await page.getByRole('button', { name: ' Kirim' }).click();
    await page.waitForTimeout(10000);
};

export const handleWaitingAction = async (page, action, reason = '') => {
    await page.getByRole('button', { name: 'waiting' }).click()
    await page.waitForTimeout(10000);

    switch (action) {
        case 'accept':
            await page.getByRole('button', { name: 'Ya, Terima' }).click();
            break;
        case 'consider':
            await page.getByRole('button', { name: 'Dipertimbangkan' }).click();
            await page.locator('#considerReason"]').fill(reason);
            break;
        case 'reject':
            await page.getByRole('button', { name: 'Tidak' }).click();
            await page.locator('#rejectionReason"]').fill(reason);
            break;
    default:
      throw new Error(`Invalid action: ${action}`);
    };
    await page.getByRole('button', { name: ' Ubah' }).click();
    await page.waitForTimeout(20000);
};

export const searchServiceRequest = async (page, keywords = '', expectedText) => {
    await page.locator('#search').fill(keywords);
    await page.waitForTimeout(6000);

    if (expectedText) {
        await expect(page.getByRole('cell', { name: expectedText })).toBeVisible();
    };
};

export const backToRequestPage = async (page) => {
  await page.getByRole('button', { name: '󰁍 Kembali' }).click();
  await page.waitForTimeout(6000);
  await expect(page).toHaveURL(`${baseUrl}/apps/request-service`);
};