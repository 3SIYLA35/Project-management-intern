import React from 'react';

interface Message {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  text: string;
  time: string;
  isMissedCall?: boolean;
}

interface CommunicationProps {
  messages: Message[];
  onViewAll: () => void;
}

const Communication: React.FC<CommunicationProps>=({ messages, onViewAll }) => {
  return (
    <div className="border-2 border-gray-700 h-[380px] rounded-lg p-4">
      <div className="flex justify-between items-center mb-4 border-b-2 border-b-gray-600 pb-4">
        <h2 className="text-lg font-medium text-white">Recent Communication</h2>
        <button 
          onClick={onViewAll}
          className="text-sm text-blue-400 border-2 border-gray-600 p-2 px-4 hover:bg-gray-600 rounded-lg hover:text-blue-300"
        >
          View All
        </button>
      </div>
      
      <div className="space-y-4 ">
        {messages.map((message,index) => (
          <div className='space-y-3'>
          <div key={message.id} className={`flex items-start `}>
            <img 
              src={message.sender.avatar} 
              alt={message.sender.name} 
              className="w-10 h-10 rounded-full mt-2 mr-3" 
            />
            <div className="flex-1">
              <div className="flex items-center">
                <h3 className="text-white font-medium">{message.sender.name}</h3>
              </div>
              <p className="text-gray-400 text-sm mt-1">
                {message.isMissedCall ? (
                  <span className="text-red-400">Missed call</span>
                ) : (
                  message.text
                )}
              </p>
              <div className="flex items-center mt-1">
                <svg className="w-4 h-4 text-gray-500 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs text-gray-500">{message.time}</span>
              </div>
            </div>
          </div>
          { messages.length-1===index?
            ''
            :
            <div className='h-[2px] w-[80%] mx-6 ml-10 bg-gray-700'></div>
            }
          </div>
        ))}
      </div>
    </div>
  );
};

export default Communication; 