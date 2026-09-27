import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { NAV, EVENT } from '../data/content'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div
        className={`mx-auto w-full transition-all duration-300 ${
          scrolled
            ? 'border-b-2 border-x border-ink/80 bg-paper-light/95 backdrop-blur'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
      <nav className="container-news flex items-center justify-between px-4 py-3 sm:px-6 md:px-8">
        <a href="#top" className="group flex items-baseline gap-2">
          <span className="font-display text-lg font-black tracking-tight md:text-xl">
            <span className="lg:hidden">ASBG</span>
            <span className="hidden lg:inline">{EVENT.masthead}</span>
          </span>
          <span className="hidden h-4 w-1 bg-aws-orange sm:block" />
        </a>

        <ul className="hidden items-center gap-7 md:flex">
          {NAV.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="font-headline text-xs uppercase tracking-[0.2em] text-ink transition-colors hover:text-aws-smile"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={EVENT.registerUrl} className="btn-ghost hidden sm:inline-flex">
            Register →
          </a>
          <button
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 border border-ink md:hidden"
            aria-label="Toggle menu"
          >
            <span className={`h-0.5 w-5 bg-ink transition ${open ? 'translate-y-2 rotate-45' : ''}`} />
            <span className={`h-0.5 w-5 bg-ink transition ${open ? 'opacity-0' : ''}`} />
            <span className={`h-0.5 w-5 bg-ink transition ${open ? '-translate-y-2 -rotate-45' : ''}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t-2 border-ink bg-paper-light md:hidden"
          >
            <ul className="flex flex-col px-5 py-2">
              {NAV.map((item) => (
                <li key={item.href} className="border-b border-ink/15 last:border-0">
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block py-3 font-headline text-sm uppercase tracking-[0.2em]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="py-4">
                <a href={EVENT.registerUrl} onClick={() => setOpen(false)} className="btn-press w-full justify-center">
                  Register →
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
      </div>
    </motion.header>
  )
}
