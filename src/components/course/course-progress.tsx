'use client';

import { Progress } from "@/components/ui/progress";

export function CourseProgress({ progress }: { progress: number }) {
  return (
    <div>
      <h2 className="text-xl font-bold mb-2">Your Progress</h2>
      <div className="flex items-center gap-x-4">
        <Progress value={progress} className="w-full" />
        <p className="text-sm text-muted-foreground">{Math.round(progress)}%</p>
      </div>
    </div>
  );
}
