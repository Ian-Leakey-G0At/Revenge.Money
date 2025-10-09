
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { PlusCircle, Trash2 } from 'lucide-react';

// Define the type for a chapter
type Chapter = {
  id: string;
  title: string;
  videoFile: File | null;
};

export default function CreateNewCoursePage() {
  const [chapters, setChapters] = useState<Chapter[]>([]);

  const addChapter = () => {
    setChapters([...chapters, { id: `chapter-${Date.now()}`, title: 'New Chapter', videoFile: null }]);
  };

  const removeChapter = (id: string) => {
    setChapters(chapters.filter(chapter => chapter.id !== id));
  };

  const handleChapterTitleChange = (id: string, newTitle: string) => {
    setChapters(chapters.map(chapter => (chapter.id === id ? { ...chapter, title: newTitle } : chapter)));
  };

  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight md:text-4xl font-headline">Create New Course</h1>
        <p className="text-lg text-muted-foreground">Fill out the details to create a new course.</p>
      </header>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="md:col-span-2 space-y-8">
          {/* Course Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Course Details</CardTitle>
              <CardDescription>Provide the basic information for your course.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Course Title</Label>
                <Input id="course-title" placeholder="e.g., Introduction to TypeScript" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author-name">Author Name</Label>
                <Input id="author-name" placeholder="e.g., John Doe" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-description">Course Description</Label>
                <Textarea id="course-description" placeholder="A brief summary of what the course is about." />
              </div>
            </CardContent>
          </Card>

          {/* Course Content Card */}
          <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <div>
                        <CardTitle>Course Content</CardTitle>
                        <CardDescription>Add and arrange video chapters for this course.</CardDescription>
                    </div>
                    <Button onClick={addChapter}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Chapter
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
              <Accordion type="multiple" className="w-full" value={chapters.map(c => c.id)}>
                {chapters.map((chapter, index) => (
                  <AccordionItem key={chapter.id} value={chapter.id}>
                    <AccordionTrigger>
                      {`Chapter ${index + 1}: ${chapter.title}`}
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor={`chapter-title-${chapter.id}`}>Chapter Title</Label>
                        <Input
                          id={`chapter-title-${chapter.id}`}
                          value={chapter.title}
                          onChange={(e) => handleChapterTitleChange(chapter.id, e.target.value)}
                          placeholder="e.g., Getting Started"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <Button variant="outline">Upload Video</Button>
                        <Button variant="destructive" size="sm" onClick={() => removeChapter(chapter.id)}>
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Remove Chapter</span>
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              {chapters.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No chapters yet. Click "Add Chapter" to get started.
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="md:col-span-1 space-y-8">
          {/* Details Card */}
          <Card>
            <CardHeader>
              <CardTitle>Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input id="price" type="number" placeholder="e.g., 49.99" />
              </div>
            </CardContent>
          </Card>

          {/* Course Media Card */}
          <Card>
            <CardHeader>
              <CardTitle>Media</CardTitle>
              <CardDescription>Upload thumbnails for the course.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="space-y-2">
                    <Label>Thumbnail Image</Label>
                    <Button variant="outline" className="w-full">Upload Image</Button>
                </div>
                <div className="space-y-2">
                    <Label>Thumbnail Video (Optional)</Label>
                    <Button variant="outline" className="w-full">Upload Video</Button>
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="flex items-center justify-end gap-4 mt-8">
        <Button variant="outline">Cancel</Button>
        <Button>Save Course</Button>
      </div>
    </div>
  );
}
