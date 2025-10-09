
'use client';

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course/course-card";
import { myCourses } from "@/lib/placeholder-data";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { Settings } from "lucide-react";

export default function AccountPage() {
  const { user } = useUser();

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={user.avatarUrl} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-headline">{user.name}</h1>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        <Button asChild variant="outline">
          <Link href="/settings">
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Link>
        </Button>
      </header>

      <main>
        <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold tracking-tight font-headline">My Courses</h2>
            <Button asChild variant="secondary">
                <Link href="/courses">Explore Courses</Link>
            </Button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {myCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
