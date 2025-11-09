import { ComingSoonPlaceholder } from '@/components/deals/coming-soon';
import { Suspense } from 'react';

function DealsPageContent() {
  return (
    <div className="container mx-auto px-4 py-8">
      <ComingSoonPlaceholder />
    </div>
  );
}

export default function DealsPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DealsPageContent />
    </Suspense>
  );
}
