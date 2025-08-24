// components/StreamPlayer.tsx
export default function StreamPlayer({ playbackId }: { playbackId: string }) {
    return (
      <div>
        <h3>🎥 Live Output Preview {`https://lvpr.tv/?v=${playbackId}`}</h3>
        <iframe
          src={`https://lvpr.tv/?v=${playbackId}`}
          width="640"
          height="360"
          allow="autoplay; encrypted-media"
          allowFullScreen
        ></iframe>
      </div>
    );
  }
  