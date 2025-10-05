import { notFound } from 'next/navigation';
import { courses } from '@/lib/placeholder-data';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubItem,
  SidebarMenuSubButton,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft, CheckCircle, PlayCircle } from 'lucide-react';
import { AspectRatio } from '@/components/ui/aspect-ratio';

export default function LearnCoursePage({ params }: { params: { id: string } }) {
  // In a real app, you would verify that the user has purchased this course.
  const course = courses.find((c) => c.id === params.id);
  const currentLessonId = course?.modules[0]?.lessons[0]?.id;

  if (!course) {
    notFound();
  }

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <Link href={`/courses/${course.id}`} className="flex items-center gap-2 text-sm font-semibold hover:text-primary">
            <ArrowLeft className="w-4 h-4" />
            Back to Course
          </Link>
          <h2 className="text-lg font-bold truncate mt-2 font-headline">{course.title}</h2>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {course.modules.map((module) => (
              <SidebarMenuItem key={module.id}>
                <SidebarMenuButton isActive={false} className="h-auto py-2">
                  <div className="flex flex-col items-start w-full">
                    <span className="font-semibold">{module.title}</span>
                    <span className="text-xs text-muted-foreground">
                      {module.lessons.length} lessons
                    </span>
                  </div>
                </SidebarMenuButton>
                <SidebarMenuSub>
                  {module.lessons.map((lesson) => (
                    <SidebarMenuSubItem key={lesson.id}>
                      <SidebarMenuSubButton
                        asChild
                        isActive={lesson.id === currentLessonId}
                      >
                        <Link href="#">
                          {lesson.id === currentLessonId ? (
                            <PlayCircle className="text-primary" />
                          ) : (
                            <CheckCircle className="text-green-500" />
                          )}
                          <span>{lesson.title}</span>
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <div className="p-4 flex items-center gap-4 border-b">
          <SidebarTrigger />
          <h1 className="text-xl font-semibold font-headline">{course.modules[0].lessons[0].title}</h1>
        </div>
        <div className="p-4 md:p-8">
            <AspectRatio ratio={16 / 9} className="bg-muted rounded-lg overflow-hidden shadow-lg">
                <div className="w-full h-full flex items-center justify-center">
                    <PlayCircle className="w-16 h-16 text-primary/50" />
                </div>
            </AspectRatio>
             <div className="prose prose-lg max-w-none mt-8">
                <h2 className="font-headline">Lesson Details</h2>
                <p>
                    {course.modules[0].lessons[0].content} This is placeholder content for the lesson. In a real application, this would contain detailed text, code examples, and other resources related to the video lesson.
                </p>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi.
                </p>
             </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
