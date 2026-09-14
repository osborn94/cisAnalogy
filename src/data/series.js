/**
 * THE SERIES — edit via /admin or src/content/series.json, not this
 * file. One entry per CISA domain. To move a book from "Coming Soon"
 * to "Available Now": set status to "available", add its cover image,
 * and either leave buyLinks empty (uses the global SALES_CHANNELS
 * list) or add book-specific links.
 */
import data from "../content/series.json";

export const SERIES = data.books;
