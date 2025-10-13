/**
 * @file Renders the user's account page.
 *
 * This page displays the user's profile information, including their avatar, name, and email.
 * It also shows a grid of courses the user has purchased.
 * This component is a client component (`'use client'`) because it uses the `useUser` hook.
 *
 * @returns {JSX.Element} The rendered account page.
 */

/**
 * ### Backend Contract
 *
 * To function correctly, this page relies on the following backend services:
 *
 * 1.  **User Data:**
 *     - **Mechanism:** The `useUser` hook.
 *     - **Description:** This hook is expected to provide the currently authenticated user's
 *       information, including `name`, `email`, and `avatarUrl`.
 *     - **Note:** The underlying implementation of `useUser` is responsible for fetching and managing this data.
 *
 * 2.  **Purchased Courses:**
 *     - **Endpoint:** `GET /api/user/courses`
 *     - **Description:** Fetches the list of courses that the currently authenticated user has purchased.
 *     - **Response:** An array of `Course` objects. The structure for the `Course`
 *       object is defined in `src/components/course/course-card.tsx`.
 */

'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course/course-card";
import { myCourses } from "@/lib/placeholder-data";
import { useUser } from "@/hooks/use-user";
import { Link } from "@lexz451/next-nprogress";
import { ArrowRight } from "lucide-react";

export default function AccountPage() {
  const { user } = useUser();

  const purchasedCourses = myCourses.map(course => ({ ...course, purchased: true }));

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="flex items-center gap-4 mb-12">
        <Avatar className="h-16 w-16">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold font-headline tracking-tight">{user.name}</h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-lg font-normal">Course History</h2>
          <Button asChild variant="ghost" className="group">
            <Link href="/courses">
              Explore Courses
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {purchasedCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
