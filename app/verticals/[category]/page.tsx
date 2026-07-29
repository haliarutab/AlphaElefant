import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { verticalsData, lucideIconMap } from '@/lib/data/verticals'
import { ArrowRight, ChevronRight, HelpCircle, PhoneCall } from 'lucide-react'
import VerticalContactForm from '@/components/vertical-contact-form'

interface PageProps {
  params: Promise<{ category: string }>
}

export async function generateStaticParams() {
  return verticalsData.map((vertical) => ({
    category: vertical.slug,
  }))
}

export async function generateMetadata({ params }: PageProps) {
  const { category } = await params
  const vertical = verticalsData.find((v) => v.slug === category)
  if (!vertical) return {}
  return {
    title: `${vertical.name} — Alpha Elefant`,
    description: vertical.description,
  }
}

export default async function VerticalCategoryPage({ params }: PageProps) {
  const { category } = await params
  const vertical = verticalsData.find((v) => v.slug === category)

  if (!vertical) {
    notFound()
  }

  const IconComponent = lucideIconMap[vertical.iconName] || lucideIconMap.Building2
  const selectionOptions = vertical.subcategories.map((sub) => `Subcategory: ${sub.name}`)

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Category Hero */}
      <section className="relative pt-24 pb-16 overflow-hidden">
        {/* Color tinted glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="absolute top-0 right-0 w-[550px] h-[550px] rounded-full blur-[140px] opacity-10" 
            style={{ backgroundColor: vertical.color }}
          />
          <div className="absolute bottom-0 left-0 w-[450px] h-[400px] bg-secondary/15 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 space-y-6">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-foreground/45 text-xs font-mono">
            <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <span className="text-foreground/75 uppercase">{vertical.shortLabel}</span>
          </div>

          {/* Heading Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-4">
            <div className="space-y-4 max-w-2xl">
              <div 
                className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg text-white"
                style={{ backgroundColor: vertical.color }}
              >
                <IconComponent size={32} />
              </div>
              <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground leading-[1.05] tracking-tight">
                {vertical.name}
              </h1>
              <p className="text-foreground/70 text-sm md:text-base font-sans font-light leading-relaxed">
                {vertical.description}
              </p>
            </div>

            {/* Stats list */}
            {vertical.stats && (
              <div className="grid grid-cols-3 md:grid-cols-1 gap-6 bg-card/25 border border-border/55 rounded-3xl p-6 backdrop-blur-sm md:w-64">
                {vertical.stats.map((stat, i) => (
                  <div key={i} className="text-center md:text-left space-y-1">
                    <div 
                      className="font-heading font-black text-xl md:text-2xl leading-none"
                      style={{ color: vertical.color }}
                    >
                      {stat.value}
                    </div>
                    <div className="text-[10px] font-mono text-foreground/50 uppercase tracking-wider leading-tight">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Subcategories Grid */}
      <section className="max-w-6xl mx-auto px-6 mt-12 mb-20">
        <div className="flex items-center gap-3 mb-10">
          <h2 className="font-heading font-black text-2xl md:text-3xl text-foreground tracking-tight">
            Sub-Categories & Offerings
          </h2>
          <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {vertical.subcategories.map((sub) => (
            <div 
              key={sub.slug}
              className="p-8 rounded-3xl border border-border bg-card/15 backdrop-blur-sm flex flex-col justify-between hover:border-primary/40 hover:bg-card/45 transition-all duration-300 relative group overflow-hidden"
            >
              {/* Spotlight top corner glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/2 rounded-full blur-2xl group-hover:bg-primary/5 transition-all" />
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground group-hover:text-primary transition-colors">
                    {sub.name}
                  </h3>
                  <p 
                    className="text-[10px] font-mono font-bold uppercase tracking-wider mt-1"
                    style={{ color: vertical.color }}
                  >
                    {sub.tagline}
                  </p>
                </div>
                
                <p className="text-foreground/60 text-xs md:text-sm leading-relaxed">
                  {sub.description}
                </p>

                {/* Offerings list preview */}
                <div className="space-y-2 pt-2">
                  <div className="text-[9px] font-mono text-foreground/40 uppercase tracking-widest font-bold">Key Capabilities</div>
                  <ul className="space-y-1.5">
                    {sub.offerings.slice(0, 3).map((off, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-foreground/75 text-xs">
                        <span 
                          className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                          style={{ backgroundColor: vertical.color }}
                        />
                        <span>{off}</span>
                      </li>
                    ))}
                    {sub.offerings.length > 3 && (
                      <li className="text-[10px] font-mono text-foreground/45 pl-3.5 italic">
                        + {sub.offerings.length - 3} more offerings
                      </li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="pt-8 flex justify-end">
                <Link
                  href={`/verticals/${vertical.slug}/${sub.slug}`}
                  className="px-4 py-2 text-xs font-sans font-bold bg-[#E8500A]/10 text-primary border border-primary/20 hover:bg-primary hover:text-white rounded-lg transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  Explore Service Details <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Vertical-specific contact form */}
      <section className="max-w-6xl mx-auto px-6 mt-8">
        <VerticalContactForm mode="vertical" verticalName={vertical.name} selectionOptions={selectionOptions} />
      </section>

      {/* Why Choose Us & CTA Panel */}
      <section className="max-w-6xl mx-auto px-6">
        <div className="p-8 md:p-14 rounded-3xl border border-[#E8500A]/20 bg-gradient-to-r from-card/40 to-background/25 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
          <div 
            className="absolute top-0 right-0 w-80 h-80 rounded-full blur-[90px] pointer-events-none opacity-10"
            style={{ backgroundColor: vertical.color }}
          />
          <div className="space-y-4 max-w-xl">
            <h3 className="font-heading font-black text-2xl md:text-3xl text-foreground tracking-tight">
              Ready to Implement {vertical.shortLabel} Solutions?
            </h3>
            <p className="text-foreground/60 text-xs md:text-sm leading-relaxed font-sans font-light">
              Get in touch with our specialist team. We build fully custom strategies aligned with regulatory frameworks and operational metrics.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full sm:w-auto">
            <Link
              href="/#contact"
              className="w-full sm:w-auto text-center px-6 py-3 text-xs font-sans font-bold bg-primary hover:bg-[#d44608] text-white rounded-xl transition-all hover:shadow-[0_0_24px_rgba(232,80,10,0.4)] flex items-center justify-center gap-2 cursor-pointer"
            >
              Book a Strategy Call
            </Link>
            <Link
              href="/#contact"
              className="w-full sm:w-auto text-center px-6 py-3 text-xs font-sans font-bold border border-border text-foreground/70 hover:text-foreground rounded-xl transition-all hover:bg-card/40 flex items-center justify-center gap-2 cursor-pointer"
            >
              Enquire Online
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
