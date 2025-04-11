'use client';

import { useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';

const mockSuggestions = [
  {
    id: 1,
    name: 'Sarah Wilson',
    title: 'Frontend Developer',
    company: 'Web Solutions',
    image: 'https://via.placeholder.com/150',
    mutualConnections: 5,
  },
  {
    id: 2,
    name: 'Michael Brown',
    title: 'Backend Developer',
    company: 'Tech Systems',
    image: 'https://via.placeholder.com/150',
    mutualConnections: 3,
  },
  {
    id: 3,
    name: 'Emily Davis',
    title: 'Product Designer',
    company: 'Design Co',
    image: 'https://via.placeholder.com/150',
    mutualConnections: 7,
  },
];

export default function SuggestedConnectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSuggestions = mockSuggestions.filter(suggestion =>
    suggestion.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    suggestion.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleConnect = (id: number) => {
    // In a real app, you would send a connection request here
    console.log('Connecting with user:', id);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Suggested Connections</h1>
        <div className="max-w-md w-full">
          <input
            type="text"
            placeholder="Search suggestions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredSuggestions.map((suggestion) => (
          <div
            key={suggestion.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <img
                src={suggestion.image}
                alt={suggestion.name}
                className="h-16 w-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{suggestion.name}</h3>
                <p className="text-sm text-gray-500">{suggestion.title}</p>
                <p className="text-sm text-gray-500">{suggestion.company}</p>
                <p className="text-sm text-gray-500 mt-1">
                  {suggestion.mutualConnections} mutual connections
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => handleConnect(suggestion.id)}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 