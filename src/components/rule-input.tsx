'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Plus, Trash2, ListChecks } from 'lucide-react';

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
    <div className="w-full space-y-6">
      <div className="flex items-center justify-between">
        <Label className="text-base font-medium text-gray-600 flex items-center">
            <ListChecks className="w-4 h-4 mr-2" />
            Checklist Rules ({rules.length}/5)
        </Label>
        <Button 
            variant="ghost" 
            size="sm" 
            onClick={addRule}
            disabled={rules.length >= 5}
            className="text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 text-xs font-medium transition-colors"
        >
            <Plus className="w-3 h-3 mr-1" /> Add Another Rule
        </Button>
      </div>
      <div className="space-y-3">
        {rules.map((rule, index) => (
          <div key={index} className="group flex items-center gap-3 animate-in fade-in slide-in-from-left-2 duration-300">
            <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-100 text-gray-500 flex items-center justify-center text-xs font-medium group-hover:bg-indigo-100 group-hover:text-indigo-600 transition-colors">
                {index + 1}
            </div>
            <div className="flex-1 relative">
                <Input
                    placeholder={`e.g., "The document must contain a date"`}
                    value={rule}
                    onChange={(e) => handleRuleChange(index, e.target.value)}
                    className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500/20 transition-all bg-gray-50/50 focus:bg-white"
                />
            </div>
            {rules.length > 1 && (
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeRule(index)}
                    className="text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
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
