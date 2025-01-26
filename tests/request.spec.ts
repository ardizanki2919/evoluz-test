import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

const baseUrl = process.env.BASE_URL;
const username = process.env.USERNAME;
const password = process.env.PASSWORD;

if (!baseUrl || !username || !password) {
  throw new Error('Please set BASE_URL, USERNAME, and PASSWORD in your .env file.');
}

const login = async (page) => {
  await page.goto(`${baseUrl}/account/login`);
  await page.locator('#nameOrEmail').fill(username || '');
  await page.locator('#password').fill(password || '');
  await page.getByRole('button', { name: '󰍂 Masuk' }).click();
  
  await page.waitForTimeout(6000);
  await expect(page).toHaveURL(`${baseUrl}/dashboard/project`);
};

const navigateToRequestPage = async (page) => {
    await page.getByRole('link', { name: ' Permintaan Pelayanan' }).click();
    await page.waitForTimeout(6000);
    await page.waitForURL(`${baseUrl}/apps/request-service`);
};

const addService = async (page, title = '', details = '') => {
    await page.getByRole('button', { name: ' Tambah Permintaan Pelayanan' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service/add`);

    await page.locator('#billing_requestService').fill(title);
    await page.locator('.ck-placeholder').fill(details);

    await page.getByRole('button', { name: ' Kirim' }).click();
    await page.waitForTimeout(10000);
};

const handleWaitingAction = async (page, action, reason = '') => {
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

const search = async (page, keywords = '') => {
    await page.locator('#search').fill(keywords);
    await page.waitForTimeout(6000);
  };

test.describe('Permintaan Pelayanan', () => {
  test('Login dengan kredensial valid', async ({ page }) => {
    await login(page);
  });

  test('Menambahkan permintaan pelayanan dan mengubah status menjadi Accepted', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page,
        'Test Permintaan Test CCTV 11',
        'Detail permintaan test CCTV terbaru'
    );
    await handleWaitingAction(page, 'accept');

    await page.getByRole('button', { name: '󰁍 Kembali' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service`);
  });

  test('Menambahkan permintaan pelayanan dan mengubah status menjadi Rejected', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page,
        'Test Permintaan Test CCTV 12',
        'Detail permintaan test CCTV terbaru'
    );
    await handleWaitingAction(page, 'reject', 'pengajuan ditolak');

    await page.getByRole('button', { name: '󰁍 Kembali' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service`);
  });

  test('Menambahkan permintaan pelayanan dan mengubah status menjadi Considered', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page,
        'Test Permintaan Test CCTV 13',
        'Detail permintaan test CCTV terbaru'
    );
    await handleWaitingAction(page, 'consider', 'pengajuan ditangguhkan');

    await page.getByRole('button', { name: '󰁍 Kembali' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service`);
  });

  test('Menambahkan permintaan pelayanan dengan mengisi hanya bagian judul', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page,
        'Judul Permintaan Test CCTV 5'
    );
    await handleWaitingAction(page, 'accept');

    await page.getByRole('button', { name: '󰁍 Kembali' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service`);
  });

  test('Menambahkan permintaan pelayanan tanpa mengisi bagian judul', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page
    );
  });

  test('Menambahkan permintaan pelayanan dengan judul > 100 karakter', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page,
        'Judul Permintaan Test CCTV 5 Judul Permintaan Test CCTV 5 Judul Permintaan Test CCTV 5 Judul dengarya'
    );
    await handleWaitingAction(page, 'accept');

    await page.getByRole('button', { name: '󰁍 Kembali' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service`);
  });

  test('Kembali ke halaman permintaan pelayanan', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    
    await page.getByRole('button', { name: ' Tambah Permintaan Pelayanan' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service/add`);

    await page.getByRole('link', { name: '󰁍 Kembali' }).click();
    await page.waitForTimeout(6000);
    await expect(page).toHaveURL(`${baseUrl}/apps/request-service`);
  });

  test('Melakukan pencarian dengan data valid yang telah ditambahkan', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await search(page, 'Judul Permintaan Test CCTV 1');
    await expect(page.getByRole('cell', { name: 'Judul Permintaan Test CCTV 1' })).toBeVisible();
  });

  test('Melakukan pencarian dengan data valid yang tidak tersedia', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await search(page, 'ABC 123 456');
    await expect(page.getByRole('cell', { name: 'Data Tidak Ada' })).toBeVisible();
  });
});