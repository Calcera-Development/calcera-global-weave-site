import { test, expect } from '@playwright/test';

test.describe('Mobile Responsiveness Tests', () => {
    test.beforeEach(async ({ page }) => {
        // iPhone 13 viewport: 390x844
        await page.setViewportSize({ width: 390, height: 844 });
        await page.goto('http://localhost:8080/');
        // Disable complex animations for stable testing
        await page.addStyleTag({
            content: `
            *, *::before, *::after {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }
        ` });
    });

    test('hero section should be readable on mobile', async ({ page }) => {
        const heading = page.getByRole('heading', { level: 1 });
        await expect(heading).toBeVisible();

        const heroText = page.getByText(/Crafting technology that feels effortless/i);
        await expect(heroText).toBeVisible();
    });

    test('mobile menu should toggle correctly', async ({ page }) => {
        const menuButton = page.getByLabel('Toggle menu');
        await expect(menuButton).toBeVisible();

        await menuButton.click();
        // The mobile menu container is now a sibling to nav within header
        const mobileMenu = page.locator('header > .md\\:hidden.fixed');
        await expect(mobileMenu).toBeVisible({ timeout: 10000 });

        await expect(mobileMenu.getByRole('link', { name: 'Services', exact: true })).toBeVisible();

        await menuButton.click();
        // Check for class that indicates it's hidden or pointer-events-none
        await expect(mobileMenu).toHaveClass(/pointer-events-none/, { timeout: 10000 });
    });

    test('grids should stack vertically on mobile', async ({ page }) => {
        const servicesSection = page.getByLabel('Our services');
        const serviceCards = servicesSection.locator('.group.relative.rounded-2xl');

        await expect(serviceCards.first()).toBeVisible({ timeout: 15000 });

        const firstCardBox = await serviceCards.first().boundingBox();
        if (firstCardBox) {
            // In vertical stack at 390px, cards should be nearly full width
            expect(firstCardBox.width).toBeGreaterThan(300);
        }
    });

    test('contact form should be accessible on mobile', async ({ page }) => {
        const contactSection = page.locator('#contact');
        await expect(contactSection.getByText(/Tell Us About Your Project/i)).toBeVisible({ timeout: 15000 });
        await expect(contactSection.getByText(/Or Say Hi Anytime/i)).toBeVisible();
    });
});
