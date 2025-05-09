
import React from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ContentItem } from '@/contexts/LibraryContext';
import RatingStars from './RatingStars';
import { Edit, Trash } from 'lucide-react';

interface ContentDetailModalProps {
  item: ContentItem | null;
  open: boolean;
  onClose: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

const ContentDetailModal: React.FC<ContentDetailModalProps> = ({ 
  item, 
  open, 
  onClose,
  onEdit,
  onDelete
}) => {
  if (!item) return null;

  // Format date if available
  const formattedDate = item.dateConsumed 
    ? new Date(item.dateConsumed).toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : 'No date recorded';

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl">{item.title}</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
          <div className="aspect-[2/3] bg-muted rounded-md overflow-hidden">
            {item.image ? (
              <img 
                src={item.image} 
                alt={item.title}
                className="w-full h-full object-cover" 
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <span className="text-5xl opacity-50">
                  {item.type === 'books' ? '📚' : 
                  item.type === 'movies' ? '🎬' :
                  item.type === 'tvshows' ? '📺' : '📝'}
                </span>
              </div>
            )}
          </div>
          
          <div className="md:col-span-2 space-y-4">
            <div>
              <h3 className="font-medium text-muted-foreground">Rating</h3>
              <div className="flex items-center gap-2 mt-1">
                <RatingStars rating={item.rating || 0} size="md" />
                {item.rating && <span className="text-lg font-medium">{item.rating}/5</span>}
              </div>
            </div>
            
            <div>
              <h3 className="font-medium text-muted-foreground">Consumed on</h3>
              <p>{formattedDate}</p>
            </div>
            
            {item.genre && item.genre.length > 0 && (
              <div>
                <h3 className="font-medium text-muted-foreground">Genre</h3>
                <div className="flex flex-wrap gap-1 mt-1">
                  {item.genre.map((g) => (
                    <span key={g} className="px-2 py-0.5 bg-secondary text-secondary-foreground rounded-full text-xs">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            )}
            
            {item.author && (
              <div>
                <h3 className="font-medium text-muted-foreground">Author</h3>
                <p>{item.author}</p>
              </div>
            )}
            
            {item.director && (
              <div>
                <h3 className="font-medium text-muted-foreground">Director</h3>
                <p>{item.director}</p>
              </div>
            )}
            
            {item.length && (
              <div>
                <h3 className="font-medium text-muted-foreground">Length</h3>
                <p>{item.length}</p>
              </div>
            )}
            
            {item.mediaType && (
              <div>
                <h3 className="font-medium text-muted-foreground">Media Type</h3>
                <p>{item.mediaType}</p>
              </div>
            )}
            
            {item.summary && (
              <div>
                <h3 className="font-medium text-muted-foreground">Summary</h3>
                <p className="text-sm">{item.summary}</p>
              </div>
            )}
          </div>
        </div>
        
        <DialogFooter className="flex gap-2 sm:justify-between">
          <Button 
            variant="destructive" 
            size="sm"
            onClick={onDelete}
          >
            <Trash size={16} className="mr-1" />
            Delete
          </Button>
          
          <Button 
            onClick={onEdit}
          >
            <Edit size={16} className="mr-1" />
            Edit
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ContentDetailModal;
