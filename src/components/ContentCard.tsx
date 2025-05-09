
import React from 'react';
import { ContentItem } from '@/contexts/LibraryContext';
import RatingStars from './RatingStars';

interface ContentCardProps {
  item: ContentItem;
  onClick: () => void;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, onClick }) => {
  const { title, image, rating } = item;
  
  // Format date if available
  const formattedDate = item.dateConsumed 
    ? new Date(item.dateConsumed).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      })
    : null;

  return (
    <div 
      className="library-card group cursor-pointer bg-card rounded-lg overflow-hidden border border-border"
      onClick={onClick}
    >
      <div className="relative aspect-[2/3] bg-muted">
        {image ? (
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-muted">
            <span className="text-4xl opacity-50">
              {item.type === 'books' ? '📚' : 
               item.type === 'movies' ? '🎬' :
               item.type === 'tvshows' ? '📺' : '📝'}
            </span>
          </div>
        )}
      </div>
      
      <div className="p-3">
        <h3 className="font-medium text-sm mb-1 line-clamp-1">{title}</h3>
        
        <div className="flex items-center justify-between">
          {rating ? (
            <RatingStars rating={rating} size="sm" />
          ) : (
            <span className="text-xs text-muted-foreground">Not rated</span>
          )}
          
          {formattedDate && (
            <span className="text-xs text-muted-foreground">{formattedDate}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
