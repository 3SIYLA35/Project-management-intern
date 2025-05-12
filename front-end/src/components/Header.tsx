import React from 'react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface HeaderProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  handleAddProject: () => void;
  toggleJumpToProject: () => void;
}

const Header: React.FC<HeaderProps> = ({
  searchTerm,
  setSearchTerm,
  handleAddProject,
  toggleJumpToProject
}) => {
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
        <button className="bg-purple-600 text-white px-4 py-2 rounded-md flex items-center" onClick={handleAddProject}>
          <PlusIcon className="h-5 w-5 mr-1" />
          Add
        </button>
        <button className="ml-4 text-gray-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>
        <div className="ml-4 relative">
          <button className="flex items-center">
            <img
              className="h-8 w-8 rounded-full border-2 border-purple-500"
              src="https://via.placeholder.com/40"
              alt="User profile"
            />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header; 