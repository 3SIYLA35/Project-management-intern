import React from 'react';

interface SideNavProps {
  activeItem: string;
  handleNavigation: (path: string) => void;
}

const SideNav: React.FC<SideNavProps> = ({ activeItem, handleNavigation }) => {
  return (
    <div className="w-64 flex-shrink-0 border-r border-gray-800 p-4">
      <div className="mb-8">
        <h1 className="text-xl font-bold py-4">Teamify</h1>
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
            className={`flex items-center px-4 py-2 w-full ${activeItem === 'repository' ? 'text-white bg-purple-600' : 'text-gray-300'} rounded-lg`} 
            onClick={() => handleNavigation('/repository')}
          >
            <span className="inline-block mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            </span>
            Repository
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
          
          <button 
            className={`flex items-center px-4 py-2 w-full ${activeItem === 'settings' ? 'text-white bg-purple-600' : 'text-gray-300'} rounded-lg`} 
            onClick={() => handleNavigation('/settings')}
          >
            <span className="inline-block mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </span>
            Settings
          </button>
          
          <button 
            className={`flex items-center px-4 py-2 w-full ${activeItem === 'reports' ? 'text-white bg-purple-600' : 'text-gray-300'} rounded-lg`} 
            onClick={() => handleNavigation('/reports')}
          >
            <span className="inline-block mr-3">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </span>
            Reports
          </button>
        </div>
      </nav>
    </div>
  );
};

export default SideNav; 