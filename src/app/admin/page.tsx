/**
 * @file Renders the main administrative dashboard.
 *
 * This page provides a central hub for administrators to manage the platform.
 * It displays key statistics, a list of all courses, and provides navigation
 * for creating new courses and managing featured content.
 * This is a server component and fetches its initial data on the server side.
 *
 * @returns {JSX.Element} The rendered admin dashboard page.
 */

/**
 * ### Backend Contract
 *
 * This page and its subcomponents require the following backend endpoints:
 *
 * 1.  **Dashboard Statistics:**
 *     - **Endpoint:** `GET /api/admin/stats`
 *     - **Description:** Fetches the key performance indicators for the admin dashboard.
 *     - **Response:** An array of objects, each with a `title` (string) and a `value` (string).
 *       - `[{"title": "Total Sales", "value": "$12,345"}, ...]`
 *
 * 2.  **All Courses List:**
 *     - **Endpoint:** `GET /api/courses` or `GET /api/admin/courses`
 *     - **Description:** Fetches a complete list of all courses on the platform for administrative review.
 *     - **Response:** An array of `Course` objects. The structure for the `Course`
 *       object is defined in `src/components/course/course-card.tsx`.
 */

import { Button } from "@/components/ui/button";
import { courses } from "@/lib/placeholder-data";
import { Link } from "@lexz451/next-nprogress";
import { PlusCircle } from "lucide-react";
import { PortraitStats } from "@/components/admin/portrait-stats";
import { CourseList } from "@/components/admin/course-list";

// Placeholder: In a real app, this data would come from an API call like `fetch('/api/admin/stats')`.
const stats = [
    { title: "Total Sales", value: "$12,345" },
    { title: "New Users", value: "123" },
    { title: "Active Courses", value: "45" },
    { title: "Pending Approvals", value: "3" },
];

/**
 * The main component for the admin dashboard page.
 *
 * It assembles the admin dashboard by combining a header with action buttons,
 * a statistics display (`PortraitStats`), and a list of courses (`CourseList`).
 * Currently, it uses static placeholder data for both stats and courses.
 */
export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
        {/* The header section with title and action buttons. */}
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Admin Dashboard</h1>
                <p className="text-muted-foreground">Welcome back, Admin!</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2">
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/admin/courses/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Create New Course
                    </Link>
                </Button>
                <Button asChild className="w-full sm:w-auto">
                    <Link href="/admin/featured/new">
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Featured
                    </Link>
                </Button>
            </div>
        </header>
        <main className="grid gap-8 lg:grid-cols-3">
            {/* The statistics section. */}
            <div className="lg:col-span-1">
              <PortraitStats stats={stats} />
            </div>
            {/* The course list section. */}
            <div className="lg:col-span-2">
              <CourseList courses={courses} />
            </div>
        </main>
    </div>
  );
}
