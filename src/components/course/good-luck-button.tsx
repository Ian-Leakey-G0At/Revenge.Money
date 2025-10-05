
'use client';

import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

export function GoodLuckButton() {
  const { toast } = useToast();
  const [count, setCount] = useState(19576);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
    toast({
      title: 'Good Luck!',
      description: 'May your finances flourish.',
    });
  };

  return (
    <Card 
        className="text-center p-4 cursor-pointer hover:bg-accent/50 transition-colors"
        onClick={handleClick}
    >
      <p className="font-semibold text-foreground">
        {count.toLocaleString()} Tapped for Good Luck
      </p>
    </Card>
  );
}
