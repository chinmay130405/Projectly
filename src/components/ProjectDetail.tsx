import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Users, MessageCircle, ThumbsUp, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface ProjectPhase {
  id: string;
  name: string;
  status: 'completed' | 'current' | 'upcoming';
  description: string;
  date?: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  type: 'general' | 'resource' | 'risk' | 'alternative';
  upvotes: number;
  timestamp: string;
}

const mockProject = {
  id: '1',
  title: 'Smart Campus Navigation System',
  description: 'An IoT-based indoor navigation system designed to help students and visitors navigate large university campuses efficiently. The system uses beacon technology and machine learning to provide real-time directions and crowd density information.',
  author: 'Priya Sharma',
  phase: 'Prototyping',
  skillsNeeded: ['React Native', 'IoT', 'Python', 'Machine Learning'],
  collaborators: 3,
  timeline: [
    {
      id: '1',
      name: 'Research & Ideation',
      status: 'completed' as const,
      description: 'Market research, problem validation, and initial concept development',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Technical Planning',
      status: 'completed' as const,
      description: 'Architecture design, technology stack selection, and resource planning',
      date: '2024-02-01'
    },
    {
      id: '3',
      name: 'Prototyping',
      status: 'current' as const,
      description: 'Building MVP, beacon integration, and basic mobile app development',
      date: '2024-02-15'
    },
    {
      id: '4',
      name: 'Testing & Validation',
      status: 'upcoming' as const,
      description: 'User testing, performance optimization, and bug fixes'
    },
    {
      id: '5',
      name: 'Deployment',
      status: 'upcoming' as const,
      description: 'Campus deployment, training, and maintenance setup'
    }
  ]
};

const mockComments: Comment[] = [
  {
    id: '1',
    author: 'Dr. Rajesh Kumar',
    content: 'Have you considered using BLE 5.0 beacons for better accuracy? They offer improved range and lower power consumption.',
    type: 'resource',
    upvotes: 8,
    timestamp: '2 hours ago'
  },
  {
    id: '2',
    author: 'Sneha Patel',
    content: 'One potential risk: What happens if the beacon network fails? Consider implementing a fallback system using WiFi triangulation.',
    type: 'risk',
    upvotes: 12,
    timestamp: '4 hours ago'
  },
  {
    id: '3',
    author: 'Arjun Mehta',
    content: 'Alternative approach: Instead of beacons, what about using computer vision with existing CCTV cameras for position tracking?',
    type: 'alternative',
    upvotes: 6,
    timestamp: '1 day ago'
  }
];

const commentTemplates = [
  { type: 'resource', label: 'Resource Suggestion', icon: '💡' },
  { type: 'risk', label: 'Technical Risk', icon: '⚠️' },
  { type: 'alternative', label: 'Alternative Approach', icon: '🔄' }
];

export function ProjectDetail() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const getPhaseColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-500';
      case 'current': return 'bg-blue-500';
      case 'upcoming': return 'bg-gray-300';
      default: return 'bg-gray-300';
    }
  };

  const getCommentTypeStyle = (type: string) => {
    switch (type) {
      case 'resource': return 'border-l-blue-500 bg-blue-50 dark:bg-blue-950';
      case 'risk': return 'border-l-red-500 bg-red-50 dark:bg-red-950';
      case 'alternative': return 'border-l-purple-500 bg-purple-50 dark:bg-purple-950';
      default: return 'border-l-gray-500 bg-gray-50 dark:bg-gray-950';
    }
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: Date.now().toString(),
      author: 'You',
      content: newComment,
      type: selectedTemplate as any || 'general',
      upvotes: 0,
      timestamp: 'Just now'
    };
    
    setComments([comment, ...comments]);
    setNewComment('');
    setSelectedTemplate(null);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-xl font-semibold">{mockProject.title}</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Overview */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-2xl mb-2">{mockProject.title}</CardTitle>
                    <p className="text-muted-foreground">by {mockProject.author}</p>
                  </div>
                  <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                    {mockProject.phase}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {mockProject.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {mockProject.skillsNeeded.map((skill) => (
                    <Badge key={skill} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Users className="w-4 h-4" />
                    {mockProject.collaborators} collaborators
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    Started Jan 2024
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Timeline */}
            <Card>
              <CardHeader>
                <CardTitle>Project Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockProject.timeline.map((phase, index) => (
                    <motion.div
                      key={phase.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex gap-4"
                    >
                      <div className="flex flex-col items-center">
                        <div className={`w-4 h-4 rounded-full ${getPhaseColor(phase.status)}`}></div>
                        {index < mockProject.timeline.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-200 dark:bg-gray-700 mt-2"></div>
                        )}
                      </div>
                      <div className="flex-1 pb-8">
                        <h4 className="font-semibold mb-1">{phase.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{phase.description}</p>
                        {phase.date && (
                          <p className="text-xs text-muted-foreground">{phase.date}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Collaboration Request */}
            <Card>
              <CardContent className="p-6">
                <Button className="w-full" size="lg">
                  Request Collaboration
                </Button>
                <p className="text-sm text-muted-foreground mt-2 text-center">
                  Join this project and contribute your skills
                </p>
              </CardContent>
            </Card>

            {/* Comments Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="w-5 h-5" />
                  Discussion
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Comment Templates */}
                <div className="flex flex-wrap gap-2">
                  {commentTemplates.map((template) => (
                    <Button
                      key={template.type}
                      variant={selectedTemplate === template.type ? "default" : "outline"}
                      size="sm"
                      onClick={() => setSelectedTemplate(template.type)}
                      className="text-xs"
                    >
                      {template.icon} {template.label}
                    </Button>
                  ))}
                </div>

                {/* Comment Input */}
                <div className="space-y-2">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts, suggestions, or concerns..."
                    className="w-full p-3 border rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows={3}
                  />
                  <Button onClick={handleAddComment} size="sm" className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    Post Comment
                  </Button>
                </div>

                {/* Comments List */}
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-md border-l-4 ${getCommentTypeStyle(comment.type)}`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <p className="font-medium text-sm">{comment.author}</p>
                        <span className="text-xs text-muted-foreground">{comment.timestamp}</span>
                      </div>
                      <p className="text-sm mb-2">{comment.content}</p>
                      <Button variant="ghost" size="sm" className="flex items-center gap-1 p-0 h-auto">
                        <ThumbsUp className="w-3 h-3" />
                        {comment.upvotes}
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
