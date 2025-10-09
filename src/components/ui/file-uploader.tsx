'use client';
import { ChangeEvent, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export const FileUploader = ({ onFileSelect, imageUrl }: { onFileSelect: (file: File) => void; imageUrl?: string }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
      onFileSelect(event.target.files[0]);
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <Avatar className="h-20 w-20">
        <AvatarImage src={selectedFile ? URL.createObjectURL(selectedFile) : imageUrl} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Input type="file" onChange={handleFileChange} className="hidden" id="file-upload" />
      <Button asChild variant="outline">
        <label htmlFor="file-upload">Change Picture</label>
      </Button>
    </div>
  );
};
