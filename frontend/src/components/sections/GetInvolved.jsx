import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { JOIN_ROLES, JOIN_LOOP_ITEMS } from '../../data/content'

// A single infinite-loop band. `reverse` sends it the other way.
function LoopBand({ items = [], reverse = false }) {
  const strip = [...items, ...items]
  return (
    <div className="flex overflow-hidden border-y-2 border-ink bg-paper-light">
      <div
        className={`flex whitespace-nowrap py-2 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {strip.map((item, i) => (
          <span
            key={i}
            className="mx-6 font-headline text-xs uppercase tracking-[0.28em] text-ink md:text-sm"
          >
            {item}
            <span className="ml-6 text-aws-orange">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function GetInvolved() {
  return (
    <section id="get-involved" className="section-pad">
      <div className="container-news">
        <SectionHeading
          label="Get Involved"
          title="Volunteer & Speak"
          kicker="Two ways onto the roster — join the crew or claim the stage. Applications are open."
        />

        {/* Loop bands scrolling in opposite directions */}
        <div className="mb-10 space-y-2">
          <LoopBand items={JOIN_LOOP_ITEMS} />
          <LoopBand items={JOIN_LOOP_ITEMS} reverse />
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {JOIN_ROLES.map((role, i) => (
            <motion.article
              key={role.role}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col border-2 border-ink bg-paper-light p-6 transition-shadow duration-200 hover:shadow-press"
            >
              <div className="flex items-center justify-between border-b-2 border-ink pb-3">
                <span className="bg-ink px-2 py-1 font-type text-[0.6rem] uppercase tracking-widest text-paper-light">
                  {role.tag}
                </span>
                <span className="font-type text-xs uppercase tracking-[0.3em] text-ink-faded">
                  {String(i + 1).padStart(2, '0')} / {String(JOIN_ROLES.length).padStart(2, '0')}
                </span>
              </div>

              <h3 className="mt-5 font-display text-4xl font-black leading-none tracking-tight sm:text-5xl">
                {role.role}
              </h3>

              <p className="mt-4 font-body text-base italic leading-relaxed text-ink-faded">
                {role.body}
              </p>

              <ul className="mt-5 space-y-2">
                {role.perks.map((perk) => (
                  <li
                    key={perk}
                    className="flex items-center gap-3 font-headline text-xs uppercase tracking-[0.2em] text-ink"
                  >
                    <span className="text-aws-orange">✦</span>
                    {perk}
                  </li>
                ))}
              </ul>

              <a
                href={role.href}
                className="btn-press mt-7 self-start"
              >
                {role.cta} →
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
