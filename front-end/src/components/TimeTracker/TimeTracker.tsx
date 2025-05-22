import React, { useState, useEffect } from 'react';

interface TimeTrackerProps {
  isOpen: boolean;
  onClose: () => void;
}

const TimeTracker: React.FC<TimeTrackerProps> = ({ isOpen, onClose }) => {
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [memo, setMemo] = useState('');
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);



  // Start timer logic
  const startTracking = () => {
    if (isTracking) return;
    
    const id = setInterval(() => {
      setSeconds(prevSeconds => {
        if (prevSeconds === 59) {
          setMinutes(prevMinutes => {
            if (prevMinutes === 59) {
              setHours(prevHours => prevHours + 1);
              return 0;
            }
            return prevMinutes + 1;
          });
          return 0;
        }
        return prevSeconds + 1;
      });
    }, 1000);
    
    setIntervalId(id);
    setIsTracking(true);
  };

  // Stop timer logic
  const stopTracking = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
    setIsTracking(false);
  };

  // Reset timer
  const resetTimer = () => {
    stopTracking();
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  // Save time entry
  const saveTimeEntry = () => {
    // Here you would save the time entry to your backend
    console.log('Time tracked:', { hours, minutes, seconds, memo });
    
    // Reset after saving
    resetTimer();
    setMemo('');
  };

  // Open modal for manually adding time
  const openManualTimeModal = () => {
    // Implement modal for manual time entry
    console.log('Open manual time entry modal');
  };

  // Open work diary
  const viewWorkDiary = () => {
    // Implement navigation to work diary
    console.log('View work diary');
  };

  // Clean up interval on unmount
  useEffect(() => {
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
      }
    };
  }, [intervalId]);

  if (!isOpen) return null;

  return (
    <div className="fixed right-0 top-0 h-full w-80 bg-white shadow-lg z-50 overflow-hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Time Tracker</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 rounded-full p-1"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        {/* Timer Display */}
        <div className="bg-white p-4 border-b">
          <div className="flex justify-between items-center mb-1">
            <div className="text-3xl font-bold text-gray-800">
              {hours} hrs {minutes} min {seconds}s
            </div>
            <button 
              onClick={resetTimer}
              className="text-blue-500 hover:text-blue-700 flex items-center text-sm"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset
            </button>
          </div>
          <p className="text-sm text-gray-500">Current Session</p>
        </div>
        
        {/* Memo Input */}
        <div className="p-4 border-b">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Memo</h3>
          <input
            type="text"
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="What are you working on?"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        {/* Screen Capture */}
        <div className="p-4 border-b flex-grow">
          <h3 className="text-sm font-medium text-gray-700 mb-2">Latest Screen Capture</h3>
          <div className="bg-gray-100 rounded-md p-6 flex flex-col items-center justify-center">
            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <p className="text-sm text-gray-500">No Captures Yet</p>
          </div>
        </div>
        
        {/* Actions */}
        <div className="p-4 border-t bg-gray-50 flex justify-between">
          <button 
            onClick={viewWorkDiary}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            View Work Diary
          </button>
          <button
            onClick={openManualTimeModal}
            className="text-blue-500 hover:text-blue-700 text-sm"
          >
            Add Manual Time
          </button>
        </div>
        
        {/* Start/Stop Button */}
        <div className="p-4 bg-white">
          <button
            onClick={isTracking ? stopTracking : startTracking}
            className={`w-full py-3 rounded-md font-medium ${
              isTracking 
                ? 'bg-red-500 text-white hover:bg-red-600' 
                : 'bg-black text-white hover:bg-gray-800'
            }`}
          >
            {isTracking ? 'Stop Tracking' : 'Start Tracking'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimeTracker; 