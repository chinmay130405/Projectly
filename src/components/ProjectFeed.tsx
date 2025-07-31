import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, MessageCircle, Share2, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface Project {
  id: string;
  title: string;
  preview: string;
  phase: 'Ideation' | 'Prototyping' | 'Completed';
  skillsNeeded: string[];
  likes: number;
  comments: number;
  author: string;
  category: string;
}

const mockProjects: Project[] = [
  {
    id: '1',
    title: 'Smart Campus Navigation System',
    preview: 'IoT-based indoor navigation for large university...',
    phase: 'Prototyping',
    skillsNeeded: ['React Native', 'IoT', 'Python'],
    likes: 24,
    comments: 8,
    author: 'Priya Sharma',
    category: 'IT'
  },
  {
    id: '2',
    title: 'Solar Panel Cleaning Robot',
    preview: 'Autonomous robot for maintaining solar panel...',
    phase: 'Ideation',
    skillsNeeded: ['Arduino', 'CAD', 'Mechanical'],
    likes: 31,
    comments: 12,
    author: 'Rahul Gupta',
    category: 'Mechanical'
  },
  {
    id: '3',
    title: 'Voice-Controlled Home Automation',
    preview: 'Hindi voice commands for smart home control...',
    phase: 'Completed',
    skillsNeeded: ['Python', 'ML', 'Electronics'],
    likes: 45,
    comments: 18,
    author: 'Ananya Singh',
    category: 'Electronics'
  }
];

const categories = ['All', 'Electronics', 'Mechanical', 'IT', 'Civil', 'Chemical'];

export function ProjectFeed() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredProjects, setFilteredProjects] = useState(mockProjects);
  const [language, setLanguage] = useState<'en' | 'hi'>('en');

  const handleCategoryFilter = (category: string) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredProjects(mockProjects);
    } else {
      setFilteredProjects(mockProjects.filter(p => p.category === category));
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case 'Ideation': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      case 'Prototyping': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'Completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const translations = {
    en: {
      projectFeed: 'Project Feed',
      filters: 'Filters',
      likes: 'likes',
      comments: 'comments',
      skillsNeeded: 'Skills Needed'
    },
    hi: {
      projectFeed: 'प्रोजेक्ट फीड',
      filters: 'फिल्टर',
      likes: 'लाइक',
      comments: 'टिप्पणियां',
      skillsNeeded: 'आवश्यक कौशल'
    }
  };

  const t = translations[language];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-primary">Projectly</h1>
          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
            >
              {language === 'en' ? 'हिं' : 'EN'}
            </Button>
            <div className="w-3 h-3 bg-green-500 rounded-full relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping"></div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex gap-6">
        {/* Left Sidebar - Filters */}
        <aside className="w-64 hidden md:block">
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Filter className="w-4 h-4" />
                {t.filters}
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "ghost"}
                    className="w-full justify-start"
                    onClick={() => handleCategoryFilter(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <div className="space-y-6">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="hover:shadow-lg transition-shadow duration-200">
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                        <p className="text-muted-foreground mb-3">{project.preview}</p>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={getPhaseColor(project.phase)}>
                            {project.phase}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-sm font-medium mb-2">{t.skillsNeeded}:</p>
                        <div className="flex flex-wrap gap-2">
                          {project.skillsNeeded.map((skill) => (
                            <Badge key={skill} variant="secondary">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-4 border-t">
                        <div className="flex items-center gap-4">
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <Heart className="w-4 h-4" />
                            {project.likes} {t.likes}
                          </Button>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2">
                            <MessageCircle className="w-4 h-4" />
                            {project.comments} {t.comments}
                          </Button>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm">
                            <Share2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
