import { motion } from "framer-motion";
import {
  Stethoscope,
  MessagesSquare,
  Home,
  ClipboardList,
  HeartHandshake,
  BedDouble,
  Lock,
  ArrowRight,
} from "lucide-react";
import { FORMATS, CLINIC } from "@/lib/site";
import { Container, Section, Eyebrow, Button, stagger } from "@/components/ui/primitives";

const ICONS = {
  Stethoscope,
  MessagesSquare,
  Home,
  ClipboardList,
  HeartHandshake,
  BedDouble,
  Lock,
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Formats() {
  return (
    <Section id="formats" className="relative overflow-hidden bg-muted/40">
      <div
        aria-hidden
        className="orb absolute -left-20 top-1/3 h-[22rem] w-[22rem] bg-secondary/10"
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Eyebrow>
            <Stethoscope size={16} aria-hidden /> Форматы помощи
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Поможем так, как{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              удобно вам
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Приём в клинике, выезд на дом, стационар или полностью конфиденциальная
            консультация — выбираем формат под ваше состояние и ситуацию.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {FORMATS.map((f) => {
            const Icon = ICONS[f.icon];
            return (
              <motion.article
                key={f.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="pulse-glow group relative flex flex-col rounded-3xl border border-border bg-card p-6 shadow-sm transition-all"
              >
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-lg group-hover:shadow-primary/20">
                  {Icon ? <Icon size={24} aria-hidden /> : null}
                </span>
                <h3 className="mt-5 text-lg font-bold text-foreground">
                  {f.title}
                </h3>
                <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted-foreground">
                  {f.text}
                </p>
              </motion.article>
            );
          })}

          {/* CTA card */}
          <motion.div
            variants={cardVariants}
            className="flex flex-col justify-center rounded-3xl border border-primary/30 bg-gradient-to-br from-primary-600 to-primary-700 p-6 text-on-primary shadow-lg shadow-primary/20"
          >
            <h3 className="text-lg font-bold">Не знаете, что выбрать?</h3>
            <p className="mt-2 text-sm text-on-primary/90">
              Позвоните — бесплатно подскажем подходящий формат и ближайшее
              время приёма.
            </p>
            <Button
              href={CLINIC.phoneHref}
              variant="accent"
              className="mt-5 self-start"
            >
              Получить консультацию
              <ArrowRight size={18} aria-hidden />
            </Button>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  );
}
