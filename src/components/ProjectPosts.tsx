import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MessageCircle, Image, Video, Upload, SortAsc, SortDesc, Users, Settings, Bell, UserPlus } from 'lucide-react';
import { motion } from 'framer-motion';

interface Post {
  id: string;
  author: string;
  content: string;
  images?: string[];
  videos?: string[];
  comments: Comment[];
  createdAt: string;
}

interface Comment {
  id: string;
  author: string;
  content: string;
  createdAt: string;
}

const mockPosts: Post[] = [
  {
    id: '1',
    author: 'Priya Sharma',
    content: 'Completed beacon integration! See demo below.',
    images: ['https://images.unsplash.com/photo-1506744038136-46273834b3fb'],
    videos: ['https://www.w3schools.com/html/mov_bbb.mp4'],
    comments: [
      { id: 'c1', author: 'Rahul Gupta', content: 'Great work!', createdAt: '2025-07-30T10:00:00Z' },
      { id: 'c2', author: 'Sneha Patel', content: 'Can you share the code?', createdAt: '2025-07-30T11:00:00Z' }
    ],
    createdAt: '2025-07-30T09:00:00Z'
  },
  {
    id: '2',
    author: 'Ananya Singh',
    content: 'Started testing phase. Found some bugs in navigation.',
    images: [],
    videos: [],
    comments: [
      { id: 'c3', author: 'Priya Sharma', content: 'Let me help!', createdAt: '2025-07-29T15:00:00Z' }
    ],
    createdAt: '2025-07-29T14:00:00Z'
  }
];

const branches = ['Electronics', 'Mechanical', 'IT', 'Civil', 'Chemical'];
const peopleToFollow = [
  { name: 'Rahul Gupta', branch: 'Mechanical' },
  { name: 'Sneha Patel', branch: 'IT' },
  { name: 'Ananya Singh', branch: 'Electronics' },
];
const updates = [
  'New project in Electronics branch!',
  'Rahul Gupta posted a new update.',
  'Sneha Patel joined IT branch.',
];

