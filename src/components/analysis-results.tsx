"use client";

import React from "react";
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
import { CheckCircle, XCircle } from "lucide-react";
import { AnalysisResult } from "@/types/doc-analysis";

interface AnalysisResultsProps {
  results: AnalysisResult[];
}

export function AnalysisResults({ results }: AnalysisResultsProps) {
  if (!results || results.length === 0) return null;

  return (
    <Card className="w-full max-w-4xl mx-auto mt-8">
      <CardHeader>
        <CardTitle>Analysis Results</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[200px]">Rule</TableHead>
              <TableHead className="w-[100px]">Status</TableHead>
              <TableHead>Evidence & Reasoning</TableHead>
              <TableHead className="w-[100px] text-right">Confidence</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {results.map((result, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">{result.rule}</TableCell>
                <TableCell>
                  {result.status === "Pass" ? (
                    <Badge className="bg-green-500 hover:bg-green-600">
                      <CheckCircle className="w-3 h-3 mr-1" /> Pass
                    </Badge>
                  ) : (
                    <Badge variant="destructive">
                      <XCircle className="w-3 h-3 mr-1" /> Fail
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="max-w-[300px]">
                  <div className="space-y-1">
                    <div className="text-sm font-medium text-gray-900 line-clamp-2" title={result.evidence}>
                      "{result.evidence}"
                    </div>
                    <div className="text-sm text-gray-500 line-clamp-2" title={result.reasoning}>
                      {result.reasoning}
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {result.confidence}%
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
