'use client'

import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Users, Mail, Phone, Upload, CheckCircle, ArrowRight, ShieldCheck, Heart, Sparkles, AlertCircle } from 'lucide-react'

const skillCategories = [
  "AI & Automation",
  "Software Engineering",
  "Cloud & DevOps",
  "Cybersecurity",
  "Data & Analytics",
  "UI/UX Design",
  "Branding & Creative",
  "Digital Marketing",
  "E-commerce Solutions",
  "Business Consulting",
  "Financial Strategy",
  "Education & Training",
  "Healthcare Tech",
  "Renewable Energy",
  "Construction & Renovation",
  "Travel Tech",
  "Team Augmentation",
  "Customer Support",
  "Partnerships & Alliances",
  "Research & Innovation"
]

export default function JoinCommunityPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    customSkills: '',
    coverLetter: ''
  })
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const formRef = useRef<HTMLDivElement>(null)

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev =>
      prev.includes(skill)
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  // Drag and drop handlers
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const selectedFile = e.dataTransfer.files[0]
      if (selectedFile.size > 5 * 1024 * 1024) {
        setSubmitError("File size exceeds 5MB limit.")
        return
      }
      setFile(selectedFile)
      setSubmitError(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      if (selectedFile.size > 5 * 1024 * 1024) {
        setSubmitError("File size exceeds 5MB limit.")
        return
      }
      setFile(selectedFile)
      setSubmitError(null)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitError(null)

    if (selectedSkills.length === 0 && !formData.customSkills.trim()) {
      setSubmitError("Please select at least one skill category or specify your skills.")
      setIsSubmitting(false)
      return
    }

    try {
      const data = new FormData()
      data.append('name', formData.name)
      data.append('email', formData.email)
      data.append('phone', formData.phone)
      data.append('skills', [...selectedSkills, ...(formData.customSkills ? [formData.customSkills] : [])].join(', '))
      data.append('coverLetter', formData.coverLetter)
      if (file) {
        data.append('resume', file)
      }

      const response = await fetch('/api/join', {
        method: 'POST',
        body: data,
      })

      const resData = await response.json()

      if (response.ok && resData.success) {
        setSubmitted(true)
      } else {
        setSubmitError(resData.message || "Failed to submit application.")
      }
    } catch (err) {
      setSubmitError("A connection error occurred. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-background min-h-screen pb-24">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E8500A]/3 rounded-full blur-[120px]" />
          <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-sky-500/2 rounded-full blur-[100px]" />
        </div>
        <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center space-y-6">
          <span className="text-[#E8500A] text-xs font-mono font-bold tracking-[0.25em] uppercase">
            JOIN OUR MULTI-DISCIPLINARY COMMUNITY
          </span>
          <h1 className="font-heading font-black text-4xl md:text-6xl text-foreground leading-[1.05] tracking-tight">
            Work with speed, precision, <br />
            and <span className="text-[#E8500A]">Sovereign Excellence.</span>
          </h1>
          <p className="max-w-2xl mx-auto text-foreground/60 text-sm md:text-base font-sans font-light leading-relaxed">
            Alpha Elefant operates across active verticals spanning technology development, energy, construction, marketing, and corporate consulting. Join our network of experts to collaborate, grow, and deliver high-impact results globally.
          </p>
        </div>
      </section>

      {/* Community Values */}
      <section className="max-w-6xl mx-auto px-6 mb-20">
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: ShieldCheck,
              title: 'Sovereign Standards',
              desc: 'Whether building AI diagnostics, structuring financial risk audits, or laying office bricks, we run at international compliant standards.'
            },
            {
              icon: Heart,
              title: 'Multi-Vertical Synergy',
              desc: 'Cross-collaborate between engineers, designers, financial experts, and marketing leads under a single collaborative umbrella.'
            },
            {
              icon: Sparkles,
              title: 'Accelerated Innovation',
              desc: 'We incubation-test Proof of Concepts and deploy scalable, secure SaaS solutions for regulated markets.'
            }
          ].map((val, idx) => (
            <div key={idx} className="p-8 rounded-2xl border border-border bg-card/20 backdrop-blur-sm relative group hover:border-[#E8500A]/30 hover:bg-card/50 transition-all duration-300">
              <div className="w-10 h-10 rounded-lg bg-[#E8500A]/10 text-[#E8500A] flex items-center justify-center mb-6">
                <val.icon size={18} />
              </div>
              <h3 className="font-heading font-bold text-lg text-foreground mb-2 group-hover:text-primary transition-colors">
                {val.title}
              </h3>
              <p className="text-foreground/50 text-xs md:text-sm leading-relaxed">
                {val.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Main Join Form Container */}
      <section id="application-form" ref={formRef} className="max-w-3xl mx-auto px-6">
        <div className="p-8 md:p-12 rounded-3xl border border-border bg-card/30 backdrop-blur-sm shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/3 rounded-full blur-3xl pointer-events-none" />

          {/* Closed Status Banner */}
          <div className="mb-8 p-6 rounded-2xl border border-amber-500/30 bg-amber-500/5 flex items-start gap-4">
            <AlertCircle size={24} className="text-amber-500 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <h4 className="font-heading font-bold text-lg text-amber-600 mb-1">
                Job Openings Currently Closed
              </h4>
              <p className="text-foreground/60 text-sm leading-relaxed">
                We're not actively hiring at the moment, but we're building an exciting pipeline! Job openings will be announced soon. Check back regularly for new opportunities to join the Alpha Elefant team.
              </p>
            </div>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="join-form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-8"
              >
                <div className="text-center space-y-2">
                  <Users size={32} className="text-primary mx-auto mb-2" />
                  <h3 className="font-heading font-extrabold text-2xl text-foreground tracking-tight">
                    Submit Community Application
                  </h3>
                  <p className="text-foreground/50 text-xs md:text-sm max-w-md mx-auto">
                    Fill out your profile details. Our talent coordination team reviews submissions daily to connect you with our active verticals.
                  </p>
                </div>

                {submitError && (
                  <div className="p-4 rounded-xl border border-red-500/20 bg-red-500/5 text-red-500 text-xs flex items-center gap-2.5">
                    <AlertCircle size={16} />
                    <span>{submitError}</span>
                  </div>
                )}

                {/* Personal Information */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-mono text-primary tracking-wider uppercase font-bold border-b border-border pb-1">
                    Personal Details
                  </h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-foreground/50 tracking-wider uppercase font-bold">Full Name *</label>
                      <input
                        required
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-xs focus:border-primary/50 focus:outline-none transition-all focus:bg-background"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-mono text-foreground/50 tracking-wider uppercase font-bold">Email Address *</label>
                      <input
                        required
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-xs focus:border-primary/50 focus:outline-none transition-all focus:bg-background"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-mono text-foreground/50 tracking-wider uppercase font-bold">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="+92 300 1234567"
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-sm focus:border-primary/50 focus:outline-none transition-all focus:bg-background"
                    />
                  </div>
                </div>

                {/* Skills Section */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-mono text-primary tracking-wider uppercase font-bold border-b border-border pb-1">
                    Skills & Areas of Expertise
                  </h4>
                  <p className="text-foreground/45 text-sm leading-relaxed">
                    Select the key operational disciplines you specialize in (select all that apply):
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {skillCategories.map((skill) => {
                      const isSelected = selectedSkills.includes(skill)
                      return (
                        <button
                          key={skill}
                          type="button"
                          onClick={() => toggleSkill(skill)}
                          className={`px-3 py-2 rounded-xl text-sm font-medium border transition-all duration-150 cursor-pointer ${
                            isSelected
                              ? 'bg-primary text-white border-primary shadow-[0_0_12px_rgba(232,80,10,0.25)]'
                              : 'bg-background/40 text-foreground/60 border-border hover:border-foreground/25 hover:text-foreground'
                          }`}
                        >
                          {skill}
                        </button>
                      )
                    })}
                  </div>

                  <div className="space-y-2 pt-2">
                    <label className="text-[10px] font-mono text-foreground/50 tracking-wider uppercase font-bold">Custom/Other Skills (Optional)</label>
                    <input
                      type="text"
                      name="customSkills"
                      value={formData.customSkills}
                      onChange={handleInputChange}
                      placeholder="e.g. Flutter Development, Quantum Computing, etc."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-sm focus:border-primary/50 focus:outline-none transition-all focus:bg-background"
                    />
                  </div>
                </div>

                {/* Cover Letter */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-mono text-primary tracking-wider uppercase font-bold border-b border-border pb-1">
                    Cover Letter & Background
                  </h4>
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-foreground/50 tracking-wider uppercase font-bold">Introduce Yourself *</label>
                    <textarea
                      required
                      rows={5}
                      name="coverLetter"
                      value={formData.coverLetter}
                      onChange={handleInputChange}
                      placeholder="Tell us about your technical projects, consulting experience, or academic background and why you want to collaborate with Alpha Elefant..."
                      className="w-full px-4 py-3 rounded-xl border border-border bg-background/50 text-foreground text-sm focus:border-primary/50 focus:outline-none transition-all resize-none focus:bg-background"
                    />
                  </div>
                </div>

                {/* Resume upload component */}
                <div className="space-y-4">
                  <h4 className="text-[11px] font-mono text-primary tracking-wider uppercase font-bold border-b border-border pb-1">
                    Attachments
                  </h4>
                  <div className="space-y-2">
                    <label className="text-sm font-mono text-foreground/50 tracking-wider uppercase font-bold">Resume / CV (Optional - PDF or DOC, Max 5MB)</label>
                    <div
                      onDragEnter={handleDrag}
                      onDragOver={handleDrag}
                      onDragLeave={handleDrag}
                      onDrop={handleDrop}
                      className={`w-full p-8 border-2 border-dashed rounded-xl bg-background/30 flex flex-col items-center justify-center text-center transition-all ${
                        dragActive ? 'border-primary bg-primary/5' : 'border-border'
                      } ${file ? 'border-green-500 bg-green-500/5' : ''}`}
                    >
                      <input
                        type="file"
                        id="resume-upload"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer flex flex-col items-center justify-center w-full">
                        <Upload className={`w-8 h-8 mb-2 transition-colors ${file ? 'text-green-500' : 'text-foreground/40 hover:text-primary'}`} />
                        <span className="text-sm font-bold text-foreground">
                          {file ? file.name : 'Drag & drop file here or click to browse'}
                        </span>
                        <span className="text-sm text-foreground/45 mt-1 font-mono">
                          Supports PDF, DOC, DOCX up to 5MB
                        </span>
                      </label>
                    </div>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 bg-primary hover:bg-[#d44608] disabled:bg-primary/50 text-white rounded-xl text-xs font-sans font-bold flex items-center justify-center gap-2 cursor-pointer transition-all hover:shadow-[0_0_24px_rgba(232,80,10,0.4)]"
                >
                  {isSubmitting ? (
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      Submit Application <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </motion.form>
            ) : (
              <motion.div
                key="success-card"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 space-y-4"
              >
                <CheckCircle size={64} className="text-green-500 mx-auto" />
                <h3 className="font-heading font-extrabold text-2xl text-foreground tracking-tight">
                  Application Logged!
                </h3>
                <p className="text-foreground/50 text-sm max-w-sm mx-auto leading-relaxed">
                  Thank you for applying to join the Alpha Elefant community, <strong>{formData.name}</strong>. A copy of your details (skills: {selectedSkills.join(', ') || 'Custom'}) has been queued for email delivery to <strong>join@alphaelephant.com</strong>.
                </p>
                <div className="pt-4">
                  <button
                    onClick={() => {
                      setSubmitted(false)
                      setFormData({ name: '', email: '', phone: '', customSkills: '', coverLetter: '' })
                      setSelectedSkills([])
                      setFile(null)
                    }}
                    className="px-6 py-3 text-xs font-sans font-bold border border-border text-foreground hover:border-primary rounded-xl cursor-pointer transition-all"
                  >
                    Submit Another Application
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  )
}
