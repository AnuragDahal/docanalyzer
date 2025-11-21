'use client';

import React, { useCallback, useState } from 'react';
import { Upload, FileText, X, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  file: File | null;
  setFile: (file: File | null) => void;
}

export function FileUpload({ file, setFile }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      if (droppedFile.type === 'application/pdf') {
        setFile(droppedFile);
      } else {
        alert('Please upload a PDF file.');
      }
    }
  }, [setFile]);

  const handleFileChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  }, [setFile]);

  return (
    <div className="w-full">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={cn(
            "relative group border-2 border-dashed rounded-2xl p-10 text-center cursor-pointer transition-all duration-300 ease-in-out",
            isDragging 
              ? "border-indigo-500 bg-indigo-50/50 scale-[1.02]" 
              : "border-gray-200 hover:border-indigo-400 hover:bg-gray-50/50"
          )}
        >
          <input
            type="file"
            accept=".pdf"
            onChange={handleFileChange}
            className="hidden"
            id="file-upload"
          />
          <label htmlFor="file-upload" className="cursor-pointer flex flex-col items-center relative z-10">
            <div className={cn(
              "w-16 h-16 rounded-full flex items-center justify-center mb-4 transition-colors duration-300",
              isDragging ? "bg-indigo-100 text-indigo-600" : "bg-gray-100 text-gray-400 group-hover:bg-indigo-50 group-hover:text-indigo-500"
            )}>
              <Upload className="w-8 h-8" />
            </div>
            <p className="text-lg font-semibold text-gray-700 group-hover:text-indigo-700 transition-colors">
              Click to upload or drag & drop
            </p>
            <p className="text-sm text-gray-500 mt-2 group-hover:text-gray-600">
              PDF files only (max 500KB)
            </p>
          </label>
        </div>
      ) : (
        <div className="relative overflow-hidden group bg-white border border-indigo-100 rounded-2xl p-4 shadow-sm transition-all hover:shadow-md hover:border-indigo-200">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-50/50 to-purple-50/50 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative flex items-center justify-between z-10">
            <div className="flex items-center space-x-4 overflow-hidden">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center flex-shrink-0 text-indigo-600">
                <FileText className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <p className="font-semibold text-gray-900 truncate max-w-[200px]">{file.name}</p>
                <div className="flex items-center text-xs text-gray-500 mt-0.5">
                  <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded-md mr-2 font-medium flex items-center">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Ready
                  </span>
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </div>
              </div>
            </div>
            <button
              onClick={() => setFile(null)}
              className="p-2 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors text-gray-400"
              title="Remove file"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
