
import React, { useState, useEffect } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter,
  DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import RatingStars from './RatingStars';
import { ContentItem, ContentType } from '@/contexts/LibraryContext';
import { Search } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

interface AddEditItemModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (item: Omit<ContentItem, 'id'>) => void;
  contentType: ContentType;
  editItem?: ContentItem | null;
}

const AddEditItemModal: React.FC<AddEditItemModalProps> = ({ 
  open, 
  onClose, 
  onSave,
  contentType,
  editItem
}) => {
  const { colorScheme } = useTheme();
  const isEditMode = !!editItem;
  
  // Form state
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [summary, setSummary] = useState('');
  const [genre, setGenre] = useState<string[]>([]);
  const [genreInput, setGenreInput] = useState('');
  const [length, setLength] = useState('');
  const [rating, setRating] = useState<number>(0);
  const [dateConsumed, setDateConsumed] = useState('');
  const [author, setAuthor] = useState('');
  const [director, setDirector] = useState('');
  const [seasons, setSeasons] = useState<number | undefined>(undefined);
  const [mediaType, setMediaType] = useState('');
  
  const [isLoading, setIsLoading] = useState(false);
  const [aiResult, setAiResult] = useState<any | null>(null);

  // Reset form when modal opens
  useEffect(() => {
    if (open) {
      if (editItem) {
        // In edit mode, populate form with item data
        setTitle(editItem.title || '');
        setImage(editItem.image || '');
        setSummary(editItem.summary || '');
        setGenre(editItem.genre || []);
        setLength(editItem.length || '');
        setRating(editItem.rating || 0);
        setDateConsumed(editItem.dateConsumed || '');
        setAuthor(editItem.author || '');
        setDirector(editItem.director || '');
        setSeasons(editItem.seasons);
        setMediaType(editItem.mediaType || '');
      } else {
        // In add mode, reset form
        resetForm();
      }
    }
  }, [open, editItem]);

  const resetForm = () => {
    setTitle('');
    setImage('');
    setSummary('');
    setGenre([]);
    setGenreInput('');
    setLength('');
    setRating(0);
    setDateConsumed('');
    setAuthor('');
    setDirector('');
    setSeasons(undefined);
    setMediaType('');
    setAiResult(null);
  };

  const addGenre = () => {
    if (genreInput.trim() && !genre.includes(genreInput.trim())) {
      setGenre([...genre, genreInput.trim()]);
      setGenreInput('');
    }
  };

  const removeGenre = (index: number) => {
    setGenre(genre.filter((_, i) => i !== index));
  };

  const simulateAIFetch = async () => {
    if (!title.trim()) return;
    
    setIsLoading(true);
    
    // Simulate API latency
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Simulate AI results based on content type
    let mockResult;
    
    if (contentType === 'books') {
      mockResult = {
        title: title, // Keep user's title
        image: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.0.3',
        author: 'Sample Author',
        genre: ['Fiction', 'Fantasy'],
        summary: 'This is an AI-generated summary for the book. It would typically include a brief overview of the plot, main characters, and themes.',
        length: '320 pages',
      };
    } else if (contentType === 'movies') {
      mockResult = {
        title: title,
        image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=1459&auto=format&fit=crop&ixlib=rb-4.0.3',
        director: 'Sample Director',
        genre: ['Drama', 'Thriller'],
        summary: 'An AI-generated summary of the movie plot. This would typically describe the main storyline, key characters, and setting.',
        length: '124 minutes',
      };
    } else if (contentType === 'tvshows') {
      mockResult = {
        title: title,
        image: 'https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3',
        genre: ['Comedy', 'Drama'],
        summary: 'An AI-generated summary of the TV show. This would cover the premise, main characters, and notable aspects of the series.',
        length: '3 seasons',
        seasons: 3,
      };
    }
    
    setAiResult(mockResult);
    
    if (mockResult) {
      // Auto-fill form with AI results
      setImage(mockResult.image || '');
      setSummary(mockResult.summary || '');
      setGenre(mockResult.genre || []);
      setLength(mockResult.length || '');
      if (mockResult.author) setAuthor(mockResult.author);
      if (mockResult.director) setDirector(mockResult.director);
      if (mockResult.seasons) setSeasons(mockResult.seasons);
    }
    
    setIsLoading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const item: Omit<ContentItem, 'id'> = {
      type: contentType,
      title,
      image,
      genre: genre.length > 0 ? genre : undefined,
      summary,
      length,
      rating: rating > 0 ? rating : undefined,
      dateConsumed: dateConsumed || undefined
    };
    
    // Add type-specific fields
    if (contentType === 'books' && author) {
      item.author = author;
    } else if (contentType === 'movies' && director) {
      item.director = director;
    } else if (contentType === 'tvshows' && seasons) {
      item.seasons = seasons;
    } else if (contentType === 'misc' && mediaType) {
      item.mediaType = mediaType;
    }
    
    onSave(item);
    onClose();
  };

  const contentTypeLabels = {
    books: 'Book',
    movies: 'Movie',
    tvshows: 'TV Show',
    misc: 'Item'
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? `Edit ${contentTypeLabels[contentType]}` : `Add New ${contentTypeLabels[contentType]}`}
          </DialogTitle>
          <DialogDescription>
            {contentType !== 'misc' ? 
              'Enter a title and use AI to fetch metadata, or fill in the details manually.' : 
              'Fill in the details for your miscellaneous content.'}
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title and AI Fetch */}
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <div className="flex gap-2">
              <Input
                id="title"
                placeholder={`Enter ${contentTypeLabels[contentType].toLowerCase()} title`}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="flex-1"
              />
              
              {contentType !== 'misc' && (
                <Button 
                  type="button"
                  variant="outline"
                  onClick={simulateAIFetch}
                  disabled={isLoading || !title.trim()}
                  className={`
                    whitespace-nowrap bg-theme-${colorScheme}-primary text-white
                    hover:bg-theme-${colorScheme}-accent hover:text-white
                  `}
                >
                  <Search className="mr-1 h-4 w-4" />
                  {isLoading ? 'Fetching...' : 'AI Fetch'}
                </Button>
              )}
            </div>
          </div>
          
          {/* Type-specific fields */}
          {contentType === 'books' && (
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                placeholder="Author name"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
          )}
          
          {contentType === 'movies' && (
            <div className="space-y-2">
              <Label htmlFor="director">Director</Label>
              <Input
                id="director"
                placeholder="Director name"
                value={director}
                onChange={(e) => setDirector(e.target.value)}
              />
            </div>
          )}
          
          {contentType === 'tvshows' && (
            <div className="space-y-2">
              <Label htmlFor="seasons">Seasons</Label>
              <Input
                id="seasons"
                type="number"
                min="1"
                placeholder="Number of seasons"
                value={seasons || ''}
                onChange={(e) => setSeasons(Number(e.target.value) || undefined)}
              />
            </div>
          )}
          
          {contentType === 'misc' && (
            <div className="space-y-2">
              <Label htmlFor="mediaType">Media Type</Label>
              <Select
                value={mediaType}
                onValueChange={setMediaType}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Article">Article</SelectItem>
                  <SelectItem value="Blog Post">Blog Post</SelectItem>
                  <SelectItem value="Video">Video</SelectItem>
                  <SelectItem value="Podcast">Podcast</SelectItem>
                  <SelectItem value="Social Media Post">Social Media Post</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          {/* Image URL */}
          <div className="space-y-2">
            <Label htmlFor="image">Image URL</Label>
            <Input
              id="image"
              placeholder="https://..."
              value={image}
              onChange={(e) => setImage(e.target.value)}
            />
          </div>
          
          {/* Genre */}
          <div className="space-y-2">
            <Label htmlFor="genre">Genres</Label>
            <div className="flex gap-2">
              <Input
                id="genre"
                placeholder="Add a genre"
                value={genreInput}
                onChange={(e) => setGenreInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addGenre())}
              />
              <Button type="button" onClick={addGenre} variant="outline">Add</Button>
            </div>
            
            {genre.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {genre.map((g, i) => (
                  <span 
                    key={i} 
                    className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs flex items-center"
                  >
                    {g}
                    <button 
                      type="button" 
                      className="ml-1 text-secondary-foreground/70 hover:text-destructive"
                      onClick={() => removeGenre(i)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
          
          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary">Summary</Label>
            <Textarea
              id="summary"
              placeholder="Brief description..."
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={3}
            />
          </div>
          
          {/* Length */}
          <div className="space-y-2">
            <Label htmlFor="length">Length</Label>
            <Input
              id="length"
              placeholder={
                contentType === 'books' ? "e.g. 320 pages" : 
                contentType === 'movies' ? "e.g. 124 minutes" :
                contentType === 'tvshows' ? "e.g. 3 seasons" : "e.g. 10 minutes read"
              }
              value={length}
              onChange={(e) => setLength(e.target.value)}
            />
          </div>
          
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rating</Label>
            <div>
              <RatingStars 
                rating={rating} 
                editable={true} 
                onChange={setRating} 
                size="lg"
              />
            </div>
          </div>
          
          {/* Date Consumed */}
          <div className="space-y-2">
            <Label htmlFor="dateConsumed">Date Consumed</Label>
            <Input
              id="dateConsumed"
              type="date"
              value={dateConsumed}
              onChange={(e) => setDateConsumed(e.target.value)}
            />
          </div>
          
          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {isEditMode ? 'Update' : 'Add'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddEditItemModal;
