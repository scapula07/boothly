import Image from 'next/image';

export default function VerifyEmail() {
  return (
    <div className="w-screen h-screen flex bg-[#f6f4fa]">
      {/* Left Side */}
      <div className="w-[420px] flex flex-col justify-center items-center px-10 border-r border-[#e5e3ee] bg-[#f6f4fa] min-h-full">
        <div className="w-full">
          <div className="text-[2rem] font-bold text-[#3d3472] mb-2">Booth<span className="text-[#6c63ff]">.Events</span></div>
          <div className="text-3xl font-semibold text-[#2d2d2d] leading-tight mb-8 mt-8">A better<br/>experience in<br/>any event.</div>
        </div>
        <div className="mt-8">
          <Image src="/booth-illustration.png" alt="Illustration" width={220} height={180} />
        </div>
      </div>
      {/* Right Side */}
      <div className="flex-1 flex flex-col justify-center px-12 bg-white relative">
        <div className="max-w-2xl mx-auto w-full">
          <div className="flex justify-end">
            <a href="#" className="text-[#6c63ff] font-semibold hover:underline text-base">Sign Out</a>
          </div>
          <h1 className="text-4xl font-bold mt-8 mb-6 text-[#222]">Verify your e-mail address</h1>
          <div className="text-lg text-gray-700 mb-2">Email sent to bartholomewonogwu@yahoo.com.</div>
          <div className="text-lg text-gray-700 mb-2">Check your inbox and use the link in the email to verify.</div>
          <div className="text-lg text-gray-700 mb-6">If you did not receive the email, wait 5 minutes and refresh this page to reset the send button.</div>
          <button className="bg-gray-200 text-gray-500 font-semibold py-2 px-6 rounded-lg mb-8 cursor-not-allowed" disabled>Email Sent</button>
          <div className="flex gap-8 mt-2 text-[#6c63ff] text-base">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Terms of use</a>
          </div>
        </div>
      </div>
    </div>
  );
}
