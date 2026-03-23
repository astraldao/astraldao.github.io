import { motion } from 'motion/react'
import { stats } from '../data'
import { ease, staggerParent, reveal } from './motion'

export function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden px-6 pb-16 pt-32 sm:px-10 sm:pt-36 lg:pt-40">
      <div className="hero-orb hero-orb-left" />
      <div className="hero-orb hero-orb-right" />
      <motion.div
        className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-end"
        variants={staggerParent}
        initial="hidden"
        animate="visible"
      >
        <div className="space-y-8">
          <motion.span
            variants={reveal}
            className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-4 py-1 text-xs uppercase tracking-[0.32em] text-white/55 backdrop-blur-2xl"
          >
            Quiet futurism for GitHub Pages
          </motion.span>
          <motion.div variants={reveal} className="space-y-6">
            <h1 className="max-w-4xl text-5xl font-semibold tracking-[-0.06em] text-white sm:text-6xl lg:text-7xl">
              Motion-led surfaces with calm gravity and lasting elegance.
            </h1>
            <p className="max-w-2xl text-base leading-8 text-white/64 sm:text-lg">
              Crafted as a single-page experience, this landing page layers refined typography,
              understated depth, and measured animation to guide attention without visual noise.
            </p>
          </motion.div>
          <motion.div variants={reveal} className="flex flex-col gap-4 sm:flex-row">
            <a href="#showcase" className="button-primary">
              Explore the composition
            </a>
            <a href="#features" className="button-secondary">
              Study the rhythm
            </a>
          </motion.div>
          <motion.dl
            variants={staggerParent}
            className="grid gap-4 pt-8 sm:grid-cols-3"
          >
            {stats.map((item) => (
              <motion.div key={item.value} variants={reveal} className="panel space-y-3 p-5">
                <dt className="text-2xl font-semibold tracking-[-0.04em] text-white">{item.value}</dt>
                <dd className="text-sm leading-6 text-white/55">{item.label}</dd>
              </motion.div>
            ))}
          </motion.dl>
        </div>

        <motion.div variants={reveal} className="relative lg:justify-self-end">
          <div className="panel relative overflow-hidden p-4 sm:p-5">
            <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
            {/* Slow vertical drift keeps the hero alive without pulling focus from the headline. */}
            <motion.div
              className="showcase-frame"
              animate={{ y: [0, -12, 0] }}
              transition={{ duration: 10, ease, repeat: Infinity }}
            >
              <div className="showcase-grid" />
              <div className="showcase-gradient" />
              <div className="relative z-10 flex h-full flex-col justify-between p-7 sm:p-8">
                <div className="flex items-center justify-between text-xs uppercase tracking-[0.24em] text-white/45">
                  <span>Preview panel</span>
                  <span>Dummy image</span>
                </div>
                <div className="space-y-4">
                  <div className="h-40 rounded-[1.75rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm" />
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="h-24 rounded-[1.5rem] border border-white/10 bg-black/20" />
                    <div className="h-24 rounded-[1.5rem] border border-white/10 bg-black/20" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
