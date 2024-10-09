"use client"

import { useState } from 'react';
import { Folder } from '@/lib/types';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useToast } from '@/components/ui/use-toast';

interface AddFolderFormProps {
  onAddFolder: (folder: Folder) => void;
}

export default function AddFolderForm({ onAddFolder }: AddFolderFormProps) {
  const [folderName, setFolderName] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (folderName.trim()) {
      const newFolder: Folder = {
        id: Date.now().toString(),
        name: folderName.trim(),
      };
      onAddFolder(newFolder);
      setFolderName('');
      toast({
        title: "Folder added",
        description: `${folderName} has been created successfully.`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-2 mb-4">
      <Input
        type="text"
        value={folderName}
        onChange={(e) => setFolderName(e.target.value)}
        placeholder="New folder name"
      />
      <Button type="submit" className="w-full">Add Folder</Button>
    </form>
  );
}