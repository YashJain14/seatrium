// components/ResultsPanel.tsx
'use client';

import { CalculationResult } from '../lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';

interface ResultsPanelProps {
  result: CalculationResult;
  productName: string;
  onReset: () => void;
}

export function ResultsPanel({ 
  result, 
  productName, 
  onReset 
}: ResultsPanelProps) {
  return (
    <Card className="max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Emission Calculation Results</CardTitle>
        <p className="text-xl">{productName}</p>
      </CardHeader>
      
      <CardContent>
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">Total Emission Factor:</h4>
          <div className="text-3xl font-bold text-blue-700">
            {result.totalEmissionFactor.toFixed(2)}
          </div>
        </div>
        
        <div className="mb-6">
          <h4 className="font-semibold text-lg mb-2">Category Breakdown:</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Category</TableHead>
                <TableHead>Percentage</TableHead>
                <TableHead>Multiplier</TableHead>
                <TableHead>Impact</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.categoryResults.map((category, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{category.name}</TableCell>
                  <TableCell>{category.percentage}%</TableCell>
                  <TableCell>{category.calculatedValue.toFixed(2)}</TableCell>
                  <TableCell>{category.impact.toFixed(2)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end space-x-4">
        <Button variant="outline" onClick={onReset}>
          Start Over
        </Button>
      </CardFooter>
    </Card>
  );
}