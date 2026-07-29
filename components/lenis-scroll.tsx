'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import Lenis from 'lenis'

export default function LenisScroll({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
    })

    lenisRef.current = lenis

    function raf(time: number) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }

    requestAnimationFrame(raf)

    // Handle custom clicks on nav buttons
    const handleAnchorScroll = (e: CustomEvent<{ id: string }>) => {
      const el = document.getElementById(e.detail.id)
      if (el) {
        lenis.scrollTo(el, { offset: 0, duration: 1.4 })
      }
    }

    window.addEventListener('lenis-scroll-to' as any, handleAnchorScroll)

    // Scroll to initial hash if it exists on load
    if (window.location.hash) {
      const hash = window.location.hash.replace('#', '')
      setTimeout(() => {
        const el = document.getElementById(hash)
        if (el) {
          lenis.scrollTo(el, { offset: 0, duration: 1.4 })
        }
      }, 300)
    }

    return () => {
      lenis.destroy()
      window.removeEventListener('lenis-scroll-to' as any, handleAnchorScroll)
    }
  }, [])

  // Scroll to hash when navigating to a page with a hash in the URL, or reset to top
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (window.location.hash) {
        const hash = window.location.hash.replace('#', '')
        setTimeout(() => {
          const el = document.getElementById(hash)
          if (el && lenisRef.current) {
            lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4 })
          }
        }, 300)
      } else {
        // No hash: Reset scroll position to top instantly
        if (lenisRef.current) {
          lenisRef.current.scrollTo(0, { immediate: true })
        } else {
          window.scrollTo(0, 0)
        }
      }
    }
  }, [pathname])

  return <>{children}</>
}

