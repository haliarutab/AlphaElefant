import React from 'react'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { verticalsData } from '@/lib/data/verticals'
import { ChevronRight, ArrowLeft, Send, CheckCircle, Mail, Phone, Calendar } from 'lucide-react'
import ServiceVisualShowcase from '@/components/service-visual-showcase'
import VerticalContactForm from '@/components/vertical-contact-form'

interface PageProps {
  params: Promise<{ category: string; subcategory: string }>
}

export async function generateStaticParams() {
  const paths: { category: string; subcategory: string }[] = []
  verticalsData.forEach((vertical) => {
    vertical.subcategories.forEach((sub) => {
      paths.push({
        category: vertical.slug,
        subcategory: sub.slug,
      })
    })
  })
  return paths
}

export async function generateMetadata({ params }: PageProps) {
  const { category, subcategory } = await params
  const vertical = verticalsData.find((v) => v.slug === category)
  if (!vertical) return {}
  const sub = vertical.subcategories.find((s) => s.slug === subcategory)
  if (!sub) return {}
  return {
    title: `${sub.name} — ${vertical.shortLabel} — Alpha Elefant`,
    description: sub.description,
  }
}

export default async function SubCategoryDetailPage({ params }: PageProps) {
  const { category, subcategory } = await params
  const vertical = verticalsData.find((v) => v.slug === category)

  if (!vertical) {
    notFound()
  }

  const sub = vertical.subcategories.find((s) => s.slug === subcategory)

  if (!sub) {
    notFound()
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Subcategory Hero */}
      <section className="relative pt-24 pb-12 overflow-hidden">
        {/* Glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[140px] opacity-10"
            style={{ backgroundColor: vertical.color }}
          />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[120px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-6 relative z-10 space-y-6">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-foreground/45 text-xs font-mono">
            <Link href="/" className="hover:text-primary transition-colors">HOME</Link>
            <ChevronRight size={10} />
            <Link href={`/verticals/${vertical.slug}`} className="hover:text-primary transition-colors uppercase">
              {vertical.shortLabel}
            </Link>
            <ChevronRight size={10} />
            <span className="text-foreground/75 uppercase">{sub.slug.replace(/-/g, ' ')}</span>
          </div>

          {/* Back button */}
          <Link
            href={`/verticals/${vertical.slug}`}
            className="inline-flex items-center gap-2 text-xs font-bold text-foreground/60 hover:text-primary transition-colors group cursor-pointer"
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
            Back to {vertical.name}
          </Link>

          {/* Heading */}
          <div className="space-y-4 pt-4">
            <span
              className="text-xs font-mono font-bold tracking-[0.25em] uppercase"
              style={{ color: vertical.color }}
            >
              {sub.tagline}
            </span>
            <h1 className="font-heading font-black text-3xl md:text-5xl text-foreground leading-[1.05] tracking-tight">
              {sub.name}
            </h1>
            <p className="text-foreground/70 text-sm md:text-base font-sans font-light leading-relaxed max-w-3xl">
              {sub.description}
            </p>
          </div>
        </div>
      </section>

      {/* Offerings & Visual Showcase Section */}
      <section className="max-w-5xl mx-auto px-6 mt-12 mb-20">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 items-start">
          <div className="space-y-8">
            <div className="flex items-center gap-3">
              <h2 className="font-heading font-black text-xl md:text-2xl text-foreground tracking-tight">
                Key Services & Offerings
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
            </div>

            <div className="grid gap-4">
              {sub.offerings.map((offering, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border border-border bg-card/20 backdrop-blur-sm flex items-start gap-4 hover:border-primary/20 hover:bg-card/40 transition-all duration-200"
                >
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-white"
                    style={{ backgroundColor: `${vertical.color}18`, color: vertical.color }}
                  >
                    <CheckCircle size={16} />
                  </div>
                  <div className="space-y-1">
                    <h4 className="font-heading font-bold text-sm text-foreground">
                      {offering}
                    </h4>
                    <p className="text-foreground/50 text-xs">
                      Sovereign-grade implementation adhering to strict corporate standards and protocols.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 lg:sticky lg:top-28">
            <div className="flex items-center gap-3">
              <h2 className="font-heading font-black text-xl md:text-2xl text-foreground tracking-tight">
                Visual Showcase
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
            </div>
            <ServiceVisualShowcase slug={sub.slug} color={vertical.color} />
          </div>
        </div>
      </section>

      {/* Process / Steps Section (if exists) */}
      {sub.processSteps && (
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="font-heading font-black text-xl md:text-2xl text-foreground tracking-tight">
              Our Process Workflow
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 relative">
            {sub.processSteps.map((step, idx) => (
              <div key={idx} className="space-y-3 relative group">
                <div
                  className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold text-white shadow-lg"
                  style={{ backgroundColor: vertical.color }}
                >
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <h4 className="font-heading font-bold text-sm text-foreground">
                  {step.title}
                </h4>
                <p className="text-foreground/50 text-xs leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Case Studies Section (if exists) */}
      {sub.caseStudies && (
        <section className="max-w-5xl mx-auto px-6 mb-20">
          <div className="flex items-center gap-3 mb-10">
            <h2 className="font-heading font-black text-xl md:text-2xl text-foreground tracking-tight">
              Featured Case Studies
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-border/80 to-transparent" />
          </div>

          <div className="space-y-4">
            {sub.caseStudies.map((cs, idx) => (
              <div
                key={idx}
                className="p-8 rounded-3xl border border-border bg-card/25 backdrop-blur-sm relative overflow-hidden group hover:border-[#E8500A]/30 transition-all duration-300"
              >
                <div className="absolute top-0 right-0 w-48 h-48 bg-primary/2 rounded-full blur-2xl pointer-events-none" />
                <div className="space-y-3 max-w-3xl">
                  <span className="text-[10px] font-mono text-primary font-bold uppercase tracking-wider">SUCCESS STORY</span>
                  <h4 className="font-heading font-extrabold text-lg md:text-xl text-foreground">
                    {cs.title}
                  </h4>
                  <div className="flex items-center gap-4 text-xs font-mono text-foreground/45">
                    <span>Client: <strong className="text-foreground/75 font-sans font-medium">{cs.client}</strong></span>
                  </div>
                  <p className="text-foreground/70 text-xs md:text-sm leading-relaxed pt-2">
                    <strong className="text-[#E8500A] font-bold">Outcome:</strong> {cs.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <section className="max-w-5xl mx-auto px-6 mb-10">
        <VerticalContactForm
          mode={vertical.slug === 'education-training' ? 'education-subcategory' : 'vertical'}
          verticalName={vertical.name}
          {...(vertical.slug === 'education-training'
            ? { subcategoryName: sub.name, offerings: sub.offerings }
            : {
                selectionOptions: [
                  `Subcategory: ${sub.name}`,
                ],
              })}
        />
      </section>

      {/* Contact / Point of Contact Info */}
      <section className="max-w-5xl mx-auto px-6">
        {sub.contactPerson ? (
          <div className="p-8 md:p-10 rounded-3xl border border-primary/20 bg-gradient-to-r from-card/40 to-background/25 flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-80 h-80 bg-primary/3 rounded-full blur-[80px] pointer-events-none" />

            <div className="space-y-4">
              <span className="text-xs font-mono font-bold text-[#E8500A] tracking-wider uppercase block">PRIMARY POINT OF CONTACT</span>
              <h3 className="font-heading font-black text-2xl text-foreground tracking-tight">
                {sub.contactPerson.name}
              </h3>
              <p className="text-foreground/60 text-xs font-mono uppercase tracking-widest leading-none">
                {sub.contactPerson.role}
              </p>
              <p className="text-foreground/50 text-xs md:text-sm max-w-lg leading-relaxed">
                Connect directly for B2B procurement queries, institutional agreements, and custom client mandates.
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-auto">
              <a
                href={`mailto:${sub.contactPerson.email}`}
                className="w-full md:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-[#E8500A] hover:bg-[#d44608] text-white text-xs font-sans font-bold rounded-xl transition-all hover:shadow-[0_0_20px_rgba(232,80,10,0.3)]"
              >
                <Mail size={14} />
                Email {sub.contactPerson.name}
              </a>
            </div>
          </div>
        ) : (
          <div className="p-8 md:p-10 rounded-3xl border border-border bg-card/25 backdrop-blur-sm flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <h3 className="font-heading font-extrabold text-xl text-foreground">
                Need details for this service?
              </h3>
              <p className="text-foreground/50 text-xs md:text-sm max-w-md leading-relaxed">
                Send us a message or schedule a live consultation call to review integrations.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-4 flex-shrink-0 w-full sm:w-auto">
              <Link
                href="/#contact"
                className="w-full sm:w-auto text-center px-6 py-3 text-xs font-sans font-bold bg-[#E8500A] hover:bg-[#d44608] text-white rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calendar size={12} />
                Book Consultation
              </Link>
              <Link
                href="/#contact"
                className="w-full sm:w-auto text-center px-6 py-3 text-xs font-sans font-bold border border-border text-foreground/75 hover:text-foreground rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send size={12} />
                Send Inquiry
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
