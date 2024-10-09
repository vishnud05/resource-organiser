"use client"

import { useState } from 'react';
import { Folder, Resource } from '@/lib/types';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { useToast } from '@/components/ui/use-toast';

interface AddResourceFormProps {
  folders: Folder[];
  onAddResource: (resource: Resource) => void;
}

export default function AddResourceForm({ folders, onAddResource }: AddResourceFormProps) {
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'link' | 'file'>('link');
  const [url, setUrl] = useState('');
  const [filePath, setFilePath] = useState('');
  const [folderId, setFolderId] = useState('');
  const [tags, setTags] = useState('');
  const [note, setNote] = useState('');
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title && (type === 'link' ? url : filePath) && folderId) {
      const newResource: Resource = {
        id: Date.now().toString(),
        title,
        type,
        url: type === 'link' ? url : '',
        filePath: type === 'file' ? filePath : '',
        folderId,
        tags: tags.split(',').map((tag) => tag.trim()),
        note,
      };
      onAddResource(newResource);
      resetForm();
      toast({
        title: "Resource added",
        description: `${title} has been added successfully.`,
      });
    }
  };

  const resetForm = () => {
    setTitle('');
    setType('link');
    setUrl('');
    setFilePath('');
    setFolderId('');
    setTags('');
    setNote('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 mb-6">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Resource title"
        required
      />
      <Select value={type} onValueChange={(value: 'link' | 'file') => setType(value)}>
        <SelectTrigger>
          <SelectValue placeholder="Select resource type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="link">Link</SelectItem>
          <SelectItem value="file">File</SelectItem>
        </SelectContent>
      </Select>
      {type === 'link' ? (
        <Input
          type="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Resource URL"
          required
        />
      ) : (
        <Input
          type="text"
          value={filePath}
          onChange={(e) => setFilePath(e.target.value)}
          placeholder="File path"
          required
        />
      )}
      <Select value={folderId} onValueChange={setFolderId}>
        <SelectTrigger>
          <SelectValue placeholder="Select folder" />
        </SelectTrigger>
        <SelectContent>
          {folders.map((folder) => (
            <SelectItem key={folder.id} value={folder.id}>
              {folder.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        type="text"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="Tags (comma-separated)"
      />
      <Textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Add a note (optional)"
      />
      <Button type="submit" className="w-full">Add Resource</Button>
    </form>
  );
}