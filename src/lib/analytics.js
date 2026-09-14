/**
 * ANALYTICS — Umami
 * -------------------
 * Umami auto-tracks pageviews and referrers once its script tag (see
 * index.html) is in place — nothing to do for those. This wraps
 * Umami's custom-event API so every outbound-click/conversion event
 * in the site calls trackEvent() instead of talking to Umami
 * directly; if you ever swap providers, this is the only file that
 * needs to change.
 *
 * SETUP: replace YOUR_WEBSITE_ID and the script src in index.html
 * with the values from your Umami instance (self-hosted or
 * cloud.umami.is), once it's set up.
 */
export function trackEvent(name, props = {}) {
  if (typeof window === "undefined") return;

  if (window.umami) {
    window.umami.track(name, props);
    return;
  }

  if (import.meta.env.DEV) {
    // eslint-disable-next-line no-console
    console.debug("[analytics]", name, props);
  }
}
