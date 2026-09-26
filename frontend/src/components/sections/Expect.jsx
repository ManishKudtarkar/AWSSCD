import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { EXPECT } from '../../data/content'

export default function Expect() {
  return (
    <section id="expect" className="section-pad bg-paper-dark/40">
      <div className="container-news">
        <SectionHeading
          label="What To Expect"
          title="The Front Page Line-Up"
          kicker="Six columns of the day — from cloud fundamentals to the people who make it worth it."
        />

        <div className="grid gap-px overflow-hidden border-2 border-ink bg-ink sm:grid-cols-2 lg:grid-cols-3">
          {EXPECT.map((item, i) => (
            <motion.article
              key={item.tag}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: (i % 3) * 0.08 }}
              className="group relative bg-paper-light p-7 transition-colors duration-300 hover:bg-ink hover:text-paper-light"
            >
              <div className="flex items-baseline justify-between">
                <span className="font-type text-xs uppercase tracking-widest text-aws-smile group-hover:text-aws-orange">
                  {item.tag}
                </span>
                <span className="font-headline text-xs uppercase tracking-[0.2em] text-ink-faded group-hover:text-paper-dark">
                  Section
                </span>
              </div>
              <h3 className="mt-4 font-display text-3xl font-black leading-none">
                {item.title}
              </h3>
              <div className="my-4 h-1 w-12 bg-aws-orange" />
              <p className="font-body text-sm leading-relaxed text-ink-soft group-hover:text-paper-dark">
                {item.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
