import { BsArrowRight } from "react-icons/bs";

type CTAProps = {
  onTryItClick?: () => void;
};

export default function CTA({ onTryItClick }: CTAProps) {
  return (
    <div className="flex flex-col justify-center absolute bottom-0  w-full h-full text-white">
      <div className="flex flex-col items-center w-full ">
        <p className="text-[58px] font-bold text-center w-[60%]">Create Pro Event Videos in Seconds, Not Weeks</p>
        <h5 className="text-[16px]  w-[58%]">Real-time AI video booths that turn your attendees into brand storytellers — no editing, no waiting.</h5>
      </div>
      <div className="flex flex-col items-center py-6 space-y-6">
        <button
          className="flex items-center cursor-pointer text-lg gap-2 px-5 py-2 rounded-full font-semibold shadow transition bg-white hover:opacity-90"
          onClick={onTryItClick}
        >
          <span className="bg-gradient-to-r from-[#891F0C] to-[#040D34] bg-clip-text text-transparent">
            Create your videos, It’s free
          </span>
          <BsArrowRight className="text-[#891F0C]" />
        </button>
        <div className="flex items-center space-x-2">
          <img src={"/community.png"} className="w-[152px] h-[40px]"/>
          <h5 className="text-[16px]">Join our community</h5>
        </div>
      </div>
      <div className="flex items-center pt-20 h-80 w-full absolute bottom-0 justify-center gap-x-4">
        <img src="/2.png" alt="img2" className="h-[250px] w-[199px]" />
        <img src="/3.png" alt="img3" className="h-[300px] w-[239px]" />
        <img src="/4.png" alt="img4" className="h-[350px] w-[278px]" />
        <img src="/5.png" alt="img5" className="h-[239px] w-[300px]" />
        <img src="/1.png" alt="img1" className="h-[199px] w-[250px]" />
      </div>
    </div>
  );
}