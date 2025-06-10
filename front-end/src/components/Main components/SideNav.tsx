import React from 'react';

interface SideNavProps {
  activeItem: string;
  handleNavigation: (path: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ activeItem, handleNavigation }) => {
  return (
    <div className="w-64 flex-shrink-0 border-r border-gray-800 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold py-4">AppBase</h1>
      </div>
      
      <nav>
        <div className="space-y-1">
          <button 
            className={`flex items-center px-4 py-2 w-full ${activeItem === 'dashboard' ? 'text-white bg-purple-600' : 'text-gray-300'} rounded-lg`} 
            onClick={() => handleNavigation('/dashboard')}
          >
            <span className="inline-block mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </span>
            Dashboard
          </button>
          
          <button 
            className={`flex items-center px-4 py-2 w-full ${activeItem === 'projects' ? 'text-white bg-purple-600' : 'text-gray-300'} rounded-lg`} 
            onClick={() => handleNavigation('/projects')}
          >
            <span className="inline-block mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            Project
          </button>
          
          <button 
            className={`flex items-center px-4 py-2 w-full ${activeItem === 'tasks' ? 'text-white bg-purple-600' : 'text-gray-300'} rounded-lg`} 
            onClick={() => handleNavigation('/admin/tasks')}
          >
            <span className="inline-block mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </span>
            My tasks
          </button>
          
          <button 
            className={`flex items-center px-4 py-2 w-full ${activeItem === 'calendar' ? 'text-white bg-purple-600' : 'text-gray-300'} rounded-lg`} 
            onClick={() => handleNavigation('/calendar')}
          >
            <span className="inline-block mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </span>
            Calendar
          </button>
          
          
          
          <button 
            className={`flex items-center px-4 py-2 w-full ${activeItem === 'conversation' ? 'text-white bg-purple-600' : 'text-gray-300'} rounded-lg`} 
            onClick={() => handleNavigation('/conversation')}
          >
            <span className="inline-block mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
            </span>
            Conversation
          </button>
          
          <button 
            className={`flex items-center px-4 py-2 w-full ${activeItem === 'profile' ? 'text-white bg-purple-600' : 'text-gray-300'} rounded-lg`} 
            onClick={() => handleNavigation('/profile')}
          >
            <span className="inline-block mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </span>
            Profile
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideNav; 