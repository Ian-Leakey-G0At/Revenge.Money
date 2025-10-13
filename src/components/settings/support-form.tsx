/**
 * @file A client component that provides a form for users to submit support requests.
 *
 * This component includes fields for a subject, description, and an optional file attachment.
 * It manages its own state for the form inputs and for displaying a confirmation dialog
 * upon successful submission. It is a client component due to its use of state and event handlers.
 *
 * @returns {JSX.Element} The rendered support form.
 */

/**
 * ### Backend Contract
 *
 * This component requires the following backend endpoint for form submission:
 *
 * 1.  **Submit Support Ticket:**
 *     - **Endpoint:** `POST /api/support/ticket`
 *     - **Description:** Submits the user's support request.
 *     - **Request Body:** A `FormData` object containing:
 *       - `subject` (string): The subject of the support ticket.
 *       - `message` (string): The detailed message from the user.
 *       - `file` (File, optional): An attached file.
 *     - **Response:** A success status indicating the ticket was received.
 */

'use client';
import { useState, FormEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";

/**
 * A form component for submitting support requests.
 *
 * It manages the state for the form's input fields (title, description)
 * and controls the visibility of a confirmation dialog.
 */
export const SupportForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  /**
   * Handles the form submission.
   *
   * It prevents the default form submission behavior and, in a real application,
   * would send the form data to the backend. Currently, it only shows the confirmation dialog.
   * @param {FormEvent} e - The form submission event.
   */
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // In a real implementation, you would use FormData to handle the file and text fields:
    // const formData = new FormData(e.currentTarget as HTMLFormElement);
    // fetch('/api/support/ticket', { method: 'POST', body: formData });
    setShowConfirmation(true);
    setTitle('');
    setDescription('');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 p-6 border rounded-lg">
        <div className="space-y-2">
          <Label htmlFor="title">Subject</Label>
          <Input id="title" name="title" placeholder="Enter a subject" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" name="description" placeholder="Describe your issue or question" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-transparent" rows={5} required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">Attach a file (optional)</Label>
          <Input id="file" name="file" type="file" className="bg-transparent file:text-foreground" />
        </div>
        <Button type="submit" className="w-full">Send Message</Button>
      </form>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Message Sent!</DialogTitle>
            <DialogDescription>
              Thanks for reaching out! We've received your message and will get back to you as soon as possible.
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
