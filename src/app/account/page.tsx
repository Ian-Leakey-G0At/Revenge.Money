'use client';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CourseCard } from "@/components/course/course-card";
import { myCourses } from "@/lib/placeholder-data";
import { useUser } from "@/hooks/use-user";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function AccountPage() {
  const { user } = useUser();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <header className="mb-12 space-y-2 text-center">
        <Avatar className="h-28 w-28 mx-auto border-4 border-background shadow-lg">
          <AvatarImage src={user.avatarUrl} alt={user.name} />
          <AvatarFallback className="text-4xl">{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="pt-4">
          <h1 className="text-4xl font-bold font-headline tracking-tight">{user.name}</h1>
          <p className="text-lg text-muted-foreground">{user.email}</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto">
        <div className="flex justify-end mb-8">
          <Button asChild variant="ghost" className="group">
            <Link href="/courses">
              Explore Courses
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {myCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </main>
    </div>
  );
}
