import { notFound } from 'next/navigation';
import Image from 'next/image';
import { courses } from '@/lib/placeholder-data';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Clock,
  BarChart,
  Star,
  Users,
  PlayCircle,
  Lock,
} from 'lucide-react';
import { CoursePurchaseCard } from '@/components/course/course-purchase-card';

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const course = courses.find((c) => c.id === params.id);

  if (!course) {
    notFound();
  }

  const image = PlaceHolderImages.find((img) => img.id === course.imageId);
  const instructorAvatar = PlaceHolderImages.find(
    (img) => img.id === course.instructor.avatarId
  );

  return (
    <div className="bg-background">
      <header className="bg-card text-card-foreground border-b">
        <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-2">
              <Badge variant="secondary" className="mb-4">{course.category}</Badge>
              <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">
                {course.title}
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                {course.description}
              </p>
              <div className="mt-6 flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Avatar className="h-10 w-10">
                    {instructorAvatar && (
                      <AvatarImage
                        src={instructorAvatar.imageUrl}
                        alt={course.instructor.name}
                        data-ai-hint={instructorAvatar.imageHint}
                      />
                    )}
                    <AvatarFallback>
                      {course.instructor.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">
                      {course.instructor.name}
                    </p>
                    <p className="text-muted-foreground">Instructor</p>
                  </div>
                </div>
                 <div className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-accent fill-accent" />
                    <span className="font-semibold">{course.rating}</span>
                    <span className="text-muted-foreground">({course.studentsCount.toLocaleString()} ratings)</span>
                </div>
              </div>
            </div>
            <div className="hidden md:block">
               <CoursePurchaseCard course={course} />
            </div>
          </div>
        </div>
      </header>
      <main className="container mx-auto grid gap-12 px-4 py-8 md:grid-cols-3 md:px-6 md:py-12">
        <div className="md:col-span-2">
          <div className="prose prose-lg max-w-none text-foreground">
            <h2 className="text-2xl font-bold mb-4 font-headline">About this course</h2>
            <p>{course.longDescription}</p>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-4 font-headline">Course Content</h2>
            <Accordion type="single" collapsible className="w-full">
              {course.modules.map((module, index) => (
                <AccordionItem value={`item-${index}`} key={module.id}>
                  <AccordionTrigger className="text-lg font-semibold">
                    {module.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-3">
                      {module.lessons.map((lesson) => (
                        <li
                          key={lesson.id}
                          className="flex items-center justify-between"
                        >
                          <div className="flex items-center gap-3">
                            {lesson.isPreview ? <PlayCircle className="h-5 w-5 text-primary" /> : <Lock className="h-5 w-5 text-muted-foreground" />}
                            <span className={lesson.isPreview ? "" : "text-muted-foreground"}>{lesson.title}</span>
                          </div>
                          <div className="flex items-center gap-4">
                            {lesson.isPreview && <Badge variant="outline">Preview</Badge>}
                            <span className="text-sm text-muted-foreground">{lesson.duration} min</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
        <div className="md:col-span-1">
           <div className="p-6 rounded-lg border bg-card text-card-foreground">
             <h3 className="font-bold text-lg mb-4">Course includes</h3>
             <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex items-center gap-3"><Clock className="w-4 h-4"/><span>{course.duration} on-demand video</span></li>
              <li className="flex items-center gap-3"><BarChart className="w-4 h-4"/><span>{course.level} level</span></li>
              <li className="flex items-center gap-3"><Users className="w-4 h-4"/><span>Access for {course.studentsCount.toLocaleString()} students</span></li>
             </ul>
           </div>
        </div>
      </main>
       <div className="md:hidden sticky bottom-0 left-0 right-0 p-4 bg-background/90 border-t backdrop-blur-sm">
          <CoursePurchaseCard course={course} />
        </div>
    </div>
  );
}
