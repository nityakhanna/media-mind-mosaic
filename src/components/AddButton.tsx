
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useTheme } from '@/contexts/ThemeContext';
import { ContentType } from '@/contexts/LibraryContext';

interface AddButtonProps {
  contentType: ContentType;
  onClick: () => void;
}

const AddButton: React.FC<AddButtonProps> = ({ contentType, onClick }) => {
  const { colorScheme } = useTheme();
  
  const contentTypeLabels: Record<ContentType, string> = {
    books: 'Book',
    movies: 'Movie',
    tvshows: 'TV Show',
    misc: 'Item'
  };

  return (
    <Button
      className={`
        fixed bottom-6 right-6 rounded-full h-14 shadow-lg
        gap-2 px-5 bg-theme-${colorScheme}-primary hover:bg-theme-${colorScheme}-accent
        transition-all duration-300 ease-in-out transform hover:scale-105
      `}
      size="lg"
      onClick={onClick}
    >
      <Plus className="h-5 w-5" />
      <span>Add {contentTypeLabels[contentType]}</span>
    </Button>
  );
};

export default AddButton;
