/**
 * @file Renders the main support page for the application.
 *
 * This page provides a straightforward way for users to get help by presenting
 * a support form. It is designed to be a central point for user inquiries.
 * This is a server component that wraps the client-side `SupportForm`.
 *
 * @returns {JSX.Element} The rendered support page.
 */

/**
 * ### Backend Contract
 *
 * The `SupportForm` component on this page requires the following backend endpoint:
 *
 * 1.  **Submit Support Ticket:**
 *     - **Endpoint:** `POST /api/support/ticket`
 *     - **Description:** Submits a new support request from a user.
 *     - **Request Body:**
 *       - `subject` (string): The subject of the support ticket.
 *       - `message` (string): The detailed message from the user.
 *     - **Response:** A success status indicating the ticket was received.
 */

import { SupportForm } from "@/components/settings/support-form";

/**
 * The main component for the support page.
 *
 * It provides a clean, centered layout with a welcoming header and renders the `SupportForm`
 * to allow users to submit their support requests.
 */
export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline tracking-tighter">Support</h1>
          <p className="text-muted-foreground mt-2">We're here to help. How can we assist you?</p>
        </div>
        <SupportForm />
      </div>
    </div>
  );
}
