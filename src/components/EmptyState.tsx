
import React from 'react';
import { ContentType } from '@/contexts/LibraryContext';

interface EmptyStateProps {
  contentType: ContentType;
}

const EmptyState: React.FC<EmptyStateProps> = ({ contentType }) => {
  const contentTypeInfo = {
    books: {
      title: 'No books yet',
      description: 'Add books you\'ve read to your library',
      emoji: '📚'
    },
    movies: {
      title: 'Your movie list is empty',
      description: 'Start adding movies you\'ve watched',
      emoji: '🎬'
    },
    tvshows: {
      title: 'No TV shows yet',
      description: 'Add TV shows you\'ve watched to your collection',
      emoji: '📺'
    },
    misc: {
      title: 'Nothing here yet',
      description: 'Add articles, blog posts, or other content',
      emoji: '📝'
    }
  };

  const info = contentTypeInfo[contentType];

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
      <span className="text-6xl mb-4" role="img" aria-label={contentType}>
        {info.emoji}
      </span>
      <h3 className="text-2xl font-medium mb-2">{info.title}</h3>
      <p className="text-muted-foreground mb-6">{info.description}</p>
      <div className="text-sm text-muted-foreground max-w-md">
        <p>Click the "Add" button in the bottom right to begin building your library</p>
      </div>
    </div>
  );
};

export default EmptyState;
