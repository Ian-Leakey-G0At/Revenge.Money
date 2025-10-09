'use client';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from "@/components/ui/label";

export const DeleteAccount = () => {
  const [confirmation, setConfirmation] = useState('');

  const handleDelete = () => {
    // Add your account deletion logic here
    console.log('Account deleted');
  };

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold font-headline">Delete Account</h2>
        <p className="text-muted-foreground">Permanently delete your account and all of your content.</p>
      </div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="destructive">Delete Account</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete your account and remove your data from our servers.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Label htmlFor="confirmation">Type "delete" to confirm</Label>
            <Input id="confirmation" value={confirmation} onChange={(e) => setConfirmation(e.target.value)} />
          </div>
          <Button variant="destructive" disabled={confirmation !== 'delete'} onClick={handleDelete}>
            Delete Account
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};
