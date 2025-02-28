// components/Question.tsx
'use client';

import { Question as QuestionType } from '../lib/types';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

interface QuestionProps {
  question: QuestionType;
  value: string | string[];
  onChange: (id: string, value: string | string[]) => void;
}

export function Question({ question, value, onChange }: QuestionProps) {
  return (
    <div className="mb-6">
      <h3 className="text-lg font-medium mb-2">{question.text}</h3>
      
      {question.type === 'radio' && (
        <RadioGroup
          value={value as string}
          onValueChange={(val: string) => onChange(question.id, val)}
          className="space-y-2"
        >
          {question.options.map((option, index) => (
            <div key={index} className="flex items-center space-x-3">
              <RadioGroupItem value={option.label} id={`${question.id}-${index}`} />
              <Label htmlFor={`${question.id}-${index}`} className="font-normal">
                {option.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      )}
      
      {question.type === 'checkbox' && (
        <div className="space-y-2">
          {question.options.map((option, index) => {
            const isChecked = Array.isArray(value) && value.includes(option.label);
            
            return (
              <div key={index} className="flex items-center space-x-3">
                <Checkbox 
                  id={`${question.id}-${index}`}
                  checked={isChecked}
                  onCheckedChange={(checked) => {
                    if (Array.isArray(value)) {
                      const newValue = checked 
                        ? [...value, option.label] 
                        : value.filter(v => v !== option.label);
                      onChange(question.id, newValue);
                    }
                  }}
                />
                <Label 
                  htmlFor={`${question.id}-${index}`}
                  className="font-normal"
                >
                  {option.label}
                </Label>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}