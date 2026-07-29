'use client'

import dynamic from 'next/dynamic'
import { ThemeProvider } from './theme-provider'
import LenisScroll from './lenis-scroll'
import RouteProgressBar from './route-progress-bar'

const CustomCursor = dynamic(() => import('./custom-cursor'), { ssr: false })

export default function ClientShell({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <LenisScroll>
        <CustomCursor />
        <RouteProgressBar />
        {children}
      </LenisScroll>
    </ThemeProvider>
  )
}
