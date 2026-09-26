import SectionHeading from '../ui/SectionHeading'
import Reveal from '../ui/Reveal'
import { STATS } from '../../data/content'

export default function Story() {
  return (
    <section id="story" className="section-pad">
      <div className="container-news">
        <SectionHeading
          label="About The Day"
          title="A Bigger Community. A Brighter Tomorrow."
          kicker="An editorial on why students, builders and dreamers are gathering under one roof."
        />

        <div className="grid gap-8 md:grid-cols-3">
          <Reveal className="md:col-span-2">
            <div className="columns-1 gap-8 font-body text-[1.05rem] leading-relaxed text-ink-soft sm:columns-2 col-rule">
              <p className="dropcap mb-4">
                Community Day is not a lecture. It is a newsroom of ideas — where
                every student is both reader and author. For one day, Parul
                University becomes a working floor for the cloud: laptops open,
                terminals humming, whiteboards filling with architecture.
              </p>
              <p className="mb-4">
                The AWS Student Community brings together learners who want more than
                theory. We build together, break things safely, and turn coursework
                into deployed products. From a first Lambda function to a
                full-stack showcase, everyone ships something.
              </p>
              <p className="mb-4">
                Speakers arrive from industry and community alike. Workshops run
                hands-on. And the hallway — that famous hallway — is where the real
                connections happen. Mentors, peers and future teammates, all in one
                place.
              </p>
              <p>
                This is the first edition. Volume One, Number One. The beginning of
                a story that the community writes together, one build at a time.
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <aside className="border-2 border-ink bg-paper-light p-6">
              <p className="label">By The Numbers</p>
              <div className="rule my-4" />
              <dl className="space-y-5">
                {STATS.map((s) => (
                  <div key={s.label}>
                    <dt className="font-display text-4xl font-black leading-none">
                      {s.value}
                    </dt>
                    <dd className="mt-1 font-headline text-xs uppercase tracking-[0.2em] text-ink-faded">
                      {s.label}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className="mt-6 -rotate-1 border-l-4 border-aws-orange bg-paper-dark/50 p-3">
                <p className="font-body italic leading-snug text-ink-soft">
                  “Build. Connect. Grow.”
                </p>
              </div>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
