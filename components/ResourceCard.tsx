"use client";
import { Resource } from "@/lib/types";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
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
} from "@/components/ui/alert-dialog";

interface ResourceCardProps {
  resource: Resource;
  onDelete: (id: string) => void;
}

export default function ResourceCard({
  resource,
  onDelete,
}: ResourceCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = () => {
    setIsDeleting(true);
    onDelete(resource.id);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>{resource.title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="text-sm text-muted-foreground mb-2 ">{resource.type}</p>
        {resource.type === "link" && (
          <Link
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500 hover:underline"
          >
            {resource.url}
          </Link>
        )}
        {resource.type === "file" && (
          <Button
            onClick={(e) => {
              console.log("Opening file:", resource.filePath);

              // Create a Blob with the file content (you'll need to fetch this)
              fetch(resource.filePath)
                .then((response) => response.blob())
                .then((blob) => {
                  // Create a temporary URL for the Blob
                  const url = window.URL.createObjectURL(blob);

                  // Create a temporary anchor element
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = resource.filePath.split("/").pop() || "download";

                  // Append to the document, click, and remove
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);

                  // Release the temporary URL
                  window.URL.revokeObjectURL(url);
                })
                .catch((error) => console.error("Error opening file:", error));
            }}
            className="text-blue-500 hover:bg-slate-900 bg-slate-800 w-full p-2 rounded-lg text-center"
          >
            Download File
          </Button>
        )}
        <div className="flex flex-wrap gap-2 mt-2">
          {resource.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        {resource.note && (
          <p className="mt-2 text-sm text-muted-foreground">{resource.note}</p>
        )}
      </CardContent>
      <CardFooter>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" size="sm" disabled={isDeleting}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the
                resource.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleDelete}>
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
}
