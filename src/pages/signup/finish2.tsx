import { useState } from 'react';
import Image from 'next/image';
import { userApi } from '@/firebase/user';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '@/firebase/config';
import { userStore } from '@/recoil';
import { useRecoilValue } from 'recoil';
import { useRouter } from 'next/router';
import AuthGuard from '@/components/AuthGuard';

export default function SignupFinish() {
  const currentUser = useRecoilValue(userStore);
  const router = useRouter();
  const [formData, setFormData] = useState({
    companyName: '',
    industry: '',
    discovery: ''
  });
  const [errors, setErrors] = useState({
    companyName: '',
    industry: '',
    discovery: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.industry) newErrors.industry = 'Industry is required';
    if (!formData.discovery) newErrors.discovery = 'Discovery method is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (!currentUser || !currentUser.id) {
      alert('User is not logged in. Please log in and try again.');
      return;
    }

    setIsLoading(true);
    try {
      const response = await userApi.updateUserInfo(currentUser.id, {
        companyName: formData.companyName,
        industry: formData.industry,
        discovery: formData.discovery
      });
    //   alert(response.message);
      if (response.success) {
        router.push('/dashboard');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <AuthGuard>
      <div className="w-screen h-screen flex bg-[#f6f4fa]">
        {/* Left Side */}
        <div className="w-[420px] flex flex-col justify-center items-center px-10 border-r border-[#e5e3ee] bg-[#f6f4fa]">
          <div className="w-full">
            <div className="text-[2rem] font-bold text-[#3d3472] mb-2">Booth<span className="text-[#6c63ff]">.Events</span></div>
            <div className="text-3xl font-semibold text-[#2d2d2d] leading-tight mb-8 mt-8">A better<br/>experience in<br/>any event.</div>
          </div>
          <div className="mt-8">
            <Image src="/booth-illustration.png" alt="Illustration" width={220} height={180} />
          </div>
        </div>
        {/* Right Side */}
        <div className="flex-1 flex flex-col justify-center px-12 bg-white">
          <div className="max-w-xl mx-auto w-full">
            <h1 className="text-3xl font-bold mb-2 mt-6 text-[#2d2d2d]">Are you a business?</h1>
            <p className="mb-8 text-gray-700 text-lg">Provide a little bit of information to help our team look up your account when you reach out.</p>
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-base font-semibold mb-1 text-[#2d2d2d]">Company Name <span className="text-gray-400 font-normal">Optional</span></label>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company Name"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#a78bfa]"
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>
              <div>
                <label className="block text-base font-semibold mb-1 text-[#2d2d2d]">Industry</label>
                <select
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#a78bfa]"
                >
                  <option value="">Select Industry</option>
                  <option>Events</option>
                  <option>Hospitality</option>
                  <option>Marketing</option>
                  <option>Education</option>
                  <option>Other</option>
                </select>
                {errors.industry && <p className="text-red-500 text-sm mt-1">{errors.industry}</p>}
              </div>
              <div>
                <label className="block text-base font-semibold mb-1 text-[#2d2d2d]">How did you discover us?</label>
                <select
                  name="discovery"
                  value={formData.discovery}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 text-base focus:outline-none focus:ring-2 focus:ring-[#a78bfa]"
                >
                  <option value="">Select an option</option>
                  <option>Google Search</option>
                  <option>Social Media</option>
                  <option>Referral</option>
                  <option>Event/Conference</option>
                  <option>Advertisement</option>
                  <option>Other</option>
                </select>
                {errors.discovery && <p className="text-red-500 text-sm mt-1">{errors.discovery}</p>}
              </div>
              <div className="flex items-center gap-6 mt-8">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-lg bg-[#6ed3f7] text-[#1a3c4c] font-semibold text-lg hover:bg-[#4ca1af] transition"
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Next'}
                </button>
                <button type="button" className="text-[#6c63ff] underline text-base">Skip</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
