# Operation Proxy Revenue: Master Execution Plan

**Mission:** To establish a resilient, discreet, and parallel revenue channel that circumvents payment provider scrutiny by architecting a two-platform system. This operation ensures the financial viability of our core business (`RevengeMoney`) by processing transactions through a proxy entity (`VendettaMachine`). Failure is not an option.

**Core Principles:**
*   **Discretion:** The two platforms must appear completely unrelated to any outside observer. The link between them is a private, server-to-server communication, invisible to all.
*   **Resilience:** The system must be robust against failure. We will build in redundancy and manual overrides to ensure 100% fulfillment for paid customers, even if automated systems temporarily fail.
*   **Seamlessness:** The user journey, while unconventional, must feel intentional and premium. The customer should feel like they are receiving a valuable "bonus," not being passed through a convoluted system.

---

## **Phase 1: `VendettaMachine` - The Facade Construction**

This phase is focused on building a completely convincing and functional digital art storefront. Its legitimacy is our first line of defense.

*   **[x] Task 1.1: Foundational Setup**
*   **[x] Task 1.2: Identity & Asset Generation**
*   **[x] Task 1.3: Storefront Development**

*   **[ ] Task 1.4: Payment Provider Integration (`service-connector`)**
    *   **Action:** The `service-connector` fortress is responsible for all communication with the external payment provider.
    *   **Action:** It receives a signed webhook, verifies it, and translates it into a generic, internal `FULFILLMENT_REQUEST`.

*   **[ ] Task 1.5: Internal Communication**
    *   **Action:** The `service-connector` forwards the `FULFILLMENT_REQUEST` to the `RevengeMoney` fortress's internal API endpoint.
    *   **Action:** This communication is secured by a shared secret, the `INTERNAL_API_SECRET_KEY`.

---

## **Phase 2: `RevengeMoney` - The Fortress Fortification**

This phase involves making precise, surgical modifications to the existing `RevengeMoney` platform to enable it to securely receive and process internal commands.

*   **[ ] Task 2.1: Environment Variable Fortification**
    *   **Action:** In the `RevengeMoney` Vercel project settings, add a new environment variable: `INTERNAL_API_SECRET_KEY`.
    *   **Action:** The value for this variable is the shared secret used to authenticate requests from the `service-connector`.

*   **[ ] Task 2.2: Create the Internal Fulfillment Endpoint**
    *   **Action:** Create a new, secure endpoint at `/app/api/internal/fulfillment-trigger/route.ts`.
    *   **Logic Flow:**
        1.  Receive the incoming `POST` request.
        2.  **Verify Courier:** Before parsing any data, verify the `Authorization: Bearer` token matches the `INTERNAL_API_SECRET_KEY`. If verification fails, immediately return a `401 Unauthorized`.
        3.  **Parse Command:** Only after successful verification, parse the JSON body of the request.
        4.  **Extract Data:** Get the `customerEmail` and `courseId` from the `payload`.
        5.  **Fulfill:** Proceed with the fulfillment logic: generate a unique access token, store it in Vercel KV, and trigger the fulfillment email.
        6.  **Acknowledge:** Return a `200 OK` status to the `service-connector` to confirm successful receipt.

*   **[ ] Task 2.4: Modify Frontend "Buy" Triggers**
    *   **Action:** Systematically go through the `RevengeMoney` frontend.
    *   **Action:** Replace all "Buy" buttons that trigger a payment modal with simple `<a>` hyperlink tags.
    *   **Action:** The `href` of each link must point to the corresponding art piece on the `VendettaMachine` domain.

*   **[ ] Task 2.5: Design Fulfillment Email Template**
    *   **Action:** Create a new email template for the fulfillment service.
    *   **Content:** The email must thank the user for their "art purchase" and present the course access as a "complimentary bonus" or "exclusive access pass" that comes with the art. It must contain the unique `RevengeMoney` access link.

---

## **Phase 3: System Integration & Testing**

This phase ensures the two platforms communicate flawlessly before a single real transaction is processed.

*   **[ ] Task 3.1: Local End-to-End Testing**
    *   **Action:** Use `ngrok` to expose your local `RevengeMoney` development server to the public internet.
    *   **Action:** Temporarily set the webhook URL in the payment provider's test environment to your `ngrok` URL.
    *   **Action:** Run a test transaction on `VendettaMachine` (using test card numbers).
    *   **Verify:** Confirm that the webhook hits your local server and you can trace the entire logic flow in your terminal, from signature verification to token generation.

*   **[ ] Task 3.2: Create Reconciliation Endpoint**
    *   **Action:** Build a new, secret API endpoint on `RevengeMoney`: `POST /api/reconcile-purchase`.
    *   **Purpose:** A manual override to fix any failed webhook deliveries.
    *   **Security:** Protected by a secret bearer token.
    *   **Logic:** Accepts a `transactionId`. It uses this ID to fetch the transaction details directly from the payment provider's API, then generates the token and sends the email. Includes a check to prevent duplicate token generation.

*   **[ ] Task 3.3: Live Staging Test**
    *   **Action:** Deploy both projects.
    *   **Action:** Set the webhook URL to the final production `RevengeMoney` URL.
    *   **Action:** Conduct one final end-to-end test transaction using real, live test keys.
    *   **Verify:** Check Vercel logs and confirm the email is received and the link works.

---

## **Phase 4: Launch & Go-Live**

*   **[ ] Task 4.1: Final Pre-Flight Check**
    *   **Action:** Switch all payment keys from "test" to "live/production" on `VendettaMachine`.
    *   **Action:** Double-check that all links on `RevengeMoney` point to the correct `VendettaMachine` URLs.
    *   **Action:** Confirm all production environment variables are correctly set on Vercel for both projects.

*   **[ ] Task 4.2: Activate**
    *   **Action:** Announce the "new art" on the designated Instagram page.
    *   **Action:** Monitor the Vercel logs and payment provider dashboard for the first real transactions.
