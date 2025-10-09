import { SupportForm } from "@/components/settings/support-form";

export default function SupportPage() {
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 md:py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold font-headline tracking-tighter">Support</h1>
          <p className="text-muted-foreground mt-2">We're here to help. How can we assist you?</p>
        </div>
        <SupportForm />
      </div>
    </div>
  );
}
