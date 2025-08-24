import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

type UploadedFile = {
  id: string;
  file: File;
  preview: string;
  progress: number;
  status: 'uploading' | 'completed' | 'error';
};

export default function ImageUpload() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      preview: URL.createObjectURL(file),
      progress: 0,
      status: 'uploading' as const,
    }));

    setUploadedFiles((prev) => [...prev, ...newFiles]);

    // Simulate upload progress
    newFiles.forEach((file) => {
      const interval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(interval);
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === file.id
              ? { ...f, status: 'completed' as const, progress: 100 }
              : f
          )
        );
      }, 2000);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.gif', '.webp'],
      'video/*': ['.mp4', '.mov', '.avi', '.webm'],
    },
    multiple: true,
  });

  const removeFile = (id: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Upload Images & Videos</h3>
      
      {/* Drop Zone */}
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? 'border-[#891F0C] bg-[#891F0C]/5'
            : 'border-gray-300 hover:border-[#891F0C] hover:bg-gray-50'
        }`}
      >
        <input {...getInputProps()} />
        <div className="space-y-3">
          <svg className="mx-auto h-12 w-12 text-gray-400" stroke="currentColor" fill="none" viewBox="0 0 48 48">
            <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
          <div className="text-gray-600">
            {isDragActive ? (
              <p className="text-[#891F0C] font-medium">Drop the files here...</p>
            ) : (
              <div>
                <p className="font-medium">Drag & drop files here, or click to select</p>
                <p className="text-sm text-gray-500 mt-1">Supports: JPG, PNG, GIF, MP4, MOV</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Uploaded Files */}
      {uploadedFiles.length > 0 && (
        <div className="mt-6">
          <h4 className="font-medium text-gray-900 mb-3">Uploaded Files</h4>
          <div className="space-y-3">
            {uploadedFiles.map((file) => (
              <div key={file.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <img src={file.preview} alt={file.file.name} className="w-12 h-12 object-cover rounded" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{file.file.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all ${
                          file.status === 'completed'
                            ? 'bg-green-500'
                            : file.status === 'error'
                            ? 'bg-red-500'
                            : 'bg-[#891F0C]'
                        }`}
                        style={{ width: `${file.progress}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-500">{file.progress}%</span>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(file.id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 