import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Playground from '@/components/Playground';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';

interface Event {
  id: string;
  name: string;
  date: string;
  primaryColor?: string;
  accentColor?: string;
  gradientFrom?: string;
  gradientTo?: string;
  ctaText?: string;
  [key: string]: any; // Add additional fields as needed
}

export default function TenantPlaygroundPage() {
  const router = useRouter();
  const { tenant } = router.query;
  const [event, setEvent] = useState<Event | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      if (typeof tenant === 'string') {
        const docRef = doc(db, 'events', tenant);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setEvent({
            id: tenant as string, // Ensure compatibility with TenantId
            name: data.eventName || 'Default Name',
            date: data.date || new Date().toISOString(),
            primaryColor: data.primaryColor || '#000000',
            accentColor: data.accentColor || '#FFFFFF',
            gradientFrom: data.gradientFrom || '#000000',
            gradientTo: data.gradientTo || '#FFFFFF',
            ctaText: data.ctaText || 'Click Here',
            ...data,
          } as Event);
        } else {
          console.error('No such event!');
        }
      }
    };

    fetchEvent();
  }, [tenant]);
   console.log(event, 'event....');
  if (!event) {
    return <div>Loading...</div>;
  }

  return <Playground tenant={event} />;
}