import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { OrderSection } from "@/components/order-section"
import { AboutSection } from "@/components/about-section"
import { LocationSection } from "@/components/location-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { BubbleEffects } from "@/components/bubble-effects"
import { PizzaIntro } from "@/components/pizza-intro"

function SectionDivider() {
  return (
    <div className="relative h-px">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </div>
  )
}

function FancyDivider() {
  return (
    <div className="relative py-8 flex items-center justify-center">
      <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-border/50 to-transparent" />
      <div className="relative flex items-center gap-3">
        <div className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
        <div className="w-2 h-2 bg-primary rounded-full" />
        <div className="w-1.5 h-1.5 bg-primary/50 rounded-full" />
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <main className="min-h-screen relative">
      <PizzaIntro />
      <BubbleEffects />
      <Header />
      <HeroSection />
      <FancyDivider />
      <OrderSection />
      <FancyDivider />
      <AboutSection />
      <FancyDivider />
      <LocationSection />
      <FancyDivider />
      <ContactSection />
      <Footer />
    </main>
  )
}
