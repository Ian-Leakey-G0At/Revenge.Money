import { BillingClientPage } from "@/components/settings/billing-client-page";

export default function BillingPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-4">
        <h1 className="text-3xl font-bold font-headline">Billing</h1>
        <p className="text-muted-foreground">Manage your subscription, payment methods, and billing history.</p>
      </div>
      <BillingClientPage />
    </div>
  );
}
