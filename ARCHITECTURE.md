# Architecture: Serverless & Simple

The architecture of this project is designed for simplicity, scalability, and low maintenance. We leverage a serverless approach with Next.js API Routes and Vercel KV.

## Core Components

*   **Frontend:** A Next.js application serves the user interface, including the homepage, course pages, and deals page.
*   **Decoupled Fulfillment:** This project (`RevengeMoney`) is a pure fulfillment engine. It is intentionally decoupled from any specific payment provider.
*   **Internal API:** It exposes a secure, internal API endpoint that listens for a generic `FULFILLMENT_REQUEST` command.
*   **Trusted Intermediary:** `RevengeMoney` only accepts commands from a trusted intermediary, the `service-connector`. This intermediary is responsible for handling all communication with the external financial world.
*   **Key-Value Store:** Vercel KV is used as a simple, fast database to store access tokens, which grant users access to their purchased courses.

## The Three Fortresses Model

The overall system is composed of three distinct, independent applications:

1.  **`VendettaMachine` (The Art Gallery):** The public-facing storefront. Its only job is to present a product and direct a user to a payment link.
2.  **`service-connector` (The Relay Station):** The invisible intermediary. It receives webhooks from the payment provider, verifies them, and translates them into a single, generic, internal command.
3.  **`RevengeMoney` (The Inner Sanctum):** This application. Its only job is to receive the internal command from the `service-connector` and fulfill the order with ruthless efficiency.

## Fulfillment Data Flow

1.  A user initiates a purchase on the `VendettaMachine` storefront.
2.  They complete the purchase with an external payment provider (e.g., Polar.sh).
3.  The payment provider sends a signed webhook to the `service-connector`.
4.  The `service-connector` verifies the webhook and sends a secure `FULFILLMENT_REQUEST` to `RevengeMoney`'s internal API endpoint.
5.  `RevengeMoney` verifies the request came from the trusted `service-connector` using a shared secret key.
6.  The internal API generates a unique access token, stores it in Vercel KV, and sends an email to the user with the access link.
5.  The user clicks the access link, which contains the course ID and access token.
6.  A Next.js Server Component on the course page validates the access token against Vercel KV.
7.  If the token is valid, the course content is rendered.
