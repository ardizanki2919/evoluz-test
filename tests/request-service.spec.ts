import { test, expect } from '@playwright/test';
import { baseUrl } from '../utils/config';
import { login } from './login';
import { navigateToRequestPage, addService, handleWaitingAction, search, backToRequestPage } from './actions';

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
    await backToRequestPage(page);
  });

  test('Menambahkan permintaan pelayanan dan mengubah status menjadi Rejected', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page,
        'Test Permintaan Test CCTV 14',
        'Detail permintaan test CCTV terbaru'
    );
    await handleWaitingAction(page, 'reject', 'pengajuan ditolak');
    await backToRequestPage(page);
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
    await backToRequestPage(page);
  });

  test('Menambahkan permintaan pelayanan dengan mengisi hanya bagian judul', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page,
        'Judul Permintaan Test CCTV 15'
    );
    await handleWaitingAction(page, 'accept');
    await backToRequestPage(page);
  });

  test('Menambahkan permintaan pelayanan tanpa mengisi bagian judul', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page
    );
    await expect(page.locator('text=Judul usulan harus diisi')).toBeVisible();
  });

  test('Menambahkan permintaan pelayanan dengan judul > 100 karakter', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await addService(
        page,
        'Judul Permintaan Test CCTV 7 Judul Permintaan Test CCTV 7 Judul Permintaan Test CCTV 7 Jodol dengarya'
    );
    await handleWaitingAction(page, 'accept');
    await backToRequestPage(page);
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
    await search(page, 'Judul Permintaan Test CCTV 1', 'Judul Permintaan Test CCTV 1');
  });

  test('Melakukan pencarian dengan data valid yang tidak tersedia', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await search(page, 'ABC 123 456', 'Data Tidak Ada');
  });
});