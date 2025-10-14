'use client';

import * as React from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreditCard } from 'lucide-react';

interface AddPaymentMethodDialogProps {
    children: React.ReactNode;
    onAddMethod: (method: { type: string; last4: string; expiration: string }) => void;
}

export function AddPaymentMethodDialog({ children, onAddMethod }: AddPaymentMethodDialogProps) {
  const [open, setOpen] = React.useState(false);
  const [cardInfo, setCardInfo] = React.useState({ number: '', exp: '', cvc: '' });

  const handleSave = () => {
    // In a real app, perform more robust validation
    if (!cardInfo.number || !cardInfo.exp || !cardInfo.cvc) {
        alert("Please fill all fields."); // Replace with a better notification
        return;
    }

    const newMethod = {
        type: cardInfo.number.startsWith('4') ? 'Visa' : 'Mastercard', // Placeholder logic
        last4: cardInfo.number.slice(-4),
        expiration: cardInfo.exp,
    };
    
    onAddMethod(newMethod);
    setOpen(false);
    setCardInfo({ number: '', exp: '', cvc: '' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="items-center text-center">
          <div className="p-3 rounded-full bg-primary/10 w-fit mb-2">
              <CreditCard className="w-8 h-8 text-primary" />
          </div>
          <DialogTitle className="text-2xl font-headline">Add a New Card</DialogTitle>
          <DialogDescription>
            Your new card will be used for future payments and subscriptions.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="card-number">Card Number</Label>
            <Input 
              id="card-number" 
              placeholder="0000 0000 0000 0000" 
              value={cardInfo.number}
              onChange={(e) => setCardInfo({...cardInfo, number: e.target.value})}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="card-exp">Expires</Label>
              <Input 
                id="card-exp" 
                placeholder="MM / YY" 
                value={cardInfo.exp}
                onChange={(e) => setCardInfo({...cardInfo, exp: e.target.value})}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="card-cvc">CVC</Label>
              <Input 
                id="card-cvc" 
                placeholder="123" 
                value={cardInfo.cvc}
                onChange={(e) => setCardInfo({...cardInfo, cvc: e.target.value})}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
            </Button>
            <Button type="button" onClick={handleSave}>
                Save Card
            </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
