import { baseUrl } from '../utils/config.js';
import { expect } from '@playwright/test';

export const navigateToRequestPage = async (page) => {
    await page.getByRole('link', { name: ' Permintaan Pelayanan' }).click();
    await page.waitForTimeout(3000);
    await page.waitForURL(`${baseUrl}/apps/request-service`);
};

export const navigateToCreateService = async (page) => {
    await page.getByRole('button', { name: ' Tambah Permintaan Pelayanan' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service/add`)
};

export const createServiceRequest = async (page, title = '', details = '') => {
    await page.getByRole('button', { name: ' Tambah Permintaan Pelayanan' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service/add`);

    await page.locator('#billing_requestService').fill(title);
    await page.locator('.ck-placeholder').fill(details);
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: ' Kirim' }).click();
    await page.waitForTimeout(6000);
};

export const createServiceRequestWithImage = async (page, title = '', images = '', details = '') => {
    await page.getByRole('button', { name: ' Tambah Permintaan Pelayanan' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service/add`);

    await page.locator('#billing_requestService').fill(title);
    await page.locator('#file-upload').setInputFiles(images || null);
    await page.locator('.ck-placeholder').fill(details);
    await page.waitForTimeout(3000);
    await page.mouse.down();
    await page.getByRole('button', { name: ' Kirim' }).click();
    await page.waitForTimeout(6000);
};

export const handleWaitingAction = async (page, action, reason = '') => {
    await page.getByRole('button', { name: 'waiting' }).click()
    await page.waitForTimeout(6000);

    switch (action) {
        case 'accept':
            await page.getByRole('button', { name: 'Ya, Terima' }).click();
            break;
        case 'consider':
            await page.getByRole('button', { name: 'Dipertimbangkan' }).click();
            await page.getByRole('textbox', { name: 'Alasan Dipertimbangkan :' }).fill(reason);
            break;
        case 'reject':
            await page.getByRole('button', { name: 'Tidak' }).click();
            await page.getByRole('textbox', { name: 'Alasan Penolakan :' }).fill(reason);
            break;
    default:
      throw new Error(`Invalid action: ${action}`);
    };
    await page.getByRole('button', { name: ' Ubah' }).click();
    await page.waitForTimeout(6000);
};

export const searchServiceRequest = async (page, keywords = '', expectedText) => {
    await page.locator('#search').fill(keywords);
    await page.waitForTimeout(3000);

    if (expectedText) {
        await expect(page.getByRole('cell', { name: expectedText })).toBeVisible();
    };
};

export const backToRequestPageByButton = async (page) => {
  await page.getByRole('button', { name: '󰁍 Kembali' }).click();
  await page.waitForTimeout(6000);
  await expect(page).toHaveURL(`${baseUrl}/apps/request-service`);
};

export const backToRequestPageByLink = async (page) => {
    await page.getByRole('link', { name: '󰁍 Kembali' }).click();
    await page.waitForTimeout(3000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service`);
};