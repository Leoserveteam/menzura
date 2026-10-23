# Production setup: applications, email and domain

Steps for the house to switch the application flow on for menzura.co.
Nothing here is done by the code: each step is done by a person in Google, Vercel, Resend or the DNS provider.

Order: 1 Google service account → 2 Resend → 3 Vercel variables → 4 DNS and domain (after Vercel Pro) → 5 test.

Credentials go only into Vercel's environment variables, never into code, commits, chat or email.

---

## 1. Google service account (edit access to the applications sheet only)

You need: admin access to the house's Google Workspace and its Google Cloud console.

1. **Create a Cloud project.** Go to https://console.cloud.google.com, then project picker → **New project**. Name it `menzura-site` and place it under the house's organisation.
2. **Enable the Sheets API.** In the project, open **APIs & Services → Library**, search for **Google Sheets API** and click **Enable**. Enable nothing else.
3. **Create the service account.** Open **IAM & Admin → Service accounts → Create service account**.
   - Name: `menzura-applications`. ID: `menzura-applications`.
   - On **Grant this service account access to project**, add **no roles**. Its only access will be the one sheet you share in step 6.
   - Skip **Grant users access**. Click **Done**.
   - Copy its email: `menzura-applications@<project-id>.iam.gserviceaccount.com`.
4. **Create a key.** Open the service account, then **Keys → Add key → Create new key → JSON**. A file downloads.
   - If Google says key creation is disabled, the organisation policy `iam.disableServiceAccountKeyCreation` is on (the default for newer organisations). A Workspace super admin can allow it for this project only: **IAM & Admin → Organization policies → Disable service account key creation → Manage policy → Override parent's policy → Off**, scoped to `menzura-site`.
   - Treat the file like a password. You'll paste two values from it into Vercel in section 3, then delete it from your computer and empty the bin.
5. **Prepare the sheet.** Open **Menzura · Applications (private)**. Row 1 of the tab must hold these headers, in this order (columns A to N):

   | A | B | C | D | E | F | G | H | I | J | K | L | M | N |
   |---|---|---|---|---|---|---|---|---|---|---|---|---|---|
   | Submitted at (UTC) | Full name | Email | City | Phone | Membership | How they heard | Sponsor number | What they need | Status | Assigned stylist | Decision date | Notes | Source |

   The tab must be named `Sheet1`, or else change `APPLICATIONS_SHEET_TAB` in Vercel to match.
6. **Share the sheet with the service account only.** Click **Share**, paste the service account email, choose **Editor**, untick **Notify people** and click **Share**.
   - Don't share any other file or folder with it. Leave **General access** on **Restricted**.
   - If Workspace blocks sharing outside the domain, a Workspace admin can add `iam.gserviceaccount.com` to the trusted domains under **Admin console → Apps → Google Workspace → Drive and Docs → Sharing settings**. Alternatively, keep the sheet in a shared drive whose sharing allows that one account.
7. **Copy the sheet ID.** It's the part of the sheet's URL between `/d/` and `/edit`, for example `https://docs.google.com/spreadsheets/d/`**`1AbC…xyz`**`/edit`.

## 2. Resend: verify menzura.co

1. Sign in at https://resend.com with the house's account.
2. Go to **Domains → Add domain**, enter `menzura.co` and choose the region **North Virginia (us-east-1)**, unless you prefer the EU (`eu-west-1`). Region only changes the MX value below.
3. Resend now shows the DNS records to add. They're listed in section 4b. The DKIM value is unique to your account, so copy it from Resend.
4. Once the DNS records are in place, click **Verify DNS records**. Verification usually takes minutes, occasionally up to 48 hours. Wait for **Verified**.
5. **Create an API key.** Go to **API Keys → Create API key**, name it `menzura-site-production`, set permission to **Sending access** and domain to **menzura.co**. Copy the key; it starts with `re_` and is shown only once.
6. Decide which inbox receives new applications (`OPERATOR_EMAIL`), for example the stylists' shared address. Applicant replies to the confirmation go to `house@menzura.co` (the From address), so make sure that inbox exists in Google Workspace.

## 3. Vercel environment variables (Production only)

