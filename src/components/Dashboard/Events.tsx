'use client';
import React, { useState, useEffect } from 'react';
import { MdEvent } from "react-icons/md";
import TemplateModal from './TemplateModal';
import { userApi } from '@/firebase/event';
import { userStore } from '@/recoil';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';

interface Event {
  id: string;
  eventName: string;
  createdAt: string;
}

export default function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const currentUser = useRecoilValue(userStore) as {id:""};
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      const userId = currentUser?.id || "exampleUserId"; // Replace with actual user ID from authentication
      console.log("Fetching events for user ID:", userId);
      const result = await userApi.getUserEvents(userId);
      console.log("API response:", result);
      if (result.success) {
         setEvents(result.events as Event[]);
      } else {
        console.error(result.message);
      }
      setIsLoading(false);
    };
    fetchEvents();
  }, []);
  console.log(events, 'events....');
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">Events</h1>
      </div>

      {/* Event Credits */}
      <div className="rounded-lg border-gray-200 p-6">
        <h2 className="text-lg font-light text-gray-900 mb-2">Event Credits</h2>
        <p className="text-gray-600 mb-4">You have 0 free event(s) left</p>
        <button
          className="bg-[#292524] text-white px-10 py-3 rounded-sm text-sm cursor-pointer font-medium hover:bg-[#1c1917] transition-colors flex items-center gap-2"
          onClick={() => setModalOpen(true)}
        >
          Create An Event
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="rounded-lg border-gray-200 p-6">
        <h2 className="text-lg font-light text-gray-900 mb-4">All Events</h2>
        {isLoading ? (
          <div className="text-center text-gray-500">Loading events...</div>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map(event => (
              <div
                key={event.id}
                className="bg-white rounded-sm shadow p-4 cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => router.push(`/event/${event.id}`)}
              >
                <h5 className="text-lg font-semibold text-gray-900 mb-2">{event.eventName}</h5>
                <p className="text-sm text-gray-600">{new Date(event.createdAt).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-sm shadow flex items-center space-x-5 py-6 px-5">
            <h5 className='bg-gray-200 flex rounded-full items-center justify-center p-3'>
              <MdEvent className='text-3xl text-gray-500' />
            </h5>
            <p className="text-gray-500">No Events</p>
          </div>
        )}
      </div>

      <TemplateModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}