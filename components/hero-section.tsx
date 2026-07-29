'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'  // 👈 add this import
import { ArrowUpRight, MoveRight } from 'lucide-react'
import dynamic from 'next/dynamic'
import Magnetic from './magnetic'

const HeroCanvas = dynamic(() => import('./hero-canvas'), { ssr: false })

const words = ['TRANSFORMATION', 'INNOVATION', 'IMPACT']

/* Stagger container */
const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.5 } },
}
const fadeUp: Variants = {
  hidden: { opacity: 0, y: 48, skewY: 2 },
  show: { opacity: 1, y: 0, skewY: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
}


export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [wordIdx, setWordIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [typing, setTyping] = useState<'fwd' | 'bwd'>('fwd')
  const charRef = useRef(0)

  const h1Refs = useRef<(HTMLHeadingElement | null)[]>([])

  useEffect(() => {
    const els = h1Refs.current.filter(Boolean) as HTMLHeadingElement[]

    const handleMove = (e: MouseEvent) => {
      els.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = e.clientX - cx
        const dy = e.clientY - cy
        const dist = Math.sqrt(dx * dx + dy * dy)
        const radius = 260  // how close cursor needs to be (px)

        if (dist < radius) {
          const strength = (1 - dist / radius) * 18  // max pull in px
          el.style.transform = `translate(${(dx / dist) * strength}px, ${(dy / dist) * strength}px)`
          el.style.transition = 'transform 0.15s ease'
        } else {
          el.style.transform = 'translate(0px, 0px)'
          el.style.transition = 'transform 0.45s ease'
        }
      })
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  /* ── Typewriter ── */
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    const run = () => {
      const word = words[wordIdx]
      if (typing === 'fwd') {
        charRef.current++
        setDisplayed(word.slice(0, charRef.current))
        if (charRef.current >= word.length) {
          setTyping('bwd')
          timer = setTimeout(run, 1800)
          return
        }
      } else {
        charRef.current--
        setDisplayed(word.slice(0, charRef.current))
        if (charRef.current <= 0) {
          setWordIdx((i) => (i + 1) % words.length)
          setTyping('fwd')
        }
      }

      timer = setTimeout(run, typing === 'fwd' ? 65 : 42)
    }
    timer = setTimeout(run, 900)
    return () => clearTimeout(timer)
  }, [wordIdx, typing])

  /* ── Scroll-based parallax for text layers ── */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })
  const headlineY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%'])
  const subY = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  const ctaY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const canvasScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const canvasOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  const scrollNext = () =>
    window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { id: 'mission' } }))

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden bg-background"
    >
      {/* ── 3-D canvas — full bg, scales on scroll ── */}
      <motion.div
        style={{ scale: canvasScale, opacity: canvasOpacity }}
        className="absolute inset-0 origin-center"
      >
        <HeroCanvas />
      </motion.div>

      {/* ── Ambient overlay ── */}
      <div className="absolute inset-0 pointer-events-none">
        {/* warm orange glow offset to the right */}
        <div className="absolute top-1/3 right-[15%] w-[520px] h-[520px] rounded-full bg-[#E8500A]/8 blur-[120px] dark:bg-[#E8500A]/10" />
        {/* cool navy depth layer */}
        <div className="absolute bottom-1/4 left-[10%] w-[380px] h-[380px] rounded-full bg-[#0ea5e9]/5 blur-[90px] dark:bg-[#0B1B2D]/60" />
        {/* fine grid */}
        <div className="absolute inset-0 grid-bg opacity-30 dark:opacity-20" />
        {/* bottom fade */}
        <div className="absolute bottom-0 inset-x-0 h-48 bg-gradient-to-t from-background to-transparent" />
      </div>

      {/* ── Main content — left-aligned editorial layout ── */}
      <div className="relative z-10 flex-1 flex flex-col justify-center max-w-[1400px] mx-auto w-full px-6 md:px-14 xl:px-20 pt-32 pb-20">

        {/* Top meta row */}
        <motion.div
          variants={stagger}
          initial="hidden"
          animate="show"
          className="flex flex-col gap-10 md:gap-14"
        >
          {/* eyebrow */}
          <motion.div variants={fadeIn} className="flex flex-wrap items-center gap-4">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-[#E8500A]/30 bg-[#E8500A]/8 text-[11px] font-sans font-semibold tracking-[0.18em] uppercase text-[#E8500A]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E8500A] animate-pulse-dot" />
              Pakistan&apos;s Next-Gen Multi-Vertical Co.
            </span>
            <div className="text-[10px] font-mono text-foreground/50 tracking-widest uppercase flex items-center gap-1.5">
              <span>Engineered for</span>
              <span className="text-[#E8500A] font-bold text-glow min-w-[100px] inline-block relative">
                {displayed}
                <span className="absolute -right-2 top-0 text-[#E8500A] animate-pulse">|</span>
              </span>
            </div>
          </motion.div>

          {/* ── GIANT headline ── */}
          <div className="overflow-hidden">
            <motion.div style={{ y: headlineY }}>
              <motion.div variants={stagger} initial="hidden" animate="show">
                {/* Line 1 */}
                <div className="line-mask">
                  <motion.h1
                    ref={(el) => { h1Refs.current[0] = el }}
                    variants={fadeUp}
                    className="font-heading font-black text-[clamp(3.8rem,11vw,11rem)] leading-[0.9] tracking-[-0.02em] text-foreground"
                  >
                    One Brand.
                  </motion.h1>
                </div>

                {/* Line 2 */}
                <div className="line-mask">
                  <motion.h1
                    ref={(el) => { h1Refs.current[1] = el }}
                    variants={fadeUp}
                    className="font-heading font-black text-[clamp(3.8rem,11vw,11rem)] leading-[0.9] tracking-[-0.02em] text-[#E8500A]"
                  >
                    Infinite <span className="text-foreground">Power.</span>
                  </motion.h1>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* ── Bottom row ── */}
          <motion.div
            style={{ y: subY }}
            className="flex flex-col md:flex-row md:items-end gap-10 md:gap-20"
          >
            {/* Description */}
            <motion.p
              variants={fadeIn}
              className="max-w-md text-foreground/55 text-base md:text-lg leading-relaxed font-sans font-light"
            >
              Alpha Elefant delivers measurable impact across five strategic verticals — institutional renovation, skill development, technology products, international services, and global alliances.
            </motion.p>

            {/* Stats */}
            <motion.div variants={fadeIn} className="flex gap-10 md:gap-14 shrink-0">
              {[
                { n: '5+', label: 'Verticals' },
                { n: '10+', label: 'Markets' },
                { n: '∞', label: 'Possibilities' },
              ].map(({ n, label }) => (
                <div key={label} className="flex flex-col">
                  <span className="font-heading text-[clamp(2.2rem,5vw,4rem)] leading-none text-[#E8500A]">{n}</span>
                  <span className="text-[11px] font-sans font-medium tracking-[0.18em] uppercase text-foreground/40 mt-1">{label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* ── CTAs ── */}
          <motion.div
            style={{ y: ctaY }}
            variants={fadeIn}
            className="flex flex-wrap items-center gap-5"
          >
            {/* Primary CTA */}
            <Magnetic>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { id: 'verticals' } }))}
                className="group flex items-center gap-3 px-8 py-4 bg-[#E8500A] text-white font-sans font-semibold text-sm tracking-wide rounded-full transition-all duration-200 hover:shadow-[0_0_40px_rgba(232,80,10,0.5)] hover:bg-[#d44608] cursor-pointer"
              >
                Explore Verticals
                <MoveRight size={16} className="transition-transform duration-300 group-hover:translate-x-1.5" />
              </button>
            </Magnetic>

            {/* Ghost CTA */}
            <Magnetic>
              <button
                onClick={() => window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { id: 'contact' } }))}
                className="group flex items-center gap-3 px-8 py-4 border border-border text-foreground/70 hover:text-foreground hover:border-foreground/45 font-sans font-semibold text-sm tracking-wide rounded-full transition-all duration-200 hover:bg-foreground/5 cursor-pointer"
              >
                Book a Discovery Call
                <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2 }}
        onClick={scrollNext}
        className="absolute bottom-8 right-10 hidden md:flex flex-col items-center gap-2 group cursor-pointer"
        aria-label="Scroll down"
      >
        <span className="text-[9px] font-mono tracking-[0.3em] uppercase text-foreground/30 group-hover:text-[#E8500A] transition-colors [writing-mode:vertical-rl] rotate-180">
          SCROLL DOWN
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-10 bg-gradient-to-b from-[#E8500A]/70 to-transparent"
        />
      </motion.button>

      {/* ── Bottom corner accent ── */}
      <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-20">
        <div className="absolute bottom-0 left-0 w-full h-px bg-[#E8500A]" />
        <div className="absolute bottom-0 left-0 w-px h-full bg-[#E8500A]" />
      </div>
    </section>
  )
}
