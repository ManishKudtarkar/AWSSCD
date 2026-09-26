import { motion } from 'framer-motion'
import { EVENT } from '../../data/content'

export default function FinalCTA() {
  return (
    <section id="register" className="relative overflow-hidden bg-ink text-paper-light">
      <div className="bg-paper-grain absolute inset-0 opacity-20" />
      <div className="container-news relative section-pad text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="font-headline text-xs uppercase tracking-[0.35em] text-aws-orange"
        >
          The Final Word
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto mt-4 max-w-4xl font-display text-5xl font-black leading-[0.95] tracking-tight sm:text-6xl md:text-7xl"
        >
          BUILD. CONNECT. GROW.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-5 max-w-xl font-body text-lg italic text-paper-dark"
        >
          {EVENT.dateLong} · {EVENT.location}. Seats are limited — the first
          edition only prints once.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-9"
        >
          <a
            href="#top"
            className="inline-flex items-center gap-3 border-2 border-paper-light bg-aws-orange px-10 py-4 font-headline text-base uppercase tracking-[0.2em] text-ink transition-all duration-200 hover:-translate-y-1 hover:bg-paper-light hover:shadow-[6px_6px_0_0_#ff9900]"
          >
            Register For Community Day →
          </a>
        </motion.div>

        <div className="mx-auto mt-12 h-px w-40 bg-paper-light/30" />
        <p className="mt-6 font-type text-xs uppercase tracking-[0.3em] text-paper-dark">
          — 30 —
        </p>
      </div>
    </section>
  )
}
