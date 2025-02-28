// components/CategorySection.tsx
'use client';

import { Category } from '../lib/types';
import { Question } from './Question';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface CategorySectionProps {
  category: Category;
  answers: Record<string, string | string[]>;
  onAnswerChange: (id: string, value: string | string[]) => void;
}

export function CategorySection({ 
  category, 
  answers, 
  onAnswerChange 
}: CategorySectionProps) {
  return (
    <Card className="mb-8">
      <CardHeader className="bg-gray-50">
        <CardTitle>
          {category.name} ({category.percentage}% of Total Emissions)
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <div className="space-y-6">
          {category.questions.map((question) => (
            <Question
              key={question.id}
              question={question}
              value={answers[question.id] || (question.type === 'checkbox' ? [] : '')}
              onChange={onAnswerChange}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}