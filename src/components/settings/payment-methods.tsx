'use client';

import * as React from 'react';
import { Button } from "@/components/ui/button";
import { ConfirmationDialog } from '@/components/settings/confirmation-dialog';
import { AddPaymentMethodDialog } from '@/components/settings/add-payment-method-dialog';

// Placeholder data - in a real app, this would be managed via state and API calls.
const initialPaymentMethods = [
  { id: 'pm_1', type: 'Visa', last4: '4242', expiration: '12/26' },
  { id: 'pm_2', type: 'Mastercard', last4: '5555', expiration: '08/25' },
];

export const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = React.useState(initialPaymentMethods);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [selectedMethodId, setSelectedMethodId] = React.useState<string | null>(null);

  const handleRemoveClick = (id: string) => {
    setSelectedMethodId(id);
    setDialogOpen(true);
  };

  const handleRemoveConfirm = () => {
    if (selectedMethodId) {
      // In a real app, you would also make an API call here: DELETE /api/user/payment-methods/:id
      setPaymentMethods(paymentMethods.filter(method => method.id !== selectedMethodId));
      setSelectedMethodId(null);
    }
  };
  
  const handleAddMethod = (method: { type: string; last4: string; expiration: string }) => {
    const newMethod = {
        id: `pm_${Date.now()}`,
        ...method,
    }
    setPaymentMethods([...paymentMethods, newMethod]);
  }

  return (
    <>
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-headline">Payment Methods</h2>
           <AddPaymentMethodDialog onAddMethod={handleAddMethod}>
                <Button variant="outline">Add New</Button>
            </AddPaymentMethodDialog>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {paymentMethods.map((method) => (
            <div key={method.id} className="rounded-lg border bg-transparent p-4 flex items-center justify-between transition-colors hover:bg-muted/50">
              <div>
                <p className="font-semibold">{method.type} ending in {method.last4}</p>
                <p className="text-sm text-muted-foreground">Expires {method.expiration}</p>
              </div>
              <Button 
                variant="ghost" 
                className="text-red-500 hover:text-red-400"
                onClick={() => handleRemoveClick(method.id)}
              >
                Remove
              </Button>
            </div>
          ))}
        </div>
         {paymentMethods.length === 0 && (
            <p className="text-muted-foreground text-center py-4">No payment methods saved.</p>
        )}
      </div>

      <ConfirmationDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onConfirm={handleRemoveConfirm}
        confirmText="DELETE"
        title="Are you absolutely sure?"
        description="This action cannot be undone. This will permanently remove this payment method from your account."
        actionLabel="Remove Payment Method"
      />
    </>
  );
};
