// app/create-product/page.tsx
'use client';

import { questionnaireData } from '@/lib/data';
import QuestionnaireForm from '@/components/QuestionnaireForm';

export default function CreateProduct() {
  return (
    <div>
      <QuestionnaireForm data={questionnaireData} />
    </div>
  );
}