'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Check, ChevronDown, Search, X } from 'lucide-react'

interface MultiSelectProps {
  options: string[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  color?: string
}

export default function MultiSelect({
  options,
  selectedValues,
  onChange,
  placeholder = 'Select options',
  color = '#E8500A',
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  const handleToggleOption = (option: string) => {
    const isSelected = selectedValues.includes(option)
    if (isSelected) {
      onChange([])
    } else {
      onChange([option])
      setIsOpen(false)
    }
  }

  const handleRemoveValue = (e: React.MouseEvent, option: string) => {
    e.stopPropagation()
    onChange(selectedValues.filter((val) => val !== option))
  }

  const getCleanLabel = (option: string) => {
    return option.replace(/^(Subcategory|Offering): /, '')
  }

  // Filter options based on search query
  const filteredOptions = options.filter((option) =>
    getCleanLabel(option).toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div ref={containerRef} className="relative w-full">
      {/* Trigger Area */}
      <div
        onClick={() => setIsOpen(!isOpen)}
        className="flex min-h-[46px] w-full cursor-pointer items-center justify-between rounded-2xl border border-border bg-background/70 px-4 py-2.5 text-sm transition focus-within:border-primary/50 hover:border-foreground/20"
      >
        <div className="flex flex-wrap gap-1.5 max-w-[92%]">
          {selectedValues.length === 0 ? (
            <span className="text-foreground/40">{placeholder}</span>
          ) : (
            selectedValues.map((val) => (
              <div
                key={val}
                className="flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium text-white transition hover:opacity-90"
                style={{ backgroundColor: color }}
              >
                <span>{getCleanLabel(val)}</span>
                <button
                  type="button"
                  onClick={(e) => handleRemoveValue(e, val)}
                  className="rounded-full hover:bg-black/10 p-0.5 transition"
                >
                  <X size={10} />
                </button>
              </div>
            ))
          )}
        </div>
        <ChevronDown
          size={16}
          className={`text-foreground/45 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
        />
      </div>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-50 mt-2 w-full rounded-2xl border border-border bg-card shadow-xl backdrop-blur-md overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-2 border-b border-border/60 px-4 py-2">
            <Search size={14} className="text-foreground/40" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent py-1 text-sm text-foreground outline-none placeholder:text-foreground/35"
              onClick={(e) => e.stopPropagation()}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="text-foreground/40 hover:text-foreground"
              >
                <X size={14} />
              </button>
            )}
          </div>

          {/* Options List */}
          <div className="max-h-60 overflow-y-auto p-1.5 scrollbar-thin">
            {filteredOptions.length === 0 ? (
              <div className="px-4 py-3 text-center text-xs text-foreground/40">
                No options found.
              </div>
            ) : (
              filteredOptions.map((option) => {
                const isSubcategory = option.startsWith('Subcategory: ')
                const isOffering = option.startsWith('Offering: ')
                const isSelected = selectedValues.includes(option)
                
                return (
                  <div
                    key={option}
                    onClick={() => handleToggleOption(option)}
                    className={`flex items-center gap-2.5 rounded-xl px-3 py-2 text-xs cursor-pointer select-none transition-colors ${
                      isSelected 
                        ? 'bg-foreground/5 text-foreground' 
                        : 'hover:bg-foreground/5 text-foreground/80'
                    } ${isSubcategory ? 'font-semibold mt-1.5 border-t border-border/20 pt-2 first:mt-0 first:border-0 first:pt-2' : ''}`}
                  >
                    <div
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all ${
                        isSelected
                          ? 'border-transparent text-white'
                          : 'border-border bg-background'
                      }`}
                      style={isSelected ? { backgroundColor: color } : undefined}
                    >
                      {isSelected && <Check size={10} strokeWidth={3} />}
                    </div>
                    
                    <span className={isOffering ? 'pl-2 text-foreground/70' : ''}>
                      {getCleanLabel(option)}
                    </span>
                  </div>
                )
              })
            )}
          </div>
        </div>
      )}
    </div>
  )
}
