import { BsArrowUpRight } from "react-icons/bs";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex items-center justify-center text-white">
      <div className="flex items-center px-10 w-[80%] h-[74px] justify-between rounded-[20px] backdrop-blur-[15px] shadow border-[1px] border-[#FFFFFF26] border-solid">
        {/* Logo */}
        <img src="/boothly.png" className="h-[23.4px] w-[94.9px]" />
        {/* Nav Items */}
        <div className="flex items-center gap-8">
          {[
            { label: "Home", id: "hero" },
           
            { label: "Watch a Demo", id: "video-demo" },
            { label: "Pricing", id: "pricing-section" },
            { label: "Contact", id: "footer" },
          ].map((item) => (
            <div
              key={item.id}
              className="p-[1.5px] rounded-xl "
              onClick={() => scrollToSection(item.id)}
            >
              <h5 className="cursor-pointer transition-colors hover:text-white hover:px-4 hover:py-2 hover:bg-black border-[] hover:shadow-lg rounded-xl px-4 py-2">
                {item.label}
              </h5>
            </div>
          ))}
        </div>
        {/* Button */}
        <button
          className="flex items-center gap-2 px-5 py-2 rounded-lg cursor-pointer font-semibold shadow transition bg-white hover:opacity-90"
          onClick={() => router.push('/signup')}
        >
          <span className="bg-gradient-to-r from-[#891F0C] to-[#040D34] bg-clip-text text-transparent">
            Try it
          </span>
          <BsArrowUpRight className="text-[#891F0C]" />
        </button>
      </div>
    </div>
  );
}