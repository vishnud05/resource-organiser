import React from 'react';
import { Folder } from '@/lib/types';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

interface FolderListProps {
  folders: Folder[];
  selectedFolder: string | null;
  onSelectFolder: (folderId: string | null) => void;
  onDeleteFolder: (folderId: string) => void;
}

export default function FolderList({
  folders,
  selectedFolder,
  onSelectFolder,
  onDeleteFolder,
}: FolderListProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold mb-2">Folders</h2>
      <Button
        variant={selectedFolder === null ? "secondary" : "ghost"}
        className="w-full justify-start"
        onClick={() => onSelectFolder(null)}
      >
        All Resources
      </Button>
      {folders.map((folder) => (
        <div key={folder.id} className="flex items-center space-x-2">
          <Button
            variant={selectedFolder === folder.id ? "secondary" : "ghost"}
            className="w-full justify-start"
            onClick={() => onSelectFolder(folder.id)}
          >
            {folder.name}
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash2 className="h-4 w-4" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete the folder and all resources within it.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDeleteFolder(folder.id)}>Delete</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ))}
    </div>
  );
}