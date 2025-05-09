
import React from 'react';
import { ContentItem, ContentType } from '@/contexts/LibraryContext';
import ContentCard from './ContentCard';
import EmptyState from './EmptyState';

interface ContentGridProps {
  items: ContentItem[];
  contentType: ContentType;
  onItemClick: (item: ContentItem) => void;
}

const ContentGrid: React.FC<ContentGridProps> = ({ 
  items, 
  contentType,
  onItemClick 
}) => {
  if (items.length === 0) {
    return <EmptyState contentType={contentType} />;
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
      {items.map((item) => (
        <ContentCard 
          key={item.id} 
          item={item} 
          onClick={() => onItemClick(item)} 
        />
      ))}
    </div>
  );
};

export default ContentGrid;
