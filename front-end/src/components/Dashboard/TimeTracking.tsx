import React from 'react';

import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface TimeTrackingProps {
  todayHours: number;
  weeklyHours: number;
  dailyGoal: number;
  weeklyGoal: number;
}

const TimeTracking: React.FC<TimeTrackingProps> = ({
  todayHours,
  weeklyHours,
  dailyGoal,
  weeklyGoal
}) => {
  const weeklyProgress=Math.min(100,(weeklyHours/weeklyGoal)*100);
  const dailyProgress=(todayHours / dailyGoal) * 100;


  return (
    <div className="border-2 h-[360px] border-gray-700 rounded-lg p-5 ">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium text-white">Time Tracking</h2>
        <button className="text-sm text-blue-400 border-2 border-gray-600 p-2 px-4 hover:bg-gray-600 rounded-lg hover:text-blue-300">View All</button>
      </div>
      
      {/* Today's tracking */}
      <div className="mb-6 border-2 border-gray-700 rounded-lg p-4">

        <div className='flex justify-between'>
        <div className=" grid  mb-1">
          <span className="text-gray-400 text-sm">Today</span>
          <span className="text-white font-medium">{todayHours} Hours</span>
          <div className="flex justify-between items-center mt-2">
          <span className="text-gray-500 text-xs">Goal: {dailyGoal} hours</span>
        </div>
        </div>

          <div className='w-16 h-16'>
          <CircularProgressbar value={dailyProgress} strokeWidth={12}  styles={
            buildStyles({
              trailColor:'#374151',
              pathColor:'white',
            })
          }/>
          </div>
          </div>
        
      </div>
      
      {/* This Week's tracking */}
      <div className='border-2 border-gray-700 rounded-lg p-4'>
        <div className='flex justify-between'>
        <div className="grid  mb-1">
          <span className="text-gray-400 text-sm">This Week</span>
          <span className="text-white font-medium">{weeklyHours} Hours</span>
        </div>
        <div className='w-16 h-16'>
        <CircularProgressbar value={weeklyProgress} strokeWidth={12}  styles={
          buildStyles({
            trailColor:'#374151',
            pathColor:'white',
          })
        }/>
        </div>
        </div>
        <div className="flex justify-between items-center mb-1">
          <span className="text-gray-500 text-xs">Goal: {weeklyGoal} hours</span>
        </div>
      </div>
    </div>
  );
};

export default TimeTracking; 