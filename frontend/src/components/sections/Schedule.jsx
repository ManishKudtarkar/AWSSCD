import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { SCHEDULE } from '../../data/content'

export default function Schedule() {
  return (
    <section id="schedule" className="section-pad bg-paper-dark/40">
      <div className="container-news">
        <SectionHeading
          label="What's Happening"
          title="The Day, Column by Column"
          kicker="A running order set in the type of a newspaper column."
        />

        <div className="mx-auto max-w-3xl">
          <ol className="border-l-2 border-ink">
            {SCHEDULE.map((slot, i) => (
              <motion.li
                key={slot.time}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="group relative py-5 pl-8"
              >
                <span className="absolute -left-[7px] top-7 h-3 w-3 rounded-full border-2 border-ink bg-paper transition-colors group-hover:bg-aws-orange" />
                <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-5">
                  <time className="font-type text-lg font-bold tracking-widest text-aws-smile">
                    {slot.time}
                  </time>
                  <div>
                    <h3 className="font-display text-xl font-bold leading-tight sm:text-2xl">
                      {slot.title}
                    </h3>
                    <p className="mt-0.5 font-body text-sm italic text-ink-faded">
                      {slot.note}
                    </p>
                  </div>
                </div>
                {i < SCHEDULE.length - 1 && <div className="rule mt-5 opacity-40" />}
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
