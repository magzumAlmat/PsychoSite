import { motion } from "framer-motion";
import { Phone, ArrowRight, CheckCircle2, Award, Users, Clock, Lock, ShieldCheck } from "lucide-react";
import { CLINIC, STATS } from "@/lib/site";
import { Container, Button, EASE } from "@/components/ui/primitives";

// Stat icons aligned to STATS order (12+ / 3000+ / 24/7 / 100%).
const STAT_ICONS = [Award, Users, Clock, Lock];

// Deterministic floating motes over the photo (no Math.random → hydration-safe).
const MOTES = Array.from({ length: 10 }, (_, i) => ({
  left: 56 + ((i * 53) % 40),
  top: ((i * 37) % 78) + 10,
  size: (i % 3) + 2,
  dur: 5 + (i % 5),
  delay: (i % 6) * 0.4,
}));

export default function Hero() {
  return (
    <section className="relative isolate flex min-h-[100vh] items-center overflow-hidden bg-background">
      {/* Banner photo — doctor consulting a patient */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/hero-bg.jpg"
        alt="Психиатр на консультации с пациентом"
        className="absolute inset-0 -z-30 h-full w-full object-cover object-center"
      />

      {/* Readability scrims: keep left copy crisp, let the scene breathe on the right */}
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-r from-background via-background/92 to-background/35" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-background/55 lg:bg-transparent" />
      <div aria-hidden className="absolute inset-0 -z-20 bg-gradient-to-t from-background via-transparent to-background/40" />
      {/* subtle brand tint */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-primary/5 mix-blend-multiply" />

      {/* living layer over the photo */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-1/2 lg:block"
      >
        <motion.div
          className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-[#5FEAD8]/10 to-transparent"
          initial={{ x: "-40%" }}
          animate={{ x: ["-40%", "320%"] }}
          transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
        />
        {MOTES.map((m, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full bg-primary/50"
            style={{ left: `${m.left - 50}%`, top: `${m.top}%`, width: m.size, height: m.size }}
            animate={{ y: [0, -16, 0], opacity: [0.15, 0.6, 0.15] }}
            transition={{ duration: m.dur, repeat: Infinity, ease: "easeInOut", delay: m.delay }}
          />
        ))}
      </motion.div>

      <Container className="py-24 sm:py-32">
        <motion.div
          className="max-w-xl"
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE }}
        >
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-1.5 text-sm font-semibold text-primary-700 backdrop-blur-sm"
          >
            <CheckCircle2 size={15} aria-hidden />
            Бесплатная консультация 24/7
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="mt-7 text-balance text-4xl font-bold leading-[1.07] text-foreground sm:text-5xl lg:text-6xl"
          >
            Возвращаем ясность ума и{" "}
            <span className="text-primary">спокойствие</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted-foreground"
          >
            {CLINIC.fullName}. Лечим депрессию, тревогу, психозы и тяжёлые
            психические заболевания — деликатно и анонимно. Приём в клинике,
            на дому и онлайн.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <Button href={CLINIC.phoneHref} variant="primary" size="lg" className="group">
              <Phone size={18} aria-hidden />
              Позвонить сейчас
              <ArrowRight size={18} aria-hidden className="transition-transform group-hover:translate-x-1" />
            </Button>
            <Button href="#quiz" variant="outline" size="lg">
              Пройти анонимный тест
            </Button>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
            className="mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t border-border/70 pt-8 sm:grid-cols-4"
          >
            {STATS.map((s, i) => {
              const Icon = STAT_ICONS[i] ?? CheckCircle2;
              return (
                <div key={s.label}>
                  <dt className="flex items-center gap-1.5 text-2xl font-bold tabular-nums text-foreground sm:text-[1.75rem]">
                    <Icon size={18} className="shrink-0 text-primary" aria-hidden />
                    {s.value}
                  </dt>
                  <dd className="mt-1 text-xs text-muted-foreground">{s.label}</dd>
                </div>
              );
            })}
          </motion.dl>
        </motion.div>
      </Container>

      {/* confidentiality chip over the scene */}
      <div className="absolute bottom-8 right-8 z-10 hidden items-center gap-2.5 rounded-full border border-white/20 bg-black/35 px-4 py-2 backdrop-blur-md lg:flex">
        <ShieldCheck size={16} className="text-emerald-300" aria-hidden />
        <span className="text-sm font-semibold text-white">Конфиденциальный приём</span>
      </div>

      {/* Bottom fade */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent" aria-hidden />
    </section>
  );
}
