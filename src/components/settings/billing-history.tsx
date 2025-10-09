import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export const BillingHistory = () => {
  // Fetch billing history data here
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
                  <a href="#" className="text-sm font-medium text-blue-500 hover:underline">View</a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
