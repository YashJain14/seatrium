// app/page.tsx
'use client';

import { QuestionnaireForm } from '@/components/QuestionnaireForm';
import { questionnaireData } from '@/lib/data';

export default function Home() {
  return (
    <div className="max-w-4xl mx-auto">
      <QuestionnaireForm data={questionnaireData} />
    </div>
  );
}