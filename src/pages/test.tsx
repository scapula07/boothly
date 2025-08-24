// pages/index.tsx
import { useState } from 'react';
import CreateStream from '@/components/createStream';
import StreamPlayer from '@/components/streamPlayer';
import PromptForm from '@/components/promptForm';
import BrowserWhipStreamer from '@/components/Playground/browserWhip';
export default function Home() {
  const [streamData, setStreamData] = useState<any>(null);

  return (
    <main style={{ padding: '2rem' }} className='w-full flex space-x-10'>
       <div>
              {!streamData ? (
                <CreateStream onStreamReady={setStreamData} />
              ) : (
                <>
                  <p>
                    <strong>Stream ID:</strong> {streamData.id}
                  </p>
                  <p>
                    <strong>WHIP URL:</strong> {streamData.whip_url}
                  </p>  
          
                  <StreamPlayer playbackId={streamData.output_playback_id} />
                  <PromptForm streamId={streamData.id} />
                </>
              )}

       </div>
 
      {streamData && (
  <>
  
        {/* <BrowserWhipStreamer whipUrl={streamData.whip_url} /> */}
  </>
)}
    </main>
  );
}
