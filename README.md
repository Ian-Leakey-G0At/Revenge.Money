# RevengeLearn: A Digital Storefront

This project is a direct-to-consumer digital storefront for selling and delivering course content. The core principle is simplicity. We use a "Purchase & Access Link" model to eliminate the need for user accounts and complex authentication systems.

## How It Works

This application is a pure fulfillment engine. It is part of a larger, decoupled system.

1.  Users initiate a purchase on a separate, public-facing storefront (`VendettaMachine`).
2.  A trusted intermediary (`service-connector`) processes the payment webhook and sends a secure, internal command to this application.
3.  This application verifies the internal command and sends the user a unique, permanent link to access their course content.
4.  Course content is hosted on YouTube (unlisted) and embedded within our clean, focused interface.

## Tech Stack

*   Next.js & React
*   Tailwind CSS
*   Vercel KV (for storing access tokens)
*   Next.js API Routes (for the internal fulfillment endpoint)

## Setup

1.  Clone the repository.
2.  Install dependencies with `npm install`.
3.  Create a `.env.local` file by copying `.env.example`.
4.  Fill in the required environment variables:
    *   `KV_URL`, `KV_REST_API_URL`, `KV_REST_API_TOKEN`, `KV_REST_API_READ_ONLY_TOKEN`: Credentials for your Vercel KV store.
    *   `REVENGE_MONEY_GMAIL_USER`: Your Gmail address (e.g., `your.email@gmail.com`).
    *   `REVENGE_MONEY_GMAIL_APP_PASSWORD`: The 16-character App Password generated from your Google Account Security settings.
    *   `REVENGE_MONEY_INTERNAL_SECRET_KEY`: A long, random, secure string that must be shared with the `service-connector` application. This is the secret that secures the internal fulfillment endpoint.
5.  Run the development server with `npm run dev`.
