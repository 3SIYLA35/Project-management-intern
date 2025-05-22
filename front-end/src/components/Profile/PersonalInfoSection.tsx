import React from 'react';

interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  age?: number;
  phone?: string;
  location?: string;
  [key: string]: any; // Allow additional properties
}

interface PersonalInfoSectionProps {
  profile: UserProfile;
  formData: UserProfile;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}

const PersonalInfoSection: React.FC<PersonalInfoSectionProps> = ({ 
  profile, 
  formData, 
  isEditing, 
  handleInputChange,
  className = ""
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
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
        <label className="block text-sm text-gray-400 mb-1">Age</label>
        {isEditing ? (
          <input
            type="number"
            name="age"
            value={formData.age || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : (
          <p className="text-gray-200">{profile.age || 'Not provided'}</p>
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
  );
};

export default PersonalInfoSection; 