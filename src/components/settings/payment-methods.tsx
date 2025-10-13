/**
 * @file A component to display and manage the user's saved payment methods.
 *
 * This component renders a list of the user's credit cards or other payment sources.
 * It provides options to add a new payment method and to remove existing ones.
 * This component will be a client component because it handles user interactions.
 *
 * @returns {JSX.Element} The rendered payment methods component.
 */

/**
 * ### Backend Contract
 *
 * This component requires the following backend endpoints to be fully functional:
 *
 * 1.  **Fetch Payment Methods:**
 *     - **Endpoint:** `GET /api/user/payment-methods`
 *     - **Description:** Fetches the list of the user's saved payment methods.
 *     - **Response:** An array of payment method objects.
 *       - `[{"id": "pm_1", "type": "Visa", "last4": "4242", "expiration": "12/26"}, ...]`
 *
 * 2.  **Add New Payment Method:**
 *     - **Endpoint:** `POST /api/user/payment-methods`
 *     - **Description:** Initiates the process to add a new payment method. This may involve redirecting
 *       to a payment provider (like Stripe) or using a client-side library.
 *     - **Request:** (Depends on the payment provider integration)
 *     - **Response:** A success or failure status.
 *
 * 3.  **Remove Payment Method:**
 *     - **Endpoint:** `DELETE /api/user/payment-methods/:id`
 *     - **Description:** Deletes a specific payment method.
 *     - **Response:** A success or failure status.
 */

import { Button } from "@/components/ui/button";

/**
 * The component for managing payment methods.
 *
 * It displays a list of the user's payment methods and includes buttons for adding
 * and removing them. Currently, it uses static placeholder data.
 */
export const PaymentMethods = () => {
  // Placeholder: In a real app, this data would come from an API call like `fetch('/api/user/payment-methods')`.
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
          <div key={method.id} className="rounded-lg border bg-transparent p-4 flex items-center justify-between transition-colors hover:bg-muted/50">
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
