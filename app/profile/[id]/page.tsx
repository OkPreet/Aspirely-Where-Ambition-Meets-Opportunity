'use client';

import { 
  BriefcaseIcon, 
  AcademicCapIcon, 
  MapPinIcon,
  ChartBarIcon,
  UserCircleIcon,
  EnvelopeIcon,
  LinkIcon,
  DocumentTextIcon,
  StarIcon,
  UsersIcon,
  PencilSquareIcon,
} from '@heroicons/react/24/outline';
import Image from 'next/image';
import Link from 'next/link';

const mockUser = {
  id: '1',
  name: 'CHHAGAN',
  title: 'Software Engineer',
  company: 'Tech Corp',
  location: 'San Francisco, CA',
  image: '/profile-photo.jpg',
  coverImage: '/cover-photo.jpg',
  bio: 'Passionate software engineer with expertise in full-stack development. Love building innovative solutions and learning new technologies.',
  email: 'chhagan@example.com',
  website: 'www.chhagan.dev',
  github: 'github.com/chhagan',
  linkedin: 'linkedin.com/in/chhagan',
  skills: [
    { name: 'JavaScript', level: 'Expert', endorsements: 24 },
    { name: 'React', level: 'Expert', endorsements: 18 },
    { name: 'Node.js', level: 'Advanced', endorsements: 15 },
    { name: 'Python', level: 'Intermediate', endorsements: 12 },
    { name: 'AWS', level: 'Advanced', endorsements: 20 },
    { name: 'TypeScript', level: 'Expert', endorsements: 16 },
  ],
  experience: [
    {
      title: 'Senior Software Engineer',
      company: 'Tech Corp',
      location: 'San Francisco, CA',
      duration: '2022 - Present',
      description: 'Leading frontend development team and implementing new features. Working on scalable solutions and mentoring junior developers.',
      achievements: [
        'Led the development of a new microservices architecture',
        'Improved application performance by 40%',
        'Mentored 5 junior developers'
      ]
    },
    {
      title: 'Software Engineer',
      company: 'Startup Inc',
      location: 'Seattle, WA',
      duration: '2020 - 2022',
      description: 'Developed and maintained web applications using React and Node.js. Collaborated with cross-functional teams to deliver high-quality solutions.',
      achievements: [
        'Implemented new authentication system',
        'Reduced API response time by 60%',
        'Developed automated testing framework'
      ]
    },
  ],
  education: [
    {
      degree: 'Master of Computer Science',
      school: 'Stanford University',
      location: 'Stanford, CA',
      duration: '2018 - 2020',
      gpa: '3.9',
      achievements: [
        'Machine Learning Research Assistant',
        'Published 2 papers in top conferences',
        'Graduate Student Award'
      ]
    },
    {
      degree: 'Bachelor of Engineering',
      school: 'MIT',
      location: 'Cambridge, MA',
      duration: '2014 - 2018',
      gpa: '3.8',
      achievements: [
        'Dean\'s List all semesters',
        'Robotics Club President',
        'Undergraduate Research Program'
      ]
    },
  ],
  certifications: [
    {
      name: 'AWS Solutions Architect',
      issuer: 'Amazon Web Services',
      date: 'Dec 2023',
      expires: 'Dec 2026'
    },
    {
      name: 'Google Cloud Professional',
      issuer: 'Google',
      date: 'Jun 2023',
      expires: 'Jun 2026'
    }
  ],
  projects: [
    {
      name: 'AI-Powered Analytics Platform',
      description: 'Developed a machine learning platform for predictive analytics',
      technologies: ['Python', 'TensorFlow', 'React', 'AWS'],
      link: 'github.com/chhagan/ai-analytics'
    },
    {
      name: 'E-commerce Microservices',
      description: 'Built a scalable e-commerce platform using microservices architecture',
      technologies: ['Node.js', 'Docker', 'Kubernetes', 'MongoDB'],
      link: 'github.com/chhagan/ecommerce'
    }
  ],
  stats: {
    connections: 500,
    posts: 45,
    views: 1200,
    endorsements: 89
  }
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 via-white to-white">
      <div className="max-w-7xl mx-auto">
        {/* Cover Photo */}
        <div className="relative h-80 w-full bg-gradient-to-r from-indigo-600 to-purple-600">
          <Image
            src={mockUser.coverImage}
            alt="Cover"
            fill
            style={{ objectFit: 'cover' }}
            className="opacity-50"
          />
        </div>

        {/* Profile Header */}
        <div className="relative px-4 sm:px-6 lg:px-8">
          <div className="relative -mt-32">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="sm:flex sm:items-end sm:space-x-5">
                <div className="relative h-40 w-40 rounded-xl overflow-hidden ring-4 ring-white">
                  <Image
                    src={mockUser.image}
                    alt={mockUser.name}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
                <div className="mt-6 sm:mt-0 sm:flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <h1 className="text-3xl font-bold text-gray-900">{mockUser.name}</h1>
                      <p className="text-xl text-gray-600">{mockUser.title}</p>
                    </div>
                    <div className="flex space-x-3">
                      <Link
                        href="/profile/edit"
                        className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                      >
                        <PencilSquareIcon className="h-5 w-5 mr-2 text-gray-500" />
                        Edit Profile
                      </Link>
                      <button className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700">
                        <EnvelopeIcon className="h-5 w-5 mr-2" />
                        Message
                      </button>
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-4 sm:grid-cols-4">
                    <div className="text-center p-3 bg-indigo-50 rounded-lg">
                      <div className="text-2xl font-bold text-indigo-600">{mockUser.stats.connections}</div>
                      <div className="text-sm text-gray-500">Connections</div>
                    </div>
                    <div className="text-center p-3 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{mockUser.stats.posts}</div>
                      <div className="text-sm text-gray-500">Posts</div>
                    </div>
                    <div className="text-center p-3 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{mockUser.stats.views}</div>
                      <div className="text-sm text-gray-500">Profile Views</div>
                    </div>
                    <div className="text-center p-3 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{mockUser.stats.endorsements}</div>
                      <div className="text-sm text-gray-500">Endorsements</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {/* Left Column */}
            <div className="space-y-6">
              {/* About Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <UserCircleIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-semibold">About</h2>
                  </div>
                  <Link href="/profile/edit#about" className="text-indigo-600 hover:text-indigo-700">
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                </div>
                <p className="text-gray-600">{mockUser.bio}</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center text-gray-600">
                    <BriefcaseIcon className="h-5 w-5 mr-2" />
                    <span>{mockUser.company}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <MapPinIcon className="h-5 w-5 mr-2" />
                    <span>{mockUser.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <EnvelopeIcon className="h-5 w-5 mr-2" />
                    <a href={`mailto:${mockUser.email}`} className="hover:text-indigo-600">
                      {mockUser.email}
                    </a>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <LinkIcon className="h-5 w-5 mr-2" />
                    <a href={`https://${mockUser.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-indigo-600">
                      {mockUser.website}
                    </a>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <ChartBarIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-semibold">Skills</h2>
                  </div>
                  <Link href="/profile/edit#skills" className="text-indigo-600 hover:text-indigo-700">
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {mockUser.skills.map((skill) => (
                    <div key={skill.name} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium text-gray-900">{skill.name}</span>
                          <span className="text-sm text-gray-500">{skill.level}</span>
                        </div>
                        <div className="flex items-center">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-indigo-600 h-2 rounded-full"
                              style={{
                                width: skill.level === 'Expert' ? '90%' : skill.level === 'Advanced' ? '75%' : '60%'
                              }}
                            />
                          </div>
                          <span className="ml-2 text-sm text-gray-500">{skill.endorsements} endorsements</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Certifications Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <StarIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-semibold">Certifications</h2>
                  </div>
                  <Link href="/profile/edit#certifications" className="text-indigo-600 hover:text-indigo-700">
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                </div>
                <div className="space-y-4">
                  {mockUser.certifications.map((cert) => (
                    <div key={cert.name} className="border-l-2 border-indigo-200 pl-4">
                      <h3 className="font-medium text-gray-900">{cert.name}</h3>
                      <p className="text-sm text-gray-600">{cert.issuer}</p>
                      <p className="text-sm text-gray-500">
                        Issued {cert.date} • Expires {cert.expires}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Center and Right Columns */}
            <div className="lg:col-span-2 space-y-6">
              {/* Experience Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <BriefcaseIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-semibold">Experience</h2>
                  </div>
                  <Link href="/profile/edit#experience" className="text-indigo-600 hover:text-indigo-700">
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                </div>
                <div className="space-y-8">
                  {mockUser.experience.map((exp, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 bg-indigo-100 rounded-lg flex items-center justify-center">
                            <BriefcaseIcon className="h-6 w-6 text-indigo-600" />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{exp.title}</h3>
                          <p className="text-indigo-600">{exp.company}</p>
                          <p className="text-sm text-gray-500">{exp.duration} • {exp.location}</p>
                          <p className="mt-2 text-gray-600">{exp.description}</p>
                          <ul className="mt-2 space-y-1">
                            {exp.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-center text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-indigo-600 rounded-full mr-2"></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {index < mockUser.experience.length - 1 && (
                        <div className="absolute top-12 left-6 h-full w-px bg-indigo-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <AcademicCapIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-semibold">Education</h2>
                  </div>
                  <Link href="/profile/edit#education" className="text-indigo-600 hover:text-indigo-700">
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                </div>
                <div className="space-y-8">
                  {mockUser.education.map((edu, index) => (
                    <div key={index} className="relative">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <AcademicCapIcon className="h-6 w-6 text-purple-600" />
                          </div>
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-medium text-gray-900">{edu.degree}</h3>
                          <p className="text-purple-600">{edu.school}</p>
                          <p className="text-sm text-gray-500">{edu.duration} • GPA: {edu.gpa}</p>
                          <ul className="mt-2 space-y-1">
                            {edu.achievements.map((achievement, i) => (
                              <li key={i} className="flex items-center text-sm text-gray-600">
                                <span className="w-1.5 h-1.5 bg-purple-600 rounded-full mr-2"></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {index < mockUser.education.length - 1 && (
                        <div className="absolute top-12 left-6 h-full w-px bg-purple-200"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center">
                    <DocumentTextIcon className="h-6 w-6 text-indigo-600 mr-2" />
                    <h2 className="text-xl font-semibold">Projects</h2>
                  </div>
                  <Link href="/profile/edit#projects" className="text-indigo-600 hover:text-indigo-700">
                    <PencilSquareIcon className="h-5 w-5" />
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {mockUser.projects.map((project) => (
                    <div key={project.name} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                      <h3 className="font-medium text-gray-900">{project.name}</h3>
                      <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                      <a
                        href={`https://${project.link}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                      >
                        <LinkIcon className="h-4 w-4 mr-1" />
                        View Project
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 