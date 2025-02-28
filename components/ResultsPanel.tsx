// components/ResultsPanel.tsx
'use client';

import { CalculationResult, QuestionnaireData } from '../lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';

interface ResultsPanelProps {
  result: CalculationResult;
  supplierName: string;
  supplierID?: string;
  productName: string;
  answers: Record<string, string | string[]>;
  questionnaireData: QuestionnaireData;
  standardEmissionFactor: number;
  onReset: () => void;
}

export function ResultsPanel({ 
  result, 
  supplierName,
  supplierID,
  productName,
  answers,
  questionnaireData,
  standardEmissionFactor,
  onReset 
}: ResultsPanelProps) {
  // Helper function to get question text by ID
  const getQuestionById = (questionId: string) => {
    for (const category of questionnaireData.categories) {
      const question = category.questions.find(q => q.id === questionId);
      if (question) return question;
    }
    return null;
  };

  return (
    <div className="space-y-6">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle>Emission Calculation Results</CardTitle>
          <div className="text-lg">
            <p><span className="font-medium">Supplier:</span> {supplierName} {supplierID ? `(${supplierID})` : ''}</p>
            <p><span className="font-medium">Product:</span> {productName}</p>
          </div>
        </CardHeader>
        
        <CardContent>
          <div className="flex flex-col md:flex-row md:items-end gap-4 mb-6 p-4 bg-blue-50 rounded-lg">
            <div>
              <h4 className="font-semibold text-lg mb-1">Emission Factor:</h4>
              <div className="text-3xl font-bold text-blue-700">
                {result.absoluteEmissionFactor?.toFixed(2)} <span className="text-lg font-normal">tCO₂/tonne</span>
              </div>
            </div>
            <div className="text-gray-600 text-sm">
              <p>Standard factor: {standardEmissionFactor} tCO₂/tonne</p>
              <p>Multiplier: {result.totalEmissionFactor.toFixed(2)}x</p>
            </div>
          </div>
          
          <div className="mb-6">
            <h4 className="font-semibold text-lg mb-2">Category Breakdown:</h4>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Category</TableHead>
                  <TableHead>Contribution</TableHead>
                  <TableHead>Impact</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {result.categoryResults.map((category, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{category.name}</TableCell>
                    <TableCell>{category.percentage}%</TableCell>
                    <TableCell>{category.impact.toFixed(2)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div>
            <h4 className="font-semibold text-lg mb-2">Your Selections:</h4>
            <ScrollArea className="h-80 border rounded-md p-4">
              {Object.entries(answers).map(([questionId, answer], index) => {
                const question = getQuestionById(questionId);
                if (!question) return null;
                
                return (
                  <div key={questionId} className="mb-4">
                    <p className="font-medium">{question.text}</p>
                    {Array.isArray(answer) ? (
                      <ul className="list-disc pl-5 mt-1">
                        {answer.map((item, i) => (
                          <li key={i} className="text-gray-700">{item}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-700 mt-1">{answer}</p>
                    )}
                    {index < Object.keys(answers).length - 1 && <Separator className="my-2" />}
                  </div>
                );
              })}
            </ScrollArea>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-end space-x-4">
          <Button variant="outline" onClick={onReset}>
            Start Over
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}