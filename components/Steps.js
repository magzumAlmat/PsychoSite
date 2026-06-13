import { motion } from "framer-motion";
import { Phone } from "lucide-react";
import { STEPS, CLINIC } from "@/lib/site";
import { Container, Section, Eyebrow, Button } from "@/components/ui/primitives";

export default function Steps() {
  return (
    <Section id="steps" className="relative overflow-hidden bg-muted/40">
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>Как проходит приём</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Понятный путь —{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              от звонка до результата
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Без давления и осуждения. Вы сами решаете каждый шаг, мы только
            помогаем и поддерживаем.
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.12, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              className="group relative rounded-3xl border border-border bg-card p-6 shadow-sm"
            >
              <motion.span
                whileHover={{ scale: 1.15, rotate: -5 }}
                className="grid h-12 w-12 place-items-center rounded-2xl bg-primary-600 text-lg font-bold text-on-primary shadow-lg shadow-primary/20"
              >
                {step.n}
              </motion.span>
              <h3 className="mt-4 text-lg font-bold text-foreground">
                {step.title}
              </h3>
              <p className="mt-1.5 text-sm text-muted-foreground">{step.text}</p>
              {i < STEPS.length - 1 && (
                <div
                  className="absolute right-0 top-9 hidden h-px w-6 bg-gradient-to-r from-primary/40 to-transparent lg:block"
                  aria-hidden
                />
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href={CLINIC.phoneHref} variant="primary" size="lg">
            <Phone size={18} aria-hidden /> Сделать первый шаг
          </Button>
        </div>
      </Container>
    </Section>
  );
}
