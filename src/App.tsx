import { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ProjectFeed } from './components/ProjectFeed';
import { ProjectDetail } from './components/ProjectDetail';
import { UserProfile } from './components/UserProfile';
import { ProjectFeedSkeleton } from './components/Skeleton';
import { ProjectPosts } from './components/ProjectPosts';
import './index.css';

function App() {
  const [currentPage, setCurrentPage] = useState<'feed' | 'detail' | 'profile' | 'posts'>('feed');
  const [isLoading, setIsLoading] = useState(true);
  const [lowDataMode] = useState(false); // Could be toggled by user

  // Simulate loading for demo purposes
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, [currentPage]);

  const renderCurrentPage = () => {
    if (isLoading && lowDataMode) {
      return <ProjectFeedSkeleton />;
    }

    switch (currentPage) {
      case 'feed':
        return <ProjectFeed />;
      case 'detail':
        return <ProjectDetail />;
      case 'profile':
        return <UserProfile />;
      case 'posts':
        return <ProjectPosts />;
      default:
        return <ProjectFeed />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation currentPage={currentPage} onPageChange={setCurrentPage} />
      <main>
        {renderCurrentPage()}
      </main>
    </div>
  );
}

export default App;
