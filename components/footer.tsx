'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, Mail, Phone, MapPin } from 'lucide-react'
import { usePathname, useRouter } from 'next/navigation'
import Link from 'next/link'
import Magnetic from './magnetic'

export default function Footer() {
  const pathname = usePathname()
  const router = useRouter()

  const scrollToTop = () => {
    if (pathname === '/') {
      window.dispatchEvent(new CustomEvent('lenis-scroll-to', { detail: { id: 'hero' } }))
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const handleLinkClick = (href: string) => {
    if (href.startsWith('#')) {
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

  return (
    <footer className="relative bg-background border-t border-border pt-16 pb-8 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      <div className="absolute top-0 right-0 w-[400px] h-[300px] bg-[#E8500A]/3 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1.2fr] gap-10 mb-16">

          {/* Column 1: Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1 space-y-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 flex items-center justify-center cursor-pointer" onClick={() => handleLinkClick('#hero')}>
                <img src="/logo.png" alt="AlphaElephant Brand Identity" />
              </div>
              <div>
                <div className="font-heading font-bold text-lg cursor-pointer" onClick={() => handleLinkClick('#hero')}>
                  Alpha<span className="text-[#E8500A]">Elefant</span>
                </div>
                <div className="text-[9px] text-[#E8500A] font-mono leading-none uppercase tracking-wider">
                  Innovation Under One Umbrella
                </div>
              </div>
            </div>
            <p className="text-foreground/45 text-xs md:text-sm leading-relaxed max-w-xs">
              Pakistan&apos;s leading multi-vertical company — delivering institutional transformation, compliance-grade technology, education, and strategic alliances globally.
            </p>
            <div className="flex gap-2">
              {[
                {
                  label: 'LinkedIn',
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" /><circle cx="4" cy="4" r="2" /></svg>,
                },
                {
                  label: 'X / Twitter',
                  svg: <svg viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>,
                },
                {
                  label: 'Instagram',
                  svg: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-3.5 h-3.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></svg>,
                },
              ].map(({ label, svg }) => (
                <Magnetic key={label}>
                  <button
                    aria-label={label}
                    className="w-8 h-8 rounded-lg border border-border hover:border-primary/50 bg-foreground/5 hover:bg-[#E8500A]/10 flex items-center justify-center text-foreground/40 hover:text-[#E8500A] transition-all duration-200 cursor-pointer"
                  >
                    {svg}
                  </button>
                </Magnetic>
              ))}
            </div>
          </div>

          {/* Column 2: Verticals */}
          <div className="space-y-4">
            <div className="text-foreground/30 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
              Verticals
            </div>
            <ul className="space-y-2">
              {[
                { label: 'Institutional Renovation', href: '/verticals/institutional-renovation' },
                { label: 'Skill Development', href: '/verticals/skill-development' },
                { label: 'Tech Products', href: '/verticals/tech-products' },
                { label: 'Intl. Tech Services', href: '/verticals/intl-tech-services' },
                { label: 'Strategic Alliances', href: '/verticals/strategic-alliances' }
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-foreground/55 hover:text-[#E8500A] text-xs transition-colors duration-200 cursor-pointer block"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Company */}
          <div className="space-y-4">
            <div className="text-foreground/30 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
              Company
            </div>
            <ul className="space-y-2">
              {[
                { label: 'About (Mission & Vision)', href: '/about' },
                { label: 'Our Team', href: '#team' },
                { label: 'Contact Us', href: '#contact' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-foreground/55 hover:text-[#E8500A] text-xs transition-colors duration-200 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Careers */}
          <div className="space-y-4">
            <div className="text-foreground/30 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
              Careers
            </div>
            <ul className="space-y-2">
              {[
                { label: 'Open Positions', href: '/careers' },
                { label: 'Apply / Submit Resume', href: '/careers#app-form' },
                { label: 'Life at Alpha Elefant', href: '/careers' },
              ].map((link) => (
                <li key={link.label}>
                  <button
                    onClick={() => handleLinkClick(link.href)}
                    className="text-foreground/55 hover:text-[#E8500A] text-xs transition-colors duration-200 text-left cursor-pointer"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5: Connect With Us */}
          <div className="space-y-4">
            <div className="text-foreground/30 text-[10px] font-mono font-bold tracking-[0.2em] uppercase">
              Connect With Us
            </div>
            <ul className="space-y-2.5 text-xs text-foreground/55">
              <li className="flex items-center gap-2">
                <Mail size={12} className="text-[#E8500A] flex-shrink-0" />
                <a href="mailto:info@alphaelephant.com" className="hover:text-primary transition-colors">
                  info@alphaelephant.com
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={12} className="text-[#E8500A] flex-shrink-0" />
                <a href="tel:+923001234567" className="hover:text-primary transition-colors">
                  +92 (300) 123 4567
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin size={12} className="text-[#E8500A] mt-0.5 flex-shrink-0" />
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => handleLinkClick('#contact')}
                className="w-full text-center py-2 text-[10px] font-sans font-bold bg-[#E8500A] hover:bg-[#d44608] text-white rounded-lg transition-all hover:shadow-[0_0_12px_rgba(232,80,10,0.3)] cursor-pointer"
              >
                Book a Call
              </button>
            </div>
          </div>

        </div>

        {/* Bottom row */}
        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-foreground/30 text-xs text-center md:text-left">
            &copy; {new Date().getFullYear()} Alpha Elefant. All rights reserved. Headquarters: Pakistan.
          </p>
          <div className="flex items-center gap-6">
            <span className="text-foreground/25 text-xs hover:text-primary transition-colors cursor-pointer">Privacy Policy</span>
            <span className="text-foreground/25 text-xs hover:text-primary transition-colors cursor-pointer">Terms of Service</span>
            <Magnetic>
              <button
                onClick={scrollToTop}
                aria-label="Back to top"
                className="w-8 h-8 rounded-lg bg-[#E8500A]/15 hover:bg-[#E8500A]/30 border border-[#E8500A]/25 flex items-center justify-center text-[#E8500A] transition-all duration-200 cursor-pointer"
              >
                <ArrowUp size={14} />
              </button>
            </Magnetic>
          </div>
        </div>
      </div>
    </footer>
  )
}

