import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, CheckCircle2 } from "lucide-react";
import { Button, inputClass } from "@/components/ui/primitives";

// Reusable consultation dialog: collects phone + free-text request and sends
// the lead to Telegram via /api/lead (same backend as the Contacts / Quiz forms).
// Controlled component: parent owns `open` + `onClose` and passes a `context`
// string (e.g. the condition title) that is forwarded as the lead source.
export default function ConsultModal({ open, onClose, context = "" }) {
  const [form, setForm] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  // Reset state each time the dialog is (re)opened.
  useEffect(() => {
    if (open) {
      setForm({ name: "", phone: "", message: "" });
      setErrors({});
      setSent(false);
      setLoading(false);
    }
  }, [open]);

  // Close on Escape + lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  async function submit(e) {
    e.preventDefault();
    const errs = {};
    if (form.name.trim().length < 2) errs.name = "Укажите имя";
    if (form.phone.replace(/\D/g, "").length < 10) errs.phone = "Введите номер";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    setLoading(true);
    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          message: form.message,
          source: context ? `Консультация: ${context}` : "Консультация",
        }),
      });
      setSent(true);
    } catch {
      setSent(true);
    } finally {
      setLoading(false);
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-end justify-center p-0 sm:items-center sm:p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          aria-hidden={!open}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Dialog */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label="Заявка на консультацию"
            initial={{ y: 40, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            className="relative w-full max-w-md rounded-t-3xl border border-border bg-card p-6 shadow-2xl sm:rounded-3xl sm:p-8"
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Закрыть"
              className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <X size={20} aria-hidden />
            </button>

            {sent ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <span className="grid h-16 w-16 place-items-center rounded-full bg-accent/15 text-accent">
                  <CheckCircle2 size={36} aria-hidden />
                </span>
                <h3 className="mt-5 text-2xl font-bold text-foreground">
                  Заявка отправлена
                </h3>
                <p className="mt-2 max-w-sm text-muted-foreground">
                  Мы свяжемся с вами в ближайшее время. Берегите себя.
                </p>
                <Button as="button" type="button" variant="primary" className="mt-6" onClick={onClose}>
                  Хорошо
                </Button>
              </div>
            ) : (
              <form onSubmit={submit} noValidate>
                <h3 className="pr-8 text-xl font-bold text-foreground">
                  Проконсультироваться
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {context ? `Направление: ${context}. ` : ""}Оставьте номер и
                  опишите ситуацию — перезвоним и бесплатно проконсультируем.
                </p>

                <div className="mt-5 space-y-4">
                  <div>
                    <label htmlFor="cm-name" className="mb-1.5 block text-sm font-semibold text-foreground">
                      Имя <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="cm-name"
                      type="text"
                      autoComplete="name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      aria-invalid={!!errors.name}
                      className={inputClass}
                      placeholder="Ваше имя"
                    />
                    {errors.name && (
                      <p role="alert" className="mt-1.5 text-sm text-destructive">{errors.name}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cm-phone" className="mb-1.5 block text-sm font-semibold text-foreground">
                      Телефон <span className="text-destructive">*</span>
                    </label>
                    <input
                      id="cm-phone"
                      type="tel"
                      inputMode="tel"
                      autoComplete="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      aria-invalid={!!errors.phone}
                      className={inputClass}
                      placeholder="+7 (___) ___-__-__"
                    />
                    {errors.phone && (
                      <p role="alert" className="mt-1.5 text-sm text-destructive">{errors.phone}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="cm-message" className="mb-1.5 block text-sm font-semibold text-foreground">
                      Текст заявки
                    </label>
                    <textarea
                      id="cm-message"
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className={`${inputClass} resize-none`}
                      placeholder="Опишите ситуацию (необязательно)"
                    />
                  </div>
                </div>

                <Button as="button" type="submit" variant="accent" className="mt-6 w-full" loading={loading}>
                  {loading ? "Отправляем…" : "Отправить заявку"}
                </Button>
                <p className="mt-3 text-center text-xs text-muted-foreground">
                  Нажимая кнопку, вы соглашаетесь на обработку персональных данных
                </p>
              </form>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
