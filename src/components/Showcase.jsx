import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { showcaseItems } from '../data'
import { SectionShell } from './SectionShell'
import { reveal, staggerParent } from './motion'

export function Showcase() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })

  return (
    <SectionShell
      id="showcase"
      eyebrow="Showcase"
      title="A gallery of atmospheric concepts, presented with depth and composure."
      description="Use these placeholder compositions as starting points for product reveals, premium campaigns, or editorial launches."
      className="pt-6"
    >
      <motion.div
        ref={ref}
        className="grid gap-6"
        variants={staggerParent}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {showcaseItems.map((item, index) => (
          <motion.article
            key={item.title}
            variants={reveal}
            className="panel grid gap-6 overflow-hidden p-5 sm:p-6 lg:grid-cols-[1.15fr_0.85fr]"
          >
            <div className="placeholder-visual min-h-[320px]">
              <div className="placeholder-badge">Dummy visual 0{index + 1}</div>
            </div>
            <div className="flex flex-col justify-between gap-8 py-1">
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-[0.26em] text-white/35">{item.category}</span>
                <h3 className="text-3xl font-medium tracking-[-0.04em] text-white">{item.title}</h3>
                <p className="max-w-lg text-base leading-8 text-white/58">{item.description}</p>
              </div>
              <div className="flex flex-wrap gap-3">
                {['Composure', 'Depth', 'Narrative'].map((tag) => (
                  <span
                    key={`${item.title}-${tag}`}
                    className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-white/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  )
}
