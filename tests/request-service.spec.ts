import { test, expect } from '@playwright/test';
import { login } from '../modules/login';
import { 
  navigateToRequestPage, 
  navigateToCreateService, 
  createServiceRequest, 
  handleWaitingAction, 
  searchServiceRequest, 
  backToRequestPageByButton, 
  backToRequestPageByLink
} from '../modules/actions';
import { requestData } from '../data/requestData';

test.describe('Permintaan Pelayanan', () => {
  test('Login dengan kredensial valid', async ({ page }) => {
    await login(page);
  });

  test('Menambahkan permintaan pelayanan dan mengubah status menjadi Accepted', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await createServiceRequest(page, requestData.validRequests[0].title, requestData.validRequests[0].detail);
    await handleWaitingAction(page, requestData.validRequests[0].status);
    await backToRequestPageByButton(page);
  });

  test('Menambahkan permintaan pelayanan dan mengubah status menjadi Rejected', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await createServiceRequest(page, requestData.validRequests[1].title, requestData.validRequests[1].detail);
    await handleWaitingAction(page, requestData.validRequests[1].status, requestData.validRequests[1].message);
    await backToRequestPageByButton(page);
  });

  test('Menambahkan permintaan pelayanan dan mengubah status menjadi Considered', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await createServiceRequest(page, requestData.validRequests[2].title, requestData.validRequests[2].detail);
    await handleWaitingAction(page, requestData.validRequests[2].status, requestData.validRequests[2].message);
    await backToRequestPageByButton(page);
  });

  test('Menambahkan permintaan pelayanan dengan mengisi hanya bagian judul', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await createServiceRequest(page, requestData.edgeRequests[0].title, requestData.edgeRequests[0].detail);
    await handleWaitingAction(page, requestData.edgeRequests[0].status);
    await backToRequestPageByButton(page);
  });

  test('Menambahkan permintaan pelayanan tanpa mengisi bagian judul', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await createServiceRequest(page);
    await expect(page.locator('text=Judul usulan harus diisi')).toBeVisible();
  });

  test('Menambahkan permintaan pelayanan dengan judul > 100 karakter', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await createServiceRequest(page, requestData.edgeRequests[3].title, requestData.edgeRequests[3].detail);
    await handleWaitingAction(page, requestData.edgeRequests[3].status);
    await backToRequestPageByButton(page);
  });

  test('Kembali ke halaman permintaan pelayanan', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await navigateToCreateService(page);
    await backToRequestPageByLink(page);
  });

  test('Melakukan pencarian dengan data valid yang telah ditambahkan', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await searchServiceRequest(page, requestData.searchData[0].query, requestData.searchData[0].expected);
  });

  test('Melakukan pencarian dengan data valid yang tidak tersedia', async ({ page }) => {
    await login(page);
    await navigateToRequestPage(page);
    await searchServiceRequest(page, requestData.searchData[1].query, requestData.searchData[1].expected);
  });
});