import Head from "next/head";
import { CLINIC } from "@/lib/site";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Conditions from "@/components/Conditions";
import Formats from "@/components/Formats";
import Doctor from "@/components/Doctor";
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
          {CLINIC.fullName} — психиатр, психотерапевт в Алматы
        </title>
        <meta
          name="description"
          content="Центр ментального здоровья mental-clinic: лечение депрессии, тревоги, шизофрении, деменции и других расстройств. Приём психиатра в клинике, на дому и анонимно. Консультация 24/7."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={CLINIC.fullName} />
        <meta property="og:description" content={CLINIC.tagline} />
        <meta property="og:type" content="website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />
      <main id="main">
        <Hero />
        <Conditions />
        <Formats />
        <Doctor />
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
