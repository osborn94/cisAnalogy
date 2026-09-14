# CISAnalogy website

One scrolling React (Vite) page: sticky nav, mobile-first layout, and
a content admin panel at `/admin` so the client can edit the book
series, sales links, testimonials, resources, and site text without
touching code.

## How content editing works (no backend to run)

This uses [Decap CMS](https://decapcms.org) in "git-gateway" mode:

1. The client logs into `yoursite.com/admin`.
2. Edits content through plain forms — add a testimonial, flip a
   book from "Coming Soon" to "Available", update the price, etc.
3. Hitting **Save** commits the change directly to this GitHub repo,
   as an update to one of the JSON files in `src/content/`.
4. Netlify sees the new commit and automatically rebuilds and
   redeploys the site — live again in under a minute.

Nobody has to run a server for this. Netlify provides the login
system (Identity) and the piece that lets a browser commit to GitHub
on the client's behalf (Git Gateway) — both are toggles in the
Netlify dashboard, not code you maintain.

### One-time setup (you do this once, per site)

1. **Push this project to a GitHub repo** (Decap CMS commits to a
   real git repo — it needs one to exist).
2. **Deploy the repo on Netlify** (Add new site → Import from Git).
   `netlify.toml` in this project already tells Netlify how to build
   it — no manual config needed.
3. In the Netlify dashboard for this site: **Site configuration →
   Identity → Enable Identity**.
4. Still under Identity: **Enable Git Gateway** (under Identity →
   Services).
5. Under Identity → Registration, set it to **Invite only** — this
   stops random people from signing up as editors.
6. Under Identity → Invite users, send an invite to the client's
   email. The client gets an email to set a password.
7. Tell the client the login is at `https://yourdomain.com/admin`.

That's it — from here on, content changes go through her, not
through you or the codebase.

### Before the client's first login

Open `public/admin/config.yml` and check the `branch:` value under
`backend:` matches your repo's actual default branch (`main` is set
by default — change to `master` if that's what GitHub shows).

## What's still placeholder

- **Sales links** — real Selar/Gumroad URLs (editable via /admin →
  Sales Channels, or directly in `src/content/salesChannels.json`).
- **Book covers** — add via /admin → The Series, or drop image files
  into `public/covers/` and reference them in
  `src/content/series.json`.
- **Testimonials & resources** — example entries are in place so you
  can see the shape; replace via /admin.
- **Social links, privacy notice URL** — /admin → Site Settings.
- **Mailing list** — `src/components/Notify.jsx` shows a success
  message locally but doesn't send anywhere yet. This part isn't
  CMS-editable (it's wiring, not content) — set `NOTIFY_ENDPOINT` at
  the top of that file to your real provider's endpoint once it's
  ready. Confirm the provider's confirmation emails include an
  unsubscribe link.
- **Umami analytics** — the script tag in `index.html` has a
  placeholder instance URL and website ID; not CMS-editable, update
  it directly once your Umami site is set up.

## How the CMS maps to the code

Each editable section is one JSON file in `src/content/`, which
`src/data/*.js` re-exports so the React components don't need to
change when content does:

| Admin panel section     | File                              | Used by |
|--------------------------|------------------------------------|---------|
| Site Settings            | `src/content/site.json`           | Header, Hero, About, Notify, Collaborate, Contact, Footer |
| Sales Channels           | `src/content/salesChannels.json`  | About + Series "Buy" buttons |
| The Series               | `src/content/series.json`         | Series section |
| What People Say          | `src/content/testimonials.json`   | Testimonials section |
| Recommended Resources    | `src/content/resources.json`      | Resources section |

Don't hand-edit the `src/data/*.js` files for content changes — edit
the JSON (or use /admin) instead. The `.js` files just re-export the
JSON so components have a stable import path.

## Before you launch

1. Complete the one-time CMS setup above.
2. Fill in the placeholders listed above.
3. **Test on a real phone** — this build is mobile-first; check the
   sticky nav, series grid, and signup form on an actual device.
4. Confirm all "Buy" links open Selar/Gumroad correctly in a new tab.
5. Confirm the mailto links (Collaborate, Contact) pre-fill the right
   subject line.
6. Log in to `/admin` yourself once as a dry run before handing the
   client her invite.

## Local development

```bash
npm install
npm run dev       # local dev server (content edits, no CMS needed)
npm run build     # production build -> dist/
```

The `/admin` panel only works meaningfully once deployed on Netlify
with Identity + Git Gateway enabled — locally it will load but can't
authenticate or commit.
