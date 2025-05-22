import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import Header from '../../components/Header';
import ErrorBoundary from '../../components/ErrorBoundary';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  joinDate: string;
  phone?: string;
  location?: string;
  bio?: string;
  skills: string[];
  timeZone: string;
}

export default function ProfilePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  
  // Example profile data - replace with actual data fetching
  const [profile, setProfile] = useState<UserProfile>({
    id: '1',
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: '/img/avatar-1.jpg',
    role: 'Senior Project Manager',
    department: 'Product Development',
    joinDate: '2021-05-10',
    phone: '+1 (555) 123-4567',
    location: 'New York, USA',
    bio: 'Experienced project manager with over 8 years of expertise in agile methodologies and team leadership.',
    skills: ['Project Management', 'Agile', 'Scrum', 'Team Leadership', 'Strategic Planning'],
    timeZone: 'UTC-5 (Eastern Time)'
  });

  const [formData, setFormData] = useState<UserProfile>(profile);
  
  // Update form data when profile changes
  useEffect(() => {
    setFormData(profile);
  }, [profile]);
  
  const handleNavigation = (path: string) => {
    navigate(path);
  };
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  
  const handleSkillsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const skillsString = e.target.value;
    const skillsArray = skillsString.split(',').map(skill => skill.trim());
    setFormData({
      ...formData,
      skills: skillsArray
    });
  };
  
  const handleSaveProfile = () => {
    // Here you would save the profile to your backend
    setProfile(formData);
    setIsEditing(false);
  };
  
  const handleCancelEdit = () => {
    setFormData(profile);
    setIsEditing(false);
  };

  return (
    <ErrorBoundary>
      <div className='flex h-screen bg-gray-900 text-white'>
        <SideNav activeItem="profile" handleNavigation={handleNavigation} />

        <div className='flex-1 flex flex-col overflow-hidden'>
          <Header 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            toggleProjectModal={() => {}}
            toggleJumpToProject={() => {}}
            sourcepage='profile'
          />
          
          <div className='flex-1 overflow-auto p-6'>
            <div className="max-w-4xl mx-auto">
              {/* Profile Header with Actions */}
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <div>
                  {isEditing ? (
                    <div className="flex space-x-3">
                      <button 
                        onClick={handleCancelEdit}
                        className="px-4 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={handleSaveProfile}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                      >
                        Save Changes
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => setIsEditing(true)}
                      className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700"
                    >
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
              
              {/* Profile Content */}
              <div className="bg-gray-800 rounded-lg overflow-hidden">
                {/* Profile Banner & Avatar */}
                <div className="relative h-48 bg-gradient-to-r from-purple-800 to-blue-700">
                  <div className="absolute -bottom-12 left-8">
                    <div className="relative">
                      <img 
                        src={profile.avatar || '/img/avatar-placeholder.jpg'} 
                        alt={profile.name} 
                        className="w-24 h-24 rounded-full border-4 border-gray-800"
                      />
                      {isEditing && (
                        <button className="absolute bottom-0 right-0 bg-purple-600 rounded-full p-1 shadow-lg">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                
                {/* Profile Info */}
                <div className="pt-16 px-8 pb-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Personal Information */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Full Name</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="name"
                              value={formData.name}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          ) : (
                            <p className="text-gray-200">{profile.name}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Email</label>
                          {isEditing ? (
                            <input
                              type="email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          ) : (
                            <p className="text-gray-200">{profile.email}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Phone</label>
                          {isEditing ? (
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone || ''}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          ) : (
                            <p className="text-gray-200">{profile.phone || 'Not provided'}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Location</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="location"
                              value={formData.location || ''}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          ) : (
                            <p className="text-gray-200">{profile.location || 'Not provided'}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Work Information */}
                    <div>
                      <h2 className="text-xl font-semibold mb-4">Work Information</h2>
                      
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Role</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="role"
                              value={formData.role}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          ) : (
                            <p className="text-gray-200">{profile.role}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Department</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="department"
                              value={formData.department}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          ) : (
                            <p className="text-gray-200">{profile.department}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Time Zone</label>
                          {isEditing ? (
                            <input
                              type="text"
                              name="timeZone"
                              value={formData.timeZone}
                              onChange={handleInputChange}
                              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          ) : (
                            <p className="text-gray-200">{profile.timeZone}</p>
                          )}
                        </div>
                        
                        <div>
                          <label className="block text-sm text-gray-400 mb-1">Join Date</label>
                          <p className="text-gray-200">{new Date(profile.joinDate).toLocaleDateString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Bio */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Bio</h2>
                    {isEditing ? (
                      <textarea
                        name="bio"
                        value={formData.bio || ''}
                        onChange={handleInputChange}
                        className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[100px]"
                      />
                    ) : (
                      <p className="text-gray-200">{profile.bio || 'No bio provided.'}</p>
                    )}
                  </div>
                  
                  {/* Skills */}
                  <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Skills</h2>
                    {isEditing ? (
                      <div>
                        <input
                          type="text"
                          value={formData.skills.join(', ')}
                          onChange={handleSkillsChange}
                          placeholder="Enter skills separated by commas"
                          className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                        <p className="text-xs text-gray-400 mt-1">Separate skills with commas</p>
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        {profile.skills.map((skill, index) => (
                          <span 
                            key={index} 
                            className="px-3 py-1 bg-gray-700 rounded-full text-sm"
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
      </div>
    </ErrorBoundary>
  );
} 