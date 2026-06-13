import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, ShieldCheck, ZoomIn, X, ChevronLeft, ChevronRight } from "lucide-react";
import { CERTIFICATES } from "@/lib/site";
import { Container, Section, Eyebrow, reveal, stagger } from "@/components/ui/primitives";

export default function Certificates() {
  const [active, setActive] = useState(null); // index of opened cert or null

  const close = useCallback(() => setActive(null), []);
  const step = useCallback(
    (dir) =>
      setActive((i) =>
        i === null ? i : (i + dir + CERTIFICATES.length) % CERTIFICATES.length
      ),
    []
  );

  useEffect(() => {
    if (active === null) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, close, step]);

  return (
    <Section id="licenses" className="relative overflow-hidden bg-muted/40">
      <div aria-hidden className="orb absolute -right-24 top-10 h-[22rem] w-[22rem] bg-primary/8" />
      <Container className="relative">
        <div className="mx-auto max-w-2xl text-center">
          <Eyebrow>
            <ShieldCheck size={16} aria-hidden /> Документы
          </Eyebrow>
          <h2 className="mt-4 text-3xl font-bold text-foreground sm:text-4xl">
            Сертификаты и{" "}
            <span className="text-primary">лицензии</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Подтверждённая квалификация и право вести медицинскую деятельность.
            Нажмите, чтобы рассмотреть документ.
          </p>
        </div>

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {CERTIFICATES.map((c, i) => (
            <motion.li key={c.src} variants={reveal}>
              <button
                type="button"
                onClick={() => setActive(i)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-3xl border border-border bg-card text-left shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10 cursor-pointer"
              >
                <span className="relative block aspect-[4/3] overflow-hidden bg-muted">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={c.src}
                    alt={c.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-foreground/0 transition-colors group-hover:bg-foreground/10" />
                  <span className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-card/90 text-primary opacity-0 shadow backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <ZoomIn size={18} aria-hidden />
                  </span>
                  {c.main && (
                    <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-on-primary shadow">
                      <Award size={12} aria-hidden /> Лицензия
                    </span>
                  )}
                </span>
                <span className="flex flex-1 flex-col p-4">
                  <span className="text-sm font-bold leading-snug text-foreground">{c.title}</span>
                  <span className="mt-1.5 text-xs leading-relaxed text-muted-foreground">{c.issuer}</span>
                </span>
              </button>
            </motion.li>
          ))}
        </motion.ul>
      </Container>

      {/* Lightbox */}
      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={CERTIFICATES[active].title}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Закрыть"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer"
            >
              <X size={22} aria-hidden />
            </button>

            {CERTIFICATES.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); step(-1); }}
                  aria-label="Предыдущий"
                  className="absolute left-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer sm:left-6"
                >
                  <ChevronLeft size={24} aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); step(1); }}
                  aria-label="Следующий"
                  className="absolute right-3 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 cursor-pointer sm:right-6"
                >
                  <ChevronRight size={24} aria-hidden />
                </button>
              </>
            )}

            <motion.figure
              key={active}
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25 }}
              className="flex max-h-[88vh] max-w-3xl flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={CERTIFICATES[active].src}
                alt={CERTIFICATES[active].title}
                className="max-h-[80vh] w-auto rounded-xl bg-white object-contain shadow-2xl"
              />
              <figcaption className="mt-3 text-center text-sm text-white/85">
                {CERTIFICATES[active].title} · {CERTIFICATES[active].issuer}
              </figcaption>
            </motion.figure>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
