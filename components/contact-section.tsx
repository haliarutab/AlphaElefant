'use client'

import React, { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { AlertCircle, Calendar, MapPin, Mail, Send, CheckCircle, Globe } from 'lucide-react'
import { useSearchParams } from 'next/navigation'
import Magnetic from './magnetic'
import { verticalsData } from '@/lib/data/verticals'
import { countryCodes } from '@/lib/data/country-codes'

const contactMethods = [
  {
    icon: Calendar,
    title: 'Tell Us About Your Project',
    description: 'Complete the contact form with your goals, challenges, or ideas and we’ll follow up with the best next steps.',
    type: 'project',
    accent: true,
  },
]

const details = [
  { icon: MapPin, label: 'Headquarters', value: 'Pakistan (with Global Outreach)' },
  { icon: Mail, label: 'Email', value: 'hello@alphaelephant.com' },
  { icon: Globe, label: 'Markets', value: 'PK · UAE · UK · USA · GCC · SE Asia' },
]

const initialFormState = {
  name: '',
  email: '',
  countryCode: '+92',
  phone: '',
  company: '',
  inquiryType: '',
  message: '',
  offering: '',
  verticalName: '',
  subcategoryName: '',
  status: 'new',
}

export default function ContactSection() {
  const searchParams = useSearchParams()
  const [formData, setFormData] = useState(initialFormState)
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const ref = useRef(null)
  const formRef = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const isEducationContext = searchParams.get('context') === 'education'

  const educationOfferings = React.useMemo(() => {
    const educationVertical = verticalsData.find((vertical) => vertical.slug === 'education-training')
    return educationVertical?.subcategories.flatMap((sub) => sub.offerings) ?? []
  }, [])

  useEffect(() => {
    const context = searchParams.get('context')
    const vertical = searchParams.get('vertical') || ''
    const subcategory = searchParams.get('subcategory') || ''

    setFormData((prev) => ({
      ...prev,
      inquiryType: context === 'education' ? 'course' : prev.inquiryType,
      verticalName: vertical,
      subcategoryName: subcategory,
    }))
  }, [searchParams])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      ...initialFormState,
      inquiryType: isEducationContext ? 'course' : '',
      countryCode: '+92',
      verticalName: searchParams.get('vertical') || '',
      subcategoryName: searchParams.get('subcategory') || '',
    })
  }

  const formatApiError = (result: any) => {
    const backendMessage = result?.message || 'Unable to submit your request right now.'
    const backendErrors = result?.errors
    if (!backendErrors) return backendMessage

    const errorDetails = Array.isArray(backendErrors)
      ? backendErrors
          .map((item) => (typeof item === 'string' ? item : item?.message || JSON.stringify(item)))
          .filter(Boolean)
          .join(' | ')
      : typeof backendErrors === 'string'
      ? backendErrors
      : JSON.stringify(backendErrors)

    return errorDetails ? `${backendMessage} ${errorDetails}` : backendMessage
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSubmitError(null)

    if (isEducationContext && !formData.offering) {
      setSubmitError('Please choose an offering before submitting.')
      return
    }

    if (!isEducationContext && !formData.inquiryType) {
      setSubmitError('Please choose an inquiry type before submitting.')
      return
    }

    if (!isEducationContext && formData.inquiryType === 'partnership' && !formData.company.trim()) {
      setSubmitError('Please enter your company name before submitting.')
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`.trim(),
        company: formData.company,
        description: formData.message,
        message: formData.message,
        offering: formData.offering,
        inquiryType: isEducationContext ? 'course' : formData.inquiryType || 'inquiry',
        status: 'new',
        verticalName: formData.verticalName || searchParams.get('vertical') || 'General inquiry',
        subcategoryName: formData.subcategoryName || searchParams.get('subcategory') || '',
      }

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })

      const result = await response.json()
      

      if (!response.ok || result?.success === false) {
        throw new Error(formatApiError(result))
      }

      setSubmitted(true)
      resetForm()
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Unable to submit your request right now.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleFormMouseMove = (e: React.MouseEvent) => {
    if (!formRef.current) return
    const rect = formRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    formRef.current.style.setProperty('--mouse-x', `${x}px`)
    formRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <section id="contact" className="relative py-32 bg-background overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-[#E8500A]/3 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-[#E8500A]/2 rounded-full blur-[100px] dark:bg-secondary/60" />
      </div>
      <div className="absolute inset-0 grid-bg opacity-10 dark:opacity-20 pointer-events-none" />

      <div ref={ref} className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="text-[#E8500A] text-xs font-semibold tracking-[0.25em] uppercase">
              Connect With Us
            </span>
            <div className="h-px flex-1 max-w-[120px] bg-gradient-to-r from-[#E8500A]/60 to-transparent" />
          </div>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <p className="text-[#E8500A] text-xs font-semibold tracking-[0.25em] uppercase mb-3">
                Contact
              </p>
              <h2 className="font-heading font-black text-[clamp(2.4rem,5.5vw,4.5rem)] text-foreground leading-[1.05] tracking-[-0.025em] text-balance">
                Get in touch
              </h2>
            </div>
            <p className="max-w-sm text-foreground/55 text-base leading-relaxed">
              Tell us about your challenge or opportunity, and we’ll connect you with the right team and next steps.
            </p>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* Left column */}
          <div className="space-y-6">
            {/* Contact method card */}
            {contactMethods.map((method, i) => (
              <motion.div
                key={method.type}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 + i * 0.15 }}
                onClick={() => {
                  setFormData((prev) => ({ ...prev, inquiryType: isEducationContext ? 'course' : 'inquiry' }))
                }}
                className={`relative rounded-2xl p-7 overflow-hidden group cursor-pointer transition-all duration-300 ${method.accent
                  ? 'bg-[#E8500A] hover:bg-[#E8500A]/90 hover:shadow-[0_20px_50px_rgba(232,80,10,0.3)]'
                  : 'border border-border bg-card/45 hover:border-primary/30 hover:bg-card/75'
                  }`}
              >
                {!method.accent && (
                  <div className="absolute inset-0 bg-gradient-to-br from-[#E8500A]/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                )}
                <div className="relative z-10 flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${method.accent ? 'bg-white/20' : 'bg-[#E8500A]/15'
                    }`}>
                    <method.icon className={method.accent ? 'text-white' : 'text-[#E8500A]'} size={22} />
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-heading font-bold text-lg mb-2 ${method.accent ? 'text-white' : 'text-foreground'}`}>
                      {method.title}
                    </h3>
                    <p className={`text-sm leading-relaxed mb-4 ${method.accent ? 'text-white/80' : 'text-foreground/55'}`}>
                      {method.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="rounded-2xl border border-border bg-card/45 p-7"
            >
              <h3 className="font-heading font-bold text-lg text-foreground mb-3">Contact Us</h3>
              <p className="text-sm leading-relaxed text-foreground/55">
                Reach out through the form and we’ll follow up with a tailored response shortly.
              </p>
            </motion.div>

            {/* Contact details */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="rounded-2xl border border-border bg-card/40 p-7"
            >
              <div className="space-y-4">
                {details.map((d) => (
                  <div key={d.label} className="flex items-center gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[#E8500A]/10 flex items-center justify-center flex-shrink-0">
                      <d.icon className="text-[#E8500A]" size={15} />
                    </div>
                    <div>
                      <div className="text-foreground/40 text-xs uppercase tracking-wide">{d.label}</div>
                      <div className="text-foreground/80 text-sm font-medium">{d.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right column — form */}
          <motion.div
            ref={formRef}
            onMouseMove={handleFormMouseMove}
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="rounded-2xl border border-primary/15 bg-card/50 backdrop-blur-sm p-8 relative overflow-hidden group/form"
          >
            {/* Dynamic spotlight gradient */}
            <div
              className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover/form:opacity-100 transition-opacity duration-300 z-0"
              style={{
                background: `radial-gradient(400px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(232, 80, 10, 0.08), transparent 80%)`,
              }}
            />
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#E8500A]/60 to-transparent z-10" />

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex flex-col items-center justify-center text-center py-16 z-10 relative"
              >
                <div className="w-16 h-16 rounded-full bg-[#E8500A]/15 flex items-center justify-center mb-5">
                  <CheckCircle className="text-[#E8500A]" size={30} />
                </div>
                <h3 className="font-heading font-bold text-2xl text-foreground mb-3">Message Sent!</h3>
                <p className="text-foreground/55 text-base">
                  Thank you for reaching out. We&apos;ll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[#E8500A] text-sm font-medium hover:underline cursor-pointer"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <div className="relative z-10">
                <h3 className="font-heading font-bold text-xl text-foreground mb-1">Start the conversation</h3>
                <p className="text-foreground/40 text-sm mb-7">Fill in the form below so we can match your project with the right expertise and next steps.</p>

                <div className="mb-4 inline-flex items-center rounded-full border border-[#E8500A]/20 bg-[#E8500A]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8500A]">
                  Status: New
                </div>

                {!isEducationContext ? (
                  <div className="space-y-4 mb-6">
                    <div className="text-sm font-heading font-bold text-foreground/50 mb-3">
                      Inquiry Type
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {[
                        { label: 'Inquiry', value: 'inquiry' },
                        { label: 'Call', value: 'call' },
                        { label: 'Partnership', value: 'partnership' },
                      ].map((option) => (
                        <button
                          key={option.value}
                          type="button"
                          onClick={() => setFormData((prev) => ({ ...prev, inquiryType: option.value }))}
                          className={`w-full py-3 rounded-2xl border transition-all duration-200 text-sm font-semibold ${formData.inquiryType === option.value
                            ? 'bg-[#E8500A] text-white border-[#E8500A]'
                            : 'bg-card/50 text-foreground border-border hover:border-[#E8500A]/60 hover:text-foreground'
                            }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="mb-6 rounded-2xl border border-[#E8500A]/20 bg-[#E8500A]/10 px-4 py-3 text-sm text-[#E8500A]">
                    This request will be logged as a course inquiry.
                  </div>
                )}

                {submitError && (
                  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-sm flex items-center gap-2.5">
                    <AlertCircle size={16} />
                    <span>{submitError}</span>
                  </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-foreground/60 text-sm font-medium mb-1">
                        Full Name *
                      </label>
                      <input
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your name"
                        className="w-full bg-secondary/25 border border-border focus:border-[#E8500A]/50 rounded-2xl px-4 py-3 text-foreground text-sm placeholder:text-foreground/25 outline-none transition-colors duration-200 focus:bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-foreground/60 text-sm font-medium mb-1">
                        Email *
                      </label>
                      <input
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@company.com"
                        className="w-full bg-secondary/25 border border-border focus:border-[#E8500A]/50 rounded-2xl px-4 py-3 text-foreground text-sm placeholder:text-foreground/25 outline-none transition-colors duration-200 focus:bg-background"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <label className="block text-foreground/60 text-sm font-medium mb-1">
                          Phone no *
                        </label>
                        <div className="grid grid-cols-[120px_1fr] gap-3">
                          <select
                            name="countryCode"
                            required
                            value={formData.countryCode}
                            onChange={handleInputChange}
                            className="w-full bg-secondary/25 border border-border focus:border-[#E8500A]/50 rounded-2xl px-4 py-3 text-foreground text-sm outline-none transition-colors duration-200 focus:bg-background"
                          >
                            {countryCodes.map((option) => (
                              <option key={option.code} value={option.code}>
                                {option.code}
                              </option>
                            ))}
                          </select>
                          <input
                            name="phone"
                            type="tel"
                            required
                            value={formData.phone}
                            onChange={handleInputChange}
                            placeholder="300 1234567"
                            className="w-full bg-secondary/25 border border-border focus:border-[#E8500A]/50 rounded-2xl px-4 py-3 text-foreground text-sm placeholder:text-foreground/25 outline-none transition-colors duration-200 focus:bg-background"
                          />
                        </div>
                      </div>
                    {isEducationContext ? (
                      <div className="space-y-2">
                        <label className="block text-foreground/60 text-sm font-medium mb-1">
                          Offering *
                        </label>
                        <select
                          name="offering"
                          required
                          value={formData.offering}
                          onChange={handleInputChange}
                          className="w-full bg-secondary/25 border border-border focus:border-[#E8500A]/50 rounded-2xl px-4 py-3 text-foreground text-sm outline-none transition-colors duration-200 focus:bg-background"
                        >
                          <option value="">Select an offering</option>
                          {educationOfferings.map((offering) => (
                            <option key={offering} value={offering}>
                              {offering}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div className="space-y-2">
                        <label className="block text-foreground/60 text-sm font-medium mb-1">
                          Vertical
                        </label>
                        <input
                          name="verticalName"
                          type="text"
                          readOnly
                          value={formData.verticalName || 'General inquiry'}
                          className="w-full bg-secondary/25 border border-border rounded-2xl px-4 py-3 text-foreground text-sm outline-none"
                        />
                      </div>
                    )}
                  </div>

                  {formData.inquiryType === 'partnership' && (
                    <div className="space-y-2">
                      <label className="block text-foreground/60 text-sm font-medium mb-1">
                        Company Name *
                      </label>
                      <input
                        name="company"
                        type="text"
                        required
                        value={formData.company}
                        onChange={handleInputChange}
                        placeholder="Your company name"
                        className="w-full bg-secondary/25 border border-border focus:border-[#E8500A]/50 rounded-2xl px-4 py-3 text-foreground text-sm placeholder:text-foreground/25 outline-none transition-colors duration-200 focus:bg-background"
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <label className="block text-foreground/60 text-sm font-medium mb-1">
                      {isEducationContext ? 'Description *' : 'Message *'}
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder={isEducationContext ? 'Tell us more about the course you are interested in...' : 'Tell us how we can help...'}
                      className="w-full bg-secondary/25 border border-border focus:border-[#E8500A]/50 rounded-2xl px-4 py-3 text-foreground text-sm placeholder:text-foreground/25 outline-none transition-colors duration-200 resize-none focus:bg-background"
                    />
                  </div>

                  {!isEducationContext && (
                    <div className="space-y-2">
                      <label className="block text-foreground/60 text-sm font-medium mb-1">
                        Vertical name
                      </label>
                      <input
                        name="verticalName"
                        type="text"
                        readOnly
                        value={formData.verticalName || 'General inquiry'}
                        className="w-full bg-secondary/25 border border-border rounded-2xl px-4 py-3 text-foreground text-sm outline-none"
                      />
                    </div>
                  )}

                  <Magnetic>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full py-4 px-9 bg-[#E8500A] hover:bg-[#d44608] text-white font-sans font-semibold rounded-full transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-70 text-sm tracking-wide hover:shadow-[0_0_30px_rgba(232,80,10,0.4)] cursor-pointer"
                    >
                      {submitting ? (
                        <>
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
                            className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                          />
                          Sending...
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          Send Message
                        </>
                      )}
                    </button>
                  </Magnetic>
                </form>
              </div>
            )}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
