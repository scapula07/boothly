import React, { useState, useRef, ReactElement } from 'react';
import Toolbar from './Toolbar';
import BrowserWhipStreamer from './browserWhip';
import { createStream, updatePrompt } from '@/lib/api';
import { uploadFile } from '@/firebase/upload';
import { userApi } from '@/firebase/event';

interface CanvasProps {
  mainSrc: string;
  insetSrc: string;
  streamData: any;
  setStreamData: (data: any) => void;
  onViewChange: any;
  currentView: any;
  tenant: {
    id: string;
    eventName: string;
    recordings?: string[];
    [key: string]: any;
  };
}

const Canvas: React.FC<CanvasProps> = ({ mainSrc, insetSrc, streamData, setStreamData, currentView, onViewChange, tenant }) => {
  const [loading, setLoading] = useState(false);
  const [streaming, setStreaming] = useState(false);
  const [wandOpen, setWandOpen] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [promptLoading, setPromptLoading] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isTabOpened, setIsTabOpened] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const outputVideoRef = useRef<HTMLVideoElement>(null);
  const peerConnectionRef = useRef<RTCPeerConnection | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenVideoRef = useRef<HTMLVideoElement>(null);

  const isLvprtv = mainSrc && mainSrc.includes('lvprtv');

  const startStreaming = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      const pc = new RTCPeerConnection();
      peerConnectionRef.current = pc;

      mediaStream.getTracks().forEach((track) => {
        pc.addTrack(track, mediaStream);
      });

      pc.createDataChannel("chat");
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);

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
    } catch (err) {
      console.error("❌ Error starting WHIP stream:", err);
    }
  };

  const stopStreaming = () => {
    try {
      if (peerConnectionRef.current) {
        peerConnectionRef.current.close();
        peerConnectionRef.current = null;
      }

      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
        videoRef.current.srcObject = null;
      }

      setStreaming(false);
    } catch (err) {
      console.error("❌ Error stopping stream:", err);
    }
  };

  const handleCreate = async () => {
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
  };

  const startRecording = async () => {
    try {
      setIsRecording(false);
      recordedChunksRef.current = [];
      
      const displayStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "browser",
          frameRate: { ideal: 30 },
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        },
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        }
      });

      if (hiddenVideoRef.current && canvasRef.current) {
        hiddenVideoRef.current.srcObject = displayStream;
        await hiddenVideoRef.current.play();

        const canvas = canvasRef.current;
        canvas.width = 1280;
        canvas.height = 720;
        const ctx = canvas.getContext('2d');

        if (!ctx) {
          throw new Error('Could not get canvas context');
        }

        const drawVideoFrame = () => {
          if (!hiddenVideoRef.current || !canvasRef.current) return;
          
          const video = hiddenVideoRef.current;
          const canvas = canvasRef.current;
          const ctx = canvas.getContext('2d')!;

          const videoAspect = video.videoWidth / video.videoHeight;
          const canvasAspect = canvas.width / canvas.height;
          
          let sx = 0, sy = 0, sw = video.videoWidth, sh = video.videoHeight;
          
          if (videoAspect > canvasAspect) {
            sw = video.videoHeight * canvasAspect;
            sx = (video.videoWidth - sw) / 2;
          } else {
            sh = video.videoWidth / canvasAspect;
            sy = (video.videoHeight - sh) / 2;
          }

          ctx.fillStyle = 'black';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.drawImage(video, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);

          if (isRecording) {
            requestAnimationFrame(drawVideoFrame);
          }
        };

        drawVideoFrame();

        const canvasStream = canvas.captureStream(30);
        const audioTrack = displayStream.getAudioTracks()[0];
        if (audioTrack) {
          canvasStream.addTrack(audioTrack);
        }

        const mediaRecorder = new MediaRecorder(canvasStream, {
          mimeType: 'video/webm;codecs=vp8,opus'
        });

        mediaRecorder.ondataavailable = (e) => {
          if (e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }
        };

        mediaRecorder.onstop = async () => {
          try {
            setLoading(true);
            displayStream.getTracks().forEach(track => track.stop());
            canvasStream.getTracks().forEach(track => track.stop());

            const blob = new Blob(recordedChunksRef.current, {
              type: 'video/webm'
            });
            recordedChunksRef.current = [];

            const file = new File([blob], `recording-${Date.now()}.webm`, { type: 'video/webm' });
            const fileUrl = await uploadFile(file);

            if (tenant?.id && fileUrl) {
              try {
                const eventDoc = await userApi.getEventById(tenant.id);
                if (!eventDoc) {
                  throw new Error('Event not found');
                }
                
                await userApi.updateEvent(tenant.id, {
                  recordings: [...(eventDoc.recordings || []), fileUrl],
                  status: 'recorded'
                });
              } catch (error) {
                console.error('Error updating event:', error);
                throw error;
              }
            }

            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.style.display = 'none';
            a.href = url;
            a.download = `recording-${Date.now()}.webm`;
            a.click();
            
            URL.revokeObjectURL(url);
            document.body.removeChild(a);
          } catch (error) {
            console.error('Error handling recording:', error);
            alert('Failed to save recording. Please try again.');
          } finally {
            setLoading(false);
            setIsRecording(false);
          }
        };

        mediaRecorderRef.current = mediaRecorder;
        mediaRecorderRef.current.start();
        setIsRecording(true);
      }
    } catch (error) {
      console.error('Error starting screen recording:', error);
      setIsRecording(false);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
    }
  };

  return (
    <div className="relative rounded-xl overflow-hidden border border-black/10 bg-black/5 w-full h-[80vh] min-h-[600px]">
      {loading && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="flex flex-col items-center gap-3">
            <svg className="animate-spin w-10 h-10 text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
            </svg>
            <span className="text-white font-semibold">Loading Booth...</span>
          </div>
        </div>
      )}

      <iframe
        src={`https://lvpr.tv/?v=${streamData?.output_playback_id}`}
        className="absolute inset-0 w-full h-full"
        style={{ border: 'none' }}
        allow="autoplay; encrypted-media"
        allowFullScreen
      />

      <div className="absolute top-10 right-6 z-10">
        <Toolbar currentView={currentView} onViewChange={onViewChange} />
      </div>

      <div className="absolute left-8 bottom-16 z-10 flex flex-col items-center">
        <div className="rounded-xl overflow-hidden border border-black/10 shadow-lg relative">
          <BrowserWhipStreamer whipUrl={streamData?.whip_url} videoRef={videoRef} />
        </div>
      </div>

      <div className="absolute left-1/2 -translate-x-1/2 bottom-4 flex items-center gap-6 z-10">
        {!streamData ? (
          <button
            onClick={handleCreate}
            className="px-8 py-3 rounded-full bg-gradient-to-r from-[#891F0C] to-[#040D34] text-white font-lightso if shadow-lg text-sm flex items-center gap-2"
            disabled={loading}
          >
            Start stream
          </button>
        ) : (
          <>
            <div className="relative group">
              <button
                onClick={streaming ? stopStreaming : startStreaming}
                className={`w-12 h-12 rounded-full backdrop-blur border border-white/40 flex items-center justify-center transition-all duration-200 ${
                  streaming ? 'bg-red-500/80 hover:bg-red-600 scale-105' : 'bg-emerald-500/80 hover:bg-emerald-600'
                }`}
                disabled={loading}
                aria-label={streaming ? "Stop Camera Stream" : "Start Camera Stream"}
              >
                {loading ? (
                  <svg className="w-5 h-5 text-white animate-spin" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                ) : streaming ? (
                  <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor">
                    <rect x="7" y="7" width="10" height="10" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5 text-white ml-0.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                )}
              </button>
              
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-black/80 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                {streaming ? "Stop Camera Stream" : "Start Camera Stream"}
              </span>
            </div>

            {!isTabOpened && (
              <div className="relative group">
                <button
                  onClick={() => {
                    if (streamData?.output_playback_id) {
                      window.open(`https://lvpr.tv/?v=${streamData.output_playback_id}`, '_blank');
                      setIsTabOpened(true);
                    }
                  }}
                  className="w-12 h-12 rounded-full bg-black/5 backdrop-blur border border-white/40 flex items-center justify-center hover:bg-black transition-colors"
                  disabled={!streamData?.output_playback_id}
                  aria-label="Open in New Tab"
                >
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </button>
                <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-black/80 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                  Open in New Tab
                </span>
              </div>
            )}

            <div className="relative group">
              <button
                onClick={() => {
                  if (!isRecording) {
                    startRecording();
                  } else {
                    stopRecording();
                  }
                }}
                className={`w-12 h-12 rounded-full backdrop-blur border border-white/40 flex items-center justify-center hover:bg-black transition-colors ${
                  isRecording ? 'bg-red-500' : 'bg-black/5'
                }`}
                disabled={!streamData?.output_playback_id || !isTabOpened}
                aria-label={isRecording ? "Stop Recording" : "Start Recording"}
              >
                {isRecording ? (
                  <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <rect x="6" y="6" width="12" height="12" />
                  </svg>
                ) : (
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553 2.276A1 1 0 0120 13.17v.66a1 1 0 01-.447.894L15 17V10zM4 9h8v8H4z" />
                  </svg>
                )}
              </button>
              <span className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded bg-black/80 text-xs text-white opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-20 transition-opacity">
                {!isTabOpened ? "Open stream in new tab before recording" : (isRecording ? "Stop Recording" : "Start Recording")}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Canvas;
