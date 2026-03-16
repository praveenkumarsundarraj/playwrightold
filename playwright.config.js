// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { worker } from 'cluster';
import { trace } from 'console';
import { TIMEOUT } from 'dns';
import { report } from 'process';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = ({
  testDir: './tests',
  TIMEOUT: 10000,
  expect: {
    timeout: 5000,
  },
  reporter: 'html',
  workers : 1,
  retries: 2,
  use: {
    baseURL: 'https://rahulshettyacademy.com',
    browserName: 'chromium',
    headless: false,
    screenshot: 'on',
    trace: 'retain-on-failure', //'on' create traces for all pass and fail cases, 'retain-on-failure' helps to create traces only for failed scenarios
  }
});

module.exports = config;

