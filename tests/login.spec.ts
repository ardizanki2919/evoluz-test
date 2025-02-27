import { test, expect } from '@playwright/test';
import { login, logout } from '../modules/login';
import { baseUrl, username, password } from '../utils/config.js';
import { loginData } from '../data/loginData.js';

test.describe('Login', () => {
  test('Login dengan kredensial valid', async ({ page }) => {
    await login(page, username, password);
    await expect(page).toHaveURL(`${baseUrl}/dashboard/project`);
  });

  test('Login dengan username valid tetapi password tidak valid', async ({ page }) => {
    await login(page, loginData.invalidData[0].username, loginData.invalidData[0].password);
  });

  test('Login tanpa mengisi data username dan password', async ({ page }) => {
    await login(page, loginData.invalidData[2].username, loginData.invalidData[2].password);
    await expect(page.getByText('Masukkan Username atau Email')).toBeVisible();
    await expect(page.getByText('Masukkan Kata Sandi')).toBeVisible();
  });

  test('Logout dari aplikasi', async ({ page }) => {
    await logout(page, username, password);
    await expect(page.getByRole('heading', { name: 'See You Again !' })).toBeVisible();
    await expect(page.getByText('You are now successfully sign')).toBeVisible();
  });
});