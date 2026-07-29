'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Calendar, MessageSquare, ChevronDown, Sun, Moon, Building2, ChevronRight, ArrowRight, Shield, Zap, Globe2, Handshake } from 'lucide-react'
import { useTheme } from './theme-provider'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import { verticalsData, lucideIconMap } from '@/lib/data/verticals'
import Magnetic from './magnetic'

const navLinks = [
  { label: 'Home', href: '/', isHash: false },
  { label: 'About', href: '/about', isHash: false },
  { label: 'Verticals', href: '/verticals', isMega: true, isHash: false },
  { label: 'Join Us', href: '/careers#application-form', isHash: false },
  { label: 'Team', href: '#team', isHash: true },
]

export const navbarPartners = [
  {
    name: 'Apex Banking Systems',
    slug: 'apex-banking',
    tagline: 'Fintech Alliance',
    description: 'Joint integration of core banking systems, digital wallets, and payment gateways for financial institutions.',
    iconName: 'Shield',
    color: '#E8500A',
    location: 'Zurich, Switzerland'
  },
  {
    name: 'Sovereign Construction',
    slug: 'sovereign-construction',
    tagline: 'Civil & Infra Partner',
    description: 'Collaborating on structural engineering, interior fit-outs, and premium turnkey commercial builds.',
    iconName: 'Building2',
    color: '#E8500A',
    location: 'Dubai, UAE'
  },
  {
    name: 'EcoPower International',
    slug: 'ecopower-international',
    tagline: 'Energy Consortium',
    description: 'Supplying smart hybrid solar generators, industrial backup panels, and energy grid automation setups.',
    iconName: 'Zap',
    color: '#E8500A',
    location: 'Munich, Germany'
  },
  {
    name: 'Global Mobility Networks',
    slug: 'global-mobility',
    tagline: 'Logistics & Travel Partner',
    description: 'Providing cross-border travel pipelines, delegation management tools, and VIP travel reservations.',
    iconName: 'Globe2',
    color: '#E8500A',
    location: 'London, UK'
  }
]

