import { PaymentMethods } from "@/components/settings/payment-methods";
import { BillingHistory } from "@/components/settings/billing-history";

export const BillingClientPage = () => {
  return (
    <div className="space-y-8">
      <PaymentMethods />
      <BillingHistory />
    </div>
  );
};
