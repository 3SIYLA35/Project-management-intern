import React from 'react';

interface ProfileSectionProps {
  title: string;
  children: React.ReactNode;
  className?: string;
  titleAction?: React.ReactNode;
}

const ProfileSection: React.FC<ProfileSectionProps> = ({ 
  title, 
  children, 
  className = "",
  titleAction
}) => (
  <div className={`bg-gray-800 rounded-lg p-6 shadow-md ${className}`}>
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      {titleAction && (
        <div>
          {titleAction}
        </div>
      )}
    </div>
    {children}
  </div>
);

export default ProfileSection; 