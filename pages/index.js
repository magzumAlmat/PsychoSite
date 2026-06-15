import Head from "next/head";
import { CLINIC } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Conditions from "@/components/Conditions";
import Formats from "@/components/Formats";
// import Doctor from "@/components/Doctor"; // модуль «Ваш врач» временно отключён
import Certificates from "@/components/Certificates";
import Steps from "@/components/Steps";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import Faq from "@/components/Faq";
import QuizForm from "@/components/QuizForm";
import Contacts from "@/components/Contacts";
import Footer from "@/components/Footer";
import FloatingCTA from "@/components/FloatingCTA";

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Психиатр и психотерапевт в Алматы — приём, вызов на дом 24/7 | mental-clinic
        </title>
        <meta
          name="description"
          content="Психиатр и психотерапевт в Алматы: консультация, лечение депрессии, тревоги, панических атак, ОКР, бессонницы. Приём в клинике, вызов врача на дом и онлайн. Конфиденциально, 24/7."
        />
        <meta
          name="keywords"
          content="психиатр Алматы, психотерапевт Алматы, психиатр на дом Алматы, консультация психиатра, лечение депрессии Алматы, лечение тревоги, панические атаки лечение, ОКР лечение, бессонница лечение Алматы, частный психиатр Алматы, центр ментального здоровья"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1" />
        <meta name="geo.region" content="KZ-ALA" />
        <meta name="geo.placename" content="Алматы" />
        <link rel="canonical" href="https://mental-clinic.kz/" />
        <meta property="og:site_name" content="mental-clinic" />
        <meta property="og:title" content="Психиатр и психотерапевт в Алматы — приём и вызов на дом 24/7" />
        <meta property="og:description" content={CLINIC.tagline} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://mental-clinic.kz/" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:image" content="https://mental-clinic.kz/hero-consultation.jpeg" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Психиатр и психотерапевт в Алматы — mental-clinic" />
        <meta name="twitter:description" content={CLINIC.tagline} />
        <meta name="twitter:image" content="https://mental-clinic.kz/hero-consultation.jpeg" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalClinic",
              name: "Центр ментального здоровья mental-clinic",
              description:
                "Психиатрическая помощь в Алматы: психиатр и психотерапевт, лечение депрессии, тревоги, панических атак, ОКР и бессонницы. Приём в клинике, на дому и онлайн.",
              url: "https://mental-clinic.kz/",
              telephone: CLINIC.phone,
              email: CLINIC.email,
              image: "https://mental-clinic.kz/hero-consultation.jpeg",
              medicalSpecialty: "Psychiatric",
              priceRange: "₸₸",
              address: {
                "@type": "PostalAddress",
                streetAddress: "ул. Фадеева 19",
                addressLocality: "Алматы",
                addressCountry: "KZ",
              },
              areaServed: { "@type": "City", name: "Алматы" },
              openingHoursSpecification: {
                "@type": "OpeningHoursSpecification",
                dayOfWeek: [
                  "Monday", "Tuesday", "Wednesday", "Thursday",
                  "Friday", "Saturday", "Sunday",
                ],
                opens: "00:00",
                closes: "23:59",
              },
              availableService: [
                { "@type": "MedicalProcedure", name: "Консультация психиатра" },
                { "@type": "MedicalProcedure", name: "Консультация психотерапевта" },
                { "@type": "MedicalProcedure", name: "Вызов психиатра на дом" },
                { "@type": "MedicalProcedure", name: "Лечение депрессии" },
                { "@type": "MedicalProcedure", name: "Лечение тревожных расстройств" },
                { "@type": "MedicalProcedure", name: "Лечение в стационаре" },
              ],
              sameAs: [CLINIC.whatsapp],
            }),
          }}
        />
      </Head>

      <Navbar />
      <main id="main">
        <Hero />
        <Conditions />
        <Formats />
        {/* <Doctor /> — модуль «Ваш врач» временно отключён */}
        <Certificates />
        <Steps />
        <Pricing />
        <Testimonials />
        <Faq />
        <QuizForm />
        <Contacts />
      </main>
      <Footer />
      {/* Mobile sticky call/WhatsApp bar + spacer so it never covers content */}
      <div className="h-20 lg:hidden" aria-hidden />
      <FloatingCTA />
    </>
  );
}
