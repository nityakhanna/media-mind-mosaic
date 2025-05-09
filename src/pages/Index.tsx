
import React, { useState } from 'react';
import { LibraryProvider, useLibrary, ContentItem, ContentType } from '@/contexts/LibraryContext';
import { ThemeProvider, useTheme } from '@/contexts/ThemeContext';
import LibraryHeader from '@/components/LibraryHeader';
import AddButton from '@/components/AddButton';
import ContentGrid from '@/components/ContentGrid';
import ContentDetailModal from '@/components/ContentDetailModal';
import AddEditItemModal from '@/components/AddEditItemModal';
import SortFilterBar from '@/components/SortFilterBar';
import { useToast } from "@/hooks/use-toast";

const LibraryContent = () => {
  const { items, addItem, removeItem, updateItem, getItemsByType } = useLibrary();
  const { toast } = useToast();
  const { colorScheme } = useTheme();

  // State
  const [activeTab, setActiveTab] = useState<ContentType>('books');
  const [sortBy, setSortBy] = useState('dateDesc');
  const [selectedItem, setSelectedItem] = useState<ContentItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isAddEditModalOpen, setIsAddEditModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ContentItem | null>(null);

  // Get items for the current tab
  const currentItems = getItemsByType(activeTab);

  // Sort items
  const sortedItems = [...currentItems].sort((a, b) => {
    switch (sortBy) {
      case 'dateDesc':
        return (b.dateConsumed || '').localeCompare(a.dateConsumed || '');
      case 'dateAsc':
        return (a.dateConsumed || '').localeCompare(b.dateConsumed || '');
      case 'titleAsc':
        return a.title.localeCompare(b.title);
      case 'titleDesc':
        return b.title.localeCompare(a.title);
      case 'ratingDesc':
        return (b.rating || 0) - (a.rating || 0);
      case 'ratingAsc':
        return (a.rating || 0) - (b.rating || 0);
      default:
        return 0;
    }
  });

  // Handlers
  const handleItemClick = (item: ContentItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleAddClick = () => {
    setEditingItem(null);
    setIsAddEditModalOpen(true);
  };

  const handleEditClick = () => {
    setEditingItem(selectedItem);
    setIsDetailModalOpen(false);
    setIsAddEditModalOpen(true);
  };

  const handleDeleteClick = () => {
    if (selectedItem) {
      removeItem(selectedItem.id);
      setIsDetailModalOpen(false);
      toast({
        title: "Item deleted",
        description: `${selectedItem.title} has been removed from your library.`,
      });
    }
  };

  const handleSaveItem = (item: Omit<ContentItem, 'id'>) => {
    if (editingItem) {
      updateItem({ ...item, id: editingItem.id } as ContentItem);
      toast({
        title: "Item updated",
        description: `${item.title} has been updated in your library.`,
      });
    } else {
      addItem(item);
      toast({
        title: "Item added",
        description: `${item.title} has been added to your library.`,
        variant: "default",
      });
    }
  };

  return (
    <div className="min-h-screen">
      <LibraryHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <main className="container pt-32 pb-20">
        <SortFilterBar 
          contentType={activeTab} 
          sortBy={sortBy}
          setSortBy={setSortBy}
        />
        
        <ContentGrid 
          items={sortedItems} 
          contentType={activeTab}
          onItemClick={handleItemClick} 
        />
      </main>
      
      <AddButton contentType={activeTab} onClick={handleAddClick} />
      
      <ContentDetailModal
        item={selectedItem}
        open={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        onEdit={handleEditClick}
        onDelete={handleDeleteClick}
      />
      
      <AddEditItemModal
        open={isAddEditModalOpen}
        onClose={() => setIsAddEditModalOpen(false)}
        onSave={handleSaveItem}
        contentType={activeTab}
        editItem={editingItem}
      />
    </div>
  );
};

const Index = () => {
  return (
    <ThemeProvider>
      <LibraryProvider>
        <LibraryContent />
      </LibraryProvider>
    </ThemeProvider>
  );
};

export default Index;
