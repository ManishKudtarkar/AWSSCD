import Reveal from './Reveal'

// Newspaper-style section header: tiny label, big serif headline, double rule.
export default function SectionHeading({ label, title, kicker }) {
  return (
    <header className="mb-10 md:mb-14">
      {label && (
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="label">{label}</span>
            <span className="h-px flex-1 bg-ink/30" />
          </div>
        </Reveal>
      )}
      <Reveal delay={0.05}>
        <h2 className="mt-4 font-display text-4xl font-black leading-[0.95] tracking-tight sm:text-5xl md:text-6xl">
          {title}
        </h2>
      </Reveal>
      {kicker && (
        <Reveal delay={0.1}>
          <p className="mt-3 max-w-2xl font-body text-base italic text-ink-faded md:text-lg">
            {kicker}
          </p>
        </Reveal>
      )}
      <Reveal delay={0.15}>
        <div className="rule-double mt-6" />
      </Reveal>
    </header>
  )
}
