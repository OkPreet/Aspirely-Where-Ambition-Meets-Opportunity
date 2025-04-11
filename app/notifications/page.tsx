'use client';

import {
  BriefcaseIcon,
  ClockIcon,
  BuildingOfficeIcon,
  UserGroupIcon,
  CheckCircleIcon,
  XCircleIcon,
  ClipboardDocumentCheckIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

const mockNotifications = {
  jobApplications: [
    {
      id: 1,
      company: 'Google',
      position: 'Senior Software Engineer',
      status: 'Interview Scheduled',
      date: '2024-03-20',
      time: '10:00 AM',
      type: 'interview',
      isNew: true,
    },
    {
      id: 2,
      company: 'Microsoft',
      position: 'Full Stack Developer',
      status: 'Application Reviewed',
      date: '2024-03-19',
      type: 'review',
      isNew: true,
    },
    {
      id: 3,
      company: 'Amazon',
      position: 'Frontend Engineer',
      status: 'Application Submitted',
      date: '2024-03-18',
      type: 'submitted',
      isNew: false,
    },
  ],
  jobReferences: [
    {
      id: 1,
      referrer: 'Sarah Chen',
      company: 'Tesla',
      position: 'Software Engineer',
      status: 'Reference Submitted',
      date: '2024-03-20',
      isNew: true,
    },
    {
      id: 2,
      referrer: 'Michael Brown',
      company: 'Apple',
      position: 'Senior Developer',
      status: 'Reference Requested',
      date: '2024-03-19',
      isNew: true,
    },
    {
      id: 3,
      referrer: 'Alex Johnson',
      company: 'Meta',
      position: 'Full Stack Engineer',
      status: 'Reference In Progress',
      date: '2024-03-18',
      isNew: false,
    },
  ],
};

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Notifications</h1>
          <p className="mt-2 text-gray-600">Track your job applications and references</p>
        </div>

        <div className="space-y-8">
          {/* Job Applications Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <BriefcaseIcon className="h-6 w-6 text-indigo-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Job Application Updates</h2>
                </div>
                <span className="bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {mockNotifications.jobApplications.filter(n => n.isNew).length} new
                </span>
              </div>
              <div className="space-y-6">
                {mockNotifications.jobApplications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex items-start p-4 rounded-lg ${
                      notification.isNew ? 'bg-indigo-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {notification.type === 'interview' ? (
                        <ClockIcon className="h-6 w-6 text-green-600" />
                      ) : notification.type === 'review' ? (
                        <ClipboardDocumentCheckIcon className="h-6 w-6 text-blue-600" />
                      ) : (
                        <DocumentTextIcon className="h-6 w-6 text-gray-600" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {notification.company} - {notification.position}
                        </h3>
                        {notification.isNew && (
                          <span className="text-xs font-medium text-indigo-600">New</span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">{notification.status}</p>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{notification.date}</span>
                        {notification.time && (
                          <>
                            <ClockIcon className="h-4 w-4 ml-3 mr-1" />
                            <span>{notification.time}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Job References Section */}
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <UserGroupIcon className="h-6 w-6 text-purple-600 mr-2" />
                  <h2 className="text-xl font-semibold text-gray-900">Reference Updates</h2>
                </div>
                <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                  {mockNotifications.jobReferences.filter(n => n.isNew).length} new
                </span>
              </div>
              <div className="space-y-6">
                {mockNotifications.jobReferences.map((reference) => (
                  <div
                    key={reference.id}
                    className={`flex items-start p-4 rounded-lg ${
                      reference.isNew ? 'bg-purple-50' : 'bg-gray-50'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {reference.status === 'Reference Submitted' ? (
                        <CheckCircleIcon className="h-6 w-6 text-green-600" />
                      ) : reference.status === 'Reference Requested' ? (
                        <ClockIcon className="h-6 w-6 text-orange-600" />
                      ) : (
                        <ArrowPathIcon className="h-6 w-6 text-blue-600" />
                      )}
                    </div>
                    <div className="ml-4 flex-1">
                      <div className="flex items-center justify-between">
                        <h3 className="text-sm font-medium text-gray-900">
                          {reference.company} - {reference.position}
                        </h3>
                        {reference.isNew && (
                          <span className="text-xs font-medium text-purple-600">New</span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">{reference.referrer}</span> - {reference.status}
                      </p>
                      <div className="mt-2 flex items-center text-xs text-gray-500">
                        <CalendarIcon className="h-4 w-4 mr-1" />
                        <span>{reference.date}</span>
                      </div>
                    </div>
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