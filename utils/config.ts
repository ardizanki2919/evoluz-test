import dotenv from 'dotenv';

dotenv.config();

export const baseUrl = process.env.BASE_URL;
export const username = process.env.USERNAME;
export const password = process.env.PASSWORD;

if (!baseUrl || !username || !password) {
    throw new Error('Please set BASE_URL, USERNAME, and PASSWORD in your .env file.');
};