'use client';

import * as React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ConfirmationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
  confirmText: string;
  title: string;
  description: string;
  actionLabel: string;
}

/**
 * A reusable dialog that requires the user to type a specific phrase to confirm an action.
 * This is used for destructive actions like deleting a payment method.
 */
export function ConfirmationDialog({
  open,
  onOpenChange,
  onConfirm,
  confirmText,
  title,
  description,
  actionLabel,
}: ConfirmationDialogProps) {
  const [inputValue, setInputValue] = React.useState('');

  const canConfirm = inputValue === confirmText;

  const handleConfirm = () => {
    if (canConfirm) {
      onConfirm();
      onOpenChange(false);
      setInputValue('');
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-4">
          <Label htmlFor="confirm-input">
            To confirm, please type "<span className="font-bold">{confirmText}</span>" below:
          </Label>
          <Input
            id="confirm-input"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="mt-2"
            autoFocus
          />
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setInputValue('')}>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={handleConfirm} disabled={!canConfirm}>
              {actionLabel}
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
