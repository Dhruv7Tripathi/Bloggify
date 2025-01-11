// pages/add-post.tsx
"use client"
import React, { useState } from 'react';
// import { useRouter } from 'next/router';

const AddPost: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  // const router = useRouter();

  // const handleSubmit = async (e: React.FormEvent) => {
  // e.preventDefault();

  // Here you would typically send the data to your backend API
  // const postData = { title, content };

  // Example API call (replace with your actual API endpoint)
  // const response = await fetch('/api/posts', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify(postData),
  // });

  // if (response.ok) {
  //   // Redirect to the blog posts page or show a success message
  //   router.push('/posts');
  // } else {
  //   // Handle error
  //   console.error('Failed to add post');
  // }
  // };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Blog Post</h1>
      <form >
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-sm font-medium text-gray-700">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            rows={10}
            className="mt-1 block w-full border border-gray-300 rounded-md p-2"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-4 rounded"
        >
          Add Post
        </button>
      </form>
    </div>
  );
};

export default AddPost;


