import { useRecoilValue } from 'recoil';
import { userStore } from '@/recoil';

export function Header() {
  const currentUser = useRecoilValue(userStore);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload(); // Reload the page to reset the app state
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white border-b border-gray-200">
      <div className="text-gray-700 font-semibold">Welcome, {currentUser?.email || 'User'}</div>
      <div className="flex items-center gap-6">
        <button onClick={handleLogout} className="text-gray-500 hover:text-red-500 transition">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7" />
          </svg>
        </button>
          <h5 className='border-[#a42569] border rounded-full font-bold text-xl h-10 w-10  flex items-center justify-center'>{currentUser?.email?.slice(0,1)?.toUpperCase()}</h5>    
      </div>
    </header>
  );
}