import { useRecoilValue } from 'recoil';
import { userStore } from '@/recoil';

interface HeaderProps {
  onMenuToggle: () => void;
}

export function Header({ onMenuToggle }: HeaderProps) {
  const currentUser = useRecoilValue(userStore);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(); // Reload the page to reset the app state
  };

  return (
    <header className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button 
          onClick={onMenuToggle}
          className="text-gray-500 hover:text-gray-700 md:hidden"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div className="text-gray-700 font-semibold text-sm md:text-base truncate">Welcome, {currentUser?.email || 'User'}</div>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
        </button>
          <h5 className='border-[#a42569] border rounded-full font-bold text-xl h-10 w-10  flex items-center justify-center'>{currentUser?.email?.slice(0,1)?.toUpperCase()}</h5>    
      </div>
    </header>
  );
}