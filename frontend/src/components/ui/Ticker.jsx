// Infinite marquee ticker — like a breaking-news band.
export default function Ticker({ items = [], className = '' }) {
  const strip = [...items, ...items]
  return (
    <div
      className={`flex overflow-hidden border-y-2 border-ink bg-ink text-paper-light ${className}`}
    >
      <div className="flex animate-marquee whitespace-nowrap py-2">
        {strip.map((item, i) => (
          <span
            key={i}
            className="mx-6 font-headline text-xs uppercase tracking-[0.28em] md:text-sm"
          >
            {item}
            <span className="ml-6 text-aws-orange">✦</span>
          </span>
        ))}
      </div>
    </div>
  )
}
