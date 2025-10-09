"use client";
import { useUser } from "@/hooks/use-user";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileUploader } from "@/components/ui/file-uploader";

export const ProfileSettings = () => {
  const { user } = useUser();

  return (
    <div>
      <div className="mb-4">
        <h2 className="text-2xl font-bold font-headline">Profile</h2>
        <p className="text-muted-foreground">Update your personal information.</p>
      </div>
      <div className="space-y-4">
        <FileUploader onFileSelect={() => {}} imageUrl={user.avatar} />
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue={user.name} />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" defaultValue={user.email} readOnly />
        </div>
      </div>
      <div className="mt-4">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
};
