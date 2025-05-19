import React from 'react';
import { EventProps } from './EventCard';

interface UpcomingEventsProps {
  events: EventProps[];
  onEventClick: (id: string) => void;
}

const UpcomingEvents: React.FC<UpcomingEventsProps> = ({ events, onEventClick }) => {
  // Filter upcoming events (future events, not today)
  const upcomingEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    // Event date is after today
    return eventDate > today;
  }).sort((a, b) => {
    // Sort by date
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  }).slice(0, 5); // Limit to 5 upcoming events

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h2 className="text-lg font-medium text-white mb-3">Upcoming Events</h2>
      
      {upcomingEvents.length === 0 ? (
        <p className="text-gray-400 text-sm">No upcoming events scheduled.</p>
      ) : (
        <ul className="space-y-3">
          {upcomingEvents.map(event => {
            const eventDate = new Date(event.date);
            const today = new Date();
            const diffTime = Math.abs(eventDate.getTime() - today.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return (
              <li 
                key={event.id}
                className="bg-gray-750 rounded-md p-3 cursor-pointer hover:bg-gray-700"
                onClick={() => onEventClick(event.id)}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-white">{event.title}</h3>
                    <p className="text-sm text-gray-400">
                      {eventDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} • {event.startTime} - {event.endTime}
                    </p>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="bg-purple-500 h-2.5 w-2.5 rounded-full mr-2"></div>
                    <span className="text-xs text-purple-400">{diffDays === 1 ? 'Tomorrow' : `${diffDays} days later`}</span>
                  </div>
                </div>
                
                {event.participants && event.participants.length > 0 && (
                  <div className="mt-2 flex items-center">
                    <div className="flex -space-x-2">
                      {event.participants.slice(0, 3).map((participant) => (
                        <img 
                          key={participant.id}
                          src={participant.avatar} 
                          alt={participant.name} 
                          className="w-6 h-6 rounded-full border border-gray-800"
                        />
                      ))}
                    </div>
                    {event.participants.length > 3 && (
                      <span className="text-xs text-gray-400 ml-2">+{event.participants.length - 3}</span>
                    )}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default UpcomingEvents; 