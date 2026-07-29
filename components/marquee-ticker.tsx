'use client'

const items = [
  'Institutional Renovation',
  'Skill Development',
  'Tech Products',
  'International Services',
  'Strategic Alliances',
  'Fintech',
  'AI Training',
  'Web3 & Blockchain',
  'KYC Solutions',
  'Cybersecurity',
  'Digital Transformation',
  'Pakistan & Beyond',
]

export default function MarqueeTicker() {
  const doubled = [...items, ...items]

  return (
    <div className="relative py-4 bg-[#E8500A] overflow-hidden">
      <div className="animate-marquee">
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-5 px-5">
            <span className="text-white text-[11px] font-sans font-semibold tracking-[0.18em] whitespace-nowrap uppercase">
              {item}
            </span>
            <span className="text-white/50 text-[8px]">◆</span>
          </span>
        ))}
      </div>
    </div>
  )
}
