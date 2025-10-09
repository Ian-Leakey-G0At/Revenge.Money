'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";

export const SupportForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    setShowConfirmation(true);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="title">Subject</Label>
          <Input id="title" placeholder="Enter a subject" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-transparent" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea id="description" placeholder="Describe your issue or question" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-transparent" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="file">Attach a file</Label>
          <Input id="file" type="file" className="bg-transparent" />
        </div>
        <Button type="submit" className="w-full">Send Message</Button>
      </form>
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
