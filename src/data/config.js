/**
 * SITE-WIDE SETTINGS
 * ------------------
 * Re-exports src/content/site.json so components keep importing
 * `SITE` from here. The actual values live in the JSON file, which
 * is what the CMS (/admin) edits — don't hard-code content changes
 * here, edit the JSON (or use the admin panel) instead.
 */
import site from "../content/site.json";

export const SITE = site;