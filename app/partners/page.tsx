'use client'

import React, { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Handshake, Building2, Cpu, Zap, Globe2, GraduationCap, ArrowRight, Shield, Award, Users, ChevronRight, Mail, ExternalLink, Image as ImageIcon } from 'lucide-react'
import Link from 'next/link'

const partnerAlliances = [
  {
    name: 'Apex Banking Systems',
    type: 'Fintech Alliance',
    desc: 'Joint integration of core banking systems, digital wallets, and payment gateways for financial institutions.',
    icon: Shield,
    color: '#E8500A',
    location: 'Zurich, Switzerland'
  },
  {
    name: 'Sovereign Construction Corp',
    type: 'Civil & Infra Partner',
    desc: 'Collaborating on structural engineering, interior fit-outs, and premium turnkey commercial builds.',
    icon: Building2,
    color: '#2A7FBF',
    location: 'Dubai, UAE'
  },
  {
    name: 'EcoPower International',
    type: 'Energy Consortium',
    desc: 'Supplying smart hybrid solar generators, industrial backup panels, and energy grid automation setups.',
    icon: Zap,
    color: '#16A06A',
    location: 'Munich, Germany'
  },
  {
    name: 'Global Mobility Networks',
    type: 'Logistics & Travel Partner',
    desc: 'Providing cross-border travel pipelines, delegation management tools, and VIP travel reservations.',
    icon: Globe2,
    color: '#7C3AED',
    location: 'London, UK'
  },
  {
    name: 'Next-Gen EduLabs',
    type: 'Academic Alliances',
    desc: 'Partnering on professional certifications, corporate training programs, and capacity-building workshops.',
    icon: GraduationCap,
    color: '#EC4899',
    location: 'Singapore'
  },
  {
    name: 'Vertex Digital Solutions',
    type: 'Technology Partner',
    desc: 'Co-development of next-generation enterprise software, custom APIs, and secure cloud environments.',
    icon: Cpu,
    color: '#06B6D4',
    location: 'San Francisco, USA'
  }
]

const managementTeam = [
  {
    name: 'M.Zaeem',
    role: 'Brand Expert & Growth Strategist',
    department: 'Marketing & PR',
    color: '#16A06A',
    initials: 'MZ'
  },
  {
    name: 'Abish Baig',
    role: 'Lead Backend Developer',
    department: 'Infrastructure',
    color: '#2A7FBF',
    initials: 'AB'
  },
  {
    name: 'Samroz Burhan',
    role: 'Lead Frontend Dev & Creative Designer',
    department: 'Design & Interfaces',
    color: '#E8500A',
    initials: 'SB'
  },
  {
    name: 'Saim Anwar',
    role: 'Lead AI Engineer',
    department: 'AI Research Lab',
    color: '#7C3AED',
    initials: 'SA'
  },
  {
    name: 'Kinza',
    role: 'Lead Operations & Coordinator',
    department: 'Corporate Alliances',
    color: '#EC4899',
    initials: 'K'
  }
]

