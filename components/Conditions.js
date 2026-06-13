import { motion } from "framer-motion";
import {
  Brain,
  BrainCircuit,
  Puzzle,
  Activity,
  CloudRain,
  Wind,
  Repeat,
  Waves,
  Zap,
  AlertTriangle,
  Shuffle,
} from "lucide-react";
import { CONDITIONS } from "@/lib/site";
import { Container, Section, Eyebrow, stagger } from "@/components/ui/primitives";

const ICONS = {
  Brain,
  BrainCircuit,
  Puzzle,
  Activity,
  CloudRain,
  Wind,
  Repeat,
  Waves,
  Zap,
  AlertTriangle,
  Shuffle,
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Conditions() {
  return (
    <Section id="conditions" className="relative overflow-hidden">
      <div
        aria-hidden
        className="orb absolute -right-40 top-20 h-[28rem] w-[28rem] bg-primary/10"
        style={{ animationDelay: "2s" }}
      />
      <Container className="relative">
        <div className="max-w-2xl">
          <Eyebrow>Заболевания, которые мы лечим</Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Помощь при широком круге{" "}
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              психических состояний
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            От тревоги и депрессии до тяжёлых заболеваний — деликатно,
            конфиденциально и без осуждения. Лечение подбирается индивидуально.
          </p>
        </div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CONDITIONS.map((c) => {
            const Icon = ICONS[c.icon];
            return (
              <motion.article
                key={c.title}
                variants={cardVariants}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="pulse-glow group relative rounded-3xl border border-border bg-card p-6 shadow-sm transition-all"
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                <span className="relative grid h-12 w-12 place-items-center rounded-2xl bg-muted text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-on-primary group-hover:shadow-lg group-hover:shadow-primary/20">
                  {Icon ? <Icon size={24} aria-hidden /> : null}
                </span>
                <h3 className="relative mt-5 text-lg font-bold text-foreground">
                  {c.title}
                </h3>
                <p className="relative mt-2 text-[15px] leading-relaxed text-muted-foreground">
                  {c.text}
                </p>
              </motion.article>
            );
          })}
        </motion.div>

        <p className="mt-8 text-center text-sm text-muted-foreground">
          Не нашли своё состояние? Позвоните — поможем разобраться и подскажем,
          что делать дальше.
        </p>
      </Container>
    </Section>
  );
}
