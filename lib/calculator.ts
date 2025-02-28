// lib/calculator.ts
import { QuestionnaireData, CalculationResult } from './types';

interface UserAnswers {
  [questionId: string]: string[] | string;
}

export function calculateEmissionFactor(
  data: QuestionnaireData, 
  answers: UserAnswers
): CalculationResult {
  const categoryResults = data.categories.map(category => {
    let categoryMultiplier = 0;
    let questionsAnswered = 0;
    
    category.questions.forEach(question => {
      const answer = answers[question.id];
      
      if (answer) {
        if (question.type === 'checkbox' && Array.isArray(answer)) {
          // For checkbox questions, average the multipliers of all selected options
          let sum = 0;
          let count = 0;
          
          answer.forEach(selected => {
            const option = question.options.find(opt => opt.label === selected);
            if (option) {
              sum += option.multiplier;
              count++;
            }
          });
          
          if (count > 0) {
            categoryMultiplier += sum / count;
            questionsAnswered++;
          }
        } else if (question.type === 'radio' && typeof answer === 'string') {
          // For radio questions, find the multiplier of the selected option
          const option = question.options.find(opt => opt.label === answer);
          if (option) {
            categoryMultiplier += option.multiplier;
            questionsAnswered++;
          }
        }
      }
    });
    
    // Calculate average multiplier for the category
    const averageMultiplier = questionsAnswered > 0 
      ? categoryMultiplier / questionsAnswered 
      : 1; // Default to 1 if no questions answered
    
    // Calculate impact: percentage * averageMultiplier
    const impact = (category.percentage / 100) * averageMultiplier;
    
    return {
      name: category.name,
      percentage: category.percentage,
      calculatedValue: averageMultiplier,
      impact: impact
    };
  });
  
  // Sum all category impacts to get final emission factor
  const totalEmissionFactor = categoryResults.reduce(
    (total, category) => total + category.impact, 
    0
  );
  
  return {
    categoryResults,
    totalEmissionFactor
  };
}