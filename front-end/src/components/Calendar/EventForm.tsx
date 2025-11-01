import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export interface EventFormData {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  description?: string;
  location?: string;
  participants?: string[];
}

interface EventFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: EventFormData) => void;
  initialData?: EventFormData;
}

const EventForm: React.FC<EventFormProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<EventFormData>(
    initialData || {
      title: '',
      date: new Date().toISOString().slice(0, 10),
      startTime: '09:00',
      endTime: '10:00',
      description: '',
      location: '',
      participants: []
    }
  );

 
  const users = [
    { id: '1', name: 'User 1', avatar: '/img/avatar-1.jpg' },
    { id: '2', name: 'User 2', avatar: '/img/avatar-2.jpg' },
    { id: '3', name: 'User 3', avatar: '/img/avatar-3.jpg' },
    { id: '4', name: 'User 4', avatar: '/img/avatar-4.jpg' },
    { id: '5', name: 'User 5', avatar: '/img/avatar-5.jpg' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleParticipantChange = (userId: string) => {
    setFormData(prev => {
      const participants = prev.participants || [];
      if (participants.includes(userId)) {
        return { ...prev, participants: participants.filter(id => id !== userId) };
      } else {
        return { ...prev, participants: [...participants, userId] };
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-gray-800 rounded-lg w-full max-w-md p-5">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-white">Add Event</h2>
          <button
            onClick={onClose}
            className="rounded-full p-1 hover:bg-gray-700 text-gray-400"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Event Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="Enter event title"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={formData.location || ''}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder="Optional"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Start Time
              </label>
              <input
                type="time"
                name="startTime"
                value={formData.startTime}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                End Time
              </label>
              <input
                type="time"
                name="endTime"
                value={formData.endTime}
                onChange={handleChange}
                className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description || ''}
              onChange={handleChange}
              className="w-full bg-gray-700 text-white border-none rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500 min-h-[80px] resize-none"
              placeholder="Optional"
            ></textarea>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-400 mb-1">
              Participants
            </label>
            <div className="max-h-40 overflow-y-auto">
              {users.map(user => (
                <div key={user.id} className="flex items-center py-2">
                  <input
                    type="checkbox"
                    id={`user-${user.id}`}
                    checked={(formData.participants || []).includes(user.id)}
                    onChange={() => handleParticipantChange(user.id)}
                    className="mr-2 h-4 w-4 text-purple-600 focus:ring-purple-500 rounded"
                  />
                  <img 
                    src={user.avatar} 
                    alt={user.name} 
                    className="w-6 h-6 rounded-full mr-2" 
                  />
                  <label 
                    htmlFor={`user-${user.id}`} 
                    className="text-sm text-gray-300"
                  >
                    {user.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-purple-600 rounded-md hover:bg-purple-700"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EventForm; 