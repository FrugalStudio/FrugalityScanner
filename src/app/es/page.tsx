"use client";

import { ArrowRight, Gauge, Layers3, LineChart, Workflow } from "lucide-react";
import { ButtonLink } from "@/components/ButtonLink";
import type { LucideIcon } from "lucide-react";

const CONSULTING_PHOTO = "/consulting-photo.jpg";

const measures: [string, string, LucideIcon][] = [
  ["Fricción en Flujos de Trabajo", "Donde las transferencias manuales y aprobaciones redundantes frenan tu velocidad de ejecución diaria.", Workflow],
  ["Fuga de Ingresos", "Donde los tiempos de respuesta no optimizados y las brechas en la entrega sangran oportunidades de alto valor.", LineChart],
  ["Dependencia del Fundador", "Donde el liderazgo sigue siendo el sistema operativo predeterminado para tareas rutinarias.", Layers3],
  ["Fragmentación de Sistemas", "Donde las herramientas desconectadas y los datos dispersos crean una deuda estructural pesada.", Gauge],
];

const infoBoxes = [
  {
    title: "Para quién es",
    text: "Diseñado para fundadores tecnológicos, operadores de servicios, inmobiliarias y organizaciones que buscan mejorar su eficiencia operacional.",
  },
  {
    title: "Qué recibirás",
    text: "Obtendrás puntuaciones operacionales inmediatas en tus flujos críticos, identificarás tu principal cuello de botella de ejecución y recibirás un mapa de acción estratégico.",
  },
  {
    title: "Por qué la fricción cuesta dinero",
    text: "Las startups y las pequeñas empresas rara vez fracasan porque su visión es demasiado pequeña. Fracasan porque su modelo de ejecución es estructuralmente demasiado pesado.",
  },
];

export default function HomeES() {
  return (
    <main className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="executive-grid brand-shell border-b border-[var(--line)] px-6 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex rounded-full border border-[rgba(240,144,60,0.4)] bg-[rgba(240,144,60,0.08)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--tangerine)]">
              Frugal Studio powered by Mindful Tech Automations
            </div>
            <h1 className="text-5xl font-bold leading-[1.06] text-[var(--petrol)] md:text-6xl">
              ¿Cuánto desperdicio operacional se esconde dentro de tu negocio?
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-[var(--charcoal)]">
              Un diagnóstico de 10 minutos para detectar las fugas ocultas que drenan tu negocio. Recupera el
              tiempo y los recursos que necesitas para escalar.
            </p>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--ink-muted)]">
              Nuestra consultoría de automatización con IA transforma estos cuellos de botella operacionales en
              flujos de trabajo autónomos, asegurando tus márgenes y brindando la agilidad estructural necesaria
              para un crecimiento de alta velocidad. Empieza aquí.
            </p>
            <div className="mt-10 flex flex-col items-start gap-2">
              <span className="text-sm text-[var(--ink-muted)]">Desplázate para saber más</span>
              <svg className="animate-bounce text-[var(--tangerine)]" width="24" height="24" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 5v14M5 12l7 7 7-7" />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* ── Pilares del diagnóstico ────────────────────────────────────── */}
      <section className="border-b border-[var(--line)] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <div className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--tangerine)]">
              Frugality Scanner Assessment
            </div>
            <h2 className="mt-2 text-3xl font-bold text-[var(--petrol)]">Cuatro pilares de diagnóstico</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {measures.map(([title, text, Icon]) => (
              <div key={title} className="flex gap-4 rounded-xl border border-[var(--line)] bg-white p-5 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[rgba(32,80,90,0.08)] text-[var(--petrol)]">
                  <Icon size={20} />
                </div>
                <div>
                  <div className="font-bold text-[var(--petrol)]">{title}</div>
                  <div className="mt-1 text-sm leading-6 text-[var(--ink-muted)]">{text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Para quién — dos columnas con foto ────────────────────────── */}
      <section className="section-alt border-b border-[var(--line)] px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <div className="flex flex-col gap-5">
              {infoBoxes.map(({ title, text }) => (
                <div key={title} className="rounded-xl border border-[var(--line)] bg-white p-6 shadow-sm">
                  <h3 className="font-bold text-[var(--petrol)]">{title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[var(--charcoal)]">{text}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <img
                  src={CONSULTING_PHOTO}
                  alt="Felipe Hernández Villa-Roel — Frugal Studio"
                  className="h-[480px] w-[360px] rounded-2xl object-cover shadow-xl"
                  onError={(e) => {
                    (e.currentTarget.parentElement as HTMLElement).style.display = "none";
                  }}
                />
                <div className="absolute -bottom-3 -right-3 -z-10 h-full w-full rounded-2xl border-2 border-[var(--petrol)] opacity-20" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA final ─────────────────────────────────────────────────── */}
      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-3xl font-bold text-[var(--petrol)]">Construido para decisiones operacionales más inteligentes.</h2>
          <p className="mt-3 max-w-2xl text-[var(--charcoal)]">
            Este diagnóstico GRATUITO es el punto de entrada directo a una Auditoría de Inteligencia Operacional
            pagada con Frugal Studio powered by Mindful Tech Automations, estableciendo el marco para la
            implementación completa de automatización de flujos de trabajo.
          </p>
          <div className="mt-8">
            <ButtonLink href="/es/assessment" variant="cta">
              <span className="inline-flex items-center gap-2">
                Iniciar Diagnóstico Gratuito <ArrowRight size={18} />
              </span>
            </ButtonLink>
          </div>
        </div>
      </section>
    </main>
  );
}
