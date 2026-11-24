import { track } from "@vercel/analytics";

/**
 * Custom events sent to Vercel Web Analytics.
 * Keep names stable: renaming one splits its history in the dashboard.
 * Never put personal data (names, emails, message text) in properties.
 */
type AnalyticsEvents = {
  contact_form_submitted: Record<string, never>;
  contact_form_failed: { reason: "validation" | "send_error" };
  contact_link_clicked: { method: "phone" | "email" | "location" };
  book_consultation_clicked: { location: "header" | "mobile_menu" | "hero" };
};

export function trackEvent<K extends keyof AnalyticsEvents>(
  name: K,
  ...props: AnalyticsEvents[K] extends Record<string, never> ? [] : [AnalyticsEvents[K]]
) {
  try {
    track(name, props[0]);
  } catch {
    // Analytics must never break the page.
  }
}
