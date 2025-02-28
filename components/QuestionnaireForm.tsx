// components/QuestionnaireForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { QuestionnaireData, CalculationResult, Question as QuestionType } from '../lib/types';
import { calculateEmissionFactor } from '../lib/calculator';
import { ResultsPanel } from './ResultsPanel';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { SequentialQuestion } from '@/components/SequentialQuestion';

interface QuestionnaireFormProps {
  data: QuestionnaireData;
}

// Standard emission factor for steel (tCO2/tonne)
const STANDARD_EMISSION_FACTOR = 1.85;

export function QuestionnaireForm({ data }: QuestionnaireFormProps) {
  // Initial info states
  const [supplierName, setSupplierName] = useState('');
  const [supplierID, setSupplierID] = useState('');
  const [productName, setProductName] = useState('');
  
  // Questionnaire states
  const [showIntro, setShowIntro] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [allQuestions, setAllQuestions] = useState<QuestionType[]>([]);
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});
  const [showResults, setShowResults] = useState(false);
  const [result, setResult] = useState<CalculationResult | null>(null);
  
  // Initialize flat question list
  useEffect(() => {
    const questions: QuestionType[] = [];
    data.categories.forEach(category => {
      category.questions.forEach(question => {
        questions.push({
          ...question,
          categoryName: category.name,
          categoryPercentage: category.percentage
        });
      });
    });
    setAllQuestions(questions);
  }, [data]);
  
  const totalQuestions = allQuestions.length;
  const currentQuestion = allQuestions[currentQuestionIndex];
  const progressPercentage = currentQuestionIndex >= 0 
    ? ((currentQuestionIndex + 1) / totalQuestions) * 100 
    : 0;
  
  const startQuestionnaire = () => {
    if (productName.trim() && supplierName.trim()) {
      setShowIntro(false);
      setCurrentQuestionIndex(0);
    }
  };
  
  const handleAnswerChange = (questionId: string, value: string | string[]) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
  };
  
  const nextQuestion = () => {
    if (currentQuestionIndex < totalQuestions - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      window.scrollTo(0, 0);
    } else {
      // Calculate and show results
      const calculationResult = calculateEmissionFactor(data, answers);
      
      // Apply standard emission factor
      calculationResult.absoluteEmissionFactor = 
        calculationResult.totalEmissionFactor * STANDARD_EMISSION_FACTOR;
      
      setResult(calculationResult);
      setShowResults(true);
    }
  };
  
  const prevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };
  
  const handleReset = () => {
    setShowIntro(true);
    setCurrentQuestionIndex(-1);
    setSupplierName('');
    setSupplierID('');
    setProductName('');
    setAnswers({});
    setShowResults(false);
    setResult(null);
  };
  
  // Show intro form
  if (showIntro) {
    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Steel Product Emissions Calculator</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Supplier Name</label>
              <Input
                type="text"
                value={supplierName}
                onChange={(e) => setSupplierName(e.target.value)}
                placeholder="Enter supplier name"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Supplier ID (Optional)</label>
              <Input
                type="text"
                value={supplierID}
                onChange={(e) => setSupplierID(e.target.value)}
                placeholder="Enter supplier ID"
              />
            </div>
            
            <div>
              <label className="block text-gray-700 mb-2 font-medium">Product Name</label>
              <Input
                type="text"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                placeholder="Enter steel product name"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button
            onClick={startQuestionnaire}
            disabled={!productName.trim() || !supplierName.trim()}
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
        supplierName={supplierName}
        supplierID={supplierID}
        productName={productName}
        answers={answers}
        questionnaireData={data}
        standardEmissionFactor={STANDARD_EMISSION_FACTOR}
        onReset={handleReset}
      />
    );
  }
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            {/* <span>Question {currentQuestionIndex + 1} of {totalQuestions}</span> */}
            {/* <span className="text-sm font-normal text-gray-500">
              {currentQuestion?.categoryName} ({currentQuestion?.categoryPercentage}%)
            </span> */}
          </CardTitle>
          <div className="text-gray-600">
            {/* <p>Supplier: {supplierName} {supplierID ? `(${supplierID})` : ''}</p> */}
            {/* <p>Product: {productName}</p> */}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <Progress value={progressPercentage} className="h-2" />
          </div>
          
          {currentQuestion && (
            <SequentialQuestion
              question={currentQuestion}
              value={answers[currentQuestion.id] || (currentQuestion.type === 'checkbox' ? [] : '')}
              onChange={handleAnswerChange}
              onNext={nextQuestion}
            />
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={prevQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </Button>
          <Button onClick={nextQuestion}>
            {currentQuestionIndex < totalQuestions - 1 ? 'Skip' : 'See Results'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}