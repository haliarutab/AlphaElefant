'use client'

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Shield, Fingerprint, BatteryCharging, Cpu, Award, Globe, Code, LineChart } from 'lucide-react'

interface ShowcaseProps {
  slug: string
  color: string
}

export default function ServiceVisualShowcase({ slug, color }: ShowcaseProps) {
  const [activeItem, setActiveItem] = useState(0)

  // 1. Cybersecurity Showcase
  if (slug === 'cybersecurity-soc') {
    const logs = [
      'SYS_INIT: Compliance SOC v2.4 initialized.',
      'SCANNER: Scanning open ports (1-65535)...',
      'MONITOR: Fuzzy logic checks active vs watchlists.',
      'ALERT: Port 443 TCP handshake verified (TLS v1.3).',
      'INTEGRITY: System memory hashes checked against root baseline.',
      'STATUS: SECURE. 0 threats detected in last 24h.'
    ]
    return (
      <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-6 relative overflow-hidden font-mono text-[10px] text-emerald-400 min-h-[220px] flex flex-col justify-between shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/5 to-transparent pointer-events-none" />
        
        {/* Terminal Header */}
        <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-3">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-500" />
            <span className="ml-2 text-foreground/45 text-[9px] font-mono">threat_monitor.sh</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-foreground/40 animate-pulse">
            <Shield size={12} className="text-emerald-400" />
            <span>LIVE INTRUSION SCANNER</span>
          </div>
        </div>

        {/* Scrolling Logs */}
        <div className="flex-1 space-y-2 select-none overflow-hidden pr-2">
          {logs.map((log, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15 }}
              className="flex gap-2"
            >
              <span className="text-[#E8500A] font-bold">&gt;</span>
              <span>{log}</span>
            </motion.div>
          ))}
        </div>

        {/* Footer info */}
        <div className="border-t border-border/40 pt-3 mt-3 flex items-center justify-between text-foreground/30 text-[9px]">
          <span>HEADQUARTERS: PK_SECURE_SOC</span>
          <span>LATENCY: 14ms</span>
        </div>
      </div>
    )
  }

  // 2. Identity Tech Showcase
  if (slug === 'compliance-identity-tech') {
    return (
      <div className="rounded-3xl border border-border bg-card/45 backdrop-blur-sm p-6 relative overflow-hidden flex flex-col items-center justify-center min-h-[220px] shadow-2xl">
        {/* Glow meshes */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
        
        {/* Bio Matching Scanner Box */}
        <div className="relative w-28 h-28 rounded-2xl border border-primary/45 flex items-center justify-center overflow-hidden">
          {/* Pulsing scanning guide box */}
          <motion.div 
            animate={{ y: [-48, 48, -48] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8500A] to-transparent z-10"
          />
          <Fingerprint size={48} className="text-[#E8500A] opacity-60 animate-pulse" />
        </div>

        {/* Verification Status */}
        <div className="mt-4 text-center space-y-1">
          <div className="text-[10px] font-mono text-primary font-bold tracking-widest uppercase animate-pulse">VERIFYING APPLICANT</div>
          <div className="text-[9px] font-mono text-foreground/45">FINGERPRINT MATCH: 99.4% · SECURE HANDSHAKE</div>
        </div>
      </div>
    )
  }

  // 3. Energy Solutions Showcase
  if (slug === 'energy-solutions') {
    return (
      <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-6 relative overflow-hidden min-h-[220px] flex flex-col justify-between shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
        
        <div className="flex items-center justify-between border-b border-border/40 pb-3 mb-3 text-[10px] font-mono text-foreground/45">
          <span>HYBRID LOAD MATRIX</span>
          <div className="flex items-center gap-1.5 text-amber-500 font-bold">
            <BatteryCharging size={12} className="animate-bounce" />
            <span>SOLAR HARVEST ACTIVE</span>
          </div>
        </div>

        {/* Telemetry charts simulation */}
        <div className="flex-1 flex items-end gap-3 h-28 px-4 justify-between border-b border-border/20 pb-2 select-none">
          {[40, 65, 80, 55, 95, 75, 88, 100, 60].map((h, i) => (
            <div key={i} className="flex-1 bg-border/40 rounded-t-sm h-full flex items-end overflow-hidden">
              <motion.div 
                initial={{ height: 0 }}
                animate={{ height: `${h}%` }}
                transition={{ duration: 1, delay: i * 0.05 }}
                className="w-full bg-gradient-to-t from-[#E8500A] to-amber-500"
              />
            </div>
          ))}
        </div>

        <div className="pt-3 flex justify-between font-mono text-[9px] text-foreground/30">
          <span>BATTERY CAPACITY: 94.6%</span>
          <span>NET OUTPUT: 142.4 kW</span>
        </div>
      </div>
    )
  }

  // 4. Education Institute
  if (slug === 'education-institute') {
    return (
      <div className="rounded-3xl border border-border bg-card/40 backdrop-blur-sm p-5 relative overflow-hidden min-h-[220px] flex flex-col justify-between font-mono text-[10px] text-blue-400 shadow-2xl">
        {/* Mock Code Editor */}
        <div className="flex items-center justify-between border-b border-border/30 pb-2.5 mb-2.5">
          <div className="flex items-center gap-1.5 text-[9px] text-foreground/40">
            <Code size={12} />
            <span>App.tsx</span>
          </div>
          <span className="text-blue-500 font-bold tracking-widest text-[8px] uppercase">SANDBOX ACTIVATED</span>
        </div>

        <div className="flex-1 space-y-1.5 overflow-hidden text-left pl-1 select-none">
          <p className="text-foreground/40">// Initialize AlphaEngine</p>
          <p><span className="text-purple-400">const</span> engine = <span className="text-purple-400">new</span> <span className="text-yellow-300">AlphaEngine</span>()</p>
          <p>engine.<span className="text-yellow-300">loadVertical</span>(<span className="text-green-300">&apos;fintech_ledger&apos;</span>)</p>
          <p>engine.<span className="text-yellow-300">verifyCompliance</span>()</p>
          <p className="text-emerald-400">.then(<span className="text-yellow-300">sys</span> =&gt; 'Live OK')</p>
        </div>

        <div className="border-t border-border/30 pt-2.5 mt-2.5 flex items-center justify-between text-foreground/20 text-[8px]">
          <span>CONSOLES: RUNNING</span>
          <span>ERRORS: 0</span>
        </div>
      </div>
    )
  }

  // 5. Default premium visual showcase
  return (
    <div className="rounded-3xl border border-border bg-card/15 backdrop-blur-sm p-8 relative overflow-hidden min-h-[220px] flex flex-col justify-center items-center shadow-2xl group cursor-default">
      {/* 3D mesh lines and layers */}
      <div 
        className="absolute w-64 h-64 rounded-full blur-[80px] opacity-10 pointer-events-none transition-all duration-700 group-hover:scale-110"
        style={{ backgroundColor: color }}
      />
      
      <div className="relative z-10 flex flex-col items-center space-y-4">
        {/* Core rotating mesh */}
        <div className="relative w-20 h-20 flex items-center justify-center">
          {/* Orbiting dashboard borders */}
          <div className="absolute inset-0 rounded-full border border-dashed border-border group-hover:border-primary/40 animate-[spin_24s_linear_infinite]" />
          <div className="absolute inset-2 rounded-full border border-primary/20 group-hover:border-primary/50 border-dotted animate-[spin_12s_linear_infinite_reverse]" />
          
          <div 
            className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-xl transition-all duration-300 group-hover:scale-105"
            style={{ backgroundColor: color }}
          >
            <Cpu size={24} className="animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-1">
          <h4 className="font-heading font-black text-xs text-foreground tracking-widest uppercase">ALPHA ECOSYSTEM</h4>
          <p className="text-foreground/45 text-[10px] font-sans font-light max-w-[180px]">
            Sovereign pipeline architecture deployed and synchronized in real-time.
          </p>
        </div>
      </div>
    </div>
  )
}
