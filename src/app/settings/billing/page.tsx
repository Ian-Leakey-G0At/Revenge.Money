/**
 * @file Renders the main billing page.
 *
 * This page acts as a container for the `BillingClientPage` component, which handles
 * the presentation and management of the user's subscription, payment methods,
 * and billing history.
 * This component itself is a server component, but it wraps a client component
 * that contains the interactive logic.
 *
 * @returns {JSX.Element} The rendered billing page.
 */

import { BillingClientPage } from "@/components/settings/billing-client-page";

/**
 * The main component for the billing page.
 *
 * It provides a structured layout with a title and description, and then renders
 * the `BillingClientPage` where the actual billing management UI resides.
 */
export default function BillingPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-headline">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history.</p>
      </div>
      <BillingClientPage />
    </div>
  );
}
