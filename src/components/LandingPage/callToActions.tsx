import { BsArrowRight } from "react-icons/bs";

type CTAProps = {
  onTryItClick?: () => void;
};

export default function CTA({ onTryItClick }: CTAProps) {
  return (
    <div className="flex flex-col justify-center absolute bottom-0 w-full h-full text-white px-4">
      <div className="flex flex-col items-center w-full">
        <p className="text-3xl sm:text-4xl md:text-5xl lg:text-[58px] font-bold text-center w-full sm:w-[80%] md:w-[70%] lg:w-[60%] leading-tight mb-4">
          Create Pro Event Videos in Seconds, Not Weeks
        </p>
        <h5 className="text-sm sm:text-[16px] w-full sm:w-[80%] md:w-[70%] lg:w-[58%] text-center">
          Real-time AI video booths that turn your attendees into brand storytellers — no editing, no waiting.
        </h5>
      </div>
      <div className="flex flex-col items-center py-6 space-y-6 mt-4">
        <button
          className="flex items-center cursor-pointer text-base sm:text-lg gap-2 px-4 sm:px-5 py-2 rounded-full font-semibold shadow transition bg-white hover:opacity-90 w-full sm:w-auto"
          onClick={onTryItClick}
        >
          <span className="bg-gradient-to-r from-[#891F0C] to-[#040D34] bg-clip-text text-transparent">
            Create your videos, It's free
          </span>
          <BsArrowRight className="text-[#891F0C]" />
        </button>
        <div className="flex items-center space-x-2 flex-wrap justify-center">
          <img src={"/community.png"} className="w-[120px] sm:w-[152px] h-auto sm:h-[40px]" alt="Community" />
          <h5 className="text-sm sm:text-[16px]">Join our community</h5>
        </div>
      </div>
      <div className="hidden sm:flex items-center pt-10 sm:pt-20 h-60 sm:h-80 w-full absolute bottom-0 justify-center gap-x-2 md:gap-x-4 overflow-x-auto">
        <img src="/2.png" alt="img2" className="h-[180px] sm:h-[250px] w-auto sm:w-[199px] object-contain" />
        <img src="/3.png" alt="img3" className="h-[200px] sm:h-[300px] w-auto sm:w-[239px] object-contain" />
        <img src="/4.png" alt="img4" className="h-[220px] sm:h-[350px] w-auto sm:w-[278px] object-contain" />
        <img src="/5.png" alt="img5" className="h-[180px] sm:h-[239px] w-auto sm:w-[300px] object-contain" />
        <img src="/1.png" alt="img1" className="h-[160px] sm:h-[199px] w-auto sm:w-[250px] object-contain" />
      </div>
    </div>
  );
}