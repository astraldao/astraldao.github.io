import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { features } from '../data'
import { SectionShell } from './SectionShell'
import { reveal, staggerParent } from './motion'

export function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.15 })

  return (
    <SectionShell
      id="features"
      eyebrow="Features"
      title="Every component is tuned for visual restraint and precise timing."
      description="The interface favors breathing room, tactile layering, and subtle transitions that reinforce structure instead of distracting from it."
    >
      <motion.div
        ref={ref}
        className="grid gap-5 lg:grid-cols-3"
        variants={staggerParent}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        {features.map((feature, index) => (
          <motion.article
            key={feature.title}
            variants={reveal}
            className="panel group relative min-h-72 overflow-hidden p-7"
            whileHover={{ y: -6 }}
            transition={{ duration: 0.35 }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_55%)] opacity-0 transition duration-500 group-hover:opacity-100" />
            <div className="relative flex h-full flex-col justify-between gap-10">
              <span className="text-sm text-white/35">0{index + 1}</span>
              <div className="space-y-4">
                <h3 className="text-2xl font-medium tracking-[-0.04em] text-white">{feature.title}</h3>
                <p className="max-w-sm text-sm leading-7 text-white/58">{feature.copy}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </SectionShell>
  )
}
