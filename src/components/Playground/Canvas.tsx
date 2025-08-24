
import React from 'react';
import Toolbar from './Toolbar';
import BrowserWhipStreamer from './browserWhip';
import { createStream, updatePrompt } from '@/lib/api';
import { useState , useRef,useEffect} from 'react';

type CanvasProps = {
  mainSrc: string;
  insetSrc: string;
  streamData: any;
  setStreamData: (data: any) => void;
};


export default function Canvas({ mainSrc, insetSrc, streamData, setStreamData }: CanvasProps) {
  // If mainSrc is a lvprtv url, render as iframe, else fallback to video
  const isLvprtv = mainSrc && mainSrc.includes('lvprtv');
  const [loading, setLoading] = useState(false);
  // streamData and setStreamData are now props from parent
  const videoRef = useRef<HTMLVideoElement>(null); // input camera
  const outputVideoRef = useRef<HTMLVideoElement>(null); // output (iframe) feed
  // Photo Booth state removed
  const [streaming, setStreaming] = useState(false);
  const [wandOpen, setWandOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [promptLoading, setPromptLoading] = useState(false);

  async function startStreaming() {
    try {
      // Get camera + mic
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      //  Create WebRTC PeerConnection
      const pc = new RTCPeerConnection();

      // Add tracks to the connection
      mediaStream.getTracks().forEach((track) => {
        pc.addTrack(track, mediaStream);
      });

      // Create data channel (optional)
      pc.createDataChannel("chat");

      // Create SDP Offer
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

      // Send offer to WHIP endpoint
      const sdpResponse = await fetch(streamData?.whip_url, {
        method: "POST",
        headers: {
          "Content-Type": "application/sdp",
        },
        body: offer.sdp,
      });

      if (!sdpResponse.ok) throw new Error("WHIP Offer failed");

      const answerSDP = await sdpResponse.text();
      await pc.setRemoteDescription({
        type: "answer",
        sdp: answerSDP,
      });

      setStreaming(true);
      console.log("✅ Streaming started to WHIP URL");
    } catch (err) {
      console.error("❌ Error starting WHIP stream:", err);
    }
  }
  async function handleCreate() {
    setLoading(true);
    try {
      const data = await createStream();
      setStreamData(data);
    } catch (e) {
      console.error(e);
      alert('Error creating stream');
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="relative rounded-xl overflow-hidden border border-black/10 bg-black/5 h-full w-full">
      {/* Loading overlay */}
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin w-10 h-10 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="text-white font-semibold">Loading...</span>
          </div>
        </div>
      )}
      {/* Output (pre-render) as iframe if lvprtv url, else video */}
      <iframe
        src={`https://lvpr.tv/?v=${streamData?.output_playback_id}`}
        className="absolute inset-0 w-full h-full"
        style={{ border: 'none' }}
        allow="autoplay; encrypted-media"
        allowFullScreen
      ></iframe>
      <div className="absolute top-10 right-6 z-10">
        <Toolbar />
      </div>
      {/* Input video (inset) + Photo Booth */}
      <div className="absolute left-8 bottom-16 z-10 flex flex-col items-center">
        <div className="rounded-xl overflow-hidden border border-black/10 shadow-lg relative">
          <BrowserWhipStreamer whipUrl={streamData?.whip_url} videoRef={videoRef} />
        </div>
      </div>
      {/* Magic Wand Prompt card center-bottom, collapsible */}
      {wandOpen ? (
        <div className="absolute left-1/2 -translate-x-1/2 bottom-16 z-10">
          <div className="rounded-2xl bg-white/10 backdrop-blur-lg border border-white/30 shadow w-[340px] px-0 py-0 overflow-hidden relative" style={{boxShadow: '0 4px 32px 0 rgba(0,0,0,0.18)'}}>
            {/* Title row */}
            <div className="flex items-center justify-between px-5 pt-4 pb-2">
              <div className="flex items-center gap-2 text-white font-medium text-lg">
                Magic Wand
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth={2} strokeLinecap="round" d="M3 21l9-9" />
                  <path strokeWidth={2} strokeLinecap="round" d="M15 6l3-3M12 3l1-1M20 10l1-1" />
                </svg>
              </div>
              <button
                className="ml-2 p-1 rounded-full hover:bg-white/20"
                onClick={() => setWandOpen(false)}
                aria-label="Collapse Magic Wand"
              >
                {/* X (close) icon */}
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="6" y1="6" x2="18" y2="18" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>
            {/* Divider */}
            <div className="w-full h-px bg-white/30" />
            {/* Input */}
            <form
              className="w-full px-5 pt-3 pb-5"
              onSubmit={async (e) => {
                e.preventDefault();
                if (!prompt.trim() || !streamData?.id) return;
                setPromptLoading(true);
                try {
                  await updatePrompt(streamData.id, { prompt });
                  setPrompt('');
                } catch (err) {
                  alert('Failed to update prompt');
                } finally {
                  setPromptLoading(false);
                }
              }}
            >
              <textarea
                className="w-full min-h-[32px] max-h-32 resize-none overflow-auto bg-transparent text-white placeholder:text-white/80 focus:outline-none text-base font-normal"
                placeholder="Make a prompt and we'll make it come true..."
                value={prompt}
                onChange={e => {
                  setPrompt(e.target.value);
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                }}
                disabled={promptLoading}
                rows={1}
              />
              <button
                type="submit"
                className="absolute right-8 bottom-7 rounded-full bg-white/20 p-2 border border-white/30 shadow flex items-center justify-center hover:bg-white/40 transition-colors text-white disabled:opacity-50"
                disabled={promptLoading || !prompt.trim()}
                aria-label="Send Prompt"
                style={{marginTop: '-40px'}}
              >
                {promptLoading ? (
                  <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <div className="absolute bottom-4 right-8 z-20 group">
          <button
            className="rounded-full bg-black/5 p-3 border border-white/40 shadow flex items-center justify-center hover:bg-black transition-colors"
            onClick={() => setWandOpen(true)}
            aria-label="Expand Magic Wand"
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeWidth={2} strokeLinecap="round" d="M3 21l9-9" />
              <path strokeWidth={2} strokeLinecap="round" d="M15 6l3-3M12 3l1-1M20 10l1-1" />
            </svg>
          </button>
          <span className="absolute right-0 bottom-full mb-2 px-2 py-1 rounded bg-black/80 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">Show Magic Wand</span>
        </div>
      )}
      {/* Bottom actions */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-6 z-10">
        {/* Show only Start Capture if no streamData, else show Camera and Record icons */}
        {!streamData ? (
          <button
            onClick={handleCreate}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#891F0C] to-[#040D34] text-white font-semibold shadow-lg text-lg flex items-center gap-2"
            disabled={loading}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h3l2-2h6l2 2h3v12H4V7z" />
            </svg>
            Start Capture
          </button>
        ) : (
          <>
            <div className="relative group">
              <button
                onClick={startStreaming}
                className="w-12 h-12 rounded-full bg-black/5 backdrop-blur border border-white/40 flex items-center justify-center hover:bg-black transition-colors"
                disabled={loading || streaming}
                aria-label="Start Camera Stream"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7h3l2-2h6l2 2h3v12H4V7z" />
                </svg>
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-black/80 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">Start Camera Stream</span>
            </div>
            <div className="relative group">
              <button
                onClick={() => {}}
                className="w-12 h-12 rounded-full bg-black/5 backdrop-blur border border-white/40 flex items-center justify-center hover:bg-black transition-colors"
                disabled
                aria-label="Record (disabled placeholder)"
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A1 1 0 0120 13.17v.66a1 1 0 01-.447.894L15 17V10zM4 9h8v8H4z" />
                </svg>
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-black/80 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">Record (coming soon)</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}