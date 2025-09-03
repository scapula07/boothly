import React, { useState } from 'react';
import Layout from '@/components/Dashboard/Layout';
import Events from '@/components/Dashboard/Events';
// import ImageUpload from '@/components/Dashboard/ImageUpload';


export default function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <Layout>
      <div className="space-y-6">
        <h1 className="text-3xl font-semibold text-gray-900">Dashboard</h1>
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-light text-gray-900 mb-4">Quick Actions</h2>
            <div className="space-y-3">
              <button
                className="w-full text-white px-4 py-2 rounded-lg transition-colors cursor-pointer"
                style={{
                  background: 'linear-gradient(88.56deg, #891F0C 34.23%, #040D34 96.67%)'
                }}
                onClick={() => {
                  window.location.href = '/dashboard/events';
                }}
              >
                Start New Event
              </button>
              <button className="w-full bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors">
                Upload Media
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h2 className="text-lg font-light text-gray-900 mb-4">Recent Activity</h2>
            <p className="text-gray-500">No recent activity</p>
          </div>
        </div>
        {/* Modal moved to Events page */}
      </div>
    </Layout>
  );
}