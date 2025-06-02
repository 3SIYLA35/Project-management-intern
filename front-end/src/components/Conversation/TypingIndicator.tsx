import React from 'react';
import './ChatStyles.css';

interface TypingIndicatorProps {
  userName?: string;
}

const TypingIndicator: React.FC<TypingIndicatorProps> = ({ userName }) => {
  return (
    <div className="flex items-center text-gray-500 text-sm italic mb-2">
      <span>{userName ? `${userName} is typing` : 'Someone is typing'}</span>
      <div className="typing-animation ml-1">
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
        <span className="typing-dot"></span>
      </div>
    </div>
  );
};

export default TypingIndicator; 