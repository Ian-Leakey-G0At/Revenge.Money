'use client';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogClose
} from "@/components/ui/dialog";
import type { Course } from "@/lib/placeholder-data";
import { MoreVertical, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";

export const CourseList = ({ courses }: { courses: Course[] }) => {
    const router = useRouter();
    const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
    const [confirmationInput, setConfirmationInput] = useState("");

    const handleEdit = (courseId: string) => {
        router.push(`/admin/courses/new?courseId=${courseId}`);
    };

    const handleDeleteClick = (course: Course) => {
        setSelectedCourse(course);
        setIsDeleteDialogOpen(true);
        setConfirmationInput(""); // Reset input on open
    };

    const confirmDelete = () => {
        if (selectedCourse && confirmationInput === selectedCourse.title) {
            // Placeholder for backend delete logic (e.g., calling a Cloud Function)
            console.log("Initiating deletion for course:", selectedCourse.title);
            setIsDeleteDialogOpen(false);
            setSelectedCourse(null);
        }
    };

    return (
        <div>
            <h2 className="text-2xl font-bold font-headline mb-4">Courses</h2>
            <div className="space-y-4">
                {courses.map((course) => (
                    <div
                        key={course.id}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50"
                    >
                        <div className="flex flex-col">
                            <h3 className="font-semibold">{course.title}</h3>
                            <div className="text-sm text-muted-foreground">
                                <span>${course.price}</span>
                                <span className="mx-2">&middot;</span>
                                <Badge variant="outline">{course.category}</Badge>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <MoreVertical className="h-5 w-5" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => handleEdit(course.id)}>
                                    Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    onSelect={() => handleDeleteClick(course)}
                                    className="text-destructive focus:text-destructive focus:bg-destructive/10"
                                >
                                    Delete
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                ))}
            </div>

            <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader className="items-center text-center">
                         <div className="rounded-full bg-destructive/10 p-4 mb-4">
                            <Trash2 className="h-8 w-8 text-destructive" />
                        </div>
                        <DialogTitle className="text-xl font-bold">Delete Course</DialogTitle>
                        <DialogDescription>
                           The course <strong className="text-foreground">{selectedCourse?.title}</strong> will be permanently deleted.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="py-4">
                        <p className="text-sm text-center text-muted-foreground">
                           To confirm, type the course title.
                        </p>
                        <Input
                            id="confirmation"
                            className="mt-2 text-center"
                            value={confirmationInput}
                            onChange={(e) => setConfirmationInput(e.target.value)}
                            autoComplete="off"
                            autoFocus
                        />
                    </div>
                    <DialogFooter className="grid grid-cols-2 gap-x-2">
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button
                            variant="destructive"
                            onClick={confirmDelete}
                            disabled={confirmationInput !== (selectedCourse?.title || '')}
                        >
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};