Go to **Vercel → Leoserve → menzura → Settings → Environment Variables → Add new**. For each variable below:
- set **Environments** to **Production** only, with Preview and Development unticked;
- turn on **Sensitive**;
- click **Save**.

| Key | Value |
|---|---|
| `GOOGLE_SERVICE_ACCOUNT_EMAIL` | `client_email` from the JSON key file |
| `GOOGLE_PRIVATE_KEY` | `private_key` from the JSON key file: everything between the quotes, from `-----BEGIN PRIVATE KEY-----` to `-----END PRIVATE KEY-----\n`. Paste it as it appears in the file; the `\n` sequences are handled by the code. |
| `APPLICATIONS_SHEET_ID` | The sheet ID from step 1.7 |
| `RESEND_API_KEY` | The `re_…` key from step 2.5 |
| `OPERATOR_EMAIL` | The inbox that receives new applications |

Already set, leave as they are:
- `APPLICATIONS_SHEET_TAB` = `Sheet1`
- `FROM_EMAIL` = `Menzura <house@menzura.co>`
- `APPLY_DRY_RUN` = `1`, on **Preview and Development only**. Never add it to Production: in production it would make every application disappear.

The variables take effect on the next production deployment (**Deployments → … → Redeploy**). The sheet ID and keys are read only by the server function; none of them reach the browser.

## 4. DNS records for menzura.co

Add these at the DNS provider where menzura.co is registered. Don't remove existing MX or TXT records for Google Workspace email.

### 4a. Vercel (website), only after the Vercel Pro plan is active

Attach the domain in **Vercel → menzura → Settings → Domains → Add**: add `menzura.co` and `www.menzura.co`, with `www` redirecting (308) to `menzura.co`. Then add:

| Type | Name / host | Value | TTL |
|---|---|---|---|
| A | `@` (menzura.co) | `76.76.21.21` | 3600 or Auto |
| CNAME | `www` | `cname.vercel-dns.com` | 3600 or Auto |

- If Vercel shows a project-specific value after you add the domain (for example `xxxxxx.vercel-dns-017.com` for `www`, or a different A address), use exactly what Vercel shows.
- Remove any other A or AAAA records on `@`, and any other record on `www`. They would conflict.
- If the domain has CAA records, add `CAA @ 0 issue "letsencrypt.org"` so Vercel can issue the certificate. With no CAA records, nothing is needed.

### 4b. Resend (sending confirmation emails)

All three records sit on the `send` subdomain or the DKIM selector, so they don't touch the root email (Google Workspace) records.

| Type | Name / host | Value | Priority |
|---|---|---|---|
| TXT | `resend._domainkey` | DKIM value copied from Resend, starting `p=MIGfMA0…` | |
| MX | `send` | `feedback-smtp.us-east-1.amazonses.com` (or `feedback-smtp.eu-west-1.amazonses.com` for the EU region) | 10 |
| TXT | `send` | `v=spf1 include:amazonses.com ~all` | |

Recommended, if not already present:

| Type | Name / host | Value |
|---|---|---|
| TXT | `_dmarc` | `v=DMARC1; p=none; rua=mailto:house@menzura.co` |

Start DMARC at `p=none`. After a few weeks of clean reports, move to `p=quarantine`.

## 5. Test before announcing

1. Locally, with no credentials: `npm run build && npm test` posts sample applications in dry-run mode and checks the responses.
2. Against a preview (which has `APPLY_DRY_RUN=1`): `BASE_URL=https://<preview-url> npm test`. If previews are behind Vercel Authentication, add a protection bypass token, or run the test locally instead.
3. On production, after section 3 and a redeploy, submit one real application with your own email. Confirm that:
   - a row appears in the sheet, with Status `Applied` and the Source column filled;
   - the operator inbox receives "New application: …";
   - your inbox receives "Your application is with the house", from `house@menzura.co`, with DKIM passing (in Gmail: **Show original**).

   Then delete the test row.
4. If anything fails, the function logs a short reason in **Vercel → menzura → Logs**, for example `apply: sheet append failed sheets 403`, or `apply: applicant email failed with status 403`. The logs never contain applicant details.
