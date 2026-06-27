import { CalendarCheck, CheckCircle } from "lucide-react";

const BOOKING_URL =
  "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2_Rp7RRFppwCG3x-cR9AguNsBnlwt84k5EWDaKDTewkmc72flE0i_IH3m0YJVABnEhaakYuAdE";

const auditOutcomes = [
  "Mapa actual de fricción en flujos de trabajo",
  "Oportunidades de automatización prioritarias",
  "Rango estimado de ahorros o capacidad recuperada",
  "Revisión de fugas de prospectos y tiempos de respuesta",
  "Evaluación de documentación y dependencia del fundador",
  "Sprint de automatización inicial recomendado",
];

const pricingTiers = [
  { tier: "Proyecto Starter", range: "$1,500 – $3,000" },
  { tier: "Proyecto Growth", range: "$3,000 – $6,000" },
  { tier: "Proyecto Advanced", range: "$6,000 – $12,000" },
  { tier: "Enterprise Build", range: "$12,000+" },
];

export default function ThankYouPageES() {
  return (
    <main className="min-h-screen bg-[var(--panel)] px-6 py-12">
      <div className="mx-auto max-w-3xl">

        {/* Confirmación */}
        <section className="rounded-xl border border-[var(--line)] bg-white p-8 shadow-sm">
          <CalendarCheck className="text-[var(--tangerine)]" size={40} />
          <h1 className="mt-4 text-2xl font-bold text-[var(--petrol)]">Reporte Enviado</h1>
          <p className="mt-4 text-base leading-7 text-[var(--charcoal)]">
            Revisa tu bandeja de entrada. Tu análisis de activos personalizado ha sido enviado. Ahora es momento
            de aislar los cuellos de botella de mayor valor y priorizar las correcciones operacionales necesarias
            para recuperar la eficiencia de tu equipo.
          </p>
        </section>

        {/* Frugal Audit */}
        <section className="mt-6 rounded-xl border border-[var(--line)] bg-white p-8 shadow-sm">
          <h2 className="text-2xl font-bold text-[var(--petrol)]">Qué sigue: El Frugal Audit de 1 Día</h2>
          <p className="mt-4 leading-7 text-[var(--charcoal)]">
            Tu diagnóstico muestra dónde el desperdicio operacional puede estar costándole a tu negocio tiempo,
            dinero y velocidad de ejecución.
          </p>
          <p className="mt-3 leading-7 text-[var(--charcoal)]">
            El <strong className="text-[var(--petrol)]">Frugal Audit</strong> es un sprint de inteligencia operacional de 1 día donde Frugal Studio y
            Mindful Tech Automations revisan tus flujos de trabajo, stack tecnológico, flujo de prospectos,
            cuellos de botella manuales, brechas de documentación y dependencia del fundador.
          </p>
          <p className="mt-3 leading-7 text-[var(--charcoal)]">
            Recibes un roadmap operacional claro que muestra qué simplificar, qué automatizar y qué corregir primero.
          </p>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">Qué incluye</h3>
          <ul className="mt-4 grid gap-3">
            {auditOutcomes.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle size={16} className="mt-0.5 shrink-0 text-[var(--tangerine)]" />
                <span className="text-[var(--charcoal)]">{item}</span>
              </li>
            ))}
          </ul>

          <h3 className="mt-8 text-sm font-semibold uppercase tracking-[0.14em] text-[var(--ink-muted)]">Niveles de proyecto</h3>
          <div className="mt-4 overflow-hidden rounded-xl border border-[var(--line)]">
            {pricingTiers.map(({ tier, range }, i) => (
              <div key={tier}
                className={`flex items-center justify-between px-5 py-3 text-sm ${i !== pricingTiers.length - 1 ? "border-b border-[var(--line)]" : ""}`}>
                <span className="font-medium text-[var(--petrol)]">{tier}</span>
                <span className="font-semibold text-[var(--tangerine)]">{range}</span>
              </div>
            ))}
          </div>

          <div className="mt-8">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer"
              className="inline-flex h-12 items-center gap-2 rounded-lg bg-[var(--tangerine)] px-6 text-sm font-bold text-white transition hover:bg-[var(--accent-strong)]">
              <CalendarCheck size={16} /> Reservar una Llamada de Descubrimiento
            </a>
            <p className="mt-3 text-xs text-[var(--ink-muted)]">
              Reserva una Llamada de Descubrimiento para conocer más sobre el sprint de auditoría y el proceso de implementación.
            </p>
          </div>
        </section>

      </div>
    </main>
  );
}
