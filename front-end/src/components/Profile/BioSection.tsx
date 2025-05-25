import React from 'react';
import { UserProfile } from './types';

interface BioSectionProps {
  profile: UserProfile | null;
  formData: Partial<UserProfile> | null;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}

const BioSection: React.FC<BioSectionProps> = ({
  profile,
  formData,
  isEditing,
  handleInputChange,
  className = ""
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm text-gray-400 mb-1">About Me</label>
        {isEditing ? (
          <textarea
            name="bio"
            value={formData?.bio || ''}
            onChange={handleInputChange}
            rows={5}
            className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Write a short bio about yourself..."
          />
        ) : (
          <div className="text-gray-200">
            {profile?.bio ? (
              <p>{profile?.bio}</p>
            ) : (
              <p className="text-gray-400 italic">No bio information provided.</p>
            )}
          </div>
        )}
      </div>
      
      {!isEditing && profile?.bio && (
        <div className="pt-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm">This information will be visible to other team members.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default BioSection; 