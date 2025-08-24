
export default function BrowserWhipStreamer({ whipUrl ,videoRef}: { whipUrl: string,videoRef: React.RefObject<HTMLVideoElement | null> }) {
  return (
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{ width: "200px", border: "1px solid gray" }}
      />
  );
}
