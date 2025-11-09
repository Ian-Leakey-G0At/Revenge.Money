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
import { Suspense } from 'react';
import { CourseCard } from '@/components/course/course-card';
import { courses } from '@/lib/placeholder-data';
import { SearchAndFilter } from '@/components/course/search-and-filter';

export default function CoursesPage() {

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <Suspense fallback={<div>Loading...</div>}>
        <SearchAndFilter />
      </Suspense>
      <div className="grid grid-cols-2 gap-x-3 gap-y-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-8">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
