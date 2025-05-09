
import React, { createContext, useContext, useEffect, useState } from 'react';

export type ContentType = 'books' | 'movies' | 'tvshows' | 'misc';

export interface ContentItem {
  id: string;
  type: ContentType;
  title: string;
  image?: string;
  genre?: string[];
  summary?: string;
  length?: string;
  rating?: number;
  dateConsumed?: string;
  // Additional fields for specific content types
  author?: string; // for books
  director?: string; // for movies
  seasons?: number; // for TV shows
  mediaType?: string; // for misc
}

interface LibraryContextType {
  items: ContentItem[];
  addItem: (item: Omit<ContentItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateItem: (item: ContentItem) => void;
  getItemsByType: (type: ContentType) => ContentItem[];
  loading: boolean;
}

const LibraryContext = createContext<LibraryContextType | undefined>(undefined);

export const LibraryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);

  // Initialize library from localStorage if available
  useEffect(() => {
    const savedItems = localStorage.getItem('libraryItems');
    if (savedItems) {
      setItems(JSON.parse(savedItems));
    } else {
      // Add some sample items for demonstration
      setItems(getSampleItems());
    }
    setLoading(false);
  }, []);

  // Save items to localStorage when they change
  useEffect(() => {
    if (!loading) {
      localStorage.setItem('libraryItems', JSON.stringify(items));
    }
  }, [items, loading]);

  const addItem = (item: Omit<ContentItem, 'id'>) => {
    const newItem = { ...item, id: Date.now().toString() };
    setItems([...items, newItem as ContentItem]);
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  const updateItem = (updatedItem: ContentItem) => {
    setItems(items.map(item => item.id === updatedItem.id ? updatedItem : item));
  };

  const getItemsByType = (type: ContentType) => {
    return items.filter(item => item.type === type);
  };

  return (
    <LibraryContext.Provider 
      value={{ 
        items, 
        addItem, 
        removeItem, 
        updateItem, 
        getItemsByType,
        loading,
      }}
    >
      {children}
    </LibraryContext.Provider>
  );
};

export const useLibrary = (): LibraryContextType => {
  const context = useContext(LibraryContext);
  if (!context) {
    throw new Error('useLibrary must be used within a LibraryProvider');
  }
  return context;
};

// Sample items for initial demo
function getSampleItems(): ContentItem[] {
  return [
    {
      id: '1',
      type: 'books',
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg',
      genre: ['Classic', 'Fiction'],
      summary: 'A story of wealth, love, and tragedy in the Jazz Age.',
      length: '208 pages',
      rating: 4,
      dateConsumed: '2023-01-15',
    },
    {
      id: '2',
      type: 'movies',
      title: 'Inception',
      director: 'Christopher Nolan',
      image: 'https://m.media-amazon.com/images/I/91Rc8cAmnAL._AC_UF1000,1000_QL80_.jpg',
      genre: ['Sci-Fi', 'Action'],
      summary: 'A thief who enters the dreams of others to steal their secrets.',
      length: '148 minutes',
      rating: 5,
      dateConsumed: '2023-02-10',
    },
    {
      id: '3',
      type: 'tvshows',
      title: 'Breaking Bad',
      image: 'https://m.media-amazon.com/images/M/MV5BYmQ4YWMxYjUtNjZmYi00MDQ1LWFjMjMtNjA5ZDdiYjdiODU5XkEyXkFqcGdeQXVyMTMzNDExODE5._V1_.jpg',
      genre: ['Crime', 'Drama'],
      summary: 'A high school chemistry teacher turned methamphetamine producer.',
      length: '5 seasons',
      seasons: 5,
      rating: 5,
      dateConsumed: '2023-03-05',
    },
    {
      id: '4',
      type: 'misc',
      title: 'Why We Sleep',
      mediaType: 'Article',
      summary: 'Research findings on the importance of good sleep habits.',
      rating: 4,
      dateConsumed: '2023-04-22',
    }
  ];
}
