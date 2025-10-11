
import { Button } from "@/components/ui/button";
import { courses } from "@/lib/placeholder-data";
import { Link } from "@lexz451/next-nprogress";
import { PlusCircle } from "lucide-react";
import { PortraitStats } from "@/components/admin/portrait-stats";
import { CourseList } from "@/components/admin/course-list";

const stats = [
    { title: "Total Sales", value: "$12,345" },
    { title: "New Users", value: "123" },
    { title: "Active Courses", value: "45" },
    { title: "Pending Approvals", value: "3" },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
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
            <div className="lg:col-span-1">
              <PortraitStats stats={stats} />
            </div>
            <div className="lg:col-span-2">
              <CourseList courses={courses} />
            </div>
        </main>
    </div>
  );
}
