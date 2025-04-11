'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function SupabaseTest() {
  const [status, setStatus] = useState<'loading' | 'connected' | 'error'>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    async function testConnection() {
      try {
        // Try to get the current session to test the connection
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          throw error;
        }
        
        setStatus('connected');
      } catch (err: any) {
        setStatus('error');
        setErrorMessage(err.message || 'Failed to connect to Supabase');
      }
    }

    testConnection();
  }, []);

  return (
    <div className="p-4 border rounded-md shadow-sm">
      <h2 className="text-lg font-medium mb-2">Supabase Connection Test</h2>
      
      {status === 'loading' && (
        <div className="flex items-center">
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-indigo-500 mr-2"></div>
          <span>Testing connection...</span>
        </div>
      )}
      
      {status === 'connected' && (
        <div className="text-green-600">
          <span className="font-medium">✓ Connected to Supabase</span>
          <p className="text-sm text-gray-600 mt-1">
            Your Supabase project is properly configured and accessible.
          </p>
        </div>
      )}
      
      {status === 'error' && (
        <div className="text-red-600">
          <span className="font-medium">✗ Connection Error</span>
          <p className="text-sm mt-1">{errorMessage}</p>
          <p className="text-sm text-gray-600 mt-2">
            Please check your environment variables and Supabase configuration.
          </p>
        </div>
      )}
    </div>
  );
} 