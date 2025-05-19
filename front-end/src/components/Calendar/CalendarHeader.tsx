import React from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onAddEvent: () => void;
  onFilter: () => void;
}

const CalendarHeader: React.FC<CalendarHeaderProps> = ({ 
  currentDate, 
  onPrevMonth, 
  onNextMonth, 
  onAddEvent,
  onFilter 
}) => {
  const formatMonth = () => {
    return currentDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    });
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center">
        <h2 className="text-lg font-medium text-gray-200 flex items-center">
          {formatMonth()}
          <span className="ml-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </span>
        </h2>
      </div>

      <div className="flex space-x-2">
        <button 
          onClick={onFilter}
          className="flex items-center text-gray-200 hover:text-white"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
          Filter
        </button>
        
        <div className="flex border-r mx-2 border-gray-600 h-6"></div>
        
        <button
          onClick={onPrevMonth}
          className="p-1 rounded-full hover:bg-gray-700"
        >
          <ChevronLeftIcon className="h-5 w-5 text-gray-400" />
        </button>
        
        <button
          onClick={onNextMonth}
          className="p-1 rounded-full hover:bg-gray-700"
        >
          <ChevronRightIcon className="h-5 w-5 text-gray-400" />
        </button>
        
        <button
          onClick={onAddEvent}
          className="bg-purple-600 text-white px-3 py-1 rounded-md ml-2 flex items-center"
        >
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New
        </button>
      </div>
    </div>
  );
};

export default CalendarHeader; 