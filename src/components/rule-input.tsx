'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2 } from 'lucide-react';

interface RuleInputProps {
  rules: string[];
  setRules: (rules: string[]) => void;
}

export function RuleInput({ rules, setRules }: RuleInputProps) {
  const handleRuleChange = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const addRule = () => {
    if (rules.length < 5) {
        setRules([...rules, '']);
    }
  };

  const removeRule = (index: number) => {
    if (rules.length > 1) {
        const newRules = rules.filter((_, i) => i !== index);
        setRules(newRules);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto space-y-4">
      <div className="flex items-center justify-between">
        <Label className="text-lg font-semibold">Analysis Rules</Label>
        <Button 
            variant="outline" 
            size="sm" 
            onClick={addRule}
            disabled={rules.length >= 5}
            className="text-xs"
        >
            <Plus className="w-3 h-3 mr-1" /> Add Rule
        </Button>
      </div>
      <div className="space-y-3">
        {rules.map((rule, index) => (
          <div key={index} className="flex items-center gap-2">
            <div className="flex-1">
                <Input
                placeholder={`Rule ${index + 1} (e.g., "Must contain a date")`}
                value={rule}
                onChange={(e) => handleRuleChange(index, e.target.value)}
                />
            </div>
            {rules.length > 1 && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRule(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                >
                    <Trash2 className="w-4 h-4" />
                </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
