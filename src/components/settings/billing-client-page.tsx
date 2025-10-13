/**
 * @file A client component that serves as the main UI for the billing page.
 *
 * This component composes the billing page by combining the `PaymentMethods` and
 * `BillingHistory` components into a single, structured layout.
 * It is a client component because its children will handle interactive features
 * like adding payment methods or downloading invoices.
 *
 * @returns {JSX.Element} The rendered billing client page.
 */

import { PaymentMethods } from "@/components/settings/payment-methods";
import { BillingHistory } from "@/components/settings/billing-history";

/**
 * The main client-side component for the billing page.
 *
 * It renders the `PaymentMethods` and `BillingHistory` components in a vertical layout.
 * This component does not have its own logic but serves to organize the UI.
 */
export const BillingClientPage = () => {
  return (
    <div className="space-y-8">
      <PaymentMethods />
      <BillingHistory />
    </div>
  );
};
