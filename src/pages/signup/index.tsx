import { useState } from 'react';
import { authApi } from '@/firebase/auth';
import Image from 'next/image';
import { FcGoogle } from "react-icons/fc";
import { useRouter } from 'next/router';
import Notification from '@/components/Notification';

export default function Signup() {
  const [googleLoading, setGoogleLoading] = useState(false);
  const [emailLoading, setEmailLoading] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  const router = useRouter();

  const handleGoogleSignup = async () => {
    setGoogleLoading(true);
    try {
      const user = await authApi.googleAuth(null);
      console.log('User signed up:', user);
      localStorage.clear();
      localStorage.setItem('user',JSON.stringify(user));
      setNotification({ message: 'Signup successful!', type: 'success' });
      router.push('/signup/finish2'); // Redirect on successful signup
    } catch (error) {
      console.error('Error during Google signup:', error);
      setNotification({ message: 'Google signup failed. Please try again.', type: 'error' });
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleEmailAuth = async (email: string) => {
    setEmailLoading(true);
    try {
      const response = await authApi.handleEmailOnlyAuth(email);
      console.log('Email auth response:', response);
      setNotification({ message: 'Sign-in link sent to your email!', type: 'success' });
    } catch (error) {
      console.error('Error during email authentication:', error);
      setNotification({ message: 'Failed to send sign-in link. Please try again.', type: 'error' });
    } finally {
      setEmailLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex bg-white">
      {notification && <Notification message={notification.message} type={notification.type} />}
      <div className="flex flex-1 h-full rounded-none shadow-none overflow-hidden">
        {/* Left Side: Signup Form */}
        <div className="flex flex-col justify-center px-12 py-10 bg-white w-full max-w-md h-full">
          {/* Logo */}
          <div className="mb-8">
            <Image src="/favicon.ico" alt="Lovable Logo" width={40} height={40} />
          </div>
          <h2 className="text-2xl font-bold mb-6">Create your account</h2>
          <button
            className="w-full flex items-center justify-center gap-2 py-3 mb-3 rounded-lg border border-gray-200 bg-gray-50 hover:bg-gray-100 font-medium text-gray-800"
            onClick={handleGoogleSignup}
            disabled={googleLoading}
          >
            {googleLoading ? 'Signing in...' : <><FcGoogle size={20} /> Continue with Google</>}
          </button>
          <div className="flex items-center my-4">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="mx-3 text-gray-400 text-sm">OR</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <label className="block mb-2 text-sm font-medium text-gray-700">Email</label>
          <input type="email" placeholder="Email" className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 mb-2" />
          <button
            className="w-full py-3 rounded-lg bg-black text-white font-semibold hover:bg-gray-900 transition mb-2"
            onClick={() => handleEmailAuth('user@example.com')} // Replace with actual email input
            disabled={emailLoading}
          >
            {emailLoading ? 'Processing...' : 'Continue'}
          </button>
          <p className="text-sm text-gray-500">Already have an account? <a href="/login" className="underline">Log in</a></p>
        </div>
        {/* Right Side: Gradient and Chat Input */}
        <div className="flex-1 flex items-center justify-center bg-gradient-to-br from-[#f8fafc] via-[#e0e7ff] to-[#fbc2eb] relative h-full">
          {/* Chat Input Box */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[370px]">
            <div className="flex items-center bg-white/80 rounded-xl shadow-lg px-6 py-4">
              <input
                type="text"
                className="flex-1 bg-transparent border-none outline-none text-lg text-gray-700 placeholder-gray-500"
                placeholder="Ask Lovable to build dash"
                value="Ask Lovable to build dash"
                readOnly
              />
              <button className="ml-3 p-2 rounded-full bg-black hover:bg-gray-900 transition">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
