'use client';

import { useState } from 'react';
import { 
  HeartIcon,
  ChatBubbleLeftIcon,
  ShareIcon,
  PhotoIcon,
  LinkIcon,
  FaceSmileIcon,
  ChartBarIcon,
  AcademicCapIcon,
  BriefcaseIcon,
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import Image from 'next/image';
import Link from 'next/link';

const mockPosts = [
  {
    id: 1,
    author: {
      name: 'Jane Smith',
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      image: '/profile-photo.jpg',
    },
    content: "Excited to share that I've joined Tech Corp as a Senior Software Engineer! Looking forward to working with an amazing team and contributing to innovative projects.",
    timestamp: '2 hours ago',
    likes: 24,
    comments: 5,
    liked: false,
  },
  {
    id: 2,
    author: {
      name: 'John Doe',
      title: 'Product Manager',
      company: 'Startup Inc',
      image: '/profile-photo.jpg',
    },
    content: 'Just launched our new product feature! Check it out and let me know what you think. #ProductLaunch #Innovation',
    timestamp: '5 hours ago',
    likes: 18,
    comments: 3,
    liked: false,
  },
  {
    id: 3,
    author: {
      name: 'Alice Johnson',
      title: 'UX Designer',
      company: 'Design Studio',
      image: '/profile-photo.jpg',
    },
    content: 'Sharing some insights from our latest user research. The results are fascinating and will help shape our next design iteration.',
    timestamp: '1 day ago',
    likes: 32,
    comments: 7,
    liked: false,
  },
];

export default function HomePage() {
  const [posts, setPosts] = useState(mockPosts);
  const [newPost, setNewPost] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const newPostObj = {
      id: posts.length + 1,
      author: {
        name: 'You',
        title: 'Software Engineer',
        company: 'Tech Corp',
        image: '/profile-photo.jpg',
      },
      content: newPost,
      timestamp: 'Just now',
      likes: 0,
      comments: 0,
      liked: false,
    };

    setPosts([newPostObj, ...posts]);
    setNewPost('');
  };

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId 
        ? { ...post, likes: post.liked ? post.likes - 1 : post.likes + 1, liked: !post.liked }
        : post
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section with enhanced styling */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg opacity-10"></div>
          <div className="relative p-6 rounded-lg">
            <h1 className="text-3xl font-bold mb-2 text-gray-900">Welcome back, CHHAGAN!</h1>
            <p className="text-lg text-gray-600">Where ambition meets opportunity</p>
          </div>
        </div>

        {/* Top Cards Grid with enhanced shadows and gradients */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Career Advisor Card */}
          <Link href="/career-advisor" className="block">
            <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden h-full">
              <div className="p-6 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-100 rounded-full -mr-16 -mt-16 opacity-20"></div>
                <div className="text-sm text-indigo-600 font-semibold mb-2">AI ASSISTANT</div>
                <h2 className="text-xl font-semibold mb-2">Career Advisor</h2>
                <p className="text-gray-600 text-sm mb-4">Get AI-crafted advice about your career path, skills, and development needs.</p>
                <button className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white px-6 py-2 rounded-lg hover:from-indigo-700 hover:to-indigo-800 transition-all duration-200 shadow-md">
                  Start Chat
                </button>
              </div>
            </div>
          </Link>

          {/* Upcoming Interview Card */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-100 rounded-full -mr-16 -mt-16 opacity-20"></div>
              <div className="text-sm text-purple-600 font-semibold mb-2">UPCOMING</div>
              <h2 className="text-xl font-semibold mb-2">Mock Interview</h2>
              <p className="text-gray-600 text-sm mb-4">You have a scheduled interview practice in 2 days</p>
              <div className="flex space-x-4">
                <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md">
                  Prepare Now
                </button>
                <button className="text-purple-600 hover:text-purple-700 font-medium">Reschedule</button>
              </div>
            </div>
          </div>

          {/* Learning Path Card */}
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
            <div className="p-6 relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-full -mr-16 -mt-16 opacity-20"></div>
              <div className="text-sm text-blue-600 font-semibold mb-2">PROGRESS</div>
              <h2 className="text-xl font-semibold mb-2">Learning Path</h2>
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-600">Data Science Track</span>
                  <span className="text-blue-600 font-medium">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md">
                Continue Learning
              </button>
            </div>
          </div>
        </div>

        {/* Middle Cards Grid with enhanced styling */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Career Snapshot Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <ChartBarIcon className="h-6 w-6 text-indigo-600 mr-2" />
              <h2 className="text-xl font-semibold">Career Snapshot</h2>
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-2 text-gray-700">Strengths</h3>
                <div className="flex flex-wrap gap-2">
                  {['Data Analysis', 'Python', 'Communication', 'Problem Solving'].map((skill) => (
                    <span key={skill} className="bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-sm">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              <button className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center">
                See More
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Skill Gaps Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <AcademicCapIcon className="h-6 w-6 text-purple-600 mr-2" />
              <h2 className="text-xl font-semibold">Skill Gaps</h2>
            </div>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Machine Learning', 'SQL', 'Cloud Computing', 'Leadership'].map((skill) => (
                <span key={skill} className="bg-purple-50 text-purple-700 px-3 py-1 rounded-full text-sm">
                  {skill}
                </span>
              ))}
            </div>
            <button className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-md w-full">
              Fill Gaps
            </button>
          </div>

          {/* Suggested Roles Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-4">
              <BriefcaseIcon className="h-6 w-6 text-blue-600 mr-2" />
              <h2 className="text-xl font-semibold">Suggested Roles</h2>
            </div>
            <div className="space-y-3 mb-4">
              {[
                'Data Analyst',
                'Business Intelligence Analyst',
                'Junior Data Scientist'
              ].map((role) => (
                <div key={role} className="flex items-center space-x-2 text-sm text-gray-600">
                  <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                  <span>{role}</span>
                </div>
              ))}
            </div>
            <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 shadow-md w-full">
              Explore Roles
            </button>
          </div>
        </div>

        {/* Recommended Courses */}
        <h2 className="text-xl font-semibold mb-4">Recommended Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">COURSERA</div>
            <h3 className="font-medium mb-2">Machine Learning</h3>
            <p className="text-sm text-gray-600 mb-4">Stanford University • 8 weeks • Beginner</p>
            <button className="text-indigo-600 text-sm">Enroll</button>
            <button className="text-gray-500 text-sm ml-4">Save</button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">UDEMY</div>
            <h3 className="font-medium mb-2">SQL Masterclass</h3>
            <p className="text-sm text-gray-600 mb-4">Complete SQL Bootcamp • 6 weeks</p>
            <button className="text-indigo-600 text-sm">Enroll</button>
            <button className="text-gray-500 text-sm ml-4">Save</button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-sm text-gray-500 mb-2">LINKEDIN LEARNING</div>
            <h3 className="font-medium mb-2">Leadership Skills</h3>
            <p className="text-sm text-gray-600 mb-4">Essential Leadership Training • 2 weeks • All Levels</p>
            <button className="text-indigo-600 text-sm">Enroll</button>
            <button className="text-gray-500 text-sm ml-4">Save</button>
          </div>
        </div>

        {/* Career Analysis Graph */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Career Analysis</h2>
          <div className="h-64 w-full">
            {/* Replace with actual graph component */}
            <div className="h-full w-full bg-gray-100 rounded flex items-center justify-center">
              Graph Placeholder
            </div>
          </div>
        </div>

        {/* Market Trends Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Hot Skills</h2>
            <p className="text-sm text-gray-600 mb-4">Python, Data Science, Cloud Computing, Data Visualization, Flutter</p>
            <button className="text-indigo-600 text-sm">Learn More</button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Top Locations</h2>
            <p className="text-sm text-gray-600 mb-4">Berlin, London, New York, London, Singapore</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Explore More</button>
          </div>

          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Salary Range</h2>
            <p className="text-sm text-gray-600 mb-4">$75K - $120K based on your Data Analyst role in your region</p>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">Salary Details</button>
          </div>
        </div>

        {/* Smart Tools Section */}
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Smart Tools</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">M</div>
                <div>
                  <h3 className="font-medium">Mock Interview Simulator</h3>
                  <p className="text-sm text-gray-600">Practice with AI-powered interview scenarios</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">R</div>
                <div>
                  <h3 className="font-medium">Resume Generator</h3>
                  <p className="text-sm text-gray-600">Create a professional resume in minutes</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg cursor-pointer">
              <div className="flex items-center space-x-4">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">L</div>
                <div>
                  <h3 className="font-medium">Learning Roadmap</h3>
                  <p className="text-sm text-gray-600">Personalized learning path to reach your goals</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 