'use client';

import { useEffect } from 'react';
import { redirect } from 'next/navigation';
import Image from 'next/image';

export default function LandingPage() {
  useEffect(() => {
    // Redirect to /home after 3 seconds
    const timer = setTimeout(() => {
      redirect('/home');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-indigo-50 to-white">
      <div className="text-center">
        <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-indigo-500 shadow-lg">
          <Image
            src="/profile-photo.jpg"
            alt="Your Profile Photo"
            fill
            style={{ objectFit: 'cover' }}
            priority
          />
        </div>
        <h1 className="text-4xl font-bold text-indigo-600 mb-2">Welcome to Aspirely</h1>
        <p className="text-xl text-gray-600">Your Career Development Platform</p>
      </div>
    </div>
  );
} 