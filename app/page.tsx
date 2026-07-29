import { Suspense } from 'react'
import HeroSection from '@/components/hero-section'
import MissionVision from '@/components/mission-vision'
import VerticalsSection from '@/components/verticals-section'
import TeamSection from '@/components/team-section'
import ContactSection from '@/components/contact-section'
import MarqueeTicker from '@/components/marquee-ticker'

export default function Home() {
  return (
    <main className="relative">
      <HeroSection />
      <MarqueeTicker />
      <MissionVision />
      <VerticalsSection />
      <TeamSection />
      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>
    </main>
  )
}

