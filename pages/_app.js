import "@/styles/globals.css";
import { MotionConfig } from "framer-motion";

export default function App({ Component, pageProps }) {
  // reducedMotion="user" → all framer-motion animations honor
  // the OS "reduce motion" setting (Accessible & Ethical style).
  // Google Ads conversion (клик по tel:) живёт инлайн-скриптом в pages/_document.js.
  return (
    <MotionConfig reducedMotion="user">
      <Component {...pageProps} />
    </MotionConfig>
  );
}
