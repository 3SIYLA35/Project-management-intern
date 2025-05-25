import React from 'react';
import { UserProfile } from './types';

interface WorkingHoursSectionProps {
  profile: UserProfile | null;
  formData: Partial<UserProfile> | null;
  isEditing: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  className?: string;
}

const WorkingHoursSection: React.FC<WorkingHoursSectionProps> = ({
  profile,
  formData,
  isEditing,
  handleInputChange,
  className = ""
}) => {
  // Helper function to format working days display
  const formatWorkingDays = (days: string[]) => {
    if (!days || days.length === 0) return 'Not specified';
    
    // If all weekdays are selected
    const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
    if (weekdays.every(day => days.includes(day)) && days.length === 5) {
      return 'Weekdays (Monday-Friday)';
    }
    
    // If all days are selected
    if (days.length === 7) {
      return 'All days';
    }
    
    // Otherwise, list the days
    return days.join(', ');
  };

  // Handler for working days checkboxes
  const handleDayChange = (day: string, checked: boolean) => {
    const currentDays = formData?.workingHours?.days || [];
    let newDays;
    
    if (checked) {
      newDays = [...currentDays, day];
    } else {
      newDays = currentDays.filter(d => d !== day);
    }
    
    // We need to update the nested workingHours object
    const updatedWorkingHours = {
      ...(formData?.workingHours || { startTime: '', endTime: '' }),
      days: newDays
    };
    
    // Create a new formData object with the updated workingHours
    const updatedFormData = {
      ...formData,
      workingHours: updatedWorkingHours
    };
    
    // This is a workaround since we can't directly use handleInputChange for this nested structure
    // In a real app, you'd have a dedicated handler for this case
    const syntheticEvent = {
      target: {
        name: 'workingHours',
        value: updatedWorkingHours
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };

  // Handler for time changes
  const handleTimeChange = (timeType: 'startTime' | 'endTime', value: string) => {
    const updatedWorkingHours = {
      ...(formData?.workingHours || { days: [] }),
      [timeType]: value
    };
    
    const syntheticEvent = {
      target: {
        name: 'workingHours',
        value: updatedWorkingHours
      }
    } as unknown as React.ChangeEvent<HTMLInputElement>;
    
    handleInputChange(syntheticEvent);
  };
  
  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  
  return (
    <div className={`space-y-4 ${className}`}>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Working Days</label>
        {isEditing ? (
          <div className="grid grid-cols-2 gap-2">
            {daysOfWeek.map((day) => (
              <div key={day} className="flex items-center">
                <input
                  type="checkbox"
                  id={`day-${day}`}
                  checked={formData?.workingHours?.days?.includes(day) || false}
                  onChange={(e) => handleDayChange(day, e.target.checked)}
                  className="mr-2 h-4 w-4 bg-gray-700 border-gray-600 rounded text-purple-600 focus:ring-purple-500"
                />
                <label htmlFor={`day-${day}`} className="text-gray-300">{day}</label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-200">
            {profile?.workingHours ? formatWorkingDays(profile?.workingHours.days) : 'Not specified'}
          </p>
        )}
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-1">Start Time</label>
          {isEditing ? (
            <input
              type="time"
              value={formData?.workingHours?.startTime || ''}
              onChange={(e) => handleTimeChange('startTime', e.target.value)}
              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : (
            <p className="text-gray-200">{profile?.workingHours?.startTime || 'Not specified'}</p>
          )}
        </div>
        
        <div>
          <label className="block text-sm text-gray-400 mb-1">End Time</label>
          {isEditing ? (
            <input
              type="time"
              value={formData?.workingHours?.endTime || ''}
              onChange={(e) => handleTimeChange('endTime', e.target.value)}
              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          ) : (
              <p className="text-gray-200">{profile?.workingHours?.endTime || 'Not specified'}</p>
          )}
        </div>
      </div>
      
      {!isEditing && profile?.workingHours && (
        <div className="mt-2 text-gray-400 text-sm">
          <p>Works {formatWorkingDays(profile?.workingHours.days)} from {profile?.workingHours.startTime} to {profile?.workingHours.endTime}</p>
        </div>
      )}
    </div>
  );
};

export default WorkingHoursSection; 