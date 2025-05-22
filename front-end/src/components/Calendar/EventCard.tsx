import React from 'react';

export interface EventProps {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  date: Date;
  type: 'normal' | 'conflicted' | 'today' | 'upcoming';
  location?: string;
  participants?: {
    id: string;
    name: string;
    avatar: string;
  }[];
  conflictCount?: number;
  daysLater?: number;
  onEventClick?: (id: string) => void;
}

const EventCard: React.FC<EventProps>=({
  id,
  title,
  startTime,
  endTime,
  type,
  location,
  participants,
  conflictCount,
  daysLater,
  onEventClick
}) => {
  // Determine the color and style based on event type
  const getEventStyles=()=>{
    switch (type){
      case 'today':
        return {
          indicator: 'bg-green-500',
          labelText: 'Today',
          actionText: 'Join Meeting',
          actionClass: 'text-green-500 hover:text-green-400',
        };
      case 'conflicted':
        return {
          indicator: 'bg-orange-500',
          labelText: `${conflictCount} Conflicted`,
          actionText: 'See Conflict',
          actionClass: 'text-orange-500 hover:text-orange-400',
        };
      case 'upcoming':
        return {
          indicator: 'bg-purple-500',
          labelText: `${daysLater} days later`,
          actionText: daysLater ? new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) : '',
          actionClass: 'text-gray-400',
        };
      default:
        return {
          indicator: 'bg-red-500',
          labelText: 'Conflicted',
          actionText: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
          actionClass: 'text-gray-400',
        };
    }
  };

  const styles=getEventStyles();

  return (
    <div 
      className="bg-gray-800 rounded-md p-4 mb-3 w-full cursor-pointer hover:bg-gray-750"
      onClick={() => onEventClick && onEventClick(id)}
    >
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-medium text-white">{title}</h3>
      </div>
      
      <div className="text-sm text-gray-400 mb-2">{startTime} - {endTime}</div>
      
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className={`h-2.5 w-2.5 rounded-full ${styles.indicator} mr-2`}></div>
          <span className="text-xs text-gray-400">{styles.labelText}</span>
        </div>
        
        <a href="#" className={`text-xs ${styles.actionClass}`}>{styles.actionText}</a>
      </div>
      
      {participants && participants.length > 0 && (
        <div className="mt-3 flex items-center">
          <div className="flex -space-x-2">
            {participants.slice(0, 3).map((participant) => (
              <img 
                key={participant.id}
                src={participant.avatar} 
                alt={participant.name} 
                className="w-6 h-6 rounded-full border border-gray-800"
              />
            ))}
          </div>
          {participants.length > 3 && (
            <span className="text-xs text-gray-400 ml-2">+{participants.length - 3}</span>
          )}
        </div>
      )}
    </div>
  );
};

export default EventCard; 