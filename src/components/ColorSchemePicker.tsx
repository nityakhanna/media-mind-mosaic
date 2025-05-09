
import React from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Check } from 'lucide-react';

const ColorSchemePicker: React.FC = () => {
  const { colorScheme, setColorScheme } = useTheme();
  
  const schemes = [
    { id: 'muted', name: 'Muted', color: 'bg-theme-muted-primary' },
    { id: 'pastel', name: 'Pastel', color: 'bg-theme-pastel-primary' },
    { id: 'vibrant', name: 'Vibrant', color: 'bg-theme-vibrant-primary' },
    { id: 'noir', name: 'Noir', color: 'bg-theme-noir-primary' }
  ];
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          className={`rounded-full flex items-center gap-2 border-2 border-${colorScheme}`}
        >
          <div className={`w-4 h-4 rounded-full ${schemes.find(s => s.id === colorScheme)?.color}`} />
          <span className="capitalize">{colorScheme}</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="grid gap-2">
          <h4 className="text-sm font-medium">Color Scheme</h4>
          <div className="grid grid-cols-1 gap-2">
            {schemes.map((scheme) => (
              <Button 
                key={scheme.id}
                variant="outline"
                className={`flex items-center justify-between ${colorScheme === scheme.id ? 'border-primary' : 'border-border'}`}
                onClick={() => setColorScheme(scheme.id as any)}
              >
                <div className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded-full ${scheme.color}`} />
                  <span>{scheme.name}</span>
                </div>
                {colorScheme === scheme.id && <Check size={16} />}
              </Button>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default ColorSchemePicker;
