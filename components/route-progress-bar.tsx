'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

export default function RouteProgressBar() {
  const pathname = usePathname()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    
    const timer = setTimeout(() => {
      setLoading(false)
    }, 500)

    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ width: '0%', opacity: 1 }}
          animate={{ width: '90%' }}
          exit={{ width: '100%', opacity: 0 }}
          transition={{
            width: { duration: 0.4, ease: 'easeOut' },
            opacity: { duration: 0.15, delay: 0.35 }
          }}
          className="fixed top-0 left-0 h-1 bg-gradient-to-r from-[#E8500A] via-[#E8500A] to-sky-500 z-[99999] shadow-[0_0_10px_rgba(232,80,10,0.5),0_0_5px_rgba(232,80,10,0.3)] pointer-events-none"
        />
      )}
    </AnimatePresence>
  )
}
