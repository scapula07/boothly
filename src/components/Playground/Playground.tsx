import React, { useState } from 'react';
import type { TenantConfig } from '@/lib/tenants';
import Header from './Header';
import Controls from './Controls';
import Workstation from './Workstation';


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

export default function Playground({ tenant }: { tenant: Event }) {
  const [prompt, setPrompt] = useState('Create a 10s hype clip with bold captions and fast cuts.');

  return (
    <div className="min-h-screen" >
      <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <Header tenant={tenant} />
        <Workstation tenant={tenant}/>
        {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Controls tenant={tenant} prompt={prompt} setPrompt={setPrompt} />
          <div className="hidden lg:block" />
        </div> */}
      </div>
    </div>
  );
}