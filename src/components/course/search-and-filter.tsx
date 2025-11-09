'use client';

import { useSearchParams } from 'next/navigation';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export function SearchAndFilter() {
  const searchParams = useSearchParams();

  return (
    <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative w-full sm:max-w-xs">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input placeholder="Search courses..." className="pl-9" defaultValue={searchParams.get('q') || ''} />
      </div>
      <div className="flex items-center gap-4">
        <Select defaultValue={searchParams.get('category') || ''}>
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="investing">Investing</SelectItem>
            <SelectItem value="debt">Debt</SelectItem>
            <SelectItem value="budgeting">Budgeting</SelectItem>
            <SelectItem value="advanced">Advanced</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
