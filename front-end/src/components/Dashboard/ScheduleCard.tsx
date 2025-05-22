import React from 'react';
import { GoChevronDown } from "react-icons/go";


interface Meeting {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  participants: {
    id: string;
    name: string;
    avatar: string;
  }[];
  location?: string;
  isOnline?: boolean;
}

interface ScheduleCardProps {
  meetings: Meeting[];
  onViewAll: () => void;
}

const ScheduleCard: React.FC<ScheduleCardProps> = ({ meetings, onViewAll }) => {
  return (
    <div className="border-2 border-gray-700 h-[380px] py-6 rounded-lg p-4">
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-lg font-medium text-white">Today's Schedule</h2>
        <button 
          onClick={onViewAll}
          className="text-sm text-blue-400 border-2 border-gray-600 p-2 px-4 hover:bg-gray-600 rounded-lg hover:text-blue-300"
        >
          View All
        </button>
      </div>
      
      <div className=" space-y-6">
        {meetings.map((meeting) => (
          <div key={meeting.id} className="relative border-t-2 border-b-2 border-r-2 rounded-tl-lg rounded-tr-lg rounded-br-lg border-t-gray-700 border-b-gray-700 border-r-gray-700 border-l-[3px] rounded-bl-lg border-green-500 pl-4 py-3 px-3">
            <div className='flex justify-between relative'>
            <div className="mb-1">
              <h3 className="text-white font-medium">{meeting.title}</h3>
              <p className="text-gray-400 text-sm">{meeting.startTime} - {meeting.endTime} {meeting.isOnline && '(UTC)'}</p>
            </div>
            <button className='absolute top-0 right-0 p-2'>
            <GoChevronDown  className='text-xl hover:text-white transfrom hover:scale-[1.5] hover:duration-[0.5s] text-gray-400'/>
            </button>


            </div>
            
            <div className="flex mt-2 justify-between items-center">
              <div className="flex -space-x-2">
                {meeting.participants.slice(0, 3).map((person) => (
                  <img 
                    key={person.id}
                    src={person.avatar} 
                    alt={person.name}
                    className="w-6 h-6 rounded-full border border-gray-800" 
                  />
                ))}
                {meeting.participants.length > 3 && (
                  <div className="w-6 h-6 rounded-full flex items-center justify-center bg-gray-700 text-xs text-white">
                    +{meeting.participants.length - 3}
                  </div>
                )}
              </div>
              
              {meeting.isOnline ? (
                <div className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-gray-400">On Google Meet</span>
                </div>
              ) : (
                meeting.location && (
                  <span className="text-xs text-gray-400">{meeting.location}</span>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCard; 