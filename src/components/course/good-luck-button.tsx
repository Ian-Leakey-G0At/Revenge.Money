'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { Card } from '@/components/ui/card';

const goodLuckMessages = [
  "Money magnet activated! 🧲",
  "Wishing you a prosperous journey ahead! ✨",
  "May your investments be wise and your returns plentiful. 📈",
  "Good luck! May your bank account see many commas. 💰",
  "Sending you vibes of financial abundance! 💸",
  "Here\'s to smart decisions and a wealthy future. 🧠",
  "May your financial goals be reached with ease. 🎯",
  "Prosperity is just around the corner! 🚀",
  "Keep tapping, keep earning! 👆",
  "Your financial future is looking bright! ☀️",
  "Wishing you a waterfall of wealth. 🌊",
  "May your wallet always be heavy. 🏋️‍♂️",
  "Abundance is your birthright. Claim it! 👑",
  "Watch your savings grow like a well-tended garden. 🌱",
  "Here\'s a sprinkle of financial magic! ✨",
  "May you always have more money than month. 🗓️",
  "Unlock your potential for wealth. 🔑",
  "Good fortune is coming your way! 🍀",
  "May your assets outweigh your liabilities. ⚖️",
  "To the moon! 🌕🚀",
  "Financial success is in your stars. 🌟",
  "Stack those coins! 🥞",
  "The universe is conspiring to make you wealthy. 🌌",
  "Positive cash flow, positive life. ➕",
  "May your portfolio be green and your spirits high. 💚",
  "Fortune favors the bold (and the tapper!). 💪",
  "Your net worth is on the rise! ↗️",
  "Secure the bag! 💼",
  "Wealth is a mindset. You\'ve got this! 🙌",
  "Cheers to financial freedom! 🥂",
];

export function GoodLuckButton() {
  const { toast } = useToast();
  const [count, setCount] = useState(19576);

  const handleClick = () => {
    setCount(prevCount => prevCount + 1);
    const randomIndex = Math.floor(Math.random() * goodLuckMessages.length);
    toast({
      title: 'Good Luck!',
      description: goodLuckMessages[randomIndex],
      duration: 5000, // Stays on screen for 5 seconds
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
