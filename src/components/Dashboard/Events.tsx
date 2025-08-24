import React, { useState } from 'react';
import { MdEvent } from "react-icons/md";
import TemplateModal from './TemplateModal';
export default function Events() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-gray-900">Events</h1>
      </div>

      {/* Event Credits */}
      <div className=" rounded-lg  border-gray-200 p-6">
        <h2 className="text-lg font-light text-gray-900 mb-2">Event Credits</h2>
        <p className="text-gray-600 mb-4">You have 0 free event(s) left</p>
        <button className="bg-[#891F0C] text-white px-10 py-3 rounded-sm text-sm cursor-pointer font-medium hover:bg-[#7a1a0a] transition-colors flex items-center gap-2"
              style={{
                  background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'
                }}
              onClick={() => setModalOpen(true)}
          >
          {/* <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg> */}
          Create An Event
        </button>
      </div>

      {/* Upcoming Events */}
      <div className="rounded-lg  border-gray-200 p-6">
        <h2 className="text-lg font-light text-gray-900 mb-4">All Events</h2>
        <div className="bg-white rounded-sm shadow flex items-center space-x-5 py-6 px-5 ">
          <h5 className='bg-gray-200 flex rounded-full items-center justify-center p-3'>
              <MdEvent className='text-3xl text-gray-500'/>
          </h5>
          <p className="text-gray-500">No Events</p>
        </div>
      </div>

      <TemplateModal open={modalOpen} onClose={() => setModalOpen(false)} />

      {/* Description */}
      {/* <div className="text-sm text-gray-600 text-center">
        Each event has a gallery, where the photos & videos live. When guests enter their contact data on the iPad, it gets stored on the event.
      </div> */}
    </div>
  );
} 