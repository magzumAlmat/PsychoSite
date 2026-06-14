import "@/styles/globals.css";
import { useEffect } from "react";
import { MotionConfig } from "framer-motion";

// Google Ads conversion: фиксируем клик по кнопке «Позвонить» (любая ссылка tel:).
// Базовый тег gtag (AW-18236496763) подключён в pages/_document.js.
// TODO: вставь сюда send_to из Google Ads:
//   Цели → Конверсии → твоя конверсия → «Установить тег самостоятельно» →
//   скопируй строку вида AW-18236496763/AbCdEf123 и замени плейсхолдер ниже.
const CALL_CONVERSION_SEND_TO = "AW-18236496763/WybVCPaWxb4cEPu26_dD";

export default function App({ Component, pageProps }) {
  // reducedMotion="user" → all framer-motion animations honor
  // the OS "reduce motion" setting (Accessible & Ethical style).
  useEffect(() => {
    function handleCallClick(e) {
      const link = e.target.closest('a[href^="tel:"]');
      if (!link) return;
      if (typeof window.gtag !== "function") return;
      // Не отправляем конверсию, пока не вставлен реальный ярлык.
      if (CALL_CONVERSION_SEND_TO.includes("ВСТАВЬ_ЯРЛЫК")) return;
      window.gtag("event", "conversion", { send_to: CALL_CONVERSION_SEND_TO });
    }
    document.addEventListener("click", handleCallClick);
    return () => document.removeEventListener("click", handleCallClick);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <Component {...pageProps} />
    </MotionConfig>
  );
}
