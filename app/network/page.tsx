'use client';

import { useState } from 'react';
import {
  UsersIcon,
  ChartBarIcon,
  MagnifyingGlassIcon,
  BriefcaseIcon,
  BuildingOfficeIcon,
  AcademicCapIcon,
  MapPinIcon,
  ArrowTrendingUpIcon,
  UserGroupIcon,
  GlobeAltIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';

// Mock data for network analysis
const networkStats = {
  totalConnections: 500,
  newConnectionsThisMonth: 25,
  connectionsByIndustry: [
    { industry: 'Technology', count: 250, growth: 15 },
    { industry: 'Finance', count: 100, growth: 8 },
    { industry: 'Healthcare', count: 75, growth: 12 },
    { industry: 'Education', count: 50, growth: 5 },
    { industry: 'Others', count: 25, growth: 3 },
  ],
  connectionsByRole: [
    { role: 'Software Engineer', count: 200 },
    { role: 'Product Manager', count: 100 },
    { role: 'Data Scientist', count: 80 },
    { role: 'Designer', count: 70 },
    { role: 'Others', count: 50 },
  ],
  connectionsByLocation: [
    { location: 'San Francisco', count: 150 },
    { location: 'New York', count: 100 },
    { location: 'London', count: 80 },
    { location: 'Singapore', count: 70 },
    { location: 'Others', count: 100 },
  ],
  mutualConnections: [
    {
      id: 1,
      name: 'Alex Johnson',
      title: 'Senior Software Engineer',
      company: 'Google',
      mutualCount: 45,
      image: '/profile-photo.jpg',
    },
    {
      id: 2,
      name: 'Sarah Chen',
      title: 'Product Manager',
      company: 'Microsoft',
      mutualCount: 38,
      image: '/profile-photo.jpg',
    },
    {
      id: 3,
      name: 'Michael Brown',
      title: 'Data Scientist',
      company: 'Amazon',
      mutualCount: 32,
      image: '/profile-photo.jpg',
    },
  ],
  growthTrends: {
    monthly: [120, 150, 180, 210, 250, 300, 350, 380, 420, 450, 480, 500],
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  },
};

export default function NetworkAnalysisPage() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Network Analysis</h1>
          <p className="mt-2 text-gray-600">Gain insights into your professional network and connections</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-4">
            {['overview', 'industries', 'geography', 'trends'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-lg font-medium ${
                  activeTab === tab
                    ? 'bg-indigo-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-indigo-100">
                <UsersIcon className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total Connections</p>
                <p className="text-2xl font-semibold text-gray-900">{networkStats.totalConnections}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-green-100">
                <ArrowTrendingUpIcon className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">New This Month</p>
                <p className="text-2xl font-semibold text-gray-900">+{networkStats.newConnectionsThisMonth}</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-purple-100">
                <BuildingOfficeIcon className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Top Industry</p>
                <p className="text-2xl font-semibold text-gray-900">Technology</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-blue-100">
                <GlobeAltIcon className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Global Reach</p>
                <p className="text-2xl font-semibold text-gray-900">15 Countries</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Industry Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Industry Distribution</h2>
                <div className="flex items-center text-sm text-gray-500">
                  <span className="font-medium">Total: {networkStats.totalConnections}</span>
                </div>
              </div>
              <div className="space-y-4">
                {networkStats.connectionsByIndustry.map((industry) => (
                  <div key={industry.industry}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-600">{industry.industry}</span>
                      <span className="text-sm text-gray-500">{industry.count}</span>
                    </div>
                    <div className="relative">
                      <div className="h-2 bg-gray-200 rounded-full">
                        <div
                          className="absolute h-2 bg-indigo-600 rounded-full"
                          style={{ width: `${(industry.count / networkStats.totalConnections) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Growth Trends */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Network Growth</h2>
              <div className="relative h-64">
                <div className="absolute inset-0 flex items-end space-x-2">
                  {networkStats.growthTrends.monthly.map((value, index) => (
                    <div key={index} className="flex-1 flex flex-col items-center">
                      <div
                        className="w-full bg-indigo-600 rounded-t"
                        style={{ height: `${(value / 500) * 100}%` }}
                      />
                      <span className="text-xs text-gray-500 mt-1">
                        {networkStats.growthTrends.labels[index]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            {/* Top Mutual Connections */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Top Mutual Connections</h2>
              <div className="space-y-6">
                {networkStats.mutualConnections.map((connection) => (
                  <div key={connection.id} className="flex items-start">
                    <div className="relative h-12 w-12 rounded-lg overflow-hidden">
                      <Image
                        src={connection.image}
                        alt={connection.name}
                        fill
                        style={{ objectFit: 'cover' }}
                      />
                    </div>
                    <div className="ml-4 flex-1">
                      <h3 className="text-sm font-medium text-gray-900">{connection.name}</h3>
                      <p className="text-sm text-gray-600">{connection.title}</p>
                      <p className="text-sm text-gray-500">{connection.company}</p>
                      <p className="text-sm text-indigo-600 mt-1">{connection.mutualCount} mutual connections</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Geographic Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Geographic Distribution</h2>
              <div className="space-y-4">
                {networkStats.connectionsByLocation.map((location) => (
                  <div key={location.location} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{location.location}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{location.count}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Distribution */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Role Distribution</h2>
              <div className="space-y-4">
                {networkStats.connectionsByRole.map((role) => (
                  <div key={role.role} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <BriefcaseIcon className="h-5 w-5 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{role.role}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">{role.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 