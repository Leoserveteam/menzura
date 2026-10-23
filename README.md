# Menzura

The menzura.co landing page, built from the Figma file (page "Landing page: dev"):
https://www.figma.com/design/fpm3gDDOUwOaMu07QbTH3b

Next.js 15 (App Router), no CSS framework. Tokens and text styles in `app/globals.css` mirror the Figma variables and styles. Copy lives in `app/content.ts` and `app/legal.ts` and mirrors the Figma Copy deck page.

## Run locally
npm install
npm run dev

## Applications
`app/api/apply/route.ts` appends each application to the private Google Sheet
"Menzura · Applications (private)", then emails the operator and the applicant (Resend).
Set the variables in `.env.example` in Vercel (Project → Settings → Environment Variables).
For previews, `APPLY_DRY_RUN=1` shows the confirmation without storing or sending anything.

## Media
`public/motion` holds the hero film and the five category loops (MP4 and WebM).
`public/images` holds posters, the two traditions photos, the wordmark, icons and the sharing image.
Placeholders still to replace: the hero film and traditions photos (AI-generated people),
and the generated garments in the wardrobe and assurance loops.
