import { useState } from 'react';

import Canvas from './Canvas';
import ThumbnailRail from './ThumbnailRail';
import BrowserWhipStreamer from './browserWhip';
import { updatePrompt } from '@/lib/api';

export default function Workstation() {
  const [streamData, setStreamData] = useState<any>(null);

  // Handler for thumbnail prompt selection
  async function handleSelectPrompt(prompt: string) {
    if (streamData?.id && prompt) {
      try {
        await updatePrompt(streamData.id, { prompt });
      } catch (e) {
        // Optionally handle error
        console.error('Failed to update prompt from thumbnail:', e);
      }
    }
  }

  return (
    <div className="rounded-[28px] p-6">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
        <div className="flex flex-col gap-4">
          <Canvas
            mainSrc={streamData ? streamData.whip_url : "/work-main.jpg"}
            insetSrc="/work-inset.jpg"
            streamData={streamData}
            setStreamData={setStreamData}
          />
        </div>
        <ThumbnailRail onSelectPrompt={handleSelectPrompt} />
      </div>
    </div>
  );
}