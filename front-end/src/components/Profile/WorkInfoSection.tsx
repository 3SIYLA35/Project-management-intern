import React from 'react';
import { UserProfile } from './types';

interface WorkInfoSectionProps {
  profile: UserProfile | null;    
  formData: Partial<UserProfile> | null;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  formatDate: (dateString: string) => string;
  className?: string;
}

const WorkInfoSection: React.FC<WorkInfoSectionProps> = ({
  profile,
  formData,
  isEditing,
  handleInputChange,
  formatDate,
  className = ""
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Role</label>
        {isEditing ? (
          <input
            type="text"
            name="role"
            value={formData?.role}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : (
          <p className="text-gray-200">{profile?.role}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-1">Department</label>
        {isEditing ? (
          <input
            type="text"
            name="department"
            value={formData?.department}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : (
          <p className="text-gray-200">{profile?.department}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-1">Join Date</label>
        {isEditing ? (
          <input
            type="date"
            name="joinDate"
            value={formData?.joinDate}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : (
          <p className="text-gray-200">{profile?.joinDate}</p>
        )}
      </div>
      
      <div>
        <label className="block text-sm text-gray-400 mb-1">Time Zone</label>
        {isEditing ? (
          <input
            type="text"
            name="timeZone"
            value={formData?.timeZone || ''}
            onChange={handleInputChange}
            className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        ) : (
          <p className="text-gray-200">{profile?.timeZone || 'Not provided'}</p>
        )}
      </div>
    </div>
  );
};

export default WorkInfoSection; 