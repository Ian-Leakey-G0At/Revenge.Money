"use client";

import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface AntechamberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProceed: () => void;
  vendettaMachineUrl: string;
}

export const AntechamberModal: React.FC<AntechamberModalProps> = ({ isOpen, onClose, onProceed, vendettaMachineUrl }) => {
  const handleProceed = () => {
    window.location.href = vendettaMachineUrl;
    onProceed();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>A Note on Discretion</DialogTitle>
        </DialogHeader>
        {/* TODO: Replace with final 'digital keycard' asset */}
        <div className="aspect-video bg-gray-300 my-4 rounded-md flex items-center justify-center">
          <span className="text-gray-500">16:9 Image Placeholder</span>
        </div>
        <DialogDescription>
          The knowledge in this fortress is considered dangerous by the gatekeepers. To protect our sovereignty, all acquisitions are processed discreetly through our partner art gallery, `VendettaMachine`. This ensures your access remains private and secure. Trust the process. Your key will be delivered to your inbox the moment the acquisition is complete.
        </DialogDescription>
        <DialogFooter>
          <Button onClick={handleProceed}>Proceed to Secure Checkout</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
