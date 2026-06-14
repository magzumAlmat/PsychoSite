import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="ru">
      <Head>
        {/* Google tag (gtag.js) — Google Ads */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-18238841913" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'AW-18238841913');`,
          }}
        />

        {/* Google tag (gtag.js) */}
        {/* eslint-disable-next-line @next/next/next-script-for-ga */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-608CDWWX98" />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-608CDWWX98');`,
          }}
        />

        {/* Google Ads conversion: клик по «Позвонить» (любая ссылка tel:).
            Инлайн-слушатель в <head> — надёжнее React-эффекта (не зависит от гидрации/чанков). */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.addEventListener('click', function (e) {
  var link = e.target.closest && e.target.closest('a[href^="tel:"]');
  if (!link || typeof window.gtag !== 'function') return;
  // TODO: вставь ярлык конверсии из НОВОГО аккаунта AW-18238841913
  // (Цели -> Конверсии -> действие -> "Посмотреть тег события" -> send_to).
  var SEND_TO = 'AW-18238841913/ВСТАВЬ_ЯРЛЫК';
  if (SEND_TO.indexOf('ВСТАВЬ_ЯРЛЫК') !== -1) return; // не шлём, пока нет реального ярлыка
  window.gtag('event', 'conversion', { send_to: SEND_TO });
});`,
          }}
        />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700&family=Source+Sans+3:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0F766E" />
      </Head>
      <body className="antialiased">
        <a href="#main" className="skip-link">
          Перейти к содержимому
        </a>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
