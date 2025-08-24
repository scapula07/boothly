export default function Features({ id }: { id?: string }) {
  return (
    <div id={id} className="w-full flex flex-col items-center p-20 space-y-10">
             <div className="flex flex-col w-[100%] items-center space-y-8">
                     <h5 className="text-[40px] w-full font-[600] flex flex-col items-center">
                        <span>From Booth to Branded Masterpiece in Under</span>
                         <span>10 Seconds</span>
                    </h5>
                     <p className="w-[60%] font-[500] text-[16px] text-center">AI-crafted videos, perfectly styled for your brand and ready to share, before your guest even leaves the booth.</p>
             </div>
             <div className="w-full flex items-center space-x-10">
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
                         <div className="flex flex-col space-y-5 ">
                            <img src={item.image} alt={item.title} className="w-[390px] h-[220px] rounded-xl object-cover" />
                            <h5 className="text-[20px] font-[600]">{item.title}</h5>
                            <p className="text-[16px] font-[500]">{item.description}</p>
                         </div>
                      )
                  })

                  }
                   
            </div>

    </div>
  );
}