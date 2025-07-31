import { useState } from 'react';
import { motion } from 'framer-motion';
import { Edit3, Award, Star, ExternalLink, Plus, X } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface UserProject {
  id: string;
  title: string;
  description: string;
  status: 'completed' | 'ongoing' | 'paused';
  technologies: string[];
  image?: string;
}

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  karmaScore: number;
  badge: string;
  skills: string[];
  projects: UserProject[];
  achievements: string[];
}

const mockUser: UserProfile = {
  name: 'Priya Sharma',
  email: 'priya.sharma@example.com',
  bio: 'Final year Computer Science student passionate about IoT and mobile development. Love solving real-world problems through technology.',
  karmaScore: 2847,
  badge: 'Top 10% Helper',
  skills: ['React Native', 'Python', 'IoT', 'Machine Learning', 'Arduino', 'Node.js'],
  achievements: ['Hackathon Winner 2023', 'Best Innovation Award', 'Community Helper'],
  projects: [
    {
      id: '1',
      title: 'Smart Campus Navigation',
      description: 'IoT-based indoor navigation system for university campus',
      status: 'ongoing',
      technologies: ['React Native', 'IoT', 'Python']
    },
    {
      id: '2',
      title: 'Expense Tracker App',
      description: 'Personal finance management app with voice input support',
      status: 'completed',
      technologies: ['React Native', 'Node.js', 'MongoDB']
    },
    {
      id: '3',
      title: 'Weather Monitoring System',
      description: 'Arduino-based weather station with cloud integration',
      status: 'completed',
      technologies: ['Arduino', 'Python', 'AWS']
    },
    {
      id: '4',
      title: 'AI Chatbot for Education',
      description: 'Multilingual chatbot to help students with course queries',
      status: 'paused',
      technologies: ['Python', 'NLP', 'TensorFlow']
    }
  ]
};

const skillCategories = {
  'Programming': ['Python', 'JavaScript', 'Java', 'C++'],
  'Web Development': ['React', 'Node.js', 'HTML/CSS', 'Express'],
  'Mobile Development': ['React Native', 'Flutter', 'Android'],
  'Data Science': ['Machine Learning', 'TensorFlow', 'Pandas', 'Numpy'],
  'Hardware': ['Arduino', 'Raspberry Pi', 'IoT', 'Electronics'],
  'Design': ['UI/UX', 'Figma', 'Photoshop', 'Illustrator']
};

export function UserProfile() {
  const [isEditingSkills, setIsEditingSkills] = useState(false);
  const [userSkills, setUserSkills] = useState(mockUser.skills);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
      case 'ongoing': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
      case 'paused': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300';
    }
  };

  const getBadgeIcon = () => {
    if (mockUser.karmaScore > 2000) return '🏆';
    if (mockUser.karmaScore > 1000) return '🥇';
    if (mockUser.karmaScore > 500) return '🥈';
    return '🥉';
  };

  const addSkill = (skill: string) => {
    if (!userSkills.includes(skill)) {
      setUserSkills([...userSkills, skill]);
    }
  };

  const removeSkill = (skill: string) => {
    setUserSkills(userSkills.filter(s => s !== skill));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white dark:bg-gray-900 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-primary">Profile</h1>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="text-xl font-semibold mb-1">{mockUser.name}</h2>
                <p className="text-muted-foreground mb-4">{mockUser.email}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{mockUser.bio}</p>
                <Button variant="outline" size="sm" className="flex items-center gap-2 mx-auto">
                  <Edit3 className="w-4 h-4" />
                  Edit Profile
                </Button>
              </CardContent>
            </Card>

            {/* Karma & Badge */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="w-5 h-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{getBadgeIcon()}</div>
                  <Badge variant="secondary" className="mb-2">
                    {mockUser.badge}
                  </Badge>
                  <div className="text-2xl font-bold text-primary">{mockUser.karmaScore}</div>
                  <p className="text-sm text-muted-foreground">Karma Points</p>
                </div>
                <div className="space-y-2">
                  {mockUser.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <Star className="w-4 h-4 text-yellow-500" />
                      {achievement}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Skills */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Skills</CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsEditingSkills(!isEditingSkills)}
                  >
                    <Edit3 className="w-4 h-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                {isEditingSkills ? (
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {userSkills.map((skill) => (
                        <Badge
                          key={skill}
                          variant="secondary"
                          className="flex items-center gap-1"
                        >
                          {skill}
                          <button
                            onClick={() => removeSkill(skill)}
                            className="ml-1 hover:text-red-500"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Add Skills:</p>
                      <div className="space-y-2">
                        {Object.entries(skillCategories).map(([category, skills]) => (
                          <div key={category}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setSelectedCategory(
                                selectedCategory === category ? null : category
                              )}
                              className="text-xs font-medium"
                            >
                              {category}
                            </Button>
                            {selectedCategory === category && (
                              <div className="flex flex-wrap gap-1 mt-1 ml-4">
                                {skills.map((skill) => (
                                  <Button
                                    key={skill}
                                    variant="outline"
                                    size="sm"
                                    onClick={() => addSkill(skill)}
                                    disabled={userSkills.includes(skill)}
                                    className="text-xs h-6"
                                  >
                                    <Plus className="w-3 h-3 mr-1" />
                                    {skill}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {userSkills.map((skill) => (
                      <Badge key={skill} variant="secondary">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Project Portfolio */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Project Portfolio</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  {mockUser.projects.map((project, index) => (
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card className="h-full hover:shadow-lg transition-shadow duration-200">
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-lg">{project.title}</h3>
                            <Badge className={getStatusColor(project.status)}>
                              {project.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-3">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-3">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                          <Button variant="ghost" size="sm" className="flex items-center gap-2 p-0">
                            <ExternalLink className="w-4 h-4" />
                            View Project
                          </Button>
                        </CardContent>
                      </Card>
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
