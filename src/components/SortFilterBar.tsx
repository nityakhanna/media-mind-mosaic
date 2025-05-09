
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ContentType } from '@/contexts/LibraryContext';

interface SortFilterBarProps {
  contentType: ContentType;
  sortBy: string;
  setSortBy: (value: string) => void;
}

const SortFilterBar: React.FC<SortFilterBarProps> = ({ 
  contentType, 
  sortBy,
  setSortBy
}) => {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 py-2 mb-4">
      <div className="text-lg font-medium capitalize">
        {contentType === 'tvshows' ? 'TV Shows' : contentType}
      </div>
      
      <div className="flex items-center gap-2">
        <Select
          value={sortBy}
          onValueChange={setSortBy}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by..." />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="dateDesc">Date (Newest)</SelectItem>
            <SelectItem value="dateAsc">Date (Oldest)</SelectItem>
            <SelectItem value="titleAsc">Title (A-Z)</SelectItem>
            <SelectItem value="titleDesc">Title (Z-A)</SelectItem>
            <SelectItem value="ratingDesc">Rating (High-Low)</SelectItem>
            <SelectItem value="ratingAsc">Rating (Low-High)</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SortFilterBar;
