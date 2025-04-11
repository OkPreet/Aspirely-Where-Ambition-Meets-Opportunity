'use client';

import { useState } from 'react';
import { UserPlusIcon } from '@heroicons/react/24/outline';

const mockConnections = [
  {
    id: 1,
    name: 'John Smith',
    title: 'Software Engineer',
    company: 'Tech Corp',
    image: 'https://via.placeholder.com/150',
    connectedSince: '2023-01-15',
  },
  {
    id: 2,
    name: 'Lisa Johnson',
    title: 'Product Manager',
    company: 'Innovation Labs',
    image: 'https://via.placeholder.com/150',
    connectedSince: '2023-03-22',
  },
  {
    id: 3,
    name: 'David Chen',
    title: 'UX Designer',
    company: 'Design Studio',
    image: 'https://via.placeholder.com/150',
    connectedSince: '2023-05-10',
  },
];

export default function ConnectionsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConnections = mockConnections.filter(connection =>
    connection.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    connection.company.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Connections</h1>
        <div className="max-w-md w-full">
          <input
            type="text"
            placeholder="Search connections..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filteredConnections.map((connection) => (
          <div
            key={connection.id}
            className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow duration-200"
          >
            <div className="flex items-center space-x-4">
              <img
                src={connection.image}
                alt={connection.name}
                className="h-16 w-16 rounded-full"
              />
              <div className="flex-1">
                <h3 className="text-lg font-medium text-gray-900">{connection.name}</h3>
                <p className="text-sm text-gray-500">{connection.title}</p>
                <p className="text-sm text-gray-500">{connection.company}</p>
                <p className="text-sm text-gray-500 mt-1">
                  Connected since {new Date(connection.connectedSince).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="mt-4 flex justify-end">
              <button
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <UserPlusIcon className="h-4 w-4 mr-2" />
                Message
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 