'use client'

declare global {
  interface Window {
    __cursorX: number
    __cursorY: number
  }
}

import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [hovering, setHovering] = useState(false)

  useEffect(() => {
    let dotX = 0, dotY = 0
    let ringX = 0, ringY = 0
    let mouseX = 0, mouseY = 0
    let raf: number

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY
      window.__cursorX = e.clientX
      window.__cursorY = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('[data-cursor="pointer"]')
      ) {
        setHovering(true)
      } else {
        setHovering(false)
      }
    }

    const animate = () => {
      dotX = mouseX
      dotY = mouseY
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${dotX}px, ${dotY}px) translate(-50%, -50%)`
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      }

      raf = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMouseMove, { passive: true })
    window.addEventListener('mouseover', onMouseOver, { passive: true })
    raf = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('mouseover', onMouseOver)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="custom-cursor cursor-dot"
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none' }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        className={`custom-cursor cursor-ring ${hovering ? 'hover' : ''}`}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 99998, pointerEvents: 'none' }}
      />
    </>
  )
}
