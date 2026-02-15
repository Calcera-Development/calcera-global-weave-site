import { test, expect } from '@playwright/test';

test.describe('Calcera Global Weave Site E2E Tests', () => {
    test.beforeEach(async ({ page }) => {
        // Go to the local development server
        await page.goto('http://localhost:8080/');
        // Disable smooth scrolling and animations to make tests faster and more reliable
        await page.addStyleTag({
            content: `
            html { scroll-behavior: auto !important; }
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
                scroll-behavior: auto !important;
            }
        ` });
    });

    test('should load the home page and show the correct title', async ({ page }) => {
        await expect(page).toHaveTitle(/Calcera Global/);
        const heading = page.getByRole('heading', { level: 1 });
        await expect(heading).toBeVisible();
        await expect(heading).toContainText(/Design/i);
        await expect(heading).toContainText(/Build/i);
        await expect(heading).toContainText(/Elevate/i);
    });

    test('should navigate to sections via header navigation', async ({ page }) => {
        const headerNav = page.locator('header nav').first();

        // Test Services navigation
        const servicesLink = headerNav.getByRole('link', { name: 'Services', exact: true });
        await servicesLink.click();

        const servicesSection = page.getByLabel('Our services');
        await expect(servicesSection.getByText(/Core Services/i)).toBeVisible({ timeout: 15000 });

        // Test Work navigation
        const workLink = headerNav.getByRole('link', { name: 'Work', exact: true });
        await workLink.click();
        const workSection = page.getByLabel('Our portfolio');
        await expect(workSection.getByText(/Work We're Proud Of/i)).toBeVisible({ timeout: 15000 });

        // Test Contact navigation
        const contactButton = headerNav.getByRole('button', { name: /Let's Talk/i });
        await contactButton.click();
        const contactSection = page.locator('#contact');
        await expect(contactSection.getByText(/Make Something Great/i)).toBeVisible({ timeout: 15000 });
    });

    test('hero buttons should function correctly', async ({ page }) => {
        const heroSection = page.getByLabel('Hero section');

        // Test "Book Free Consultation" - using exact ARIA label
        await page.getByLabel('Book a free consultation with Calcera Global').click({ force: true });
        const contactSection = page.locator('#contact');
        await expect(contactSection.getByText(/Make Something Great/i)).toBeVisible({ timeout: 20000 });

        // Scroll back up
        await page.evaluate(() => window.scrollTo(0, 0));
        await expect(heroSection).toBeVisible();

        // Test "View Our Work" - using exact ARIA label
        await page.getByLabel('View Calcera Global\'s portfolio and previous work').click({ force: true });
        const workSection = page.getByLabel('Our portfolio');
        await expect(workSection.getByText(/Work We're Proud Of/i)).toBeVisible({ timeout: 20000 });
    });

    test('contact form elements should be present', async ({ page }) => {
        const contactSection = page.locator('#contact');
        // Ensure the form is loaded
        const formTitle = contactSection.getByText(/Tell Us About Your Project/i);
        await expect(formTitle).toBeVisible({ timeout: 20000 });

        // Check for common form fields
        await expect(contactSection.getByPlaceholder(/full name/i)).toBeVisible();
        await expect(contactSection.getByPlaceholder(/your@email\.com/i)).toBeVisible();
        await expect(contactSection.getByPlaceholder(/describe your project/i)).toBeVisible();
        // Target the button inside the form specifically
        await expect(contactSection.getByRole('button', { name: /Book Free Consultation/i })).toBeVisible();
    });
});
