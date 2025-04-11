'use client';

import React, { useState } from 'react';
import { 
  ArrowLeftIcon, 
  AcademicCapIcon, 
  CheckCircleIcon, 
  PlayCircleIcon,
  BookOpenIcon,
  ChartBarIcon,
  ClockIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  status: 'completed' | 'in-progress' | 'upcoming';
  icon: React.ReactNode;
}

interface Milestone {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  date: string;
}

export default function LearningPathPage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'courses' | 'milestones'>('overview');

  const courses: Course[] = [
    {
      id: 'intro-data-science',
      title: 'Introduction to Data Science',
      description: 'Learn the fundamentals of data science and analytics',
      duration: '4 weeks',
      progress: 100,
      status: 'completed',
      icon: <ChartBarIcon className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 'python-programming',
      title: 'Python Programming',
      description: 'Master Python programming for data analysis',
      duration: '6 weeks',
      progress: 75,
      status: 'in-progress',
      icon: <BookOpenIcon className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 'machine-learning',
      title: 'Machine Learning Fundamentals',
      description: 'Learn the basics of machine learning algorithms',
      duration: '8 weeks',
      progress: 0,
      status: 'upcoming',
      icon: <AcademicCapIcon className="w-6 h-6 text-indigo-600" />
    },
    {
      id: 'data-visualization',
      title: 'Data Visualization',
      description: 'Create compelling visualizations from data',
      duration: '4 weeks',
      progress: 0,
      status: 'upcoming',
      icon: <ChartBarIcon className="w-6 h-6 text-indigo-600" />
    }
  ];

  const milestones: Milestone[] = [
    {
      id: 'm1',
      title: 'Data Science Fundamentals',
      description: 'Complete the introduction to data science course',
      completed: true,
      date: 'Completed on May 15, 2023'
    },
    {
      id: 'm2',
      title: 'Python Programming',
      description: 'Master Python programming basics',
      completed: false,
      date: 'Target: July 30, 2023'
    },
    {
      id: 'm3',
      title: 'Data Analysis Project',
      description: 'Complete a real-world data analysis project',
      completed: false,
      date: 'Target: August 15, 2023'
    },
    {
      id: 'm4',
      title: 'Machine Learning Basics',
      description: 'Understand and implement basic ML algorithms',
      completed: false,
      date: 'Target: September 30, 2023'
    }
  ];

  const overallProgress = 60; // 60% complete

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 fixed top-0 w-full z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Data Science Learning Path</h1>
            <p className="text-sm text-gray-500">Track your progress and continue learning</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-20 pb-12">
        {/* Progress Overview */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Overall Progress</h2>
            <span className="text-indigo-600 font-medium">{overallProgress}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
            <div 
              className="bg-indigo-600 h-2.5 rounded-full" 
              style={{ width: `${overallProgress}%` }}
            ></div>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold text-indigo-600">2</p>
              <p className="text-sm text-gray-600">Courses Completed</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">1</p>
              <p className="text-sm text-gray-600">In Progress</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-indigo-600">2</p>
              <p className="text-sm text-gray-600">Upcoming</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'overview'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('overview')}
          >
            Overview
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'courses'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('courses')}
          >
            Courses
          </button>
          <button
            className={`py-2 px-4 font-medium text-sm ${
              activeTab === 'milestones'
                ? 'text-indigo-600 border-b-2 border-indigo-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab('milestones')}
          >
            Milestones
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Path Overview</h3>
              <p className="text-gray-600 mb-4">
                The Data Science learning path is designed to take you from beginner to proficient in data science skills.
                Complete all courses and milestones to earn your Data Science certification.
              </p>
              <div className="flex items-center text-indigo-600 font-medium">
                <span>Estimated completion time: 22 weeks</span>
                <ClockIcon className="w-5 h-5 ml-2" />
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Next Steps</h3>
              <div className="flex items-start p-4 bg-indigo-50 rounded-lg">
                <div className="mr-4">
                  <PlayCircleIcon className="w-6 h-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Continue Python Programming</h4>
                  <p className="text-sm text-gray-600 mt-1">You're 75% through this course. Complete the remaining modules to progress.</p>
                  <button className="mt-3 text-indigo-600 text-sm font-medium flex items-center">
                    Continue Learning
                    <ArrowRightIcon className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="space-y-4">
            {courses.map((course) => (
              <div key={course.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start">
                  <div className="mr-4">{course.icon}</div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{course.title}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        course.status === 'completed' ? 'bg-green-100 text-green-800' :
                        course.status === 'in-progress' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {course.status === 'completed' ? 'Completed' :
                         course.status === 'in-progress' ? 'In Progress' : 'Upcoming'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{course.description}</p>
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-sm text-gray-500">
                        <ClockIcon className="w-4 h-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                      {course.status !== 'upcoming' && (
                        <div className="w-1/2 bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-indigo-600 h-2 rounded-full" 
                            style={{ width: `${course.progress}%` }}
                          ></div>
                        </div>
                      )}
                    </div>
                    {course.status === 'in-progress' && (
                      <button className="mt-4 w-full bg-indigo-600 text-white py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                        Continue Course
                      </button>
                    )}
                    {course.status === 'upcoming' && (
                      <button className="mt-4 w-full bg-gray-100 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-200">
                        Start Course
                      </button>
                    )}
                    {course.status === 'completed' && (
                      <div className="mt-4 flex items-center text-green-600 text-sm">
                        <CheckCircleIcon className="w-5 h-5 mr-1" />
                        <span>Course completed</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'milestones' && (
          <div className="space-y-4">
            {milestones.map((milestone) => (
              <div key={milestone.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-start">
                  <div className={`mr-4 ${milestone.completed ? 'text-green-500' : 'text-gray-300'}`}>
                    <CheckCircleIcon className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium text-gray-900">{milestone.title}</h3>
                      <span className={`text-xs font-medium px-2 py-1 rounded ${
                        milestone.completed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                      }`}>
                        {milestone.completed ? 'Completed' : 'In Progress'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">{milestone.description}</p>
                    <p className="text-xs text-gray-500 mt-2">{milestone.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 