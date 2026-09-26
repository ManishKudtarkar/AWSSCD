// Lightweight inline SVG brand marks so we don't depend on external image assets.

export function AwsMark({ className = 'h-6 w-auto' }) {
  return (
    <svg viewBox="0 0 80 48" className={className} role="img" aria-label="AWS">
      <text
        x="0"
        y="26"
        fontFamily="Arial, sans-serif"
        fontSize="24"
        fontWeight="700"
        fill="currentColor"
      >
        aws
      </text>
      <path
        d="M4 34 q18 10 44 0"
        fill="none"
        stroke="#ff9900"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path d="M44 30 l6 4 -6 4z" fill="#ff9900" />
    </svg>
  )
}

export function ParulMark({ className = 'h-6 w-auto' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <span className="font-display text-lg font-black leading-none">Parul</span>
      <span className="font-headline text-[0.6rem] uppercase leading-tight tracking-widest text-ink-faded">
        University
      </span>
    </div>
  )
}

export function TinkeringMark({ className = 'h-6 w-auto' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
        <rect
          x="4"
          y="4"
          width="16"
          height="16"
          rx="2"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path d="M8 4V2M16 4V2M8 22v-2M16 22v-2M4 8H2M4 16H2M22 8h-2M22 16h-2" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="12" cy="12" r="3" fill="#ff9900" />
      </svg>
      <span className="font-headline text-[0.6rem] uppercase leading-tight tracking-widest text-ink-faded">
        Tinkering<br />Hub
      </span>
    </div>
  )
}
