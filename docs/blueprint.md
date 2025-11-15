# Project Blueprint: RevengeLearn v2

This document outlines the mission, principles, and technical architecture for the RevengeLearn project. It serves as the single source of truth to guide all development efforts.

## 1. Project North Star: Radical Simplicity

Our primary goal is to build a direct-to-consumer digital storefront for selling and delivering course content. We will achieve this by ruthlessly eliminating all non-essential complexity.

## 2. Core Principles

*   **No User Accounts:** We will not build or maintain a traditional user account system. There will be no logins, signups, passwords, or user profiles.
*   **Seamless Access:** Access to purchased content will be granted via a unique, unguessable link delivered to the customer's email. The email is the key.
*   **Lean Architecture:** The backend will consist of simple, serverless functions. We will avoid complex databases and server management.
*   **UI is Sacred:** The existing frontend UI is considered perfect and will not be modified. All backend work must be implemented without altering the visual presentation or component structure.

## 3. The User Flow

1.  **Discovery:** A user browses courses on the homepage or the "Deals" page.
2.  **Acquisition:** The user is directed to our partner art gallery, `VendettaMachine`, to complete the acquisition.
3.  **Access:** Upon successful acquisition, the user instantly receives an email containing a unique, permanent link to their course (`https://[domain]/my-courses/[courseId]?token=[access_token]`).
4.  **Consumption:** The user clicks the link and immediately views the course content (embedded from YouTube) within our clean, focused interface. They can bookmark this link for future access.

## 4. Plan of Action

- [ ] **Phase 1: Documentation & Scaffolding**
    - [ ] **Task 1.1: Update README.md**: Reflect the new "Purchase & Access Link" model, removing references to user accounts. Add a section explaining the new, simplified architecture.
    - [ ] **Task 1.2: Update ARCHITECTURE.md**: Create or update an `ARCHITECTURE.md` file to detail the serverless, key-based access system. Explain the data flow from purchase to access.
    - [ ] **Task 1.3: Update INTEGRATION.md**: Create or update an `INTEGRATION.md` file to outline the integration points with the payment provider and YouTube.

- [ ] **Phase 2: Build the Core Purchase & Access Flow**
    - [ ] **Task 2.1: Implement Payment Provider Stub**: Modify the "Deals" page. The "Buy Now" buttons will initially link to a placeholder page that simulates a successful purchase.
    - [ ] **Task 2.2: Create the Access Token API Endpoint**: Create a new Next.js API route. This serverless function will simulate receiving a webhook from a payment provider, generating a unique access token, and storing it (initially in-memory, later in Vercel KV). For now, it will just log the generated access link to the console.
    - [ ] **Task 2.3: Create the Content Gatekeeper**: The course content page (`/my-courses/[courseId]`) will be a Server Component that validates the access token from the URL. It will check the token's validity and, if valid, render the course content. If not, it will show a "Permission Denied" message.

- [ ] **Phase 3: Refine & Polish**
    - [ ] **Task 3.1: Final Code Pruning**: Perform a final sweep of the codebase to ensure no remnants of the old user account system exist. This includes deleting any unused components, pages, or API routes related to authentication or user management.
