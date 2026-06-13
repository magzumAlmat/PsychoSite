import "@/styles/globals.css";
import Script from "next/script";
import { MotionConfig } from "framer-motion";

export default function App({ Component, pageProps }) {
  // reducedMotion="user" → all framer-motion animations honor
  // the OS "reduce motion" setting (Accessible & Ethical style).
  return (
    <>
      {/* Google tag (gtag.js) — Google Ads (loaded once on every page) */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=AW-18236496763"
        strategy="afterInteractive"
      />
      <Script id="gtag-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18236496763');`}
      </Script>

      <MotionConfig reducedMotion="user">
        <Component {...pageProps} />
      </MotionConfig>
    </>
  );
}
