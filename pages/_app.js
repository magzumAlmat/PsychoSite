import "@/styles/globals.css";
import { MotionConfig } from "framer-motion";

export default function App({ Component, pageProps }) {
  // reducedMotion="user" → all framer-motion animations honor
  // the OS "reduce motion" setting (Accessible & Ethical style).
  // Google Ads gtag lives in pages/_document.js (inside <head>, per Google's snippet).
  return (
    <MotionConfig reducedMotion="user">
      <Component {...pageProps} />
    </MotionConfig>
  );
}
