import React, { useState, useRef, useEffect } from 'react';
import { PlusIcon, MagnifyingGlassIcon, ClockIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import TimeTracker from './TimeTracker/TimeTracker';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  toggleJumpToProject: () => void;
  toggleProjectModal: () => void;
  toggleTimeTracker?: () => void;
  sourcepage: string;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  toggleJumpToProject,
  toggleProjectModal,
  toggleTimeTracker,
  sourcepage
}) => {
  const navigate = useNavigate();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showTimeTracker, setShowTimeTracker] = useState(false);
  const profileMenuRef = useRef<HTMLDivElement>(null);

  // Close profile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target as Node)) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProfileMenuToggle = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  const handleTimeTrackerToggle = () => {
    if (toggleTimeTracker) {
      toggleTimeTracker();
    } else {
      setShowTimeTracker(!showTimeTracker);
    }
  };

  const goToProfile = () => {
    navigate('/profile');
    setShowProfileMenu(false);
  };

  const handleLogout = () => {
    // Implement logout logic here
    console.log('Logging out');
    // navigate('/login');
  };

  return (
    <header className="flex justify-between items-center p-4 border-b border-gray-800">
      <div className="flex items-center">
        <button className="mr-4 text-gray-300" onClick={toggleJumpToProject}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="relative">
          <input
            type="text"
            placeholder="Search for Application here"
            className="bg-gray-800 text-gray-300 px-10 py-2 rounded-md w-80 focus:outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <MagnifyingGlassIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <div className="flex items-center">
        <button 
          className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center" 
          onClick={toggleProjectModal}
        >
          <PlusIcon className="h-5 w-5 mr-1" />
          Add
        </button>
        
        {/* Time Tracker Button */}
        <button 
          className="ml-4 text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700"
          onClick={handleTimeTrackerToggle}
          title="Time Tracker"
        >
          <ClockIcon className="w-6 h-6" />
        </button>
        
        <button className="ml-4 text-gray-300 hover:text-white p-2 rounded-full hover:bg-gray-700">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        
        {/* Profile Menu */}
        <div className="ml-4 relative" ref={profileMenuRef}>
          <button 
            className="flex items-center"
            onClick={handleProfileMenuToggle}
          >
            <img
              className="h-8 w-8 rounded-full border-2 border-purple-500"
              src="https://via.placeholder.com/40"
              alt="User profile"
            />
          </button>
          
          {showProfileMenu && (
            <div className="absolute right-0 mt-2 w-48 py-2 bg-gray-800 rounded-md shadow-xl z-20">
              <a
                onClick={goToProfile}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
              >
                Profile
              </a>
              <a
                href="#settings"
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Settings
              </a>
              <div className="border-t border-gray-700 my-1"></div>
              <a
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700 cursor-pointer"
              >
                Logout
              </a>
            </div>
          )}
        </div>
      </div>
      
      {/* Time Tracker Component (only used if toggleTimeTracker is not provided) */}
      {!toggleTimeTracker && (
        <TimeTracker 
          isOpen={showTimeTracker} 
          onClose={() => setShowTimeTracker(false)} 
        />
      )}
    </header>
  );
};

export default Header; 