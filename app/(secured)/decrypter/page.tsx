import { DecrypterCard } from '@/components/custom-ui/decrypter-page';
import React from 'react'

function DecrypterPage() {

  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <DecrypterCard />
    </div>
  );
}

export default DecrypterPage