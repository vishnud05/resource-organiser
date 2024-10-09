import { Resource } from '@/lib/types';
import ResourceCard from './ResourceCard';

interface ResourceListProps {
  resources: Resource[];
  onDeleteResource: (id: string) => void;
}

export default function ResourceList({ resources, onDeleteResource }: ResourceListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {resources.map((resource) => (
        <ResourceCard key={resource.id} resource={resource} onDelete={onDeleteResource} />
      ))}
    </div>
  );
}