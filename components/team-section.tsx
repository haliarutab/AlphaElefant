'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Mail, Shield, Code2, Server, Cpu, Award, Megaphone } from 'lucide-react'
import Magnetic from './magnetic'

const teamMembers = [
  {
    id: 1,
    name: 'Fahad Ali',
    featured: false,
    icon: Megaphone,
    deptColor: '#16A06A'
  },
  {
    id: 2,
    name: 'Muhammad Abish Baig',
    featured: false,
    icon: Server,
    deptColor: '#2A7FBF'
  },
  {
    id: 3,
    name: 'Samroz Burhan',
    featured: false,
    icon: Code2,
    deptColor: '#E8500A'
  },
  {
    id: 4,
    name: 'Muhammad Zaeem Nadeem',
    featured: false,
    icon: Cpu,
    deptColor: '#7C3AED'
  },
  {
    id: 5,
    name: 'Saim Anwar',
    featured: false,
    icon: Shield,
    deptColor: '#EC4899'
  },
  {
    id: 6,
    name: 'Kinza',
    featured: false,
    icon: Award,
    deptColor: '#F59E0B'
  }
]

/* Character Wave Roll Animation Component */
function CharacterReveal({ text, isHovered }: { text: string; isHovered: boolean }) {
  const letters = Array.from(text)
  return (
    <span className="inline-flex overflow-hidden py-0.5 relative">
      {letters.map((char, index) => (
        <motion.span
          key={index}
          className="inline-block whitespace-pre"
          initial={{ y: 0 }}
          animate={isHovered ? { y: [0, -22, 22, 0] } : { y: 0 }}
          transition={{
            duration: 0.4,
            delay: index * 0.015,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          {char}
        </motion.span>
      ))}
    </span>
  )
}


function TeamCard({ member, index }: { member: typeof teamMembers[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const [isHovered, setIsHovered] = useState(false)
  const MemberIcon = member.icon

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    ref.current.style.setProperty('--mouse-x', `${x}px`)
    ref.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative rounded-3xl border border-border bg-card/25 backdrop-blur-sm overflow-hidden hover:border-primary/40 transition-all duration-500 hover:bg-card/60 shadow-xl ${member.featured ? 'md:col-span-2 lg:col-span-2' : ''
        }`}
    >
      {/* Dynamic spotlight gradient */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(232, 80, 10, 0.07), transparent 80%)`,
        }}
      />

      {/* Top line accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{ background: `linear-gradient(to right, ${member.deptColor}, transparent)` }}
      />

      <div className="p-8 relative z-10 flex flex-col items-center justify-center text-center h-full gap-6">
        {/* Avatar details with continuous floating animation */}
        <motion.div
          animate={{ y: [0, -6, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4.5 + (index % 3),
            ease: 'easeInOut',
          }}
          className="relative flex-shrink-0"
        >
          {/* Spinning decorative border */}
          <div className="absolute -inset-1 rounded-2xl border border-dashed border-primary/20 animate-[spin_30s_linear_infinite] group-hover:border-primary/50 transition-colors" />
          <div className="relative w-20 h-20 rounded-2xl bg-secondary border border-border flex flex-col items-center justify-center gap-1 overflow-hidden">
            <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <MemberIcon className="text-primary" size={18} />
            </div>
          </div>
        </motion.div>

        {/* Core Info */}
        <div className="flex-1 flex flex-col items-center">
          <div
            className="text-[9px] font-bold tracking-[0.25em] uppercase mb-1"
            style={{ color: member.deptColor }}
          >
          </div>

          {/* Name and Role */}
          <h3 className="font-heading font-bold text-foreground text-xl leading-none tracking-tight mb-1.5 cursor-default">
            {member.name}
          </h3>
        </div>

        {/* Skills on Hover */}
        <div className="overflow-hidden">
          <AnimatePresence initial={false}>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Social interactions */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-border/40 w-full">
          <div className="flex items-center gap-3">
            {[
              {
                label: 'LinkedIn',
                content: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
              },
              {
                label: 'Email',
                content: <Mail size={12} />,
              },
            ].map(({ label, content }) => (
              <button
                key={label}
                aria-label={label}
                className="w-8 h-8 rounded-lg bg-foreground/5 hover:bg-[#E8500A]/20 border border-border hover:border-primary/45 flex items-center justify-center text-foreground/45 hover:text-[#E8500A] transition-all duration-200 cursor-pointer"
              >
                {content}
              </button>
            ))}
          </div>
          <div className="text-[10px] font-mono text-foreground/35 flex items-center gap-2"><img className='w-7 h-7 object-contain' src="/logo.png" alt="AlphaElephant Brand Identity" /></div>
        </div>
      </div>
    </motion.div>
  )
}

export default function TeamSection() {
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="team" className="relative py-36 bg-background overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-[550px] h-[550px] bg-[#E8500A]/3 rounded-full blur-[130px]" />
        <div className="absolute top-0 left-0 w-[450px] h-[450px] bg-[#0ea5e9]/2 rounded-full blur-[110px] dark:bg-secondary/50" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-10 dark:opacity-20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div ref={headerRef}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="text-[#E8500A] text-xs font-semibold tracking-[0.25em] uppercase">
                The Architects
              </span>
              <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-[#E8500A]/60 to-transparent" />
            </div>
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
              <h2 className="font-heading font-black text-[clamp(2.4rem,5.5vw,4.5rem)] text-foreground leading-[1.05] tracking-[-0.025em] text-balance">
                Our<br />
                <span className="text-[#E8500A]">Management Team</span>
              </h2>
              <p className="max-w-sm text-foreground/50 text-base leading-relaxed text-pretty">
                A highly synchronized division of specialists in system engineering, Compliance-grade SaaS, frontend interfaces, and operations.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Team Grid */}
        <div className="mt-8">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {teamMembers.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>

        {/* Join CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 rounded-3xl border border-primary/20 bg-card/25 p-10 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group shadow-xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#E8500A]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          <div>
            <h3 className="font-heading font-black text-2xl text-foreground mb-2">
              Join the Alpha Elefant Team
            </h3>
            <p className="text-foreground/50 text-base max-w-lg font-light">
              We are constantly seeking brilliant software developers, system architects, research analysts, and compliance specialists. Let&apos;s build something great.
            </p>
          </div>
          <Magnetic>
            <button
              onClick={() => window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { id: 'contact' } }))}
              className="flex-shrink-0 px-8 py-4 bg-[#E8500A] text-white font-sans font-bold rounded-full text-xs tracking-wider uppercase transition-all duration-200 hover:bg-[#d44608] hover:shadow-[0_0_30px_rgba(232,80,10,0.35)] cursor-pointer"
            >
              Get in Touch
            </button>
          </Magnetic>
        </motion.div>

      </div>
    </section>
  )
}
