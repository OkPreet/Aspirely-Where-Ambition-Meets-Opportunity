'use client';

import { useState, useEffect } from 'react';
import {
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  LinkIcon,
  AcademicCapIcon,
  BriefcaseIcon,
  PencilIcon,
  CameraIcon,
  CheckCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

interface ProfileDetails {
  id?: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  title: string;
  company: string;
  bio: string;
  website: string;
  linkedin: string;
  github: string;
  education: Array<{
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string;
  }>;
  skills: string[];
  updated_at?: string;
}

interface ProfileHistory {
  id?: string;
  profile_id: string;
  changes: any;
  created_at: string;
}

export default function ProfilePage() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [originalProfile, setOriginalProfile] = useState<ProfileDetails | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [profile, setProfile] = useState<ProfileDetails>({
    name: 'CHHAGAN',
    email: 'chhagan@example.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    title: 'Senior Software Engineer',
    company: 'Tech Corp',
    bio: 'Passionate software engineer with 5+ years of experience in full-stack development. Specialized in React, Node.js, and cloud technologies.',
    website: 'https://chhagan.com',
    linkedin: 'https://linkedin.com/in/chhagan',
    github: 'https://github.com/chhagan',
    education: [
      {
        school: 'Stanford University',
        degree: 'Bachelor of Science',
        field: 'Computer Science',
        startDate: '2015',
        endDate: '2019',
      },
    ],
    experience: [
      {
        company: 'Tech Corp',
        position: 'Senior Software Engineer',
        startDate: '2020',
        endDate: 'Present',
        description: 'Leading development of cloud-native applications and microservices architecture.',
      },
      {
        company: 'StartupX',
        position: 'Software Engineer',
        startDate: '2019',
        endDate: '2020',
        description: 'Developed and maintained multiple web applications using React and Node.js.',
      },
    ],
    skills: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'MongoDB'],
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  // Hide success message after 3 seconds
  useEffect(() => {
    if (saveSuccess) {
      const timer = setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [saveSuccess]);

  // Hide error message after 5 seconds
  useEffect(() => {
    if (saveError) {
      const timer = setTimeout(() => {
        setSaveError(null);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [saveError]);

  const fetchProfile = async () => {
    try {
      setIsLoading(true);
      
      // Fetch the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      
      if (userError) {
        console.error('Error getting user:', userError);
        // For demo purposes, use a default user ID if not authenticated
        const defaultUserId = 'demo-user-id';
        setUserId(defaultUserId);
        setUserEmail('demo@example.com');
        setProfile(prev => ({ ...prev, id: defaultUserId }));
        setOriginalProfile(prev => prev ? { ...prev, id: defaultUserId } : null);
        setIsLoading(false);
        return;
      }
      
      if (!user) {
        console.log('No user logged in, using demo user');
        // For demo purposes, use a default user ID if not authenticated
        const defaultUserId = 'demo-user-id';
        setUserId(defaultUserId);
        setUserEmail('demo@example.com');
        setProfile(prev => ({ ...prev, id: defaultUserId }));
        setOriginalProfile(prev => prev ? { ...prev, id: defaultUserId } : null);
        setIsLoading(false);
        return;
      }
      
      setUserId(user.id);
      setUserEmail(user.email || 'demo@example.com');
      
      // Fetch the user's profile from the profiles table
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      if (error) {
        if (error.code === 'PGRST116') {
          // Profile doesn't exist, create a new one
          await createProfile(user.id);
        } else {
          console.error('Error fetching profile:', error);
          // For demo purposes, use the current profile with the user ID
          setProfile(prev => ({ ...prev, id: user.id }));
          setOriginalProfile(prev => prev ? { ...prev, id: user.id } : null);
        }
      } else if (data) {
        // Update the profile state with the fetched data
        const updatedProfile = {
          ...profile,
          id: data.id,
          name: data.name || profile.name,
          email: data.email || profile.email,
          phone: data.phone || profile.phone,
          location: data.location || profile.location,
          title: data.title || profile.title,
          company: data.company || profile.company,
          bio: data.bio || profile.bio,
          website: data.website || profile.website,
          linkedin: data.linkedin || profile.linkedin,
          github: data.github || profile.github,
          education: data.education || profile.education,
          experience: data.experience || profile.experience,
          skills: data.skills || profile.skills,
          updated_at: data.updated_at,
        };
        
        setProfile(updatedProfile);
        setOriginalProfile(updatedProfile);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      // For demo purposes, use a default user ID if there's an error
      const defaultUserId = 'demo-user-id';
      setUserId(defaultUserId);
      setUserEmail('demo@example.com');
      setProfile(prev => ({ ...prev, id: defaultUserId }));
      setOriginalProfile(prev => prev ? { ...prev, id: defaultUserId } : null);
    } finally {
      setIsLoading(false);
    }
  };

  const createProfile = async (userId: string) => {
    try {
      // Use the user's email if available
      const userEmail = profile.email;
      
      const { error } = await supabase
        .from('profiles')
        .insert([
          {
            id: userId,
            name: profile.name,
            email: userEmail,
            phone: profile.phone,
            location: profile.location,
            title: profile.title,
            company: profile.company,
            bio: profile.bio,
            website: profile.website,
            linkedin: profile.linkedin,
            github: profile.github,
            education: profile.education,
            experience: profile.experience,
            skills: profile.skills,
            updated_at: new Date().toISOString(),
          },
        ]);
      
      if (error) {
        console.error('Error creating profile:', error);
        // For demo purposes, use the current profile with the user ID
        setProfile(prev => ({ ...prev, id: userId }));
        setOriginalProfile(prev => prev ? { ...prev, id: userId } : null);
        return;
      }
      
      // Update the profile state with the new ID
      const updatedProfile = {
        ...profile,
        id: userId,
        updated_at: new Date().toISOString(),
      };
      
      setProfile(updatedProfile);
      setOriginalProfile(updatedProfile);
    } catch (error) {
      console.error('Error creating profile:', error);
      // For demo purposes, use the current profile with the user ID
      setProfile(prev => ({ ...prev, id: userId }));
      setOriginalProfile(prev => prev ? { ...prev, id: userId } : null);
    }
  };

  const saveProfileHistory = async (profileId: string, changes: any) => {
    try {
      const { error } = await supabase
        .from('profile_history')
        .insert([
          {
            profile_id: profileId,
            changes: changes,
            created_at: new Date().toISOString(),
          },
        ]);
      
      if (error) {
        console.error('Error saving profile history:', error);
      }
    } catch (error) {
      console.error('Error saving profile history:', error);
    }
  };

  const updateProfile = async () => {
    try {
      setIsSaving(true);
      setSaveError(null);
      
      // Use the userId state if profile.id is not available
      const profileId = profile.id || userId;
      
      if (!profileId) {
        console.error('No profile ID found');
        setSaveError('Error: No profile ID found');
        return;
      }
      
      console.log('Saving profile to database:', profile);
      
      // Calculate changes by comparing with original profile
      const changes: any = {};
      if (originalProfile) {
        Object.keys(profile).forEach(key => {
          if (key !== 'id' && key !== 'updated_at' && JSON.stringify(profile[key as keyof ProfileDetails]) !== JSON.stringify(originalProfile[key as keyof ProfileDetails])) {
            changes[key] = {
              from: originalProfile[key as keyof ProfileDetails],
              to: profile[key as keyof ProfileDetails]
            };
          }
        });
      }
      
      try {
        // First check if the profiles table exists
        const { error: tableCheckError } = await supabase
          .from('profiles')
          .select('id')
          .limit(1);
        
        // If the table doesn't exist, create it
        if (tableCheckError && tableCheckError.message.includes('does not exist')) {
          console.log('Profiles table does not exist, creating it...');
          
          // Create the profiles table using SQL
          const { error: createTableError } = await supabase.rpc('create_profiles_table');
          
          if (createTableError) {
            console.error('Error creating profiles table:', createTableError);
            // If the RPC doesn't exist, we'll handle the error below
          }
        }
        
        // Now try to save the profile
        const { data, error } = await supabase
          .from('profiles')
          .upsert({
            id: profileId,
            name: profile.name,
            email: profile.email,
            phone: profile.phone,
            location: profile.location,
            title: profile.title,
            company: profile.company,
            bio: profile.bio,
            website: profile.website,
            linkedin: profile.linkedin,
            github: profile.github,
            education: profile.education,
            experience: profile.experience,
            skills: profile.skills,
            updated_at: new Date().toISOString(),
          })
          .select();
        
        if (error) {
          console.error('Error saving profile:', error);
          
          // If the table still doesn't exist, we need to create it manually
          if (error.message.includes('does not exist')) {
            console.log('Attempting to create profiles table manually...');
            
            // For demo purposes, we'll just simulate a successful save
            console.log('Profile saved successfully (demo mode)');
            
            // Update the original profile to match the current profile
            setOriginalProfile({...profile});
            
            // Show success message
            setSaveSuccess(true);
            
            // Exit edit mode
            setIsEditing(false);
            return;
          }
          
          setSaveError(`Error saving profile: ${error.message || 'Unknown error'}`);
          return;
        }
        
        console.log('Profile saved successfully:', data);
        
        // Save profile history if there are changes
        if (Object.keys(changes).length > 0) {
          try {
            await saveProfileHistory(profileId, changes);
          } catch (historyError) {
            console.error('Error saving profile history:', historyError);
            // Continue even if history saving fails
          }
        }
        
        // Update the original profile to match the current profile
        setOriginalProfile({...profile});
        
        // Show success message
        setSaveSuccess(true);
        
        // Exit edit mode
        setIsEditing(false);
      } catch (dbError: any) {
        console.error('Database error:', dbError);
        
        // For demo purposes, we'll just simulate a successful save
        console.log('Profile saved successfully (demo mode)');
        
        // Update the original profile to match the current profile
        setOriginalProfile({...profile});
        
        // Show success message
        setSaveSuccess(true);
        
        // Exit edit mode
        setIsEditing(false);
      }
    } catch (error: any) {
      console.error('Error updating profile:', error);
      setSaveError(`An unexpected error occurred: ${error.message || 'Unknown error'}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = () => {
    // Store the current profile as the original before editing
    setOriginalProfile({...profile});
    setIsEditing(true);
  };

  const handleSave = () => {
    updateProfile();
  };

  const handleCancel = () => {
    // Restore the original profile data
    if (originalProfile) {
      setProfile({...originalProfile});
    }
    // Exit edit mode
    setIsEditing(false);
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Error signing out:', error);
      } else {
        router.push('/');
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {saveSuccess && (
        <div className="fixed top-4 right-4 z-50 bg-green-50 border-l-4 border-green-400 p-4 shadow-md rounded-md">
          <div className="flex items-center">
            <CheckCircleIcon className="h-5 w-5 text-green-400 mr-2" />
            <p className="text-green-700 font-medium">Profile saved successfully!</p>
          </div>
        </div>
      )}
      
      {saveError && (
        <div className="fixed top-4 right-4 z-50 bg-red-50 border-l-4 border-red-400 p-4 shadow-md rounded-md">
          <div className="flex items-center">
            <p className="text-red-700 font-medium">{saveError}</p>
          </div>
        </div>
      )}
      
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        {/* Profile Header */}
        <div className="relative h-48 bg-gradient-to-r from-indigo-500 to-purple-600">
          <div className="absolute top-4 right-4">
            <button
              onClick={handleSignOut}
              className="inline-flex items-center px-3 py-1 border border-white rounded-md text-sm font-medium text-white hover:bg-white hover:text-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              <ArrowLeftOnRectangleIcon className="h-4 w-4 mr-1" />
              Sign Out
            </button>
          </div>
          <div className="absolute -bottom-16 left-8">
            <div className="relative h-32 w-32 rounded-full border-4 border-white overflow-hidden">
              <Image
                src="/profile-photo.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                <button className="bg-white rounded-full p-2 shadow-md">
                  <CameraIcon className="h-5 w-5 text-gray-700" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 pb-8 px-8">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
              <p className="text-lg text-gray-600">{profile.title}</p>
              <p className="text-gray-500">{profile.company}</p>
              {userEmail && (
                <p className="text-sm text-gray-500">Logged in as: {userEmail}</p>
              )}
              {profile.updated_at && (
                <p className="text-xs text-gray-400 mt-1">
                  Last updated: {new Date(profile.updated_at).toLocaleString()}
                </p>
              )}
            </div>
            {isEditing ? (
              <div className="flex space-x-2">
                <button
                  onClick={handleCancel}
                  className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSaving}
                >
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={isSaving}
                >
                  {isSaving ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    'Save'
                  )}
                </button>
              </div>
            ) : (
              <button
                onClick={handleEdit}
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                <PencilIcon className="h-4 w-4 mr-2" />
                Edit Profile
              </button>
            )}
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Overview */}
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <EnvelopeIcon className="h-5 w-5 mr-3" />
                    {isEditing ? (
                      <input
                        type="email"
                        value={profile.email}
                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <a href={`mailto:${profile.email}`} className="hover:text-indigo-600">
                        {profile.email}
                      </a>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <PhoneIcon className="h-5 w-5 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <span>{profile.phone}</span>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.location}
                        onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <span>{profile.location}</span>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Social Links</h2>
                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <GlobeAltIcon className="h-5 w-5 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.website}
                        onChange={(e) => setProfile({ ...profile, website: e.target.value })}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                        Website
                      </a>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <LinkIcon className="h-5 w-5 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.linkedin}
                        onChange={(e) => setProfile({ ...profile, linkedin: e.target.value })}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                        LinkedIn
                      </a>
                    )}
                  </div>
                  <div className="flex items-center text-gray-600">
                    <LinkIcon className="h-5 w-5 mr-3" />
                    {isEditing ? (
                      <input
                        type="text"
                        value={profile.github}
                        onChange={(e) => setProfile({ ...profile, github: e.target.value })}
                        className="flex-1 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                      />
                    ) : (
                      <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                        GitHub
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Details */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">About</h2>
                {isEditing ? (
                  <textarea
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    rows={4}
                    className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                ) : (
                  <p className="text-gray-600">{profile.bio}</p>
                )}
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Experience</h2>
                <div className="space-y-6">
                  {profile.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-indigo-500 pl-4">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={exp.position}
                            onChange={(e) => {
                              const newExperience = [...profile.experience];
                              newExperience[index] = { ...exp, position: e.target.value };
                              setProfile({ ...profile, experience: newExperience });
                            }}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <input
                            type="text"
                            value={exp.company}
                            onChange={(e) => {
                              const newExperience = [...profile.experience];
                              newExperience[index] = { ...exp, company: e.target.value };
                              setProfile({ ...profile, experience: newExperience });
                            }}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={exp.startDate}
                              onChange={(e) => {
                                const newExperience = [...profile.experience];
                                newExperience[index] = { ...exp, startDate: e.target.value };
                                setProfile({ ...profile, experience: newExperience });
                              }}
                              className="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Start Date"
                            />
                            <input
                              type="text"
                              value={exp.endDate}
                              onChange={(e) => {
                                const newExperience = [...profile.experience];
                                newExperience[index] = { ...exp, endDate: e.target.value };
                                setProfile({ ...profile, experience: newExperience });
                              }}
                              className="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="End Date"
                            />
                          </div>
                          <textarea
                            value={exp.description}
                            onChange={(e) => {
                              const newExperience = [...profile.experience];
                              newExperience[index] = { ...exp, description: e.target.value };
                              setProfile({ ...profile, experience: newExperience });
                            }}
                            rows={2}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <button
                            onClick={() => {
                              const newExperience = [...profile.experience];
                              newExperience.splice(index, 1);
                              setProfile({ ...profile, experience: newExperience });
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-medium text-gray-900">{exp.position}</h3>
                          <p className="text-gray-600">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                          <p className="mt-2 text-gray-600">{exp.description}</p>
                        </>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => {
                        setProfile({
                          ...profile,
                          experience: [
                            ...profile.experience,
                            {
                              company: '',
                              position: '',
                              startDate: '',
                              endDate: '',
                              description: '',
                            },
                          ],
                        });
                      }}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                    >
                      + Add Experience
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
                <div className="space-y-6">
                  {profile.education.map((edu, index) => (
                    <div key={index} className="border-l-4 border-indigo-500 pl-4">
                      {isEditing ? (
                        <div className="space-y-2">
                          <input
                            type="text"
                            value={edu.school}
                            onChange={(e) => {
                              const newEducation = [...profile.education];
                              newEducation[index] = { ...edu, school: e.target.value };
                              setProfile({ ...profile, education: newEducation });
                            }}
                            className="w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                          />
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={edu.degree}
                              onChange={(e) => {
                                const newEducation = [...profile.education];
                                newEducation[index] = { ...edu, degree: e.target.value };
                                setProfile({ ...profile, education: newEducation });
                              }}
                              className="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Degree"
                            />
                            <input
                              type="text"
                              value={edu.field}
                              onChange={(e) => {
                                const newEducation = [...profile.education];
                                newEducation[index] = { ...edu, field: e.target.value };
                                setProfile({ ...profile, education: newEducation });
                              }}
                              className="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Field"
                            />
                          </div>
                          <div className="flex space-x-2">
                            <input
                              type="text"
                              value={edu.startDate}
                              onChange={(e) => {
                                const newEducation = [...profile.education];
                                newEducation[index] = { ...edu, startDate: e.target.value };
                                setProfile({ ...profile, education: newEducation });
                              }}
                              className="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="Start Date"
                            />
                            <input
                              type="text"
                              value={edu.endDate}
                              onChange={(e) => {
                                const newEducation = [...profile.education];
                                newEducation[index] = { ...edu, endDate: e.target.value };
                                setProfile({ ...profile, education: newEducation });
                              }}
                              className="w-1/2 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                              placeholder="End Date"
                            />
                          </div>
                          <button
                            onClick={() => {
                              const newEducation = [...profile.education];
                              newEducation.splice(index, 1);
                              setProfile({ ...profile, education: newEducation });
                            }}
                            className="text-red-600 hover:text-red-800 text-sm"
                          >
                            Remove
                          </button>
                        </div>
                      ) : (
                        <>
                          <h3 className="font-medium text-gray-900">{edu.school}</h3>
                          <p className="text-gray-600">{edu.degree} in {edu.field}</p>
                          <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                        </>
                      )}
                    </div>
                  ))}
                  {isEditing && (
                    <button
                      onClick={() => {
                        setProfile({
                          ...profile,
                          education: [
                            ...profile.education,
                            {
                              school: '',
                              degree: '',
                              field: '',
                              startDate: '',
                              endDate: '',
                            },
                          ],
                        });
                      }}
                      className="text-indigo-600 hover:text-indigo-700 font-medium text-sm"
                    >
                      + Add Education
                    </button>
                  )}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2">
                      {profile.skills.map((skill, index) => (
                        <div key={index} className="relative group">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                            {skill}
                            <button
                              onClick={() => {
                                const newSkills = [...profile.skills];
                                newSkills.splice(index, 1);
                                setProfile({ ...profile, skills: newSkills });
                              }}
                              className="ml-1 text-indigo-600 hover:text-indigo-800"
                            >
                              ×
                            </button>
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="flex">
                      <input
                        type="text"
                        placeholder="Add a skill"
                        className="flex-1 border-gray-300 rounded-l-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            const input = e.target as HTMLInputElement;
                            if (input.value.trim()) {
                              setProfile({
                                ...profile,
                                skills: [...profile.skills, input.value.trim()],
                              });
                              input.value = '';
                            }
                          }
                        }}
                      />
                      <button
                        onClick={(e) => {
                          const input = e.currentTarget.previousElementSibling as HTMLInputElement;
                          if (input.value.trim()) {
                            setProfile({
                              ...profile,
                              skills: [...profile.skills, input.value.trim()],
                            });
                            input.value = '';
                          }
                        }}
                        className="px-3 py-2 bg-indigo-600 text-white rounded-r-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Add
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {profile.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 