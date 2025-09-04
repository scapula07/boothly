import React, { useState } from 'react';
import { updatePrompt } from '@/lib/api';
type ControlValue = {
  name: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
};

export default function Settings({streamData}: {streamData: any}) {
  const [activePreset, setActivePreset] = useState('artistic');
  const [controls, setControls] = useState<ControlValue[]>([
    { name: 'Pose', value: 0.65, min: 0, max: 1, step: 0.01 },
    { name: 'HED', value: 0.65, min: 0, max: 1, step: 0.01 },
    { name: 'Canny', value: 0.00, min: 0, max: 1, step: 0.01 },
    { name: 'Depth', value: 0.21, min: 0, max: 1, step: 0.01 },
    { name: 'Color', value: 0.26, min: 0, max: 1, step: 0.01 },
  ]);

  const [denoiseValues, setDenoiseValues] = useState({
    x: 2,
    y: 4,
    z: 6
  });

  const handleControlChange = async (index: number, newValue: number) => {
    const newControls = [...controls];
    newControls[index].value = newValue;
    setControls(newControls);
    await updateStreamControls();
  };

  const updateStreamControls = async () => {
    if (!streamData?.id) return;

    const controlnetModels = [
      "thibaud/controlnet-sd21-openpose-diffusers",
      "thibaud/controlnet-sd21-hed-diffusers",
      "thibaud/controlnet-sd21-canny-diffusers",
      "thibaud/controlnet-sd21-depth-diffusers",
      "thibaud/controlnet-sd21-color-diffusers"
    ];

    const controlnets = controls.map((control, index) => ({
      model_id: controlnetModels[index],
      conditioning_scale: control.value,
      preprocessor: index === 0 ? "pose_tensorrt" : 
                   index === 1 ? "hed_tensorrt" :
                   index === 2 ? "canny_tensorrt" :
                   index === 3 ? "depth_tensorrt" :
                   "color_tensorrt",
      enabled: true,
      preprocessor_params: {},
      control_guidance_start: 0,
      control_guidance_end: 1
    }));

    const params = {
      model_id: "stabilityai/sd-turbo",
    //   prompt: streamData.prompt || "snowball",
      prompt_interpolation_method: "slerp",
      negative_prompt: "blurry, low quality, flat, 2d",
      normalize_prompt_weights: true,
      normalize_seed_weights: true,
      num_inference_steps: 50,
      seed: 42,
      t_index_list: [denoiseValues.x, denoiseValues.y, denoiseValues.z],
      controlnets
    };

    try {
      await updatePrompt(streamData.id, params);
    } catch (error) {
      console.error('Error updating stream:', error);
    }
  };

  type PresetConfig = {
    controls: {
      pose: number;
      hed: number;
      canny: number;
      depth: number;
      color: number;
    };
    denoise: {
      x: number;
      y: number;
      z: number;
    };
  };

  type PresetConfigMap = {
    [key: string]: PresetConfig;
  };

  const presetConfigs: PresetConfigMap = {
    balanced: {
      controls: {
        pose: 0.65,
        hed: 0.65,
        canny: 0.00,
        depth: 0.21,
        color: 0.26
      },
      denoise: { x: 3, y: 6, z: 6 }
    },
    portrait: {
      controls: {
        pose: 0.85,
        hed: 0.65,
        canny: 0.40,
        depth: 0.60,
        color: 0.75
      },
      denoise: { x: 2, y: 4, z: 4 }
    },
    composition: {
      controls: {
        pose: 0.40,
        hed: 0.45,
        canny: 0.80,
        depth: 0.75,
        color: 0.35
      },
      denoise: { x: 4, y: 8, z: 8 }
    },
    artistic: {
      controls: {
        pose: 0.30,
        hed: 0.75,
        canny: 0.25,
        depth: 0.35,
        color: 0.40
      },
      denoise: { x: 6, y: 12, z: 12 }
    }
  };

  const presets = ['Balanced', 'Portrait', 'Composition', 'Artistic'];

  const getPresetValueForControl = (preset: PresetConfig, controlName: string): number => {
    const nameLower = controlName.toLowerCase();
    switch (nameLower) {
      case 'pose':
        return preset.controls.pose;
      case 'hed':
        return preset.controls.hed;
      case 'canny':
        return preset.controls.canny;
      case 'depth':
        return preset.controls.depth;
      case 'color':
        return preset.controls.color;
      default:
        return 0.5;
    }
  };

  const applyPreset = async (presetName: string) => {
    const preset = presetConfigs[presetName.toLowerCase()];
    if (!preset) return;

    // Update controls
    setControls(controls.map(control => ({
      ...control,
      value: getPresetValueForControl(preset, control.name)
    })));

    // Update denoise values
    setDenoiseValues(preset.denoise);

    // Update stream with new values
    await updateStreamControls();
  };

  const resetValues = async () => {
    setControls(controls.map(control => ({ ...control, value: 0.5 })));
    setDenoiseValues({ x: 2, y: 4, z: 6 });
    await updateStreamControls();
  };

  // Update stream when denoise values change
  const handleDenoiseChange = async (key: string, value: number) => {
    setDenoiseValues(prev => ({
      ...prev,
      [key]: value
    }));
    await updateStreamControls();
  };

  return (
    <div className="w-[320px] p-4 bg-white rounded-2xl border border-gray-200 shadow-lg">
      {/* Presets Section */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800 text-sm font-medium">ControlNet Presets</h3>
          <button className="p-1">
            <svg className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <circle cx="12" cy="12" r="1" />
              <circle cx="12" cy="5" r="1" />
              <circle cx="12" cy="19" r="1" />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {presets.map((preset) => (
            <button
              key={preset}
              onClick={() => {
                const presetName = preset.toLowerCase();
                setActivePreset(presetName);
                applyPreset(presetName);
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activePreset === preset.toLowerCase()
                  ? 'bg-[#0099FF] text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {preset}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Section */}
      <div className="space-y-4">
        {controls.map((control, index) => (
          <div key={control.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-gray-800 text-sm font-medium">
                {control.name}
                <button className="ml-1 text-gray-400 hover:text-gray-600">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path d="M12 16v-4" strokeWidth="2" strokeLinecap="round" />
                    <path d="M12 8h.01" strokeWidth="2" strokeLinecap="round" />
                  </svg>
                </button>
              </label>
              <span className="text-gray-600 text-sm">{control.value.toFixed(2)}</span>
            </div>
            <input
              type="range"
              min={control.min}
              max={control.max}
              step={control.step}
              value={control.value}
              onChange={(e) => handleControlChange(index, parseFloat(e.target.value))}
              className="w-full appearance-none h-1.5 rounded-full bg-gray-200 accent-[#0099FF]
                [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5
                [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full 
                [&::-webkit-slider-thumb]:bg-[#0099FF] [&::-webkit-slider-thumb]:cursor-pointer
                [&::-webkit-slider-thumb]:shadow-md
                [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-3.5
                [&::-moz-range-thumb]:h-3.5 [&::-moz-range-thumb]:rounded-full
                [&::-moz-range-thumb]:bg-[#0099FF] [&::-moz-range-thumb]:cursor-pointer
                [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:shadow-md
                hover:[&::-webkit-slider-thumb]:bg-[#0084dd]
                hover:[&::-moz-range-thumb]:bg-[#0084dd]"
              style={{
                background: `linear-gradient(to right, #0099FF ${control.value * 100}%, rgba(255,255,255,0.1) ${
                  control.value * 100
                }%)`
              }}
            />
          </div>
        ))}

        {/* Denoise Section */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-gray-800 text-sm font-medium">
              Denoise
              <button className="ml-1 text-gray-400 hover:text-gray-600">
                <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10" strokeWidth="2" />
                  <path d="M12 16v-4" strokeWidth="2" strokeLinecap="round" />
                  <path d="M12 8h.01" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </h3>
            <div className="flex gap-2">
              <button className="p-1.5 rounded bg-gray-100 hover:bg-gray-200">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <button className="p-1.5 rounded bg-gray-100 hover:bg-gray-200">
                <svg className="w-4 h-4 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
                </svg>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {Object.entries(denoiseValues).map(([key, value]) => (
              <div key={key} className="bg-gray-50 rounded-lg p-2 border border-gray-200">
                <div className="text-gray-500 text-xs mb-1">{key.toUpperCase()}</div>
                <input
                  type="number"
                  value={value}
                  onChange={(e) => handleDenoiseChange(key, parseInt(e.target.value) || 0)}
                  className="w-full bg-transparent text-gray-800 border-none text-sm focus:outline-none"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Reset Button */}
        <button
          onClick={resetValues}
          className="mt-6 w-full py-2 rounded-lg bg-gray-100 text-gray-700 hover:bg-gray-200 text-sm font-medium transition-colors"
        >
          RESET VALUES
        </button>
      </div>
    </div>
  );
}
