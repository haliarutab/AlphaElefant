'use client'

import React, { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Building2, ChevronRight, ArrowRight } from 'lucide-react'
import { verticalsData, lucideIconMap } from '@/lib/data/verticals'
import Link from 'next/link'

function VerticalCard({ vertical, index }: { vertical: typeof verticalsData[0]; index: number }) {
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

  // Format index as two digit string
  const numString = String(index + 1).padStart(2, '0')

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: (index % 4) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative"
    >
      <div className="relative rounded-2xl border border-border bg-card/20 hover:border-primary/30 hover:bg-card/50 transition-all duration-300 z-10 h-full flex flex-col justify-between p-6 overflow-hidden">
        {/* Spotlight effect */}
        <div
          className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
          style={{
            background: `radial-gradient(280px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(232, 80, 10, 0.06), transparent 80%)`,
          }}
        />

        {/* Top accent line */}
        <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-center z-10" />

        <div className="space-y-4 relative z-10">
          {/* Icon & Index header */}
          <div className="flex items-center justify-between">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: vertical.color }}
            >
              <IconComponent size={18} />
            </div>
            <span className="text-[10px] font-mono font-bold tracking-widest text-foreground/20 group-hover:text-primary/35 transition-colors">
              V{numString}
            </span>
          </div>

          {/* Title */}
          <div>
            <h3 className="font-heading font-extrabold text-[15px] text-foreground leading-snug tracking-tight group-hover:text-primary transition-colors">
              {vertical.name}
            </h3>
            <span className="text-[9px] font-mono uppercase tracking-wider text-foreground/40 block mt-0.5">
              {vertical.tagline}
            </span>
          </div>

          {/* Description */}
          <p className="text-foreground/50 text-[11px] leading-relaxed line-clamp-3">
            {vertical.description}
          </p>

          {/* Services snippet */}
          <div className="space-y-1.5 pt-2">
            <span className="text-[9px] font-mono font-bold text-foreground/30 uppercase tracking-wider">
              Core Deliverables
            </span>
            <div className="flex flex-col gap-1">
              {vertical.subcategories.slice(0, 3).map((sub) => (
                <div key={sub.slug} className="flex items-center gap-1.5 text-foreground/65 text-[10px]">
                  <ChevronRight size={10} className="text-primary flex-shrink-0" />
                  <span className="truncate">{sub.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-5 mt-auto relative z-10">
          <Link
            href={`/verticals/${vertical.slug}`}
            className="inline-flex items-center gap-1.5 text-[10px] font-bold tracking-wider uppercase text-[#E8500A] group-hover:text-[#d44608] transition-colors"
          >
            Explore Services <ArrowRight size={10} className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export default function VerticalsSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="verticals" className="relative py-32 bg-background overflow-hidden border-b border-border/40">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#E8500A]/3 rounded-full blur-[150px]" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="text-[#E8500A] text-xs font-semibold tracking-[0.25em] uppercase">
                What We Do
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-[#E8500A]/60 to-transparent" />
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="font-heading font-black text-[clamp(2rem,5vw,3.8rem)] text-foreground leading-[1.05] tracking-[-0.025em] text-balance">
                Our Verticals.<br />
                <span className="text-[#E8500A]">One Powerhouse.</span>
              </h2>
              <p className="max-w-md text-foreground/50 text-sm md:text-base leading-relaxed text-pretty">
                Alpha Elefant operates as a unified execution network. Browse our integrated operational areas spanning software development, automation, and engineering infrastructure.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Verticals Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {verticalsData.slice(0, 6).map((vertical, i) => (
            <VerticalCard key={vertical.slug} vertical={vertical} index={i} />
          ))}
        </div>

        {/* View All Verticals Button */}
        <div className="flex justify-center mt-16">
          <Link
            href="/verticals"
            className="inline-flex items-center gap-2 px-8 py-4 bg-[#E8500A] hover:bg-[#d44608] text-white font-sans font-bold rounded-full text-xs tracking-wider uppercase transition-all duration-200 hover:shadow-[0_0_30px_rgba(232,80,10,0.35)] cursor-pointer"
          >
            View All Verticals <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  )
}
