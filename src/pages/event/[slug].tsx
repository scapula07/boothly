import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../firebase/config';
import { MdEvent, MdSms, MdEmail, MdRemoveRedEye } from "react-icons/md";
import { userStore } from '@/recoil';
import { useRecoilValue } from 'recoil';
import { userApi } from '@/firebase/event';
import {QRCodeCanvas} from 'qrcode.react';

interface Event {
  creatorId: string;
  eventName: string;
  date: string;
}

export default function EventDetails() {
  const router = useRouter();
  const { slug } = router.query;
  const [event, setEvent] = useState<Event | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const currentUser = useRecoilValue(userStore);

  useEffect(() => {
    if (typeof slug === 'string') {
      const fetchEvent = async () => {
        const docRef = doc(db, 'events', slug);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent(docSnap.data() as Event);
        } else {
          console.error('No such event!');
        }
      };
      fetchEvent();
    }
  }, [slug]);

  const handleDelete = async () => {
    if (typeof slug === 'string') {
      setIsDeleting(true);
      const result = await userApi.deleteEvent(slug);
      if (result.success) {
        alert(result.message);
        router.push('/dashboard/events');
      } else {
        alert(result.message);
      }
      setIsDeleting(false);
    }
  };

  const boothUrl = `${globalThis.location?.origin}/playground/${slug}`;
  console.log(boothUrl, 'boothUrl....');
  const copyToClipboard = () => {
    navigator.clipboard.writeText(boothUrl);
    alert('Booth URL copied to clipboard!');
  };

  if (!event) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header - spans across */}
      <div className="w-full py-4 flex items-center justify-center" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}>
        <span className="text-white font-medium text-lg tracking-wide">{currentUser?.companyName}</span>
      </div>
      <div className="flex">
        {/* Main Content */}
        <div className="flex-1">
          <div className="max-w-3xl mx-auto px-4 pt-8 pb-16">
            {/* Event Title */}
            <h1 className="text-4xl font-extrabold text-black mb-2">{event.eventName}</h1>
            {/* Date */}
            <div className="flex items-center gap-2 mb-6">
              <span className="inline-flex items-center bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                {new Date(event.date).toDateString()}
              </span>
            </div>
            {/* Expiry and stats */}
            <div className="text-lg font-medium mb-4">Event details loaded successfully.</div>
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
              <button className="text-white px-8 py-2 rounded-full font-medium flex items-center gap-2" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View
              </button>
              <button className="text-white px-8 py-2 rounded-full font-medium" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}>
                Select
              </button>
              <button className="text-white px-8 py-2 rounded-full font-medium flex items-center gap-2" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                Menu
              </button>
            </div>
          </div>
        </div>

        {/* Right Side Nav */}
        <aside className="w-80 min-h-screen bg-white border-l border-gray-200 flex flex-col py-8 px-6 items-center">
          <button className="text-white w-full py-3 rounded-lg font-semibold text-base mb-6" style={{background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'}}>
            Edit Event
          </button>
          <div className="flex flex-col gap-4 text-[#7C3AED] text-base font-medium">
            <a href="#" className="hover:underline">Copy Gallery Link</a>
            <a href="#" className="hover:underline">Export Guests (CSV)</a>
          </div>
          <hr className="my-6 border-gray-200" />
          <div className="text-center mb-6 flex flex-col items-center">
            <QRCodeCanvas value={boothUrl} size={200} />
            <p className="text-lg text-gray-600 mt-4">Scan to open booth</p>
            <button
              className="mt-4 text-white px-6 py-3 rounded-full font-medium bg-blue-600 hover:bg-blue-700 transition-colors"
              onClick={copyToClipboard}
            >
              Copy Booth URL
            </button>
          </div>
          <div className="mt-4">
            <button
              className="text-white px-8 py-3 rounded-full font-medium bg-red-600 hover:bg-red-700 transition-colors"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? 'Deleting...' : 'Delete Event'}
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}
