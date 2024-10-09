"use client";

import { useState, useEffect } from "react";
import { Folder, Resource } from "@/lib/types";
import FolderList from "./FolderList";
import ResourceList from "./ResourceList";
import AddFolderForm from "./AddFolderForm";
import AddResourceModal from "./AddResourceModal";
import SearchBar from "./SearchBar";
import { useToast } from "@/components/ui/use-toast";

export default function Dashboard() {
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [folders, setFolders] = useState<Folder[]>([]);
  const [resources, setResources] = useState<Resource[]>([]);
  const { toast } = useToast();

  const getFolders = (): Folder[] => folders;

  const getResources = (): Resource[] => resources;

  const addFolder = (newFolder: Folder) => {
    const updatedFolders = [...folders, newFolder];
    setFolders(updatedFolders);
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    toast({
      title: "Folder added",
      description: "The new folder has been successfully added.",
    });
  };

  const addResource = (newResource: Resource) => {
    const updatedResources = [...resources, newResource];
    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    toast({
      title: "Resource added",
      description: "The new resource has been successfully added.",
    });
  };

  const deleteResource = (resourceId: string) => {
    const updatedResources = resources.filter(
      (resource) => resource.id !== resourceId
    );
    setResources(updatedResources);
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    toast({
      title: "Resource deleted",
      description: "The resource has been successfully deleted.",
    });
  };

  const deleteFolder = (folderId: string) => {
    const updatedFolders = folders.filter((folder) => folder.id !== folderId);
    const updatedResources = resources.filter(
      (resource) => resource.folderId !== folderId
    );
    setFolders(updatedFolders);
    setResources(updatedResources);
    localStorage.setItem("folders", JSON.stringify(updatedFolders));
    localStorage.setItem("resources", JSON.stringify(updatedResources));
    if (selectedFolder === folderId) {
      setSelectedFolder(null);
    }
    toast({
      title: "Folder deleted",
      description:
        "The folder and all its resources have been successfully deleted.",
    });
  };

  const filteredResources = getResources().filter(
    (resource) =>
      (selectedFolder ? resource.folderId === selectedFolder : true) &&
      (searchTerm
        ? resource.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          resource.tags.some((tag) =>
            tag.toLowerCase().includes(searchTerm.toLowerCase())
          )
        : true)
  );

  useEffect(() => {
    const storedFolders = localStorage.getItem("folders");
    const storedResources = localStorage.getItem("resources");
    setFolders(storedFolders ? JSON.parse(storedFolders) : []);
    setResources(storedResources ? JSON.parse(storedResources) : []);
  }, []);

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className="w-full md:w-1/4">
        <AddFolderForm onAddFolder={addFolder} />
        <FolderList
          folders={getFolders()}
          selectedFolder={selectedFolder}
          onSelectFolder={setSelectedFolder}
          onDeleteFolder={deleteFolder}
        />
      </div>
      <div className="w-full md:w-3/4">
        <div className="flex justify-between items-center mb-4">
          <SearchBar onSearch={setSearchTerm} />
          <AddResourceModal
            folders={getFolders()}
            onAddResource={addResource}
          />
        </div>
        <ResourceList
          resources={filteredResources}
          onDeleteResource={deleteResource}
        />
      </div>
    </div>
  );
}
