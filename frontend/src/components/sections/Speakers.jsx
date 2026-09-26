import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { SPEAKERS } from '../../data/content'

export default function Speakers() {
  return (
    <section id="speakers" className="section-pad">
      <div className="container-news">
        <SectionHeading
          label="The Voices"
          title="Speakers & Storytellers"
          kicker="The people writing the headlines — industry experts and community leaders."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {SPEAKERS.map((sp, i) => (
            <motion.article
              key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className="group border-2 border-ink bg-paper-light"
            >
              <div className="relative aspect-[4/5] overflow-hidden border-b-2 border-ink bg-ink">
                {/* Halftone-style portrait placeholder */}
                <div className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(circle,rgba(255,153,0,0.25)_1px,transparent_1px)] [background-size:8px_8px]">
                  <span className="font-display text-6xl font-black text-paper-light/90">
                    {sp.initials}
                  </span>
                </div>
                <span className="absolute left-0 top-0 bg-aws-orange px-2 py-1 font-type text-[0.6rem] uppercase tracking-widest text-ink">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <div className="p-4">
                <p className="font-headline text-[0.6rem] uppercase tracking-[0.25em] text-aws-smile">
                  {sp.topic}
                </p>
                <h3 className="mt-1 font-display text-xl font-bold leading-tight">
                  {sp.name}
                </h3>
                <p className="mt-1 font-body text-sm italic text-ink-faded">
                  {sp.role}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <p className="mt-8 text-center font-type text-xs uppercase tracking-[0.3em] text-ink-faded">
          Full line-up announced soon — watch this space
        </p>
      </div>
    </section>
  )
}
