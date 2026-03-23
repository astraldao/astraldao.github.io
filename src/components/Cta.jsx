import { motion } from 'motion/react'
import { SectionShell } from './SectionShell'
import { reveal } from './motion'

export function Cta() {
  return (
    <SectionShell
      id="cta"
      eyebrow="Call to action"
      title="Launch a polished story that feels deliberate from the first frame."
      description="Swap the placeholders for your own copy, visuals, and deployment target—this structure is ready for refinement and release."
    >
      <motion.div variants={reveal} className="panel relative overflow-hidden p-8 sm:p-10">
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(255,255,255,0.08),transparent_45%,rgba(255,255,255,0.03))]" />
        <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <p className="text-sm uppercase tracking-[0.3em] text-white/38">Prepared for GitHub Pages</p>
            <p className="text-xl leading-9 text-white/76 sm:text-2xl">
              Built as a Vite-powered single page with reusable sections, Tailwind styling, Motion for React interactions, and a ready-to-use Pages workflow.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <a href="mailto:hello@example.com" className="button-primary">
              hello@example.com
            </a>
            <a href="#hero" className="button-secondary">
              Back to top
            </a>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  )
}
