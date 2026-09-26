import { EVENT, FOOTER_LINKS } from '../data/content'
import { AwsMark, ParulMark } from './ui/Brandmarks'

export default function Footer() {
  return (
    <footer className="border-t-2 border-ink bg-paper-light">
      <div className="container-news px-5 py-10 sm:px-8 md:px-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="text-center md:text-left">
            <p className="font-display text-2xl font-black">{EVENT.masthead}</p>
            <p className="mt-1 font-headline text-xs uppercase tracking-[0.25em] text-ink-faded">
              {EVENT.title} {EVENT.titleAccent} · {EVENT.date}
            </p>
          </div>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {FOOTER_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="font-headline text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-aws-smile"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        <div className="rule my-6" />

        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-6 text-ink">
            <ParulMark />
            <AwsMark className="h-6 w-auto" />
          </div>
          <p className="font-type text-[0.65rem] uppercase tracking-[0.25em] text-ink-faded">
            © {new Date().getFullYear()} · Printed with ☕ by the AWS Student Community
          </p>
        </div>
      </div>
    </footer>
  )
}
