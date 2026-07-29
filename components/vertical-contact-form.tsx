'use client'

import React, { useState } from 'react'
import { AlertCircle, CheckCircle, Send } from 'lucide-react'
import MultiSelect from './ui/multi-select'
import { countryCodes } from '@/lib/data/country-codes'

interface VerticalContactFormProps {
  mode: 'education-subcategory' | 'vertical'
  verticalName: string
  subcategoryName?: string
  offerings?: string[]
  selectionOptions?: string[]
}

export default function VerticalContactForm({
  mode,
  verticalName,
  subcategoryName,
  offerings = [],
  selectionOptions = [],
}: VerticalContactFormProps) {
  const isEducation = mode === 'education-subcategory'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    countryCode: '+92',
    phone: '',
    description: '',
    message: '',
    offering: '',
    selectedInterest: '',
  })
  const [selectedInterests, setSelectedInterests] = useState<string[]>(() => {
    return selectionOptions.length === 1 ? [selectionOptions[0]] : []
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      countryCode: '+92',
      phone: '',
      description: '',
      message: '',
      offering: '',
      selectedInterest: '',
    })
    setSelectedInterests([])
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

    if (isEducation && !formData.offering) {
      setSubmitError('Please select an offering before submitting.')
      return
    }

    if (!isEducation && selectedInterests.length === 0) {
      setSubmitError('Please select a subcategory before submitting.')
      return
    }

    setSubmitting(true)

    try {
      const payload = {
        name: formData.name,
        email: formData.email,
        phone: `${formData.countryCode} ${formData.phone}`.trim(),
        description: formData.description || formData.message,
        message: formData.message,
        offering: formData.offering,
        selectedInterest: selectedInterests.join(', '),
        selectedInterests: selectedInterests,
        inquiryType: isEducation ? 'course' : 'inquiry',
        status: 'new',
        verticalName,
        subcategoryName: subcategoryName || '',
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

  if (submitted) {
    return (
      <div className="rounded-3xl border border-[#E8500A]/20 bg-gradient-to-br from-card/50 to-background/40 p-8 text-center shadow-[0_20px_80px_rgba(0,0,0,0.08)]">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E8500A]/10 text-[#E8500A]">
          <CheckCircle size={28} />
        </div>
        <h3 className="mt-5 font-heading text-2xl font-black text-foreground">Request received</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-foreground/60">
          Thanks for reaching out. We&apos;ve logged your request as a {isEducation ? 'course' : 'vertical'} inquiry and will follow up shortly.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => setSubmitted(false)}
            className="rounded-full border border-border px-5 py-2.5 text-sm font-semibold text-foreground transition hover:border-[#E8500A]/40 hover:text-[#E8500A]"
          >
            Submit another request
          </button>
          <a
            href={`/#contact?context=${isEducation ? 'education' : 'vertical'}&vertical=${encodeURIComponent(verticalName)}${subcategoryName ? `&subcategory=${encodeURIComponent(subcategoryName)}` : ''}`}
            className="rounded-full bg-[#E8500A] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#d44608]"
          >
            Continue via main contact form
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="rounded-3xl border border-border/70 bg-card/35 p-8 shadow-[0_20px_80px_rgba(0,0,0,0.06)] backdrop-blur-sm">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[10px] font-mono font-bold uppercase tracking-[0.35em] text-[#E8500A]">
            {isEducation ? 'Course inquiry' : 'Vertical inquiry'}
          </p>
          <h3 className="font-heading text-xl font-black text-foreground">
            {isEducation ? `Interest in ${subcategoryName || 'this course'}` : `Talk to us about ${verticalName}`}
          </h3>
        </div>
        <span className="inline-flex w-fit items-center rounded-full border border-[#E8500A]/20 bg-[#E8500A]/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-[#E8500A]">
          Status: New
        </span>
      </div>

      {submitError && (
        <div className="mb-5 flex items-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-500">
          <AlertCircle size={16} />
          <span>{submitError}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground/60">Name *</label>
            <input
              name="name"
              type="text"
              required
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#E8500A]/50"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground/60">Email *</label>
            <input
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleInputChange}
              className="w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#E8500A]/50"
              placeholder="you@company.com"
            />
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-foreground/60">Phone no *</label>
            <div className="grid grid-cols-[120px_1fr] gap-3">
              <select
                name="countryCode"
                required
                value={formData.countryCode}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#E8500A]/50"
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
                className="w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#E8500A]/50"
                placeholder="300 1234567"
              />
            </div>
          </div>
          {isEducation ? (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/60">Offering *</label>
              <select
                name="offering"
                required
                value={formData.offering}
                onChange={handleInputChange}
                className="w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#E8500A]/50"
              >
                <option value="">Select an offering</option>
                {offerings.map((offering) => (
                  <option key={offering} value={offering}>
                    {offering}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground/60">Select subcategory *</label>
              <MultiSelect
                options={selectionOptions.length > 0 ? selectionOptions : [verticalName]}
                selectedValues={selectedInterests}
                onChange={setSelectedInterests}
                placeholder="Select a subcategory..."
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-foreground/60">
            {isEducation ? 'Description *' : 'Message *'}
          </label>
          <textarea
            name={isEducation ? 'description' : 'message'}
            rows={5}
            required
            value={isEducation ? formData.description : formData.message}
            onChange={handleInputChange}
            className="w-full resize-none rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm text-foreground outline-none transition focus:border-[#E8500A]/50"
            placeholder={isEducation ? 'Tell us what you want to learn or explore.' : 'Tell us how we can help.'}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-[#E8500A] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#d44608] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submitting ? (
            <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
          ) : (
            <Send size={16} />
          )}
          {submitting ? 'Submitting...' : 'Send request'}
        </button>
      </form>
    </div>
  )
}
