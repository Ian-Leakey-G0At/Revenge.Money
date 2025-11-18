# User Flow: The Three Fortresses Model

This document outlines the definitive user and data flow for the RevengeMoney platform. This model is based on a "Three Fortresses" architecture, ensuring discretion, resilience, and a seamless user experience.

## The User's Journey

From the user's perspective, the process is designed to be intentional and premium.

1.  **Course Selection:** The user browses the `RevengeMoney` course catalog and clicks "Acquire Access" on a desired course.

2.  **The Antechamber:** A modal window (the "Antechamber") appears. This modal serves as a formal transition, explaining that the purchase will be handled by a secure, separate entity.

3.  **Secure Checkout:** Upon clicking "Proceed to Secure Checkout", the user is redirected to `VendettaMachine`, our dedicated payment processing fortress, which handles the transaction via our payment provider, Polar.

4.  **Payment Completion:** The user completes the purchase on the Polar checkout page.

5.  **Success Confirmation:** After a successful payment, the user is redirected to the `VendettaMachine` success page, confirming their purchase.

## The Invisible Machinery: The Fulfillment Flow

The fulfillment process is an automated, server-to-server communication flow, invisible to the end-user.

1.  **Payment Webhook:** Our payment provider (Polar) fires a webhook to our `service-connector` fortress upon successful payment.

2.  **Verification & Translation:** The `service-connector` receives and verifies the webhook. It then translates the payment provider's data structure into a standardized, internal `FULFILLMENT_REQUEST` format.

3.  **Internal Handshake:** The `service-connector` forwards the `FULFILLMENT_REQUEST` to a secret, internal API endpoint on the `RevengeMoney` fortress. This communication is secured with a shared secret key (`REVENGE_MONEY_INTERNAL_SECRET_KEY`).

4.  **Fulfillment Execution:** The `RevengeMoney` fortress receives the request from `service-connector`. Its **only** role is to:
    *   Verify the shared secret key to ensure the request is from a trusted internal source.
    *   Parse the `FULFILLMENT_REQUEST` payload, which contains `customerEmail` and `courseId`.
    *   Record the purchase in its database (the "Ledger").
    *   Dispatch a fulfillment email containing a unique access link to the customer (the "Dispatch").

## The Role of RevengeMoney

It is critical to understand that the `RevengeMoney` application has **no direct contact with any external payment provider**. Its sole responsibility in the purchasing flow is to act upon a verified, internal `FULFILLMENT_REQUEST` from the `service-connector`. This separation of concerns is fundamental to the security and discretion of the Three Fortresses Model.
