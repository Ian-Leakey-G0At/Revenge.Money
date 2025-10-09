import { Button } from "@/components/ui/button";

export const PaymentMethods = () => {
  // Fetch user's payment methods here
  const paymentMethods = [
    { id: 'pm_1', type: 'Visa', last4: '4242', expiration: '12/26' },
    { id: 'pm_2', type: 'Mastercard', last4: '5555', expiration: '08/25' },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold font-headline">Payment Methods</h2>
        <Button variant="outline">Add New</Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        {paymentMethods.map((method) => (
          <div key={method.id} className="rounded-lg border bg-transparent p-4 flex items-center justify-between transition-colors hover:bg-neutral-900/50">
            <div>
              <p className="font-semibold">{method.type} ending in {method.last4}</p>
              <p className="text-sm text-muted-foreground">Expires {method.expiration}</p>
            </div>
            <Button variant="ghost" className="text-red-500 hover:text-red-400">Remove</Button>
          </div>
        ))}
      </div>
    </div>
  );
};
