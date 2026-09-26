import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { SHOWCASE } from '../../data/content'

export default function Showcase() {
  return (
    <section id="showcase" className="section-pad bg-paper-dark/40">
      <div className="container-news">
        <SectionHeading
          label="Community Wall"
          title="Student Showcase"
          kicker="Highlights, projects and the small wins that add up to a movement."
        />

        <div className="grid gap-8 lg:grid-cols-3">
          {SHOWCASE.map((item, i) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              className={i === 0 ? 'lg:col-span-2' : ''}
            >
              <div
                className={`relative mb-4 overflow-hidden border-2 border-ink bg-ink ${
                  i === 0 ? 'aspect-[16/9]' : 'aspect-[4/3]'
                }`}
              >
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,rgba(244,241,232,0.06)_0,rgba(244,241,232,0.06)_2px,transparent_2px,transparent_8px)]" />
                <div className="absolute inset-0 flex items-end p-5">
                  <span className="font-headline text-xs uppercase tracking-[0.25em] text-paper-light/70">
                    Photo · Community Archive
                  </span>
                </div>
              </div>
              <p className="label text-aws-smile">{item.kicker}</p>
              <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                {item.title}
              </h3>
              <p className="mt-2 font-body leading-relaxed text-ink-soft">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
