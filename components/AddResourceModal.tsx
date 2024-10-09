"use client"

import { useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import AddResourceForm from './AddResourceForm';
import { Folder, Resource } from '@/lib/types';

interface AddResourceModalProps {
  folders: Folder[];
  onAddResource: (resource: Resource) => void;
}

export default function AddResourceModal({ folders, onAddResource }: AddResourceModalProps) {
  const [open, setOpen] = useState(false);

  const handleAddResource = (resource: Resource) => {
    onAddResource(resource);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Add Resource</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
        </DialogHeader>
        <AddResourceForm folders={folders} onAddResource={handleAddResource} />
      </DialogContent>
    </Dialog>
  );
}