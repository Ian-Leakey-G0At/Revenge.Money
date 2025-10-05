import Image from 'next/image';
import Link from 'next/link';
import type { Course } from '@/lib/types';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Star, Users } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface CourseCardProps {
  course: Course;
  progress?: number;
}

export function CourseCard({ course, progress }: CourseCardProps) {
  const image = PlaceHolderImages.find((img) => img.id === course.imageId);

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-all hover:shadow-lg">
      <CardHeader className="p-0">
        <Link href={`/courses/${course.id}`} className="block">
          <div className="relative h-48 w-full">
            {image && (
              <Image
                src={image.imageUrl}
                alt={image.description}
                fill
                className="object-cover"
                data-ai-hint={image.imageHint}
              />
            )}
          </div>
        </Link>
      </CardHeader>
      <CardContent className="flex-1 p-4 flex flex-col">
        <div className="flex-1">
          <Badge variant="outline" className="mb-2">{course.category}</Badge>
          <h3 className="text-lg font-bold leading-tight font-headline">
            <Link href={`/courses/${course.id}`} className="hover:text-primary transition-colors">
              {course.title}
            </Link>
          </h3>
          <p className="mt-2 text-sm text-muted-foreground line-clamp-2">
            {course.description}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-accent fill-accent" />
              <span>{course.rating}</span>
            </div>
             <div className="flex items-center gap-1">
              <Users className="w-4 h-4" />
              <span>{course.studentsCount.toLocaleString()}</span>
            </div>
          </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        {progress !== undefined ? (
          <div className="w-full">
            <Progress value={progress} className="h-2 mb-2" />
            <p className="text-sm text-muted-foreground">{progress}% complete</p>
          </div>
        ) : (
          <div className="w-full flex justify-between items-center">
             <p className="text-xl font-bold text-primary">${course.price}</p>
            <Button asChild variant="secondary" size="sm">
              <Link href={`/courses/${course.id}`}>View Details</Link>
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
