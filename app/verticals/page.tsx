'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, ChevronRight, ArrowRight } from 'lucide-react'
import { verticalsData, lucideIconMap } from '@/lib/data/verticals'
import Link from 'next/link'

function AllVerticalsCard({ vertical, index }: { vertical: typeof verticalsData[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const IconComponent = lucideIconMap[vertical.iconName] || Building2

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--mouse-x', `${x}px`)
    ref.current.style.setProperty('--mouse-y', `${y}px`)
  }

  const numString = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative rounded-2xl border border-border bg-card/20 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 z-10 h-full flex flex-col justify-between p-7 overflow-hidden">
        {/* Spotlight effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(300px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(232, 80, 10, 0.06), transparent 80%)`,
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center z-10" />

        <div className="space-y-5 relative z-10">
          {/* Icon & Index header */}
          <div className="flex items-center justify-between">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: vertical.color }}
            >
              <IconComponent size={20} />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-foreground/20 group-hover:text-primary/35 transition-colors">
              VERTICAL {numString}
            </span>
          </div>

          {/* Title & Tagline */}
          <div>
            <h3 className="font-heading font-black text-lg text-foreground leading-snug tracking-tight group-hover:text-primary transition-colors">
              {vertical.name}
            </h3>
            <span className="text-[10px] font-mono uppercase tracking-wider text-foreground/45 block mt-0.5">
              {vertical.tagline}
            </span>
          </div>

          {/* Description */}
          <p className="text-foreground/60 text-xs leading-relaxed font-sans font-light">
            {vertical.description}
          </p>

          <div className="h-px bg-border/40 w-full" />

          {/* Services list */}
          <div className="space-y-2.5">
            <span className="text-[9px] font-mono font-bold text-foreground/35 uppercase tracking-wider block">
              Offerings & Services
            </span>
            <div className="flex flex-col gap-2">
              {vertical.subcategories.map((sub) => (
                <Link
                  key={sub.slug}
                  href={`/verticals/${vertical.slug}/${sub.slug}`}
                  className="flex items-start gap-2 text-foreground/75 text-xs hover:text-primary transition-colors group/sub"
                >
                  <ChevronRight size={12} className="text-primary flex-shrink-0 mt-0.5 group-hover/sub:translate-x-0.5 transition-transform" />
                  <span className="truncate">{sub.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 mt-6 border-t border-border/40 relative z-10">
          <Link
            href={`/verticals/${vertical.slug}`}
            className="inline-flex items-center gap-2 text-[10px] font-mono font-bold tracking-wider uppercase text-white px-4 py-2.5 rounded-xl transition-all shadow-md"
            style={{ backgroundColor: vertical.color }}
          >
            Explore {vertical.shortLabel} <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function VerticalsPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Header */}
      <section className="relative pt-20 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[550px] h-[500px] bg-[#E8500A]/3 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[400px] bg-sky-500/2 rounded-full blur-[110px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          <span className="text-[#E8500A] text-xs font-mono font-bold tracking-[0.3em] uppercase">
            ALPHA ELEFANT CAPABILITIES
          </span>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground leading-[1.05] tracking-tight">
            Our Strong <span className="text-[#E8500A]">Verticals.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-foreground/60 text-sm md:text-base font-sans font-light leading-relaxed">
            Browse our complete capabilities network. Select a vertical to explore specific digital workflows, technical solutions, and cross-border partnership details.
          </p>
        </div>
      </section>

      {/* Grid of All Verticals */}
      <section className="max-w-7xl mx-auto px-6 mt-6">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {verticalsData.map((vertical, i) => (
            <AllVerticalsCard key={vertical.slug} vertical={vertical} index={i} />
          ))}
        </div>
      </section>
    </div>
  )
}
