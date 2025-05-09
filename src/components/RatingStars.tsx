
import React from 'react';
import { Star } from 'lucide-react';

interface RatingStarsProps {
  rating: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  editable?: boolean;
  onChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({ 
  rating, 
  max = 5, 
  size = 'md',
  editable = false,
  onChange
}) => {
  const sizesMap = {
    sm: { star: 'w-4 h-4', container: 'gap-0.5' },
    md: { star: 'w-5 h-5', container: 'gap-1' },
    lg: { star: 'w-6 h-6', container: 'gap-1.5' },
  };

  const handleClick = (index: number) => {
    if (editable && onChange) {
      onChange(index + 1);
    }
  };

  return (
    <div className={`flex ${sizesMap[size].container} items-center`}>
      {[...Array(max)].map((_, index) => (
        <Star
          key={index}
          className={`
            ${sizesMap[size].star}
            ${index < rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300 dark:text-gray-600'}
            ${editable ? 'cursor-pointer hover:scale-110 transition-transform' : ''}
          `}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default RatingStars;
