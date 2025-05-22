import React from 'react';
import { UserProfile } from './types';

interface SkillsSectionProps {
  profile: UserProfile;
  formData: UserProfile;
  isEditing: boolean;
  handleSkillsChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const SkillsSection: React.FC<SkillsSectionProps> = ({
  profile,
  formData,
  isEditing,
  handleSkillsChange,
  className = ""
}) => {
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Skills</label>
        {isEditing ? (
          <div>
            <input
              type="text"
              name="skills"
              value={formData.skills.join(', ')}
              onChange={handleSkillsChange}
              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter skills separated by commas"
            />
            <p className="text-xs text-gray-400 mt-2">Enter skills separated by commas (e.g., Project Management, Agile, Scrum)</p>
          </div>
        ) : (
          <div className="flex flex-wrap gap-2">
            {profile.skills && profile.skills.length > 0 ? (
              profile.skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="bg-gray-700 text-gray-200 px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))
            ) : (
              <p className="text-gray-400 italic">No skills listed</p>
            )}
          </div>
        )}
      </div>
      
      {!isEditing && profile.skills && profile.skills.length > 0 && (
        <div className="pt-2">
          <div className="flex items-center space-x-2 text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-sm">Your skills help project managers match you with suitable projects.</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SkillsSection; 