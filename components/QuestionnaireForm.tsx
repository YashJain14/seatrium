// components/QuestionnaireForm.tsx
'use client';

import { useState } from 'react';
import { QuestionnaireData, CalculationResult } from '../lib/types';
import { calculateEmissionFactor } from '../lib/calculator';
import { CategorySection } from './CategorySection';
import { ResultsPanel } from './ResultsPanel';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';

interface QuestionnaireFormProps {
  data: QuestionnaireData;
}

export function QuestionnaireForm({ data }: QuestionnaireFormProps) {
  const [currentStep, setCurrentStep] = useState(-1); // Start at -1 (product name entry)
  const [productName, setProductName] = useState('');
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  const totalSteps = data.categories.length;
  const progressPercentage = currentStep >= 0 ? ((currentStep + 1) / totalSteps) * 100 : 0;
  
  const handleAnswerChange = (id: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [id]: value
    }));
  };
  
  const startQuestionnaire = () => {
    if (productName.trim()) {
      setCurrentStep(0);
    }
  };
  
  const nextStep = () => {
    if (currentStep < totalSteps - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Calculate and show results
      const calculationResult = calculateEmissionFactor(data, answers);
      setResult(calculationResult);
      setShowResults(true);
    }
  };
  
  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleReset = () => {
    setCurrentStep(-1);
    setProductName('');
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };
  
  // Show product name input form
  if (currentStep === -1 && !showResults) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Steel Product Emissions Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2 font-medium">Product Name</label>
            <Input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="Enter your steel product name"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={startQuestionnaire}
            disabled={!productName.trim()}
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Start Questionnaire
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  if (showResults && result) {
    return (
      <ResultsPanel
        result={result}
        productName={productName}
        onReset={handleReset}
      />
    );
  }
  
  const currentCategory = data.categories[currentStep];
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Emissions Questionnaire</CardTitle>
          <p className="text-gray-600">Product: {productName}</p>
        </CardHeader>
        <CardContent>
          <div className="mb-8">
            <Progress value={progressPercentage} className="h-2" />
            <div className="text-sm text-gray-600 mt-1">
              {currentStep + 1} of {totalSteps} ({Math.round(progressPercentage)}%)
            </div>
          </div>
        </CardContent>
      </Card>
      
      <CategorySection
        category={currentCategory}
        answers={answers}
        onAnswerChange={handleAnswerChange}
      />
      
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 0}
          className="disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </Button>
        <Button onClick={nextStep}>
          {currentStep < totalSteps - 1 ? 'Next' : 'Calculate Results'}
        </Button>
      </div>
    </div>
  );
}