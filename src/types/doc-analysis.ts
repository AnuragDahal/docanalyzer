export interface AnalysisResult {
  rule: string;
  status: 'Pass' | 'Fail';
  evidence: string;
  reasoning: string;
  confidence: number;
}
