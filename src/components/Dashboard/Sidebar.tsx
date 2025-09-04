import { useRouter } from 'next/router';

interface SidebarProps {
  isMobileMenuOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isMobileMenuOpen, onClose }: SidebarProps) {
  const router = useRouter();
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return router.pathname === '/dashboard';
    }
    return router.pathname === href || router.pathname.startsWith(href + '/');
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}
      
      <aside 
        className={`fixed md:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col py-4 md:py-8 px-4 shadow-md transform transition-transform duration-300 md:transform-none ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex items-center justify-between w-full gap-2 mb-6 md:mb-10 px-2">
          {/* <img src="/Boothly.png" alt="Logo" className="h-6 md:h-8 w-auto" /> */}
          <span className="font-bold text-2xl md:text-4xl text-gray-900">Boothly</span>
          {/* Mobile close button */}
          <button 
            onClick={onClose}
            className="md:hidden text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <nav className="flex-1 flex flex-col gap-2">
          <a
            href="/dashboard"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive('/dashboard') ? 'bg-[#292524] text-white' : 'text-gray-800 hover:bg-[#292524] hover:text-white'}`}
            onClick={(e) => {
              e.preventDefault();
              router.push('/dashboard');
              onClose();
            }}
          >
            <svg className={`w-5 h-5 ${isActive('/dashboard') ? 'text-white' : 'text-[#292524]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" /></svg>
            Dashboard
          </a>
          <a
            href="/dashboard/events"
            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive('/dashboard/events') ? 'bg-[#292524] text-white' : 'text-gray-800 hover:bg-[#292524] hover:text-white'}`}
            onClick={(e) => {
              e.preventDefault();
              router.push('/dashboard/events');
              onClose();
            }}
          >
            <svg className={`w-5 h-5 ${isActive('/dashboard/events') ? 'text-white' : 'text-[#292524]'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Events
          </a>
        </nav>
      </aside>
    </>
  );
}