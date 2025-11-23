# Gmail SMTP Migration Walkthrough

I have successfully migrated the email sending service from Resend to Gmail SMTP. This ensures reliable email delivery without the restrictions of the Resend sandbox.

## Changes Made

### 1. Dependencies
- **Installed**: `nodemailer` (v6.9.x), `uuid` (v9.x)
- **Uninstalled**: `resend`
- **Dev Dependencies**: `@types/nodemailer`, `@types/uuid`

### 2. Environment Variables
Updated `.env` and `.env.local` (if applicable) to replace Resend keys with Gmail credentials.

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

### UI Components
- **Course Card**:
    - **Restored Design**: Reverted to the original 3:4 aspect ratio and layout.
    - **Updates**: Kept the **Bot icon** for the AI course and **Blue pricing**.
- **Course Page**:
    - **Restored Design**: Reverted to the original layout with Reviews, Ratings, and Video Dropdowns.
    - **Updates**: Kept the **"Access AI Financial Brain"** button logic.
- **Content Updates**:
    - **Hardcore Bundle**: Now lists all **30 videos** from Courses 1-6 in the curriculum dropdown.
    - **Softcore Bundle**: Now lists the **30 specific introductory videos** defined in the documentation.
    - **Private Consultant**:
        - Module Title: "**Access The Financial Brain**"
        - Lesson Title: "**Neural Link Interface**"

## Verification Results

### Automated Checks
- `npm run dev` is running (hot reloading active).

### Manual Verification Steps
Please verify the following in the browser:

1.  **Design Check**:
    - Verify Course Cards are back to portrait (3:4) mode.
    - Verify Course Pages have the original layout (Reviews, Ratings, Dropdowns).
2.  **Bundle Content**:
    - Check **Course 7 (Hardcore)**: The dropdown should show 30 lessons (from C1-C6).
    - Check **Course 9 (Softcore)**: The dropdown should show 30 lessons (starting with "The Myth of the Singular Self").
3.  **AI Consultant**:
    - Check **Course 8**: The dropdown should say "**Access The Financial Brain**" and the lesson "**Neural Link Interface**".

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
