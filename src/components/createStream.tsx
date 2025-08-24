// components/CreateStream.tsx
import { useState } from 'react';
import { createStream } from '../lib/api';

export default function CreateStream({ onStreamReady }: any) {
  const [loading, setLoading] = useState(false);

  async function handleCreate() {
    setLoading(true);
    try {
      const data = await createStream();
      onStreamReady(data);
    } catch (e) {
      console.error(e);
      alert('Error creating stream');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button onClick={handleCreate} disabled={loading}>
        {loading ? 'Creating...' : 'Create Stream'}
      </button>
    </div>
  );
}
