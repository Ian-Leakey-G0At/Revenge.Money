# Gmail SMTP Migration Walkthrough

I have successfully migrated the email sending service from Resend to Gmail SMTP. This ensures reliable email delivery without the restrictions of the Resend sandbox.

## Changes Made

### 1. Dependencies
- **Installed**: `nodemailer` (v6.9.x), `uuid` (v9.x)
- **Uninstalled**: `resend`
- **Dev Dependencies**: `@types/nodemailer`, `@types/uuid`

### 2. Environment Variables
Updated `.env` and `.env.local` (if applicable) to replace Resend keys with Gmail credentials.

```bash
# Gmail SMTP Credentials
REVENGE_MONEY_GMAIL_USER="ian19leakey@gmail.com"
REVENGE_MONEY_GMAIL_APP_PASSWORD="vhjy jovf kpxv gtea"
```

### 3. API Route (`src/app/api/internal/fulfillment-trigger/route.ts`)
- Replaced `Resend` client with `nodemailer` transporter.
- Configured `nodemailer` to use Gmail service with the provided App Password.
- Updated token generation to use `uuid` (v4).
- Updated email sending logic to use `transporter.sendMail`.

### 4. Tests (`src/__tests__/fulfillment-trigger.test.ts`)
- Updated mocks to support `nodemailer` instead of `resend`.
- Verified that tests pass with `npm test`.

## Verification Results

### Unit Tests
Ran `npm test src/__tests__/fulfillment-trigger.test.ts` and all tests passed.

```
Test Suites: 1 passed, 1 total
Tests:       5 passed, 5 total
Snapshots:   0 total
Time:        6.372 s
```

## Next Steps
- **Deploy**: Push these changes to Vercel.
- **Environment Variables**: Ensure the new `REVENGE_MONEY_GMAIL_USER` and `REVENGE_MONEY_GMAIL_APP_PASSWORD` are added to Vercel Project Settings.
- **Redeploy**: Redeploy the project on Vercel for changes to take effect.
