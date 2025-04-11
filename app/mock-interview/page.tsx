'use client';

import React, { useState } from 'react';
import { ArrowLeftIcon, VideoCameraIcon, MicrophoneIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';

interface InterviewType {
  id: string;
  title: string;
  description: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  icon: React.ReactNode;
}

export default function MockInterviewPage() {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [interviewStarted, setInterviewStarted] = useState(false);

  const interviewTypes: InterviewType[] = [
    {
      id: 'technical',
      title: 'Technical Interview',
      description: 'Practice coding and technical problem-solving questions',
      duration: '45 minutes',
      difficulty: 'Intermediate',
      icon: <VideoCameraIcon className="w-8 h-8 text-indigo-600" />
    },
    {
      id: 'behavioral',
      title: 'Behavioral Interview',
      description: 'Practice answering common behavioral and situational questions',
      duration: '30 minutes',
      difficulty: 'Beginner',
      icon: <MicrophoneIcon className="w-8 h-8 text-indigo-600" />
    },
    {
      id: 'system-design',
      title: 'System Design Interview',
      description: 'Practice designing scalable systems and architecture',
      duration: '60 minutes',
      difficulty: 'Advanced',
      icon: <VideoCameraIcon className="w-8 h-8 text-indigo-600" />
    }
  ];

  const handleStartInterview = () => {
    setInterviewStarted(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 fixed top-0 w-full z-10">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center">
          <Link href="/" className="mr-4">
            <ArrowLeftIcon className="w-6 h-6 text-gray-600 hover:text-gray-900" />
          </Link>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">Mock Interview</h1>
            <p className="text-sm text-gray-500">Practice your interview skills</p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 pt-20 pb-12">
        {!interviewStarted ? (
          <>
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Choose Interview Type</h2>
              <div className="space-y-4">
                {interviewTypes.map((type) => (
                  <div 
                    key={type.id}
                    className={`p-4 rounded-lg border cursor-pointer transition-colors ${
                      selectedType === type.id 
                        ? 'border-indigo-500 bg-indigo-50' 
                        : 'border-gray-200 hover:border-indigo-300'
                    }`}
                    onClick={() => setSelectedType(type.id)}
                  >
                    <div className="flex items-start">
                      <div className="mr-4">{type.icon}</div>
                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h3 className="font-medium text-gray-900">{type.title}</h3>
                          <span className={`text-xs font-medium px-2 py-1 rounded ${
                            type.difficulty === 'Beginner' ? 'bg-green-100 text-green-800' :
                            type.difficulty === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {type.difficulty}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{type.description}</p>
                        <div className="flex items-center mt-2 text-sm text-gray-500">
                          <ClockIcon className="w-4 h-4 mr-1" />
                          <span>{type.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100 mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview Tips</h2>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Research the company and role before the interview</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Prepare your STAR method responses for behavioral questions</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Practice explaining your technical solutions clearly</span>
                </li>
                <li className="flex items-start">
                  <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 mt-0.5" />
                  <span className="text-gray-700">Have questions ready for the interviewer</span>
                </li>
              </ul>
            </div>

            <button
              onClick={handleStartInterview}
              disabled={!selectedType}
              className={`w-full py-3 rounded-lg font-medium ${
                selectedType
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
              }`}
            >
              Start Interview
            </button>
          </>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Interview in Progress</h2>
            <div className="aspect-video bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <div className="text-center">
                <VideoCameraIcon className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-500">Interview interface would appear here</p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center text-gray-600">
                <ClockIcon className="w-5 h-5 mr-1" />
                <span>00:00 / 45:00</span>
              </div>
              <button
                onClick={() => setInterviewStarted(false)}
                className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-700"
              >
                End Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 