function PartnerCard({ partner, index }: { partner: typeof partnerAlliances[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const PartnerIcon = partner.icon

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
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="group relative rounded-2xl border border-border bg-card/15 hover:border-primary/30 hover:bg-card/45 transition-all duration-300 overflow-hidden p-6 shadow-md"
    >
      {/* Glow spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(250px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(232, 80, 10, 0.05), transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full gap-5">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-mono font-bold tracking-wider text-foreground/45 uppercase bg-foreground/5 px-2.5 py-1 rounded-full border border-border/40">
              {partner.type}
            </span>
            <span className="text-[10px] font-mono text-foreground/35">{partner.location}</span>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white"
              style={{ backgroundColor: partner.color }}
            >
              <PartnerIcon size={18} />
            </div>
            <h3 className="font-heading font-bold text-base text-foreground group-hover:text-primary transition-colors">
              {partner.name}
            </h3>
          </div>

          <p className="text-foreground/50 text-xs leading-relaxed pt-1">
            {partner.desc}
          </p>
        </div>

        <div className="pt-4 border-t border-border/40 flex justify-between items-center text-[10px] font-mono text-foreground/40 font-bold group-hover:text-primary transition-colors">
          <span>ACTIVE INTEGRATION</span>
          <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
        </div>
      </div>
    </motion.div>
  )
}

function TeamMemberCard({ member, index }: { member: typeof managementTeam[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

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
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group relative rounded-2xl border border-border bg-card/20 hover:border-primary/30 hover:bg-card/55 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-lg"
    >
      {/* Top accent border */}
      <div 
        className="absolute top-0 left-0 right-0 h-0.5 transition-transform scale-x-0 group-hover:scale-x-100 duration-500 origin-center z-10"
        style={{ backgroundColor: member.color }}
      />

      {/* Spotlight overlay */}
      <div
        className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(220px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(232, 80, 10, 0.06), transparent 80%)`,
        }}
      />

      <div className="flex flex-col h-full relative z-10">
        {/* Photo Container */}
        <div className="relative aspect-[4/5] bg-secondary/30 overflow-hidden flex items-center justify-center border-b border-border/40 group-hover:bg-secondary/20 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent opacity-80" />
          
          {/* Decorative rotating orbit */}
          <div className="absolute w-28 h-28 rounded-full border border-dashed border-foreground/5 animate-[spin_40s_linear_infinite] group-hover:border-primary/20 transition-colors" />
          
          {/* Initials avatar placeholder */}
          <div 
            className="w-16 h-16 rounded-full flex items-center justify-center font-heading font-black text-xl text-white shadow-xl relative z-10 transition-all duration-300 group-hover:scale-105"
            style={{ 
              background: `linear-gradient(135deg, ${member.color}, ${member.color}bb)`,
              boxShadow: `0 0 20px ${member.color}35`
            }}
          >
            {member.initials}
          </div>

          {/* Photo soon label overlay on hover */}
          <div className="absolute bottom-3 left-0 right-0 text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-1.5 text-[8px] font-mono text-foreground/45">
            <ImageIcon size={10} />
            <span>PHOTO COMING SOON</span>
          </div>
        </div>

        {/* Info Area */}
        <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
          <div className="space-y-1">
            <span 
              className="text-[8px] font-mono font-bold tracking-widest uppercase block"
              style={{ color: member.color }}
            >
              {member.department}
            </span>
            <h3 className="font-heading font-black text-sm text-foreground tracking-tight group-hover:text-primary transition-colors">
              {member.name}
            </h3>
            <p className="text-foreground/60 text-[11px] leading-snug">
              {member.role}
            </p>
          </div>

          <div className="pt-3 border-t border-border/30 flex items-center justify-between text-[8px] font-mono text-foreground/35">
            <span>MEMBER PROFILE</span>
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: member.color }} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function PartnersPage() {
  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Header */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[550px] h-[500px] bg-[#E8500A]/3 rounded-full blur-[130px]" />
          <div className="absolute bottom-0 left-0 w-[450px] h-[400px] bg-[#2A7FBF]/3 rounded-full blur-[110px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

        <div className="max-w-7xl mx-auto px-6 relative z-10 text-center space-y-4">
          <div className="flex items-center justify-center gap-2 text-foreground/45 text-xs font-mono mb-4 uppercase">
            <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <span className="text-foreground/75">PARTNERS</span>
          </div>

          <span className="text-[#E8500A] text-xs font-mono font-bold tracking-[0.3em] uppercase">
            ALLIANCES & LEADERSHIP
          </span>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground leading-[1.05] tracking-tight">
            Strategic <span className="text-[#E8500A]">Partners.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-foreground/60 text-sm md:text-base font-sans font-light leading-relaxed">
            Alpha Elefant operates as an open collaboration framework. We build deep integrations with leading institutions, technology vendors, and resource networks to maintain sovereign operational compliance.
          </p>
        </div>
      </section>

      {/* Strategic Partners Section */}
      <section className="max-w-7xl mx-auto px-6 mb-24">
        <div className="flex items-center gap-3 mb-10">
          <div className="flex items-center gap-2">
            <Handshake size={20} className="text-[#E8500A]" />
            <h2 className="font-heading font-black text-xl md:text-2xl text-foreground tracking-tight">
              Global Alliances
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {partnerAlliances.map((partner, idx) => (
            <PartnerCard key={partner.name} partner={partner} index={idx} />
          ))}
        </div>
      </section>

      {/* Management Team Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-[#E8500A]" />
            <h2 className="font-heading font-black text-xl md:text-2xl text-foreground tracking-tight">
              Management Team
            </h2>
          </div>
          <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
        </div>
        
        <p className="text-foreground/50 text-xs md:text-sm font-sans font-light max-w-2xl mb-12">
          The executive leadership team driving execution and strategic growth across our 10 active verticals.
        </p>

        {/* Five cards in a single row on desktop/large screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {managementTeam.map((member, idx) => (
            <TeamMemberCard key={member.name} member={member} index={idx} />
          ))}
        </div>
      </section>
    </div>
  )
}
