import React from 'react';

export default function Footer({ id }: { id?: string }) {
  const quickLinks = ['Why Us', 'Mission', 'Works', 'Services', 'About Us', 'Articles'];

  return (
    <footer id={id} className="w-full bg-[#F3F4F7]">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Top brand */}
        <div className="text-2xl font-extrabold text-gray-900 mb-4">Boothly</div>

        {/* Divider */}
        <div className="h-px w-full bg-gray-200 mb-8" />

        {/* Grid content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Address */}
          <div>
            <h4 className="text-gray-900 font-semibold mb-3">Address</h4>
            <p className="text-gray-600">2972 Westheimer Rd. Santa Ana,</p>
            <p className="text-gray-600">Illinois 85486</p>
            <p className="text-gray-400 text-sm mt-8">© 2025 — Copyright</p>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-2">
            <h4 className="text-gray-900 font-semibold mb-3">Quick Links</h4>
            <ul className="grid grid-cols-2 gap-y-2 text-gray-600">
              {quickLinks.map((link) => (
                <li key={link} className="hover:text-gray-900 cursor-pointer">
                  {link}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Social */}
          <div className="flex flex-col gap-4 justify-between">
            <div>
              <h4 className="text-gray-900 font-semibold mb-3">Contact us</h4>
              <p className="text-gray-600">+1 891 989-11-91</p>
              <p className="text-gray-600">help@gwid.io</p>
            </div>

            <div className="flex items-center gap-3">
              {[
                { name: 'instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                { name: 'facebook', path: 'M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987H7.898v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z' },
                { name: 'youtube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' }
              ].map((icon) => (
                <div key={icon.name} className="w-9 h-9 rounded-full bg-white flex items-center justify-center shadow border border-gray-200">
                  <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                    <path d={icon.path} />
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll to top */}
        <div className="relative">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center shadow-lg hover:bg-gray-700"
            aria-label="Scroll to top"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}