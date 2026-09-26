import { motion } from 'framer-motion'
import { EVENT } from '../../data/content'

const fade = {
  hidden: { opacity: 0, y: 20 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] },
  }),
}

export default function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-24 md:pt-28">
      <div className="container-news px-5 pb-10 sm:px-8 md:px-12">
        <div className="rule-double" />

        {/* Organizer folio — small nameplate, not the star */}
        <motion.div
          variants={fade}
          custom={1}
          initial="hidden"
          animate="show"
          className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1 py-2 font-headline text-[0.6rem] uppercase tracking-[0.28em] text-ink-faded md:text-xs"
        >
          <span>{EVENT.volume} · {EVENT.issue}</span>
          <span className="font-semibold text-ink">Presented by the AWS Student Builder Group</span>
          <span>{EVENT.date}</span>
        </motion.div>

        <div className="rule-double" />

        {/* Main event headline — the star of the page */}
        <div className="py-8 text-center md:py-12">
          <motion.p
            variants={fade}
            custom={2}
            initial="hidden"
            animate="show"
            className="font-headline text-sm uppercase tracking-[0.35em] text-ink-faded md:text-base"
          >
            The First Edition Presents
          </motion.p>

          <motion.h1
            variants={fade}
            custom={3}
            initial="hidden"
            animate="show"
            className="mt-3 font-display font-black leading-[0.88] tracking-tight text-[clamp(2.75rem,9vw,7rem)]"
          >
            AWS STUDENT
          </motion.h1>

          <motion.div
            variants={fade}
            custom={4}
            initial="hidden"
            animate="show"
            className="relative my-2 flex justify-center md:my-3"
          >
            <span className="-rotate-1 bg-aws-blue px-6 py-2 font-display font-black tracking-tight text-paper-light shadow-press text-[clamp(2.25rem,7.5vw,5.5rem)]">
              COMMUNITY DAY
            </span>
          </motion.div>

          <motion.h2
            variants={fade}
            custom={5}
            initial="hidden"
            animate="show"
            className="mt-4 font-display text-2xl font-bold tracking-[0.15em] sm:text-3xl md:text-4xl"
          >
            {EVENT.subtitle}
          </motion.h2>

          <motion.div
            variants={fade}
            custom={6}
            initial="hidden"
            animate="show"
            className="mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 font-headline text-sm uppercase tracking-wide md:text-base"
          >
            <span className="flex items-center gap-2">
              <CalIcon /> {EVENT.date}
            </span>
            <span className="hidden h-4 w-px bg-ink/40 sm:block" />
            <span className="flex items-center gap-2">
              <PinIcon /> {EVENT.location}
            </span>
          </motion.div>

          <motion.div
            variants={fade}
            custom={7}
            initial="hidden"
            animate="show"
            className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row"
          >
            <a href={EVENT.registerUrl} className="btn-press">
              Register Now →
            </a>
            <a href="#story" className="btn-ghost">
              Read The Story
            </a>
          </motion.div>
        </div>

        <div className="rule-double" />

        {/* Supporting front-page columns */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {/* Left rail pull quote */}
          <motion.aside
            variants={fade}
            custom={8}
            initial="hidden"
            animate="show"
          >
            <p className="label">A Bigger Community</p>
            <p className="mt-2 font-display text-2xl font-bold leading-tight">
              A Brighter Tomorrow
            </p>
            <div className="rule my-4" />
            <p className="font-body text-sm leading-relaxed text-ink-soft dropcap">
              AWS Student Builders across Parul University are coming together to
              learn, build and create real impact. Community Day brings students,
              ideas and innovation under one roof.
            </p>
            <p className="mt-4 font-headline text-sm font-semibold uppercase tracking-wide text-aws-smile">
              Same Community, Bigger Possibilities.
            </p>
          </motion.aside>

          {/* Right rail */}
          <motion.aside
            variants={fade}
            custom={9}
            initial="hidden"
            animate="show"
          >
            <p className="label">More Builders</p>
            <p className="mt-2 font-display text-2xl font-bold leading-tight">
              Brighter Tomorrows
            </p>
            <div className="rule my-4" />
            <p className="font-body text-sm leading-relaxed text-ink-soft">
              From classrooms to the cloud — Parul University students are building
              solutions for a better, more inclusive world.
            </p>
            <div className="mt-5 border-2 border-ink bg-ink p-4 text-paper-light">
              <p className="font-headline text-lg font-bold leading-tight">
                Good Cloud Habits.
              </p>
              <div className="mt-2 h-1 w-10 bg-aws-orange" />
              <p className="mt-3 font-headline text-xs uppercase tracking-[0.25em] text-paper-dark">
                Learn · Build · Belong
              </p>
            </div>
          </motion.aside>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="flex justify-center pb-6"
      >
        <span className="font-type text-[0.65rem] uppercase tracking-[0.3em] text-ink-faded">
          ↓ scroll for the full story ↓
        </span>
      </motion.div>
    </section>
  )
}

function CalIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <rect x="3" y="4.5" width="18" height="16" rx="1.5" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" strokeLinecap="round" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 21s7-5.5 7-11a7 7 0 1 0-14 0c0 5.5 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  )
}
