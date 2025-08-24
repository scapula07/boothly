import React from 'react';
import { MdEvent, MdSms, MdEmail, MdRemoveRedEye } from "react-icons/md";


export default function EventDetails() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header - spans across */}
      <div className="w-full py-4 flex items-center justify-center" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}>
        <span className="text-white font-medium text-lg tracking-wide">bartholomew onogwu</span>
      </div>
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-3xl mx-auto px-4 pt-8 pb-16">
          {/* Event Title */}
          <h1 className="text-4xl font-extrabold text-black mb-2">Brand activation</h1>
          {/* Date */}
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
              <svg className="w-5 h-5 mr-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              Wednesday, August 20, 2025
            </span>
          </div>
          {/* Expiry and stats */}
          <div className="text-lg font-medium mb-4">0 photos/videos. Expires in 7 days</div>
          <div className="divide-y divide-gray-300 border border-gray-200 rounded-lg overflow-hidden mb-8">
            <div className="flex items-center px-4 py-3 justify-between">
              <span className="flex items-center gap-2"><MdEvent className="text-xl" /> Sessions</span>
              <span>0</span>
            </div>
            <div className="flex items-center px-4 py-3 justify-between">
              <span className="flex items-center gap-2"><MdSms className="text-xl" /> Shares via SMS</span>
              <span>0</span>
            </div>
            <div className="flex items-center px-4 py-3 justify-between">
              <span className="flex items-center gap-2"><MdEmail className="text-xl" /> Shares via Email</span>
              <span>0</span>
            </div>
            <div className="flex items-center px-4 py-3 justify-between">
              <span className="flex items-center gap-2"><MdRemoveRedEye className="text-xl" /> Session views</span>
              <span>0</span>
            </div>
          </div>
          {/* Check for uploads bar */}
          <div className="w-full bg-gray-100 rounded-full py-4 text-center text-gray-700 font-medium mb-8">
            Check for new uploads
          </div>
          {/* Action buttons */}
          <div className="flex gap-4 justify-center mb-8">
          <button className="text-white px-8 py-2 rounded-full font-medium flex items-center gap-2" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>View</button>
          <button className="text-white px-8 py-2 rounded-full font-medium" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}>Select</button>
          <button className="text-white px-8 py-2 rounded-full font-medium flex items-center gap-2" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>Menu</button>
          </div>
          {/* No uploads message */}
          <div className="text-center text-gray-500 text-lg">Nothing uploaded yet.</div>
        </div>
      </div>

        {/* Right Side Nav */}
        <aside className="w-80 min-h-screen bg-white border-l border-gray-200 flex flex-col py-8 px-6">
        <button className="text-white w-full py-3 rounded-lg font-semibold text-base mb-6" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}>Edit Event</button>
          <div className="flex flex-col gap-4 text-[#7C3AED] text-base font-medium">
            <a href="#" className="hover:underline">Sign in to Shared.Gallery</a>
            <a href="#" className="hover:underline">Copy Gallery Link</a>
            <a href="#" className="hover:underline">Export Guests (CSV)</a>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="flex flex-col gap-4 text-[#7C3AED] text-base font-medium">
            <a href="#" className="hover:underline">Duplicate Event</a>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="flex flex-col gap-4 text-[#7C3AED] text-base font-medium">
            <a href="#" className="hover:underline">Delete Event</a>
          </div>
        </aside>
      </div>
    </div>
  );
}