export function ProjectPosts() {
  const [posts, setPosts] = useState<Post[]>(mockPosts);
  const [sortOrder, setSortOrder] = useState<'latest' | 'oldest'>('latest');
  const [newPostContent, setNewPostContent] = useState('');
  const [newImages, setNewImages] = useState<string[]>([]);
  const [newVideos, setNewVideos] = useState<string[]>([]);

  const sortedPosts = [...posts].sort((a, b) =>
    sortOrder === 'latest'
      ? new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      : new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
  );

  const handleAddPost = () => {
    if (!newPostContent.trim() && newImages.length === 0 && newVideos.length === 0) return;
    const newPost: Post = {
      id: Date.now().toString(),
      author: 'You',
      content: newPostContent,
      images: newImages,
      videos: newVideos,
      comments: [],
      createdAt: new Date().toISOString()
    };
    setPosts([newPost, ...posts]);
    setNewPostContent('');
    setNewImages([]);
    setNewVideos([]);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setNewImages([...newImages, ...urls]);
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const urls = Array.from(files).map(file => URL.createObjectURL(file));
      setNewVideos([...newVideos, ...urls]);
    }
  };

  return (
    <div className="container mx-auto px-2 py-6">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Left Sidebar */}
        <aside className="hidden md:block md:col-span-3 lg:col-span-2">
          <Card className="mb-4">
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> Messages
              </h3>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full mb-2">Inbox</Button>
              <Button variant="outline" size="sm" className="w-full mb-2">Accounts</Button>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4" /> Branches
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {branches.map(branch => (
                  <Button key={branch} variant="ghost" size="sm" className="w-full justify-start">
                    {branch}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Center Feed */}
        <main className="col-span-1 md:col-span-6 lg:col-span-7">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Project Uploads</h2>
            <Button variant="outline" size="sm" onClick={() => setSortOrder(sortOrder === 'latest' ? 'oldest' : 'latest')}>
              {sortOrder === 'latest' ? <SortDesc className="w-4 h-4 mr-1" /> : <SortAsc className="w-4 h-4 mr-1" />}
              {sortOrder === 'latest' ? 'Latest' : 'Oldest'}
            </Button>
          </div>

          {/* Upload Section */}
          <Card className="mb-8 shadow-md">
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Upload className="w-4 h-4" /> Add New Post
              </h3>
            </CardHeader>
            <CardContent>
              <textarea
                value={newPostContent}
                onChange={e => setNewPostContent(e.target.value)}
                placeholder="What's new in your project?"
                className="w-full p-3 border rounded-md resize-none mb-2"
                rows={3}
              />
              <div className="flex gap-2 mb-2">
                <label className="flex items-center gap-1 cursor-pointer">
                  <Image className="w-4 h-4" />
                  <input type="file" accept="image/*" multiple hidden onChange={handleImageUpload} />
                  <span className="text-xs">Add Images</span>
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <Video className="w-4 h-4" />
                  <input type="file" accept="video/*" multiple hidden onChange={handleVideoUpload} />
                  <span className="text-xs">Add Videos</span>
                </label>
              </div>
              <div className="flex gap-2 mb-2">
                {newImages.map((img, idx) => (
                  <img key={idx} src={img} alt="preview" className="w-16 h-16 object-cover rounded" />
                ))}
                {newVideos.map((vid, idx) => (
                  <video key={idx} src={vid} controls className="w-16 h-16 object-cover rounded" />
                ))}
              </div>
              <Button onClick={handleAddPost} size="sm" className="mt-2">Post</Button>
            </CardContent>
          </Card>

          {/* Posts List */}
          <div className="space-y-6">
            {sortedPosts.map((post, idx) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
              >
                <Card className="shadow-lg border border-gray-200 dark:border-gray-800">
                  <CardHeader>
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <img src={`https://ui-avatars.com/api/?name=${post.author}&background=random`} alt="avatar" className="w-8 h-8 rounded-full" />
                        <span className="font-semibold">{post.author}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{new Date(post.createdAt).toLocaleString()}</span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="mb-2 text-base font-medium">{post.content}</p>
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {post.images?.map((img, i) => (
                        <img key={i} src={img} alt="post-img" className="w-40 h-40 object-cover rounded-lg border" />
                      ))}
                      {post.videos?.map((vid, i) => (
                        <video key={i} src={vid} controls className="w-40 h-40 object-cover rounded-lg border" />
                      ))}
                    </div>
                    <div className="mt-2">
                      <Badge variant="secondary" className="flex items-center gap-1">
                        <MessageCircle className="w-4 h-4 mr-1" /> {post.comments.length} Comments
                      </Badge>
                    </div>
                    {/* Comments */}
                    <div className="mt-4 space-y-2">
                      {post.comments.map(comment => (
                        <div key={comment.id} className="border rounded p-2 bg-gray-50 dark:bg-gray-900">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-sm">{comment.author}</span>
                            <span className="text-xs text-muted-foreground">{new Date(comment.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-sm mt-1">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </main>

        {/* Right Sidebar */}
        <aside className="hidden md:block md:col-span-3 lg:col-span-3">
          <Card className="mb-4">
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Settings className="w-4 h-4" /> Settings
              </h3>
            </CardHeader>
            <CardContent>
              <Button variant="outline" size="sm" className="w-full mb-2">Account Settings</Button>
              <Button variant="outline" size="sm" className="w-full mb-2">Notification Settings</Button>
            </CardContent>
          </Card>
          <Card className="mb-4">
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <UserPlus className="w-4 h-4" /> People to Follow
              </h3>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {peopleToFollow.map(person => (
                  <div key={person.name} className="flex items-center gap-2">
                    <img src={`https://ui-avatars.com/api/?name=${person.name}&background=random`} alt="avatar" className="w-6 h-6 rounded-full" />
                    <span className="text-sm font-medium">{person.name}</span>
                    <Badge variant="outline" className="ml-auto text-xs">{person.branch}</Badge>
                    <Button variant="ghost" size="icon" className="ml-2"><UserPlus className="w-4 h-4" /></Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Bell className="w-4 h-4" /> Updates
              </h3>
            </CardHeader>
            <CardContent>
              <ul className="list-disc ml-4 text-sm">
                {updates.map((update, idx) => (
                  <li key={idx}>{update}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
