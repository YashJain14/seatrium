// lib/types.ts
export interface Option {
  label: string;
  multiplier: number;
}

export interface Question {
  id: string;
  text: string;
  type: 'checkbox' | 'radio';
  options: Option[];
}

export interface Category {
  name: string;
  percentage: number;
  questions: Question[];
}

export interface QuestionnaireData {
  categories: Category[];
  calculationLogic: {
    formula: string;
  };
}

export interface CalculationResult {
  categoryResults: {
    name: string;
    percentage: number;
    calculatedValue: number;
    impact: number;
  }[];
  totalEmissionFactor: number;
}