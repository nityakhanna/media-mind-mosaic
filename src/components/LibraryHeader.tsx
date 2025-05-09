
import React from 'react';
import ThemeSwitcher from './ThemeSwitcher';
import ColorSchemePicker from './ColorSchemePicker';
import { useTheme } from '@/contexts/ThemeContext';

interface LibraryHeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const LibraryHeader: React.FC<LibraryHeaderProps> = ({ activeTab, setActiveTab }) => {
  const { colorScheme } = useTheme();
  
  const tabs = [
    { id: 'books', name: 'Books', emoji: '📚' },
    { id: 'movies', name: 'Movies', emoji: '🎬' },
    { id: 'tvshows', name: 'TV Shows', emoji: '📺' },
    { id: 'misc', name: 'Miscellaneous', emoji: '📝' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-10 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container flex flex-col gap-2 py-4">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">
            <span>My Content Library</span>
            <span className="ml-2 text-sm bg-secondary text-secondary-foreground px-2 py-1 rounded-md">
              AI-Enhanced
            </span>
          </h1>
          
          <div className="flex items-center gap-2">
            <ColorSchemePicker />
            <ThemeSwitcher />
          </div>
        </div>
        
        <nav className="flex overflow-x-auto">
          <div className="flex items-center space-x-1">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  className={`
                    px-4 py-2 rounded-md transition-colors font-medium
                    flex items-center gap-1
                    ${isActive ? 
                      `bg-theme-${colorScheme}-primary text-white` : 
                      'hover:bg-muted'
                    }
                  `}
                  onClick={() => setActiveTab(tab.id)}
                >
                  <span>{tab.emoji}</span> 
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default LibraryHeader;
