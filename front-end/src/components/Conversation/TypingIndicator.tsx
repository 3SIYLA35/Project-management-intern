import React from 'react';
import './ChatStyles.css';

const TypingIndicator:React.FC=()=>{
  return(
    <div className="typing-animation">
      <span className="typing-dot"></span>
      <span className="typing-dot"></span>
      <span className="typing-dot"></span>
    </div>
  );
};

export default TypingIndicator; 