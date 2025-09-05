import { EncrypterCard } from '@/components/custom-ui/encrypter-page';


function EncrypterPage() {
  return (
    <div className="flex w-full min-h-screen flex-col items-center justify-center gap-6 p-6 md:p-10">
      <EncrypterCard />
    </div>
  );
}

export default EncrypterPage