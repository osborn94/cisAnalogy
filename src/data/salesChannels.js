/**
 * SALES CHANNELS — edit via /admin or src/content/salesChannels.json,
 * not this file. Every "buy" button on the site (About section,
 * Series section) reads from this one list. Set `active: false` to
 * hide a channel without deleting it (e.g. temporarily out of stock).
 */
import data from "../content/salesChannels.json";

export const SALES_CHANNELS = data.channels;
