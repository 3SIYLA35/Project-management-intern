import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from '../../components/SideNav';
import Header from '../../components/Header';
import ErrorBoundary from '../../components/ErrorBoundary';
import CalendarHeader from '../../components/Calendar/CalendarHeader';
import WeeklyCalendar from '../../components/Calendar/WeeklyCalendar';
import TodayEvents from '../../components/Calendar/TodayEvents';
import UpcomingEvents from '../../components/Calendar/UpcomingEvents';
import EventForm from '../../components/Calendar/EventForm';
import { EventProps } from '../../components/Calendar/EventCard';
import { EventFormData } from '../../components/Calendar/EventForm';

export default function CalendarPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const [currentDate, setCurrentDate]=useState(new Date());
  const [isEventFormOpen, setIsEventFormOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  
  // Mock events data
  const [events, setEvents] = useState<EventProps[]>([
    {
      id: '1',
      title: 'Weekly Team Meeting',
      startTime: '3:00 PM',
      endTime: '4:20 PM',
      date: new Date(),
      type: 'today',
      participants: [
        { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
        { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
      ]
    },
    {
      id: '2',
      title: 'Product Launch Event',
      startTime: '3:00 PM',
      endTime: '4:20 PM',
      date: new Date(),
      type: 'conflicted',
      conflictCount: 2,
      participants: [
        { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
        { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
      ]
    },
    {
      id: '3',
      title: 'Team Building Workshop',
      startTime: '3:00 PM',
      endTime: '4:20 PM',
      date: new Date(),
      type: 'conflicted',
      participants: [
        { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
        { id: '4', name: 'User 4', avatar: '/img/avatar-4.jpg' },
      ]
    },
    {
      id: '4',
      title: 'Marketing Campaign Strategy',
      startTime: '3:00 PM',
      endTime: '4:20 PM',
      date: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days later
      type: 'upcoming',
      daysLater: 3,
      participants: [
        { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
        { id: '5', name: 'User 5', avatar: '/img/avatar-5.jpg' },
      ]
    },
    {
      id: '5',
      title: 'Brainstorming Session',
      startTime: '9:00 AM',
      endTime: '9:30 AM',
      date: (() => {
        const nextMonday = new Date();
        nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
        return nextMonday;
      })(),
      type: 'normal',
      participants: [
        { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
        { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
      ]
    },
    {
      id: '6',
      title: 'Project Review Meeting',
      startTime: '9:00 AM',
      endTime: '9:30 AM',
      date: (() => {
        const nextTuesday = new Date();
        nextTuesday.setDate(nextTuesday.getDate() + (2 + 7 - nextTuesday.getDay()) % 7);
        return nextTuesday;
      })(),
      type: 'normal',
      participants: [
        { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
        { id: '4', name: 'User 4', avatar: '/img/avatar-4.jpg' },
      ]
    },
    {
      id: '7',
      title: 'Bi-Weekly Marketing Team Sync',
      startTime: '9:30 AM',
      endTime: '10:00 AM',
      date: (() => {
        const nextMonday = new Date();
        nextMonday.setDate(nextMonday.getDate() + (1 + 7 - nextMonday.getDay()) % 7);
        return nextMonday;
      })(),
      type: 'normal',
      participants: [
        { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
        { id: '5', name: 'User 5', avatar: '/img/avatar-5.jpg' },
      ]
    },
    {
      id: '8',
      title: 'New Lead Generation',
      startTime: '9:30 AM',
      endTime: '10:00 AM',
      date: (() => {
        const nextWednesday = new Date();
        nextWednesday.setDate(nextWednesday.getDate() + (3 + 7 - nextWednesday.getDay()) % 7);
        return nextWednesday;
      })(),
      type: 'normal',
      participants: [
        { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
        { id: '4', name: 'User 4', avatar: '/img/avatar-4.jpg' },
      ]
    },
    {
      id: '9',
      title: 'Review Project Loxton',
      startTime: '9:00 AM',
      endTime: '10:00 AM',
      date: (() => {
        const nextThursday = new Date();
        nextThursday.setDate(nextThursday.getDate() + (4 + 7 - nextThursday.getDay()) % 7);
        return nextThursday;
      })(),
      type: 'normal',
      participants: [
        { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
        { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
        { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
        { id: '4', name: 'User 4', avatar: '/img/avatar-4.jpg' },
      ]
    },
    {
      id: '10',
      title: 'Site Visit - Project MK',
      startTime: '10:00 AM',
      endTime: '11:30 AM',
      date: (() => {
        const nextTuesday = new Date();
        nextTuesday.setDate(nextTuesday.getDate() + (2 + 7 - nextTuesday.getDay()) % 7);
        return nextTuesday;
      })(),
      type: 'normal',
      participants: [
        { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
        { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
        { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
      ]
    }
  ]);

  // Handle navigation for sidebar items
  const handleNavigation=(path: string) => {
    navigate(path);
  };

  // Handle month navigation
  const handlePrevMonth = () => {
    const prevMonth=new Date(currentDate);
    prevMonth.setMonth(prevMonth.getMonth() - 1);
    setCurrentDate(prevMonth);
  };

  const handleNextMonth = () => {
    const nextMonth = new Date(currentDate);
    nextMonth.setMonth(nextMonth.getMonth() + 1);
    setCurrentDate(nextMonth);
  };

  // Handle event click
  const handleEventClick = (id: string) => {
    setSelectedEventId(id);
    // Here you would typically open a modal or navigate to event details
    console.log('Event clicked:', id);
  };

  // Handle form submission
  const handleSaveEvent = (eventData: EventFormData) => {
    // Create a new event from form data
    const newEvent: EventProps = {
      id: Date.now().toString(),
      title: eventData.title,
      startTime: eventData.startTime,
      endTime: eventData.endTime,
      date: new Date(eventData.date),
      type: 'normal',
      location: eventData.location,
      participants: eventData.participants?.map(id => {
        // Find user by id in the mock data
        const mockUsers = [
          { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
          { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
          { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
          { id: '4', name: 'User 4', avatar: '/img/avatar-4.jpg' },
          { id: '5', name: 'User 5', avatar: '/img/avatar-5.jpg' },
        ];
        return mockUsers.find(user => user.id === id) || { id, name: `User ${id}`, avatar: '/img/avatar-1.jpg' };
      })
    };

    // Add the new event to the events list
    setEvents([...events, newEvent]);
  };

  // Filter events if search term is provided
  const filteredEvents = searchTerm
    ? events.filter(event => 
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : events;

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <ErrorBoundary>
        <SideNav activeItem="calendar" handleNavigation={handleNavigation} />
      </ErrorBoundary>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <ErrorBoundary>
          <Header 
            searchTerm={searchTerm} 
            setSearchTerm={setSearchTerm}
            toggleProjectModal={() => {}}
            toggleJumpToProject={() => {}}
            sourcepage='calendar'
          />
        </ErrorBoundary>

        <div className="flex-1 overflow-auto p-6">
          <ErrorBoundary>
            <CalendarHeader 
              currentDate={currentDate}
              onPrevMonth={handlePrevMonth}
              onNextMonth={handleNextMonth}
              onAddEvent={() => setIsEventFormOpen(true)}
              onFilter={() => {}}
            />
          </ErrorBoundary>

          <div className="grid grid-cols-12 gap-6">
            {/* Main Calendar Area */}
            <div className="col-span-12 lg:col-span-8">
              <ErrorBoundary>
                <WeeklyCalendar 
                  events={filteredEvents}
                  currentDate={currentDate}
                  onEventClick={handleEventClick}
                />
              </ErrorBoundary>
            </div>

            {/* Right Sidebar */}
            <div className="col-span-12 lg:col-span-4 space-y-6">
              <ErrorBoundary>
                <TodayEvents 
                  events={filteredEvents}
                  onEventClick={handleEventClick}
                />
              </ErrorBoundary>

              <ErrorBoundary>
                <UpcomingEvents 
                  events={filteredEvents}
                  onEventClick={handleEventClick}
                />
              </ErrorBoundary>
            </div>
          </div>
        </div>
      </div>

      {/* Event Form Modal */}
      <EventForm 
        isOpen={isEventFormOpen}
        onClose={() => setIsEventFormOpen(false)}
        onSave={handleSaveEvent}
      />
    </div>
  );
} 