import { CalendarCheck } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";

export default function ThankYouPage() {
  const bookingLink = process.env.BOOKING_LINK || "/";

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <section className="w-full max-w-3xl rounded-lg border border-[var(--line)] bg-[rgba(13,28,24,0.9)] p-8 text-center shadow-2xl">
        <CalendarCheck className="mx-auto text-[var(--accent)]" size={42} />
        <h1 className="mt-6 text-4xl font-bold text-white">Your Operational Intelligence Report Is On Its Way</h1>
        <p className="mx-auto mt-4 max-w-2xl leading-7 text-[#b8c9c0]">
          Thank you. Your report will be sent by email. The next step is to review the highest-value bottlenecks and
          decide which operational fixes deserve priority.
        </p>
        <div className="mt-8">
          <ButtonLink href={bookingLink}>Book Operational Intelligence Audit</ButtonLink>
        </div>
      </section>
    </main>
  );
}
