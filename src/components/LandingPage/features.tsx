export default function Features({ id }: { id?: string }) {
  return (
    <div id={id} className="w-full flex flex-col items-center p-6 sm:p-10 md:p-20 space-y-8 sm:space-y-10">
             <div className="flex flex-col w-full items-center space-y-6 sm:space-y-8">
                     <h5 className="text-2xl sm:text-3xl md:text-[40px] w-full font-[600] flex flex-col items-center text-center">
                        <span>From Booth to Branded Masterpiece in Under</span>
                        <span>10 Seconds</span>
                    </h5>
                     <p className="w-full sm:w-[80%] md:w-[70%] lg:w-[60%] font-[500] text-sm sm:text-[16px] text-center">AI-crafted videos, perfectly styled for your brand and ready to share, before your guest even leaves the booth.</p>
             </div>
             <div className="w-full flex flex-col md:flex-row items-center gap-8 md:gap-10">
                  {[
                    {
                      title: "Step in the Booth",
                      description: "Hop into the AI-powered booth right from your browser, no download, no drama.",
                      image: "/f1.png"
                    },
                    {
                      title: "Give a Prompt/ Style",
                      description:"Pick from presets or describe the aesthetic you want, retro, cinematic, branded, whatever.",
                      image: "/f2.png"
                    },
                    {
                      title: "Download & Share Instantly",
                      description: "No edits needed, your video is polished, branded, and sized for social.",
                      image: "/f3.png"
                    }

                     ]?.map((item)=>{
                      return(
                         <div className="flex flex-col space-y-4 sm:space-y-5">
                            <img src={item.image} alt={item.title} className="w-full sm:w-[340px] md:w-[390px] h-[180px] sm:h-[200px] md:h-[220px] rounded-xl object-cover" />
                            <h5 className="text-lg sm:text-xl md:text-[20px] font-[600]">{item.title}</h5>
                            <p className="text-sm sm:text-base md:text-[16px] font-[500] text-gray-700">{item.description}</p>
                         </div>
                      )
                  })

                  }
                   
            </div>

    </div>
  );
}