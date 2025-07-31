import { useState } from 'react';
import { Home, User, FileText, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DarkModeToggle } from './DarkModeToggle';

interface NavigationProps {
  currentPage: 'feed' | 'detail' | 'profile' | 'posts';
  onPageChange: (page: 'feed' | 'detail' | 'profile' | 'posts') => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'feed' as const, label: 'Project Feed', icon: Home },
    { id: 'detail' as const, label: 'Project Detail', icon: FileText },
    { id: 'posts' as const, label: 'Project Posts', icon: FileText },
    { id: 'profile' as const, label: 'Profile', icon: User },
  ];

  return (
    <>
      {/* Mobile Navigation */}
      <nav className="md:hidden border-b bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl font-bold text-primary">Projectly</h1>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
        
        {mobileMenuOpen && (
          <div className="border-t bg-white dark:bg-gray-900 py-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  className="w-full justify-start"
                  onClick={() => {
                    onPageChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </Button>
              );
            })}
          </div>
        )}
      </nav>

      {/* Desktop Navigation */}
      <nav className="hidden md:block border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Projectly</h1>
          
          <div className="flex items-center gap-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Button
                  key={item.id}
                  variant={currentPage === item.id ? "secondary" : "ghost"}
                  onClick={() => onPageChange(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Button>
              );
            })}
            
            <DarkModeToggle />
            
            {/* WhatsApp-style notification indicator */}
            <div className="relative">
              <div className="w-3 h-3 bg-green-500 rounded-full">
                <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
