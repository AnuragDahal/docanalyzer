'use client';

import React, { useState } from 'react';
import { FileUpload } from '@/components/file-upload';
import { RuleInput } from '@/components/rule-input';
import { AnalysisResults } from '@/components/analysis-results';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [rules, setRules] = useState<string[]>(['']);
  const [results, setResults] = useState<any[]>([]);
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
    <main className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            PDF Document Analyzer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Upload a PDF and define rules to check against. AI will verify compliance and provide evidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-8">
            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">1. Upload Document</h2>
              <FileUpload file={file} setFile={setFile} />
            </section>

            <section className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">2. Define Rules</h2>
              <RuleInput rules={rules} setRules={setRules} />
            </section>

            <div className="flex justify-center pt-4">
              <Button 
                size="lg" 
                onClick={handleAnalyze} 
                disabled={loading || !file}
                className="w-full md:w-auto min-w-[200px] text-lg cursor-pointer hover:cursor-pointer"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Checking...
                  </>
                ) : (
                  'Check Document'
                )}
              </Button>
            </div>
            
            {error && (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>

          <div className="space-y-8">
             {results.length > 0 ? (
                <AnalysisResults results={results} />
             ) : (
                <div className="h-full flex items-center justify-center text-gray-400 border-2 border-dashed border-gray-200 rounded-xl p-12 min-h-[400px]">
                    <div className="text-center">
                        <p>Results will appear here</p>
                    </div>
                </div>
             )}
          </div>
        </div>
      </div>
    </main>
  );
}
