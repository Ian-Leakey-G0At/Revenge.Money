/**
 * @file Renders the main course catalog page.
 *
 * This page displays a grid of available courses that users can search and filter.
 * It includes controls for text-based search and category filtering.
 * As a Next.js Server Component, it is designed to fetch its initial data on the server.
 *
 * @returns {JSX.Element} The rendered course catalog page.
 */

/**
 * ### Backend Contract
 *
 * This page and its interactive elements require the following backend endpoints to become fully functional:
 *
 * 1.  **Initial Course List & Search/Filter:**
 *     - **Endpoint:** `GET /api/courses`
 *     - **Query Parameters:**
 *       - `q` (string, optional): A search term to filter courses by title or description.
 *       - `category` (string, optional): The category name to filter courses by (e.g., "investing").
 *     - **Description:** Fetches the list of courses. The client-side logic (to be implemented) will call this
 *       endpoint initially without parameters and then again with query parameters as the user
 *       types in the search bar or selects a category.
 *     - **Response:** An array of `Course` objects. The structure for the `Course`
 *       object is defined in `src/components/course/course-card.tsx`.
 */

import { CourseCard } from '@/components/course/course-card';
import { courses } from '@/lib/placeholder-data';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function CoursesPage() {

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search courses..." className="pl-9" />
        </div>
        <div className="flex items-center gap-4">
          <Select>
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
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
