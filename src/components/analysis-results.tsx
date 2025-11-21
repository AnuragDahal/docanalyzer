'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { AnalysisResult } from '@/types/doc-analysis';
import { cn } from '@/lib/utils';

interface AnalysisResultsProps {
  results: AnalysisResult[];
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  if (!results || results.length === 0) return null;

  const passCount = results.filter(r => r.status === 'Pass').length;
  const totalCount = results.length;
  const score = Math.round((passCount / totalCount) * 100);

  return (
    <Card className="w-full bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl ring-1 ring-gray-900/5 overflow-hidden">
      <CardHeader className="border-b border-gray-100 bg-gray-50/50 pb-6">
        <div className="flex items-center justify-between">
            <div>
                <CardTitle className="text-xl font-bold text-gray-900">Analysis Report</CardTitle>
                <p className="text-sm text-gray-500 mt-1">AI-verified compliance results</p>
            </div>
            <div className="flex items-center space-x-2">
                <div className="text-right mr-2">
                    <p className="text-xs font-medium text-gray-500 uppercase tracking-wider">Overall Score</p>
                    <p className={cn("text-2xl font-bold", score === 100 ? "text-green-600" : score >= 50 ? "text-amber-600" : "text-red-600")}>
                        {score}%
                    </p>
                </div>
                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center border-4", 
                    score === 100 ? "border-green-100 bg-green-50 text-green-600" : 
                    score >= 50 ? "border-amber-100 bg-amber-50 text-amber-600" : 
                    "border-red-100 bg-red-50 text-red-600"
                )}>
                    {score === 100 ? <CheckCircle className="w-6 h-6" /> : score >= 50 ? <AlertCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                </div>
            </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-gray-50/50">
            <TableRow className="hover:bg-transparent border-gray-100">
              <TableHead className="w-[25%] pl-6 py-4 font-semibold text-gray-600">Rule</TableHead>
              <TableHead className="w-[15%] font-semibold text-gray-600">Status</TableHead>
              <TableHead className="w-[45%] font-semibold text-gray-600">Evidence & Reasoning</TableHead>
              <TableHead className="w-[15%] pr-6 text-right font-semibold text-gray-600">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index} className="hover:bg-gray-50/50 transition-colors border-gray-100 group">
                <TableCell className="pl-6 py-4 font-medium text-gray-900 align-top">
                    <div className="flex items-start gap-2">
                        <span className="text-xs font-mono text-gray-400 mt-0.5">#{index + 1}</span>
                        {result.rule}
                    </div>
                </TableCell>
                <TableCell className="align-top">
                  {result.status === 'Pass' ? (
                    <Badge className="bg-green-100 text-green-700 hover:bg-green-200 border-green-200 shadow-none px-2.5 py-0.5 rounded-md">
                      <CheckCircle className="w-3.5 h-3.5 mr-1.5" /> Pass
                    </Badge>
                  ) : (
                    <Badge variant="destructive" className="bg-red-100 text-red-700 hover:bg-red-200 border-red-200 shadow-none px-2.5 py-0.5 rounded-md">
                      <XCircle className="w-3.5 h-3.5 mr-1.5" /> Fail
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="align-top max-w-[300px]">
                  <div className="space-y-2">
                    <div className="relative bg-gray-50 p-3 rounded-lg border border-gray-100 group-hover:border-indigo-100 group-hover:bg-indigo-50/30 transition-colors">
                        <div className="absolute left-0 top-3 bottom-3 w-0.5 bg-indigo-400 rounded-r-full opacity-0 group-hover:opacity-100 transition-opacity" />
                        <p className="text-sm text-gray-800 italic line-clamp-2" title={result.evidence}>
                            "{result.evidence}"
                        </p>
                    </div>
                    <p className="text-xs text-gray-500 line-clamp-2 pl-1" title={result.reasoning}>
                      <span className="font-medium text-gray-700">Reasoning:</span> {result.reasoning}
                    </p>
                  </div>
                </TableCell>
                <TableCell className="pr-6 text-right align-top">
                  <div className="inline-flex flex-col items-end">
                      <span className="text-sm font-bold text-gray-900">{result.confidence}%</span>
                      <div className="w-16 h-1.5 bg-gray-100 rounded-full mt-1 overflow-hidden">
                          <div 
                            className={cn("h-full rounded-full", result.confidence > 80 ? "bg-green-500" : result.confidence > 50 ? "bg-amber-500" : "bg-red-500")} 
                            style={{ width: `${result.confidence}%` }}
                          />
                      </div>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
