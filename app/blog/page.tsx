'use client';

import { useEffect, useState } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import axios, { AxiosError } from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Post {
  id: string;
  title: string;
  content: string;
  created_at: string;
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/signin');
    } else if (status === 'authenticated') {
      fetchPosts();
    }
  }, [status, router]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get('/api/posts');
      setPosts(response.data.posts || []);
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error('Failed to fetch posts:', axiosError.response?.data || axiosError.message);
      setError(axiosError.response?.data?.message || 'Failed to fetch posts. Please try again later.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (status !== 'authenticated') {
      console.error('User not authenticated or missing session user ID');
      setError('You must be logged in to create a post.');
      setLoading(false);
      return;
    }

    if (!title.trim() || !content.trim()) {
      console.error('Title or content cannot be empty');
      setError('Title and content cannot be empty.');
      setLoading(false);
      return;
    }

    try {
      if (editingPost) {
        await axios.put(`/api/posts/${editingPost.id}`, { title, content });
        setEditingPost(null);
      } else {
        const response = await axios.post('/api/posts', {
          userId: session.user.id,
          title,
          content,
        });
        const newPost = response.data?.data;
        if (!newPost) {
          throw new Error('Failed to create post: Backend did not return post data.');
        }
        setPosts((prev) => [newPost, ...prev]);
      }
      setTitle('');
      setContent('');
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error('Failed to submit post:', axiosError.response?.data || axiosError.message);
      setError(axiosError.response?.data?.message || 'Failed to submit post.');
    } finally {
      setLoading(false);
    }
  };


  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/posts/${id}`);
      setPosts((prev) => prev.filter((post) => post.id !== id)); // Optimistic update
    } catch (error: unknown) {
      const axiosError = error as AxiosError<{ message: string }>;
      console.error('Failed to delete post:', axiosError.response?.data || axiosError.message);
      setError(axiosError.response?.data?.message || 'Failed to delete post. Please try again later.');
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setTitle(post.title);
    setContent(post.content);
  };

  if (status === 'loading') {
    return <p>Loading...</p>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="container mx-auto py-20">
      <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>{editingPost ? 'Edit Post' : 'Create New Post'}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              placeholder="Post title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <Textarea
              placeholder="Write your post content..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className="min-h-[100px]"
            />
            <div className="flex gap-2">
              <Button type="submit" disabled={loading}>
                <PlusCircle className="mr-2 h-4 w-4" />
                {loading
                  ? editingPost
                    ? 'Updating...'
                    : 'Creating...'
                  : editingPost
                    ? 'Update Post'
                    : 'Create Post'}
              </Button>
              {editingPost && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setEditingPost(null);
                    setTitle('');
                    setContent('');
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {posts.length === 0 ? (
        <p>No posts available. Create the first one!</p>
      ) : (
        <div className="grid gap-4">
          {posts.map((post) => (
            <Card key={post.id}>
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString()}
                </p>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{post.content}</p>
                <div className="flex gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(post)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(post.id)}
                  >
                    Delete
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
