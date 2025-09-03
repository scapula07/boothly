import React from 'react';
import type { TenantConfig } from '@/lib/tenants';

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

export default function Header({ tenant }: { tenant: Event }) {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        {/* {tenant.logoSrc && (
          <img src={tenant.logoSrc} alt={`${tenant.name} logo`} className="w-8 h-8 rounded" />
        )} */}
        <h1 className="text- text-xl font-semibold">{tenant.name} Booth</h1>
      </div>
      {/* <button
        className="px-4 py-2 rounded-lg text-white font-semibold"
        style={{ background: tenant.accentColor }}
      >
        {tenant.ctaText}
      </button> */}
    </div>
  );
}