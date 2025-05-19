import React from 'react';
import EventCard, { EventProps } from './EventCard';

interface WeeklyCalendarProps {
  events: EventProps[];
  currentDate: Date;
  onEventClick: (id: string) => void;
}

const WeeklyCalendar: React.FC<WeeklyCalendarProps> = ({ events, currentDate, onEventClick }) => {
  // Get the days of the week for the current date's week
  const getDaysOfWeek = () => {
    const days = [];
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
    const startOfWeek = new Date(currentDate);
    
    // Set to Monday of the week
    startOfWeek.setDate(currentDate.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1));
    
    // Create array of dates for the week (Mon-Fri)
    for (let i = 0; i < 5; i++) {
      const day = new Date(startOfWeek);
      day.setDate(startOfWeek.getDate() + i);
      days.push(day);
    }
    
    return days;
  };
  
  const weekDays = getDaysOfWeek();
  
  // Helper to check if a date is today
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();
  };
  
  // Helper to get events for a specific day
  const getEventsForDay = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate.getDate() === date.getDate() &&
        eventDate.getMonth() === date.getMonth() &&
        eventDate.getFullYear() === date.getFullYear();
    });
  };
  
  // Hours to display in the calendar
  const hours = Array.from({ length: 8 }, (_, i) => i + 9); // 9 AM to 4 PM

  return (
    <div className="bg-gray-900 rounded-lg overflow-hidden">
      <div className="grid grid-cols-6 bg-gray-850 border-b border-gray-800">
        {/* Empty cell for hours column */}
        <div className="p-2 text-center border-r border-gray-800"></div>
        
        {/* Days of the week */}
        {weekDays.map((day, index) => (
          <div 
            key={index} 
            className={`p-2 text-center ${isToday(day) ? 'bg-purple-900 bg-opacity-20' : ''}`}
          >
            <div className="text-xs text-gray-500 uppercase">
              {day.toLocaleDateString('en-US', { weekday: 'short' })}
            </div>
            <div className={`text-lg font-medium ${isToday(day) ? 'text-purple-400' : 'text-white'}`}>
              {day.getDate()}
            </div>
          </div>
        ))}
      </div>
      
      {/* Time grid */}
      <div className="grid grid-cols-6 divide-x divide-gray-800">
        {/* Hours column */}
        <div className="divide-y divide-gray-800">
          {hours.map(hour => (
            <div key={hour} className="h-24 relative">
              <div className="absolute top-0 -mt-2.5 ml-2 text-xs text-gray-500">
                {hour % 12 === 0 ? 12 : hour % 12} {hour >= 12 ? 'PM' : 'AM'}
              </div>
            </div>
          ))}
        </div>
        
        {/* Days columns with events */}
        {weekDays.map((day, dayIndex) => (
          <div key={dayIndex} className="divide-y divide-gray-800">
            {hours.map(hour => {
              const hourEvents = getEventsForDay(day).filter(event => {
                const startHour = parseInt(event.startTime.split(':')[0]);
                return startHour === hour;
              });
              
              return (
                <div key={hour} className="h-24 relative p-1">
                  {hourEvents.map(event => (
                    <EventCard 
                      key={event.id}
                      {...event} 
                      onEventClick={onEventClick}
                    />
                  ))}
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar; 