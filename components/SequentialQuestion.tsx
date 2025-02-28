// components/SequentialQuestion.tsx
'use client';

import { Question } from '../lib/types';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';

interface SequentialQuestionProps {
  question: Question;
  value: string | string[];
  onChange: (id: string, value: string | string[]) => void;
  onNext: () => void;
}

export function SequentialQuestion({ 
  question, 
  value, 
  onChange,
  onNext
}: SequentialQuestionProps) {
  const handleRadioSelect = (optionLabel: string) => {
    onChange(question.id, optionLabel);
    // Automatically advance to next question after selection
    setTimeout(onNext, 500);
  };
  
  const handleCheckboxToggle = (optionLabel: string) => {
    if (Array.isArray(value)) {
      const newValue = value.includes(optionLabel)
        ? value.filter(v => v !== optionLabel)
        : [...value, optionLabel];
      onChange(question.id, newValue);
    }
  };
  
  return (
    <div className="mb-6">
      <h3 className="text-xl font-medium mb-6">{question.text}</h3>
      
      <div className="space-y-3">
        {question.options.map((option, index) => {
          const isSelected = question.type === 'radio' 
            ? value === option.label 
            : Array.isArray(value) && value.includes(option.label);
          
          return (
            <div 
              key={index} 
              onClick={() => question.type === 'radio' 
                ? handleRadioSelect(option.label) 
                : handleCheckboxToggle(option.label)
              }
              className={`
                p-4 border rounded-lg cursor-pointer transition-all duration-200
                flex items-center justify-between
                ${isSelected 
                  ? 'border-blue-500 bg-blue-50 shadow-md' 
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
                }
              `}
            >
              <span className="text-lg">{option.label}</span>
              {isSelected && (
                <CheckCircle2 className="h-6 w-6 text-blue-500" />
              )}
            </div>
          );
        })}
      </div>
      
      {question.type === 'checkbox' && Array.isArray(value) && value.length > 0 && (
        <div className="mt-4 flex justify-end">
          <Button onClick={onNext}>
            Continue
          </Button>
        </div>
      )}
    </div>
  );
}