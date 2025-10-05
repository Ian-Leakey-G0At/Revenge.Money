import { CourseDataTable } from "@/components/admin/course-data-table";
import { columns } from "@/components/admin/columns";
import { courses } from "@/lib/placeholder-data";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export default async function AdminPage() {
    return (
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
                Course Management
                </h1>
                <p className="text-lg text-muted-foreground">
                Create, update, and manage all courses.
                </p>
              </div>
              <Button>
                <PlusCircle className="mr-2 h-4 w-4" />
                Add New Course
              </Button>
            </div>
            <CourseDataTable columns={columns} data={courses} />
        </div>
    )
}