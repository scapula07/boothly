import { useRouter } from 'next/router';

export function Sidebar() {
  const router = useRouter();
  const isActive = (href: string) => {
    if (href === '/dashboard') {
      return router.pathname === '/dashboard';
    }
    return router.pathname === href || router.pathname.startsWith(href + '/');
  };
  return (
    <aside className="w-64 h-full bg-white border-r border-gray-200 flex flex-col py-8 px-4 shadow-md">
      <div className="flex items-center justify-center w-full gap-2 mb-10 px-2">
        {/* <img src="/Boothly.png" alt="Logo" className="h-8 w-auto" /> */}
        <span className="font-bold text-4xl text-gray-900">Boothly</span>
      </div>
      <nav className="flex-1 flex flex-col gap-2">
        <a
          href="/dashboard"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive('/dashboard') ? 'bg-[#f3e7e3] text-[#891F0C]' : 'text-gray-800 hover:bg-gray-100'}`}
        >
          <svg className="w-5 h-5 text-[#891F0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6" /></svg>
          Dashboard
        </a>
        <a
          href="/dashboard/events"
          className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition ${isActive('/dashboard/events') ? 'bg-[#f3e7e3] text-[#891F0C]' : 'text-gray-800 hover:bg-gray-100'}`}
        >
          <svg className="w-5 h-5 text-[#891F0C]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
          Events
        </a>
      </nav>
    </aside>
  );
}