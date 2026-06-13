import { useState } from "react";
import { motion } from "framer-motion";
import { Stethoscope, BadgeCheck, Phone, MessageCircle, Quote } from "lucide-react";
import { DOCTOR, CLINIC } from "@/lib/site";
import { Container, Section, Eyebrow, Button } from "@/components/ui/primitives";

function initials(name) {
  return name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("");
}

export default function Doctor() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <Section id="doctor" className="relative overflow-hidden">
      <div
        aria-hidden
        className="orb absolute -right-24 top-10 h-[24rem] w-[24rem] bg-primary/8"
        style={{ animationDelay: "4s" }}
      />
      <Container className="relative">
        <div className="grid items-center gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glow-ring relative mx-auto w-full max-w-sm overflow-hidden rounded-[2rem] border border-border bg-card shadow-xl shadow-primary/10"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-gradient-to-br from-primary/15 to-accent/15">
              {imgOk ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={DOCTOR.photo}
                  alt={`Фото врача: ${DOCTOR.name}, ${DOCTOR.role}`}
                  loading="lazy"
                  onError={() => setImgOk(false)}
                  className="h-full w-full object-cover"
                />
              ) : (
                <div
                  className="flex h-full w-full items-center justify-center bg-gradient-to-br from-primary to-accent text-6xl font-extrabold text-on-primary"
                  aria-hidden
                >
                  {initials(DOCTOR.name)}
                </div>
              )}
              <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold text-primary-600 shadow-lg shadow-black/10 backdrop-blur-sm">
                <BadgeCheck size={14} aria-hidden /> {DOCTOR.exp}
              </span>
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <Eyebrow>
              <Stethoscope size={16} aria-hidden /> Ваш врач
            </Eyebrow>
            <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
              {DOCTOR.name}
            </h2>
            <p className="mt-2 flex items-center gap-2 text-lg font-semibold text-primary">
              <Stethoscope size={18} className="shrink-0" aria-hidden />
              {DOCTOR.role}
            </p>

            <div className="mt-5 space-y-3 text-[15px] leading-relaxed text-muted-foreground">
              {DOCTOR.bio.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <ul className="mt-6 flex flex-wrap gap-2">
              {DOCTOR.tags.map((t) => (
                <li
                  key={t}
                  className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                >
                  {t}
                </li>
              ))}
            </ul>

            <figure className="mt-6 flex items-start gap-3 rounded-2xl border border-border bg-muted/50 p-4">
              <Quote size={20} className="shrink-0 text-primary" aria-hidden />
              <blockquote className="text-[15px] italic text-foreground">
                «Психическое расстройство — это болезнь, а не слабость. И ей
                можно и нужно помогать.»
              </blockquote>
            </figure>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button href={CLINIC.phoneHref} variant="primary">
                <Phone size={18} aria-hidden /> Записаться на приём
              </Button>
              <Button
                href={CLINIC.whatsapp}
                variant="outline"
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageCircle size={18} aria-hidden /> WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