export const partnerIconMap: Record<string, any> = {
  Shield,
  Building2,
  Zap,
  Globe2,
  Handshake
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<'Verticals' | 'Partners' | null>(null)
  const [lastHoveredTab, setLastHoveredTab] = useState<'Verticals' | 'Partners'>('Verticals')
  const [mobileVerticalsOpen, setMobileVerticalsOpen] = useState(false)
  const [mobilePartnersOpen, setMobilePartnersOpen] = useState(false)
  const [mobileActiveVerticalSlug, setMobileActiveVerticalSlug] = useState<string | null>(null)
  const [mobileActivePartnerSlug, setMobileActivePartnerSlug] = useState<string | null>(null)
  const [hoveredLink, setHoveredLink] = useState<string | null>(null)
  const [activeVerticalSlug, setActiveVerticalSlug] = useState(verticalsData[0].slug)
  const [activePartnerSlug, setActivePartnerSlug] = useState(navbarPartners[0].slug)
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()
  const router = useRouter()
  const closeTimeout = useRef<number | null>(null)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current)
        closeTimeout.current = null
      }
    }
  }, [])

  const handleNavClick = (href: string, isHash: boolean) => {
    setMobileOpen(false)
    setActiveDropdown(null)

    if (isHash) {
      if (pathname === '/') {
        const id = href.replace('#', '')
        window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { id } }))
      } else {
        router.push(`/${href}`)
      }
    } else {
      router.push(href)
    }
  }

  const handleLogoClick = () => {
    setMobileOpen(false)
    setActiveDropdown(null)
    if (pathname === '/') {
      window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { id: 'hero' } }))
    } else {
      router.push('/')
    }
  }

  const activeVertical = verticalsData.find(v => v.slug === activeVerticalSlug) || verticalsData[0]
  const ActiveVerticalIcon = lucideIconMap[activeVertical.iconName] || Building2

  const activePartner = navbarPartners.find(p => p.slug === activePartnerSlug) || navbarPartners[0]
  const ActivePartnerIcon = partnerIconMap[activePartner.iconName] || Handshake

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 flex justify-center p-4 pointer-events-none">
        <motion.nav
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className={`pointer-events-auto flex items-center justify-between w-full max-w-7xl px-8 py-3.5 rounded-full border border-border/70 bg-background/60 backdrop-blur-xl shadow-lg transition-all duration-500 ${scrolled
            ? 'scale-[0.98] border-primary/20 bg-background/80 shadow-xl'
            : ''
            } relative`}
        >
          {/* Logo */}
          <motion.div
            className="flex items-center gap-3 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            onClick={handleLogoClick}
          >
            <div className="w-11 h-11 flex items-center justify-center">
              <img src="/logo.png" alt="AlphaElephant Brand Identity" />
            </div>
            <div>
              <span className="font-heading font-bold text-[1.25rem] text-foreground leading-none">
                Alpha<span className="text-[#E8500A]">Elefant</span>
              </span>
              <div className="text-[9px] font-mono text-muted-foreground leading-none mt-0.5">
                Innovation Under One Umbrella
              </div>
            </div>
          </motion.div>

          {/* Desktop nav links with sliding background pill */}
          <div className="hidden lg:flex items-center gap-1.5 relative">
              {navLinks.map((link) => {
              const isTabOpen = activeDropdown === link.label
              return link.isMega ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => {
                    if (closeTimeout.current) {
                      clearTimeout(closeTimeout.current)
                      closeTimeout.current = null
                    }
                    setActiveDropdown(link.label as 'Verticals' | 'Partners')
                    setLastHoveredTab(link.label as 'Verticals' | 'Partners')
                    setHoveredLink(link.label)
                  }}
                  onMouseLeave={() => {
                    // small delay before closing to allow pointer to reach dropdown
                    closeTimeout.current = window.setTimeout(() => {
                      setActiveDropdown(null)
                      setHoveredLink(null)
                    }, 180)
                  }}
                >
                  <button
                    className="relative flex items-center gap-1 px-5 py-2.5 text-[13px] font-outfit font-bold text-foreground/75 hover:text-foreground transition-colors duration-200 cursor-pointer z-10"
                    onClick={() => setActiveDropdown(isTabOpen ? null : link.label as 'Verticals' | 'Partners')}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${isTabOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  {/* Hover Pill Background */}
                  {hoveredLink === link.label && (
                    <motion.span
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-foreground/5 rounded-full -z-0"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </div>
              ) : (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.isHash)}
                  onMouseEnter={() => setHoveredLink(link.label)}
                  onMouseLeave={() => setHoveredLink(null)}
                  className="relative px-5 py-2.5 text-[13px] font-sans font-bold text-foreground/75 hover:text-foreground transition-colors duration-200 cursor-pointer z-10"
                >
                  {link.label}
                  {hoveredLink === link.label && (
                    <motion.span
                      layoutId="navHoverPill"
                      className="absolute inset-0 bg-foreground/5 rounded-full -z-10"
                      transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                    />
                  )}
                </button>
              )
            })}

            {/* Coming Soon Partners Button */}
            <div className="relative group">
              <button
                disabled
                className="relative px-5 py-2.5 text-[13px] font-sans font-bold text-foreground/40 cursor-not-allowed z-10 flex items-center gap-1"
              >
                Partners
                <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-foreground/5 text-foreground/50 font-mono">soon</span>
              </button>
              {/* Tooltip */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                whileHover={{ opacity: 1, y: 0 }}
                className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-2 bg-foreground text-background text-[11px] font-medium rounded-lg whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50"
              >
                Coming soon - More partners will be added in future
              </motion.div>
            </div>
          </div>

          {/* CTA & Theme toggle buttons */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full border border-border bg-card/40 hover:bg-card text-foreground transition-all duration-200 cursor-pointer flex items-center justify-center"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {theme === 'dark' ? <Sun size={17} className="text-[#E8500A]" /> : <Moon size={17} className="text-foreground" />}
              </motion.div>
            </motion.button>

            <Magnetic>
              <button
                onClick={() => handleNavClick('#contact', true)}
                className="flex items-center gap-2 px-6 py-3 text-[13px] font-sans font-bold bg-[#E8500A] hover:bg-[#d44608] text-white rounded-full transition-all duration-200 hover:shadow-[0_0_24px_rgba(232,80,10,0.4)] cursor-pointer"
              >
                Contact Us
              </button>
            </Magnetic>
          </div>

          {/* Mobile menu toggle & Theme toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            {/* Theme Toggle */}
            <motion.button
              onClick={toggleTheme}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="p-2 rounded-full border border-border bg-card/40 hover:bg-card text-foreground transition-all duration-200 cursor-pointer flex items-center justify-center"
              aria-label="Toggle theme"
            >
              <motion.div
                initial={false}
                animate={{ rotate: theme === 'dark' ? 180 : 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
              >
                {theme === 'dark' ? <Sun size={14} className="text-[#E8500A]" /> : <Moon size={14} className="text-foreground" />}
              </motion.div>
            </motion.button>

            {/* Mobile Menu Trigger */}
            <button
              className="p-2 text-foreground/80 hover:text-foreground transition-colors cursor-pointer"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

          {/* Desktop Mega Menu Dropdown (List-and-Detail Layout) */}
          <AnimatePresence>
            {activeDropdown && (
              <motion.div
                onMouseEnter={() => {
                  if (closeTimeout.current) {
                    clearTimeout(closeTimeout.current)
                    closeTimeout.current = null
                  }
                  setActiveDropdown(lastHoveredTab)
                }}
                onMouseLeave={() => {
                  // delay close when leaving dropdown
                  closeTimeout.current = window.setTimeout(() => {
                    setActiveDropdown(null)
                  }, 180)
                }}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                className="absolute left-1/2 -translate-x-1/2 top-full mt-4 w-[95vw] max-w-6xl bg-card/95 border border-primary/15 rounded-3xl overflow-hidden shadow-2xl backdrop-blur-xl p-8 z-50 pointer-events-auto flex gap-8 min-h-[460px]"
              >
                {lastHoveredTab === 'Verticals' ? (
                  <>
                    {/* Left Panel: 20 Verticals List (2 columns to stay compact) */}
                    <div className="w-[55%] border-r border-border/40 pr-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground/45 mb-4">
                          Our Strong Verticals
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                          {verticalsData.map((vertical) => {
                            const IconComponent = lucideIconMap[vertical.iconName] || Building2
                            const isActive = vertical.slug === activeVerticalSlug
                            return (
                              <div
                                key={vertical.slug}
                                onMouseEnter={() => setActiveVerticalSlug(vertical.slug)}
                                onClick={() => {
                                  router.push(`/verticals/${vertical.slug}`)
                                  setActiveDropdown(null)
                                }}
                                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left cursor-pointer transition-all duration-150 group/item ${
                                  isActive
                                    ? 'bg-primary/10 border border-primary/20 text-primary shadow-[0_2px_8px_rgba(232,80,10,0.05)]'
                                    : 'border border-transparent text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                                }`}
                              >
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                                    isActive ? 'bg-primary text-white' : 'bg-foreground/5 text-foreground/45 group-hover/item:bg-primary/10 group-hover/item:text-primary'
                                  }`}
                                >
                                  <IconComponent size={13} />
                                </div>
                                <span className="text-[12px] font-bold truncate leading-none">
                                  {vertical.shortLabel || vertical.name}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Dynamic Details View */}
                    <div className="w-[45%] pl-2 flex flex-col justify-between relative overflow-hidden">
                      {/* Spotlight Background for Hover Effect */}
                      <div
                        className="absolute inset-0 pointer-events-none opacity-5 blur-3xl rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${activeVertical.color} 0%, transparent 70%)`
                        }}
                      />

                      <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                            style={{ backgroundColor: activeVertical.color }}
                          >
                            <ActiveVerticalIcon size={22} />
                          </div>
                          <div>
                            <h4 className="font-heading font-black text-[18px] text-foreground leading-tight tracking-tight">
                              {activeVertical.name}
                            </h4>
                            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: activeVertical.color }}>
                              {activeVertical.tagline}
                            </span>
                          </div>
                        </div>

                        <p className="text-foreground/60 text-xs leading-relaxed font-sans font-light">
                          {activeVertical.description}
                        </p>

                        <div className="h-px bg-border/40 w-full" />

                        <div>
                          <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground/40 mb-3">
                            Services Include
                          </h5>
                          <div className="grid grid-cols-1 gap-2">
                            {activeVertical.subcategories.slice(0, 5).map((sub) => (
                              <Link
                                key={sub.slug}
                                href={`/verticals/${activeVertical.slug}/${sub.slug}`}
                                onClick={() => setActiveDropdown(null)}
                                className="text-left text-[12px] font-medium text-foreground/75 hover:text-primary transition-all flex items-center gap-2 group/sub cursor-pointer"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-primary/45 group-hover/sub:bg-primary transition-colors flex-shrink-0" />
                                <span className="truncate group-hover/sub:translate-x-0.5 transition-transform">{sub.name}</span>
                              </Link>
                            ))}
                            {activeVertical.subcategories.length > 5 && (
                              <div className="text-[11px] text-foreground/40 italic font-mono pt-1">
                                + {activeVertical.subcategories.length - 5} more solutions
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 relative z-10">
                        <Link
                          href={`/verticals/${activeVertical.slug}`}
                          onClick={() => setActiveDropdown(null)}
                          className="inline-flex items-center gap-2 text-xs font-bold text-white px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer hover:shadow-lg hover:translate-y-[-1px]"
                          style={{ backgroundColor: activeVertical.color }}
                        >
                          Explore {activeVertical.shortLabel} <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Left Panel: Partners List */}
                    <div className="w-[55%] border-r border-border/40 pr-6 flex flex-col justify-between">
                      <div>
                        <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground/45 mb-4">
                          Our Alliances & Partners
                        </h3>
                        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                          {navbarPartners.map((partner) => {
                            const IconComponent = partnerIconMap[partner.iconName] || Handshake
                            const isActive = partner.slug === activePartnerSlug
                            return (
                              <div
                                key={partner.slug}
                                onMouseEnter={() => setActivePartnerSlug(partner.slug)}
                                className={`flex items-center gap-3 px-3 py-2 rounded-xl text-left cursor-pointer transition-all duration-150 group/item ${
                                  isActive
                                    ? 'bg-primary/10 border border-primary/20 text-primary shadow-[0_2px_8px_rgba(232,80,10,0.05)]'
                                    : 'border border-transparent text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                                }`}
                              >
                                <div
                                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-all ${
                                    isActive ? 'bg-primary text-white' : 'bg-foreground/5 text-foreground/45 group-hover/item:bg-primary/10 group-hover/item:text-primary'
                                  }`}
                                >
                                  <IconComponent size={13} />
                                </div>
                                <span className="text-[12px] font-bold truncate leading-none">
                                  {partner.name}
                                </span>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    </div>

                    {/* Right Panel: Partner Details */}
                    <div className="w-[45%] pl-2 flex flex-col justify-between relative overflow-hidden">
                      <div
                        className="absolute inset-0 pointer-events-none opacity-5 blur-3xl rounded-full"
                        style={{
                          background: `radial-gradient(circle, ${activePartner.color} 0%, transparent 70%)`
                        }}
                      />

                      <div className="space-y-6 relative z-10">
                        <div className="flex items-center gap-3.5">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg"
                            style={{ backgroundColor: activePartner.color }}
                          >
                            <ActivePartnerIcon size={22} />
                          </div>
                          <div>
                            <h4 className="font-heading font-black text-[18px] text-foreground leading-tight tracking-tight">
                              {activePartner.name}
                            </h4>
                            <span className="text-[10px] font-mono uppercase tracking-wider" style={{ color: activePartner.color }}>
                              {activePartner.tagline}
                            </span>
                          </div>
                        </div>

                        <p className="text-foreground/60 text-xs leading-relaxed font-sans font-light">
                          {activePartner.description}
                        </p>

                        <div className="h-px bg-border/40 w-full" />

                        <div>
                          <h5 className="text-[10px] font-mono font-bold uppercase tracking-wider text-foreground/40 mb-3">
                            Alliance Details
                          </h5>
                          <div className="space-y-2.5 text-xs text-foreground/75 font-sans font-light">
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-foreground/50">Location:</span>
                              <span>{activePartner.location}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-foreground/50">Status:</span>
                              <span className="px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-500 font-mono text-[9px] font-bold">Active Integration</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 relative z-10">
                        <Link
                          href={`/partners`}
                          onClick={() => setActiveDropdown(null)}
                          className="inline-flex items-center gap-2 text-xs font-bold text-white px-5 py-2.5 rounded-xl transition-all shadow-md cursor-pointer hover:shadow-lg hover:translate-y-[-1px]"
                          style={{ backgroundColor: activePartner.color }}
                        >
                          Explore Partner Portal <ArrowRight size={13} />
                        </Link>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 top-20 z-45 bg-background/95 border border-border backdrop-blur-xl rounded-3xl p-6 shadow-2xl flex flex-col gap-4 lg:hidden max-h-[80vh] overflow-y-auto"
          >
            <div className="flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <div key={link.label}>
                  {link.isMega ? (
                    <div className="w-full">
                      {link.label === 'Verticals' ? (
                        <>
                          <button
                            onClick={() => setMobileVerticalsOpen(!mobileVerticalsOpen)}
                            className="w-full text-left py-3 text-lg font-heading font-semibold text-foreground/80 hover:text-foreground border-b border-border/40 flex items-center justify-between cursor-pointer"
                          >
                            {link.label}
                            <ChevronDown
                              size={16}
                              className={`text-[#E8500A] transition-transform duration-200 ${mobileVerticalsOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobileVerticalsOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-2 overflow-hidden flex flex-col gap-2 mt-2 border-l border-border/55"
                              >
                                {verticalsData.map((vertical) => {
                                  const isExpanded = mobileActiveVerticalSlug === vertical.slug
                                  return (
                                    <div key={vertical.slug} className="flex flex-col gap-1 border-b border-border/10 pb-1">
                                      <button
                                        onClick={() => setMobileActiveVerticalSlug(isExpanded ? null : vertical.slug)}
                                        className="w-full text-left font-bold text-sm text-foreground/90 hover:text-[#E8500A] flex items-center justify-between py-1.5 cursor-pointer"
                                      >
                                        <span>{vertical.name}</span>
                                        <ChevronRight
                                          size={12}
                                          className={`text-foreground/40 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                        />
                                      </button>
                                      <AnimatePresence>
                                        {isExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="flex flex-col gap-1.5 pl-3 pb-2"
                                          >
                                            {vertical.subcategories.map((sub) => (
                                              <Link
                                                key={sub.slug}
                                                href={`/verticals/${vertical.slug}/${sub.slug}`}
                                                onClick={() => setMobileOpen(false)}
                                                className="text-left py-1 text-xs text-foreground/60 hover:text-[#E8500A] cursor-pointer"
                                              >
                                                • {sub.name}
                                              </Link>
                                            ))}
                                            <Link
                                              href={`/verticals/${vertical.slug}`}
                                              onClick={() => setMobileOpen(false)}
                                              className="text-left py-1 text-xs font-bold text-[#E8500A] hover:underline cursor-pointer"
                                            >
                                              View All {"->"}
                                            </Link>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  )
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : link.label === 'Partners' ? (
                        // Coming Soon Partners - Mobile
                        <motion.button
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.05 }}
                          disabled
                          className="w-full text-left py-3 text-lg font-heading font-semibold text-foreground/40 border-b border-border/40 flex items-center justify-between cursor-not-allowed"
                        >
                          <span className="flex items-center gap-2">
                            Partners
                            <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-foreground/5 text-foreground/50 font-mono">soon</span>
                          </span>
                        </motion.button>
                      ) : (
                        <>
                          <button
                            onClick={() => setMobilePartnersOpen(!mobilePartnersOpen)}
                            className="w-full text-left py-3 text-lg font-heading font-semibold text-foreground/80 hover:text-foreground border-b border-border/40 flex items-center justify-between cursor-pointer"
                          >
                            {link.label}
                            <ChevronDown
                              size={16}
                              className={`text-[#E8500A] transition-transform duration-200 ${mobilePartnersOpen ? 'rotate-180' : ''}`}
                            />
                          </button>
                          <AnimatePresence>
                            {mobilePartnersOpen && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                className="pl-2 overflow-hidden flex flex-col gap-2 mt-2 border-l border-border/55"
                              >
                                {navbarPartners.map((partner) => {
                                  const isExpanded = mobileActivePartnerSlug === partner.slug
                                  return (
                                    <div key={partner.slug} className="flex flex-col gap-1 border-b border-border/10 pb-1">
                                      <button
                                        onClick={() => setMobileActivePartnerSlug(isExpanded ? null : partner.slug)}
                                        className="w-full text-left font-bold text-sm text-foreground/90 hover:text-[#E8500A] flex items-center justify-between py-1.5 cursor-pointer"
                                      >
                                        <span>{partner.name}</span>
                                        <ChevronRight
                                          size={12}
                                          className={`text-foreground/40 transition-transform ${isExpanded ? 'rotate-90' : ''}`}
                                        />
                                      </button>
                                      <AnimatePresence>
                                        {isExpanded && (
                                          <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="flex flex-col gap-1.5 pl-3 pb-2 text-xs text-foreground/60 space-y-1"
                                          >
                                            <p className="font-mono text-[9px] uppercase tracking-wider font-bold" style={{ color: partner.color }}>
                                              {partner.tagline}
                                            </p>
                                            <p className="leading-relaxed">
                                              {partner.description}
                                            </p>
                                            <p className="font-mono text-[9px] text-foreground/40">
                                              Location: {partner.location}
                                            </p>
                                            <Link
                                              href={`/partners`}
                                              onClick={() => setMobileOpen(false)}
                                              className="text-left py-1 text-xs font-bold text-[#E8500A] hover:underline cursor-pointer block mt-1"
                                            >
                                              View All Partners {"->"}
                                            </Link>
                                          </motion.div>
                                        )}
                                      </AnimatePresence>
                                    </div>
                                  )
                                })}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      )}
                    </div>
                  ) : (
                    <motion.button
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => handleNavClick(link.href, link.isHash)}
                      className="w-full text-left py-3 text-lg font-heading font-semibold text-foreground/80 hover:text-foreground border-b border-border/40 flex items-center justify-between cursor-pointer"
                    >
                      {link.label}
                    </motion.button>
                  )}
                </div>
              ))}

              {/* Coming Soon Partners - Mobile */}
              <motion.button
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.05 }}
                disabled
                className="w-full text-left py-3 text-lg font-heading font-semibold text-foreground/40 border-b border-border/40 flex items-center justify-between cursor-not-allowed"
              >
                <span className="flex items-center gap-2">
                  Partners
                  <span className="text-[9px] px-1.5 py-0.5 rounded-md bg-foreground/5 text-foreground/50 font-mono">soon</span>
                </span>
              </motion.button>
            </div>
            <div className="flex flex-col gap-2 mt-4">
              <button
                onClick={() => handleNavClick('#contact', true)}
                className="w-full py-3.5 bg-[#E8500A] hover:bg-[#d44608] text-white text-sm font-semibold rounded-2xl flex items-center justify-center cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(232,80,10,0.3)]"
              >
                Contact Us
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
