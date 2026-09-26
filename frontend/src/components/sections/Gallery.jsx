import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'

// Magazine-style layout of framed photo plates (placeholders).
const PLATES = [
  { span: 'sm:col-span-2 sm:row-span-2', label: 'Keynote Stage' },
  { span: '', label: 'Workshop' },
  { span: '', label: 'Hallway Track' },
  { span: 'sm:col-span-2', label: 'Community' },
  { span: '', label: 'Demo' },
]

export default function Gallery() {
  return (
    <section id="gallery" className="section-pad">
      <div className="container-news">
        <SectionHeading
          label="Photo Gallery"
          title="The Community, In Print"
          kicker="Editorial plates from the floor — swap these for your event photos."
        />

        <div className="grid auto-rows-[160px] grid-cols-2 gap-4 sm:auto-rows-[200px] sm:grid-cols-4">
          {PLATES.map((plate, i) => (
            <motion.figure
              key={i}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ scale: 1.015 }}
              className={`group relative overflow-hidden border-2 border-ink bg-ink ${plate.span}`}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(244,241,232,0.08)_1px,transparent_1px)] [background-size:10px_10px]" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-gradient-to-t from-ink/90 to-transparent p-3">
                <span className="font-headline text-[0.6rem] uppercase tracking-[0.25em] text-paper-light">
                  {plate.label}
                </span>
                <span className="font-type text-[0.6rem] text-aws-orange">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
