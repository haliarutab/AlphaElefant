import React from 'react'
import MissionVision from '@/components/mission-vision'
import { ArrowDown, Code, Layout, Zap, GraduationCap, Globe, Megaphone } from 'lucide-react'

export const metadata = {
  title: 'About Alpha Elefant — Our Structural Core',
  description: 'Learn about our mission to construct a global benchmark for multi-vertical operations and our vision to stand as the bridge to digital supremacy.',
}

export default function AboutPage() {
  return (
    <div className="bg-background min-h-screen">
      {/* Intro Header */}
      <div className="relative pt-20 pb-10 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[350px] bg-[#E8500A]/5 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          <span className="text-[#E8500A] text-xs font-mono font-bold tracking-[0.3em] uppercase">
            WHO WE ARE
          </span>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground leading-[1.05] tracking-tight">
            About Alpha<span className="text-[#E8500A]">Elefant</span>
          </h1>
          <p className="max-w-2xl mx-auto text-foreground/60 text-sm md:text-base font-sans font-light leading-relaxed">
            A Pakistan-based multi-vertical powerhouse driving physical construction, compliance-grade software development, cross-border business alliances, and professional training.
          </p>
          <div className="flex justify-center pt-4">
            <div className="animate-bounce p-2 rounded-full border border-border bg-card/30 text-primary">
              <ArrowDown size={16} />
            </div>
          </div>
        </div>
      </div>

      <MissionVision />

      {/* Strong Verticals Section */}
      <section className="relative py-24 bg-card/10 border-t border-border overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#E8500A]/3 rounded-full blur-[100px]" />
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-4 mb-16">
            <span className="text-[#E8500A] text-xs font-mono font-bold tracking-[0.25em] uppercase">
              Our Core Expertise
            </span>
            <h2 className="font-heading font-black text-3xl md:text-5xl text-foreground tracking-tight">
              Our Strong Verticals
            </h2>
            <p className="max-w-2xl mx-auto text-foreground/50 text-sm md:text-base font-light">
              Alpha Elefant channels specialized execution across multiple industries. Here are the core pillars of our operational capabilities, spanning design, technology, artificial intelligence, and more.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: GraduationCap,
                name: 'Education',
                desc: 'Career training, e-learning programs, and professional development focused on future-ready skills.'
              },
              {
                icon: Code,
                name: 'Digital Products',
                desc: 'Software products, SaaS platforms, mobile apps, and product-led digital experiences that scale.'
              },
              {
                icon: Megaphone,
                name: 'Marketing',
                desc: 'Demand generation, digital campaigns, and brand growth strategies to attract and convert audiences.'
              },
              {
                icon: Layout,
                name: 'Infrastructure',
                desc: 'Technical and operational buildout for digital systems, cloud services, and enterprise infrastructure.'
              }
            ].map((vert, idx) => (
              <div 
                key={idx} 
                className="p-6 rounded-2xl border border-border bg-background/40 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-105 transition-transform">
                    <vert.icon size={20} />
                  </div>
                  <h3 className="font-heading font-extrabold text-base text-foreground group-hover:text-primary transition-colors">
                    {vert.name}
                  </h3>
                  <p className="text-foreground/50 text-xs leading-relaxed font-light">
                    {vert.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
