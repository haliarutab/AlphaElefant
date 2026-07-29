'use client'

import React, { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Target, Eye, Quote, Shield, Network, Zap, Award } from 'lucide-react'
import { useTheme } from './theme-provider'

function AnimatedLine({ className }: { className?: string }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className={`h-px bg-linear-to-r from-[#E8500A]/80 via-[#E8500A]/40 to-transparent origin-left ${className}`}
    />
  )
}

function RevealText({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function GlowingCard({ children, className, mouseGlowColor = 'rgba(232, 80, 10, 0.1)' }: { children: React.ReactNode; className?: string; mouseGlowColor?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      className={`relative group rounded-3xl border border-border bg-card/30 backdrop-blur-sm p-10 overflow-hidden transition-all duration-500 hover:border-primary/40 hover:bg-card/60 shadow-xl ${className}`}
    >
      {/* Dynamic spotlight gradient */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), ${mouseGlowColor}, transparent 80%)`,
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-[#E8500A]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

const nodes = [
  { name: 'Renovation', angle: 0, label: '01' },
  { name: 'Education', angle: 72, label: '02' },
  { name: 'Products', angle: 144, label: '03' },
  { name: 'Services', angle: 216, label: '04' },
  { name: 'Alliances', angle: 288, label: '05' },
]

/* ── Interactive Vector Constellation Graphic ── */
function VerticalsMatrix() {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [hoverCenter, setHoverCenter] = useState(false)
  const [activeCycleIndex, setActiveCycleIndex] = useState(0)

  // Auto cycle active index when not hovered
  useEffect(() => {
    const timer = setInterval(() => {
      if (hoveredNode === null && !hoverCenter) {
        setActiveCycleIndex((prev) => (prev + 1) % nodes.length)
      }
    }, 2800)
    return () => clearInterval(timer)
  }, [hoveredNode, hoverCenter])

  const isNodeHighlighted = (nodeName: string) => {
    if (hoverCenter) return true
    if (hoveredNode !== null) return hoveredNode === nodeName
    return nodes[activeCycleIndex].name === nodeName
  }

  return (
    <div className="relative w-full aspect-square max-w-[480px] mx-auto flex items-center justify-center">
      {/* Background glowing rings */}
      <div className="absolute inset-0 rounded-full border border-border/40 animate-[spin_100s_linear_infinite] pointer-events-none scale-90" />
      <div className="absolute inset-8 rounded-full border border-primary/10 border-dashed animate-[spin_55s_linear_infinite] pointer-events-none" />
      <div className="absolute inset-20 rounded-full border border-border/30 pointer-events-none" />

      {/* Orbit paths connecting nodes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" viewBox="0 0 100 100">
        <defs>
          <radialGradient id="matrixGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#E8500A" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#E8500A" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ambient radial blur glow in the center */}
        <circle cx="50" cy="50" r="30" fill="url(#matrixGlow)" />

        {/* Main orbiting orbits */}
        <circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" className="text-border/20" strokeWidth="0.4" />
        <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" className="text-primary/15" strokeWidth="0.3" strokeDasharray="2, 2" />

        {/* Constellation line connections */}
        {nodes.map((node) => {
          const rad = (node.angle * Math.PI) / 180
          const x = parseFloat((50 + 32 * Math.cos(rad)).toFixed(4))
          const y = parseFloat((50 + 32 * Math.sin(rad)).toFixed(4))
          const highlighted = isNodeHighlighted(node.name)
          return (
            <line
              key={node.name}
              x1="50"
              y1="50"
              x2={x}
              y2={y}
              stroke="currentColor"
              className={`transition-all duration-500 ${highlighted ? 'text-[#E8500A] stroke-[0.8] drop-shadow-[0_0_3px_rgba(232,80,10,0.5)]' : 'text-border/30 stroke-[0.3]'
                }`}
            />
          )
        })}
      </svg>

      {/* Center Engine Core */}
      <motion.div
        onMouseEnter={() => setHoverCenter(true)}
        onMouseLeave={() => setHoverCenter(false)}
        whileHover={{ scale: 1.05 }}
        className="absolute z-10 w-24 h-24 rounded-full bg-card border border-primary/20 hover:border-primary/45 flex flex-col items-center justify-center shadow-2xl text-center group cursor-pointer transition-all duration-300"
      >
        <div className={`absolute inset-0.5 rounded-full border border-border border-dashed animate-[spin_20s_linear_infinite] transition-colors duration-300 ${hoverCenter ? 'border-primary/70' : ''
          }`} />
        <div className={`w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center mb-1 transition-colors duration-300 ${hoverCenter ? 'bg-[#E8500A]/20' : ''
          }`}>
          <Zap size={16} className="text-[#E8500A]" />
        </div>
        <span className="text-[10px] font-heading font-black text-foreground tracking-widest leading-none">ALPHA</span>
        <span className="text-[8px] font-mono text-muted-foreground mt-0.5 tracking-wider">ENGINE</span>
      </motion.div>

      {/* Orbiting Interactive Nodes */}
      {nodes.map((node) => {
        const rad = (node.angle * Math.PI) / 180
        const left = `${parseFloat((50 + 32 * Math.cos(rad)).toFixed(4))}%`
        const top = `${parseFloat((50 + 32 * Math.sin(rad)).toFixed(4))}%`
        const highlighted = isNodeHighlighted(node.name)

        return (
          <motion.div
            key={node.name}
            style={{ left, top, x: '-50%', y: '-50%' }}
            onMouseEnter={() => setHoveredNode(node.name)}
            onMouseLeave={() => setHoveredNode(null)}
            whileHover={{ scale: 1.15 }}
            className={`absolute z-20 w-10 h-10 rounded-full bg-card border shadow-lg flex items-center justify-center cursor-pointer transition-all duration-300 ${highlighted ? 'border-[#E8500A] ring-2 ring-primary/20 bg-card' : 'border-border'
              }`}
          >
            {highlighted && (
              <span className="absolute -inset-1 rounded-full border border-primary/30 animate-ping opacity-60" />
            )}
            <span className={`text-[10px] font-mono font-bold ${highlighted ? 'text-[#E8500A]' : 'text-foreground/50'}`}>
              {node.label}
            </span>

            {/* Hover Floating Tag */}
            <AnimatePresence>
              {(hoveredNode === node.name || (hoveredNode === null && !hoverCenter && nodes[activeCycleIndex].name === node.name)) && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute bottom-12 bg-background border border-primary/20 px-3 py-1.5 rounded-lg shadow-xl text-center pointer-events-none whitespace-nowrap z-30"
                >
                  <div className="text-[9px] font-mono text-[#E8500A] font-bold uppercase tracking-widest">Vertical</div>
                  <div className="text-xs font-heading font-extrabold text-foreground">{node.name}</div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )
      })}
    </div>
  )
}

export default function MissionVision() {
  const { theme } = useTheme()

  // Dynamic glow color adjustment for vision card in light/dark themes
  const visionGlow = theme === 'dark' ? 'rgba(14, 165, 233, 0.08)' : 'rgba(2, 132, 199, 0.08)'

  return (
    <section id="mission" className="relative py-36 bg-secondary/15 overflow-hidden">
      {/* Background accents */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#E8500A]/3 rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0ea5e9]/2 rounded-full blur-[120px] dark:bg-secondary/40" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Asymmetrical Layout Grid */}
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-16 lg:gap-24 items-center mb-24">

          {/* Left Column: Heading and Interactive Matrix */}
          <div className="space-y-12">
            <RevealText>
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[#E8500A] text-xs font-semibold tracking-[0.25em] uppercase">
                  Our Structural Core
                </span>
                <AnimatedLine className="flex-1 max-w-[120px]" />
              </div>
              <h2 className="font-heading font-black text-[clamp(2.4rem,5vw,4.5rem)] text-foreground leading-[1.05] tracking-[-0.03em] text-balance">
                Our Strong <br />
                <span className="text-[#E8500A]">Verticals.</span>
              </h2>
              <p className="mt-6 text-foreground/60 text-base leading-relaxed max-w-lg font-sans font-light">
                We have built a unified infrastructure where technology development, digital operations, compliance-grade SaaS, corporate education, and physical renovations act as a single, interlocking machine.
              </p>
            </RevealText>

            <RevealText delay={0.2}>
              {/* Graphic container */}
              <div className="bg-card/10 border border-border/40 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden">
                <VerticalsMatrix />
              </div>
            </RevealText>
          </div>

          {/* Right Column: Mission and Vision Cards */}
          <div className="space-y-8">
            {/* Mission Card */}
            <RevealText delay={0.1}>
              <GlowingCard mouseGlowColor="rgba(232, 80, 10, 0.12)">
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-[#E8500A]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[#E8500A]/20 transition-colors duration-300">
                    <Target className="text-[#E8500A]" size={22} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-black text-primary tracking-widest uppercase mb-1">Empowerment Engine</div>
                    <h3 className="font-heading font-extrabold text-2xl text-foreground mb-4 tracking-tight">Mission</h3>
                    <AnimatedLine className="mb-4 max-w-[80px]" />
                    <p className="text-foreground/70 leading-relaxed text-sm">
                      To construct a global benchmark for multi-vertical operations by seamlessly blending compliance-grade technology, future-ready education, and infrastructure modernization. We do not just consult; we build, deploy, and scale the structural machinery of modern enterprises.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {['Sovereign Tech', 'Global Education', 'Compliant Fintech'].map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full text-[10px] bg-[#E8500A]/8 text-[#E8500A] border border-[#E8500A]/20 font-semibold tracking-wider uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowingCard>
            </RevealText>

            {/* Vision Card (Polished High Legibility Blue Theme) */}
            <RevealText delay={0.2}>
              <GlowingCard mouseGlowColor={visionGlow}>
                <div className="flex items-start gap-6">
                  <div className="w-12 h-12 rounded-2xl bg-sky-500/10 dark:bg-sky-500/15 flex items-center justify-center flex-shrink-0 group-hover:bg-sky-500/20 dark:group-hover:bg-sky-500/25 transition-colors duration-300">
                    <Eye className="text-sky-600 dark:text-sky-400" size={22} />
                  </div>
                  <div>
                    <div className="text-[10px] font-mono font-black text-sky-600 dark:text-sky-400 tracking-widest uppercase mb-1">Global Constellation</div>
                    <h3 className="font-heading font-extrabold text-2xl text-foreground mb-4 tracking-tight">Vision</h3>
                    <AnimatedLine className="mb-4 max-w-[80px]" />
                    <p className="text-foreground/70 leading-relaxed text-sm">
                      To stand as the absolute bridge between raw corporate potential and global digital supremacy. By organizing emerging technical capabilities and integrating security-first architectures, Alpha Elefant scales cross-border services into a high-yield enterprise pipeline.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {['Talent Incubation', 'GCC Alliances', 'Remote Services'].map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full text-[10px] bg-sky-500/8 dark:bg-sky-500/15 text-sky-600 dark:text-sky-400 border border-sky-500/20 font-semibold tracking-wider uppercase">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </GlowingCard>
            </RevealText>
          </div>

        </div>



      </div>
    </section>
  )
}
