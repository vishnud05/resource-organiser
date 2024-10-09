export interface Folder {
  id: string;
  name: string;
}

export interface Resource {
  id: string;
  title: string;
  type: 'link' | 'file';
  url: string;
  filePath: string;
  folderId: string;
  tags: string[];
  note?: string;
}