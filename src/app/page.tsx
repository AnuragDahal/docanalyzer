'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/components/file-upload';
import { RuleInput } from '@/components/rule-input';
import { AnalysisResults } from '@/components/analysis-results';
import { Button } from '@/components/ui/button';
import { Loader2, Sparkles } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AnalysisResult } from '@/types/doc-analysis';

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [rules, setRules] = useState<string[]>(['']);
  const [results, setResults] = useState<AnalysisResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!file) {
      setError('Please upload a PDF file.');
      return;
    }

    const validRules = rules.filter(r => r.trim() !== '');
    if (validRules.length === 0) {
      setError('Please enter at least one rule.');
      return;
    }

    setLoading(true);
    setError(null);
    setResults([]);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('rules', JSON.stringify(validRules));

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze document');
      }

      setResults(data.results);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4 sm:px-6 lg:px-8 font-sans text-gray-900">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="flex justify-center mb-6">
            <div className="relative w-24 h-24 rounded-2xl overflow-hidden shadow-lg ring-4 ring-white">
              <img 
                src="/logo.png" 
                alt="DocAnalyzer Logo" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="inline-flex items-center justify-center p-2 bg-indigo-100 rounded-full mb-4">
            <Sparkles className="w-5 h-5 text-indigo-600 mr-2" />
            <span className="text-sm font-medium text-indigo-800">AI-Powered Analysis</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600 pb-2">
            Document Analyzer
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            Upload your PDF and let our advanced AI verify compliance against your custom rules in seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Inputs */}
          <div className="lg:col-span-5 space-y-8 animate-in fade-in slide-in-from-left-4 duration-700 delay-150">
            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 ring-1 ring-gray-900/5 transition-all hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-indigo-600 text-white rounded-full text-sm mr-3">1</span>
                Upload Document
              </h2>
              <FileUpload file={file} setFile={setFile} />
            </div>

            <div className="bg-white/80 backdrop-blur-sm p-8 rounded-3xl shadow-xl border border-white/20 ring-1 ring-gray-900/5 transition-all hover:shadow-2xl">
              <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center">
                <span className="flex items-center justify-center w-8 h-8 bg-purple-600 text-white rounded-full text-sm mr-3">2</span>
                Define Rules
              </h2>
              <RuleInput rules={rules} setRules={setRules} />
            </div>

            <div className="pt-4">
              <Button 
                size="lg" 
                onClick={handleAnalyze} 
                disabled={loading || !file}
                className="w-full h-14 text-lg font-semibold rounded-2xl shadow-lg shadow-indigo-500/30 transition-all hover:scale-[1.02] active:scale-[0.98] bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                    Checking Document...
                  </>
                ) : (
                  'Run Analysis'
                )}
              </Button>
            </div>
            
            {error && (
              <Alert variant="destructive" className="animate-in fade-in zoom-in duration-300">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          {/* Right Column: Results */}
          <div className="lg:col-span-7 animate-in fade-in slide-in-from-right-4 duration-700 delay-300">
             {results.length > 0 ? (
                <AnalysisResults results={results} />
             ) : (
                <div className="h-full min-h-[500px] flex flex-col items-center justify-center text-gray-400 bg-white/50 backdrop-blur-sm border-2 border-dashed border-gray-200 rounded-3xl p-12 transition-all">
                    <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mb-6">
                        <Sparkles className="w-10 h-10 text-indigo-200" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-600 mb-2">Ready to Analyze</h3>
                    <p className="text-gray-500 text-center max-w-xs">
                        Upload a document and define rules to see the AI analysis results here.
                    </p>
                </div>
             )}
          </div>
        </div>
      </div>
    </main>
  );
}
