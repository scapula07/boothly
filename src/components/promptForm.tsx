// components/PromptForm.tsx
import { useState } from 'react';
import { updatePrompt } from '../lib/api';

export default function PromptForm({ streamId }: { streamId: string }) {
  const [prompt, setPrompt] = useState('superman');
  const [negativePrompt, setNegativePrompt] = useState('blurry, low quality');
  const [seed, setSeed] = useState(42);
  const [steps, setSteps] = useState(50);

  async function handleSubmit(e: any) {
    e.preventDefault();
    const payload = {
      model_id: 'streamdiffusion',
      pipeline: 'live-video-to-video',
      params: {
        model_id: 'stabilityai/sd-turbo',
        prompt,
        prompt_interpolation_method: 'slerp',
        normalize_prompt_weights: true,
        normalize_seed_weights: true,
        negative_prompt: negativePrompt,
        num_inference_steps: steps,
        seed,
        t_index_list: [0, 8, 17],
        controlnets: [], // keep empty for now
      },
    };
    try {
      await updatePrompt(streamId, payload);
      alert('Prompt updated');
    } catch (e) {
      console.error(e);
      alert('Failed to update prompt');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Prompt:</label>
        <input value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      </div>
      <div>
        <label>Negative Prompt:</label>
        <input
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
        />
      </div>
      <div>
        <label>Seed:</label>
        <input
          type="number"
          value={seed}
          onChange={(e) => setSeed(Number(e.target.value))}
        />
      </div>
      <div>
        <label>Inference Steps:</label>
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(Number(e.target.value))}
        />
      </div>
      <button type="submit">Update Prompt</button>
    </form>
  );
}
