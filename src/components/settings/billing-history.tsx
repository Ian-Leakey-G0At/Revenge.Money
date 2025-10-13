/**
 * @file A component to display the user's billing history.
 *
 * This component renders a table of the user's past invoices, showing the date,
 * amount, status, and a link to view the detailed invoice.
 * It will be a client component because it fetches and displays user-specific data.
 *
 * @returns {JSX.Element} The rendered billing history component.
 */

/**
 * ### Backend Contract
 *
 * This component requires the following backend endpoint to be fully functional:
 *
 * 1.  **Fetch Billing History:**
 *     - **Endpoint:** `GET /api/user/billing-history`
 *     - **Description:** Fetches the list of the user's past invoices or billing records.
 *     - **Response:** An array of invoice objects.
 *       - `[{"id": "inv_1", "date": "2024-07-01", "amount": "15.00", "status": "Paid"}, ...]`
 *
 * 2.  **Fetch Invoice Details (on linked page):**
 *     - **Endpoint:** `GET /api/invoices/:id`
 *     - **Description:** Fetches the detailed information for a single invoice, which is linked from this table.
 *     - **Response:** An object containing the full invoice details.
 */

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Link } from "@lexz451/next-nprogress";

/**
 * The component for displaying billing history.
 *
 * It renders a table of invoices with their date, amount, status, and a link to view the invoice.
 * Currently, it uses static placeholder data.
 */
export const BillingHistory = () => {
  // Placeholder: In a real app, this data would come from an API call like `fetch('/api/user/billing-history')`.
  const invoices = [
    { id: 'inv_1', date: '2024-07-01', amount: '15.00', status: 'Paid' },
    { id: 'inv_2', date: '2024-06-01', amount: '15.00', status: 'Paid' },
    { id: 'inv_3', date: '2024-05-01', amount: '15.00', status: 'Paid' },
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold font-headline">Billing History</h2>
      <div className="rounded-lg border bg-transparent">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Amount</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Invoice</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice.id}>
                <TableCell>{invoice.date}</TableCell>
                <TableCell>${invoice.amount}</TableCell>
                <TableCell>
                  <Badge variant={invoice.status === 'Paid' ? 'success' : 'secondary'}>{invoice.status}</Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Link href={`/invoices/${invoice.id}`} className="text-sm font-medium text-primary hover:underline">
                    View
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
