import { motion, useInView } from 'motion/react'
import { useRef } from 'react'
import { reveal } from './motion'

export function SectionShell({ id, eyebrow, title, description, children, className = '' }) {
  const ref = useRef(null)
  // Reveal once the section has enough presence in the viewport to keep the scroll rhythm calm.
  const inView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section id={id} ref={ref} className={`relative py-24 sm:py-32 ${className}`}>
      <motion.div
        className="mx-auto flex w-full max-w-6xl flex-col gap-14 px-6 sm:px-10"
        variants={reveal}
        initial="hidden"
        animate={inView ? 'visible' : 'hidden'}
      >
        <div className="max-w-3xl space-y-5">
          <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-xs uppercase tracking-[0.3em] text-white/55 backdrop-blur-xl">
            {eyebrow}
          </span>
          <div className="space-y-4">
            <h2 className="max-w-2xl text-3xl font-semibold tracking-[-0.04em] text-white sm:text-5xl">
              {title}
            </h2>
            <p className="max-w-2xl text-base leading-8 text-white/62 sm:text-lg">{description}</p>
          </div>
        </div>
        {children}
      </motion.div>
    </section>
  )
}
