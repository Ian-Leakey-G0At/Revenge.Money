# User Flow: From Purchase to Consumption

This document outlines the end-to-end user flow of our platform, from the moment a user discovers a course to when they are watching the content. The core of our model is "Purchase & Access Link," which prioritizes simplicity and a frictionless user experience by eliminating the need for traditional user accounts.

---

### For the New Developer

Welcome to the team! This section will provide a detailed, technical walkthrough of the user flow. Understanding this is fundamental to understanding our architecture and development philosophy.

**Step 1: Course Discovery & Selection**

*   **Entry Points:** The user journey begins on the homepage (`/`) or the "Courses" page (`/courses`).
*   **Fetching Courses:** These pages display a list of available courses. This data is fetched and rendered into `CourseCard` components.
*   **Navigation:** When a user clicks on a `CourseCard`, they are navigated to the individual course page using a dynamic route: `/courses/[id]`.

**Step 2: The Course Page & The Paywall**

*   **Layout:** The `src/components/course/course-page-layout.tsx` component is the primary layout for displaying a single course.
*   **Conditional Rendering:** The key logic resides in this component. It checks for a prop called `isPurchased`.
    *   If `isPurchased` is `false`, the user is presented with a `LockedVideoPlaylist`, showing them the course content is gated.
    *   If `isPurchased` is `true`, the user sees the `VideoPlaylist`, which allows them to watch the course videos.
*   **Initial State:** For a new visitor, there is no access token present in the URL, so `isPurchased` defaults to `false`, enforcing our paywall.

**Step 3: The Acquisition Process**

*   **Call to Action:** The user clicks an "Acquire Access" or similar call-to-action button.
*   **The Antechamber Modal:** This action does not immediately redirect the user. Instead, it triggers a modal window. This modal explains that all acquisitions are processed discreetly through our partner art gallery, `VendettaMachine`, for security and privacy.
*   **Proceed to Checkout:** The user clicks "Proceed to Secure Checkout" in the modal, which then performs the actual `window.location.href` redirect to the `VendettaMachine` product page.

**Step 4: Payment, Translation, and Internal Command**

*   **External Purchase:** The user completes the purchase on `VendettaMachine` via an external payment provider (e.g., Polar.sh).
*   **Webhook to `service-connector`:** The payment provider sends a signed webhook to our trusted intermediary, the `service-connector`.
*   **Translation & Forwarding:** The `service-connector` verifies the webhook, extracts the relevant data (customer email, course ID), and translates it into a generic JSON object: `{ "eventType": "FULFILLMENT_REQUEST", "payload": { ... } }`. It then sends this command to `RevengeMoney`'s secure internal endpoint.

**Step 5: Internal Fulfillment**

*   **Internal API Endpoint:** The command is received by `src/app/api/internal/fulfillment-trigger/route.ts`.
*   **API Route Logic:** This secure, internal-only function handles the following:
    1.  It verifies the request came from `service-connector` by checking a secret `Authorization: Bearer` token.
    2.  It parses the generic `FULFILLMENT_REQUEST` payload.
    3.  It generates a unique, cryptographically secure access token.
    4.  This token is stored in our Vercel KV store. The key is the token itself (`token:<token>`), and the value is an object containing the `courseId` and the customer's `email`.
    5.  Finally, our backend triggers an email to be sent to the customer, containing their unique access link.

**Step 6: Accessing the Course**

*   **Email Delivery:** The user receives an email with a link in the following format: `https://revenge-money.vercel.app/my-courses/[courseId]?token=[access_token]`.
*   **User Action:** The user clicks this link to access their purchased course.

**Step 7: Token Verification and Content Delivery**

*   **Page Load:** The user lands on the `/my-courses/[courseId]` page.
*   **Token Verification:** A Next.js Server Component on the page extracts the `token` from the URL. It directly queries the Vercel KV store to verify the token's validity and ensure it matches the `courseId`.
*   **Access Granted:** If the token is valid, the server component sets the `isPurchased` prop to `true` for the `course-page-layout.tsx` component.
*   **Content Unlocked:** The `course-page-layout.tsx` component renders the `VideoPlaylist`, granting the user full access to the course content.

---

### For the Everyday User (The "Idiot's" Guide)

So you're ready to learn something new? Fantastic! We've made it incredibly simple to get started with our courses. Here's how it works:

**Step 1: Find a Course You Like**

Think of our website like a bookstore. You can browse the **Homepage** to see what's popular, or head over to the **"Deals"** page to find special offers. Take your time and find a course that excites you!

**Step 2: Buy the Course**

When you've found the perfect course, just click the "Buy" button. We'll take you to a super secure payment page where you can enter your payment details. It's just like buying anything else online – safe and easy.

**Step 3: Check Your Email**

The moment your payment goes through, we'll send you an email. This email is your golden ticket! It contains a special, private link that's just for you.

**Step 4: Watch Your Course!**

Click the link in the email, and you'll be taken directly to your course page. You can start watching the lessons right away. There are no usernames to remember or passwords to forget.

**Pro-Tip:** Bookmark that link in your browser! That way, you can easily get back to your course whenever you want to continue learning.

---

### For the C.E.O.

**Executive Summary**

Our user flow is a strategic asset, engineered for maximum simplicity and efficiency. It directly impacts our bottom line by optimizing for conversion and minimizing operational costs. We have intentionally eliminated the friction of user accounts, resulting in a streamlined **"Purchase & Access"** model that benefits both the customer and the business.

**The "Purchase & Access" Model: A High-Level Overview**

1.  **Discovery:** A potential customer discovers our courses on the website.
2.  **Purchase:** They complete the purchase through a trusted, industry-leading third-party payment provider.
3.  **Access:** They instantly receive an email containing a unique, permanent link to their course. One click and they are learning.

**Key Business Advantages of This Model**

*   **Reduced Friction, Higher Conversion:** By removing the requirement for account creation, we have eliminated a major drop-off point in the conversion funnel. The path from interest to purchase is as short as possible, which will directly and positively impact our sales.
*   **Lower Operational Overhead:** The absence of a user account system means no password reset workflows, no complex user database to manage and secure, and a leaner, more focused architecture. This translates to lower development, maintenance, and infrastructure costs.
*   **Scalable & Secure:** Our technology stack is built for modern scale. We leverage a serverless architecture (Next.js API Routes and Vercel KV) which is cost-effective and automatically scales with demand. We outsource all direct payment handling to the `service-connector` and a PCI-compliant provider, reducing our risk profile. Our access token system is a simple but robust method for content gating.
*   **Focus on Our Core Business:** This lean operational model allows us to dedicate our resources to what truly drives the business: creating exceptional course content and marketing it effectively. We are a content and education company, not a user management software company.

**The Strategic Imperative**

This user flow is a deliberate strategic choice. It aligns with our brand promise of simplicity and directness. In a crowded market, this frictionless experience is not just a feature—it's a competitive advantage.
