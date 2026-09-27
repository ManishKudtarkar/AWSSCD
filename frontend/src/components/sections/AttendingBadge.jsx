import { useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading'
import { EVENT, BADGE_ROLES } from '../../data/content'

// Escape user text so it's safe to inject into the SVG markup.
function esc(str = '') {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

const BADGE_W = 840
const BADGE_H = 1260

const M = 46 // outer margin / border inset
const PAD = 70 // content left/right padding
const LEFT = PAD
const RIGHT = BADGE_W - PAD
const CX = BADGE_W / 2

// Wrap a string into lines of at most `max` characters (word-aware).
function wrapText(str, max) {
  const words = str.split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  for (const w of words) {
    if ((line + ' ' + w).trim().length > max && line) {
      lines.push(line)
      line = w
    } else {
      line = (line + ' ' + w).trim()
    }
  }
  if (line) lines.push(line)
  return lines
}

// Emit stacked <tspan> lines for a wrapped body paragraph.
function tspans(lines, x, startY, lh) {
  return lines
    .map((ln, i) => `<tspan x="${x}" y="${startY + i * lh}">${esc(ln)}</tspan>`)
    .join('')
}

// The big banner headline — the attendee's name, fit to the page width.
function headlineLines(display) {
  const words = display.split(/\s+/).filter(Boolean)
  if (display.length <= 11 || words.length < 2) return [display]
  // Two balanced lines.
  let best = 1
  let bestDiff = Infinity
  for (let i = 1; i < words.length; i++) {
    const l = words.slice(0, i).join(' ').length
    const r = words.slice(i).join(' ').length
    if (Math.abs(l - r) < bestDiff) {
      bestDiff = Math.abs(l - r)
      best = i
    }
  }
  return [words.slice(0, best).join(' '), words.slice(best).join(' ')]
}

// The hero photo (landscape) framed with a rule, or a placeholder.
function heroMarkup(photo, x, y, w, h) {
  const frame = `<rect x="${x - 5}" y="${y - 5}" width="${w + 10}" height="${h + 10}" fill="none" stroke="#161412" stroke-width="3"/>`
  if (photo) {
    return `
  <clipPath id="hclip"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>
  <image href="${photo}" x="${x}" y="${y}" width="${w}" height="${h}" clip-path="url(#hclip)" preserveAspectRatio="xMidYMid slice"/>
  ${frame}`
  }
  return `
  <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#232f3e"/>
  <circle cx="${x + w / 2}" cy="${y + h / 2 - 34}" r="46" fill="#f4f1e8"/>
  <path d="M${x + w / 2 - 82} ${y + h - 26} a82 74 0 0 1 164 0 z" fill="#f4f1e8"/>
  <text x="${x + w / 2}" y="${y + h - 22}" text-anchor="middle" font-size="16" letter-spacing="3" fill="#c9c4b8" font-family="Oswald, Arial, sans-serif">ADD YOUR PHOTO ABOVE</text>
  ${frame}`
}

// Build the badge as a newspaper front page — used for preview + PNG export.
function buildBadgeSVG({ name, role, photo }) {
  const upperName = (name.trim() || 'YOUR NAME').toUpperCase()
  const hLines = headlineLines(upperName)
  const hSize = hLines.some((l) => l.length > 12) ? 66 : 82
  const hLineH = hSize * 0.96
  const roleUpper = (role || 'Builder').toUpperCase()

  // Headline block metrics (drives where everything below starts).
  const nameTop = 268 // baseline of first headline line
  const nameBottom = nameTop + (hLines.length - 1) * hLineH // last name line
  const attendingY = nameBottom + 40 // "IS ATTENDING" baseline
  const bannerRuleY = attendingY + 26 // rule under the banner

  // Right sidebar geometry.
  const sbX = 556
  const sbW = RIGHT - sbX

  // Hero photo geometry (left column, below headline).
  const heroX = LEFT
  const caption1Y = bannerRuleY + 34 // first caption line baseline
  const caption2Y = caption1Y + 26 // second caption line baseline
  const heroY = caption2Y + 22 // top of the photo
  const heroW = sbX - 26 - LEFT
  const heroH = 296

  // Lower section metrics.
  const colDivY = heroY + heroH + 30 // divider under photo/sidebar
  const bodyBottom = colDivY + 90 + (5 * 23) // deepest the left body text reaches
  const footTop = Math.max(bodyBottom + 40, BADGE_H - 200) // footer divider

  const detailLines = [
    'Parul University, Vadodara.',
    'Saturday, 12 December 2026,',
    'doors open 09:00 sharp.',
  ]
  const breakingLines = wrapText(
    `Word around campus: ${roleUpper.charAt(0) + roleUpper.slice(1).toLowerCase()} confirmed for AWS Student Community Day. Expect cloud, code and good company.`,
    26
  )
  const bodyLines = wrapText(
    `After terms of lectures, labs and late-night builds, the community gathers to learn and celebrate. ${
      name.trim() || 'This builder'
    } is officially in — and the cloud will never be the same.`,
    30
  )
  const rsvpLines = wrapText(
    'Kindly confirm your seat via the register button on this page. Bring a laptop, bring your curiosity.',
    26
  )

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${BADGE_W}" height="${BADGE_H}" viewBox="0 0 ${BADGE_W} ${BADGE_H}" font-family="'Playfair Display', Georgia, 'Times New Roman', serif">
  <!-- Paper -->
  <rect width="${BADGE_W}" height="${BADGE_H}" fill="#f4f1e8"/>
  <rect x="${M}" y="${M}" width="${BADGE_W - M * 2}" height="${BADGE_H - M * 2}" fill="none" stroke="#161412" stroke-width="2"/>

  <!-- ===== Masthead ===== -->
  <text x="${CX}" y="96" text-anchor="middle" font-size="16" letter-spacing="6" fill="#161412" font-family="Oswald, Arial, sans-serif" font-weight="600">SPECIAL EDITION</text>

  <!-- location (left) -->
  <text x="${LEFT}" y="132" font-size="17" font-style="italic" fill="#161412">VADODARA,</text>
  <text x="${LEFT}" y="154" font-size="17" font-style="italic" fill="#161412">GUJARAT</text>
  <!-- est (right) -->
  <text x="${RIGHT}" y="144" text-anchor="end" font-size="17" letter-spacing="2" fill="#161412" font-family="Oswald, Arial, sans-serif">EST. 2026</text>

  <!-- title with flanking marks -->
  <text x="${CX - 168}" y="150" text-anchor="middle" font-size="30" fill="#26538B">&#10039;</text>
  <text x="${CX}" y="152" text-anchor="middle" font-size="46" font-weight="900" fill="#161412" letter-spacing="1">The Invitation</text>
  <text x="${CX + 168}" y="150" text-anchor="middle" font-size="30" fill="#26538B">&#10039;</text>

  <line x1="${LEFT}" y1="178" x2="${RIGHT}" y2="178" stroke="#161412" stroke-width="3"/>
  <line x1="${LEFT}" y1="185" x2="${RIGHT}" y2="185" stroke="#161412" stroke-width="1"/>

  <!-- ===== Banner headline (attendee name) ===== -->
  <text text-anchor="middle" font-size="${hSize}" font-weight="900" fill="#161412" letter-spacing="-0.5">${hLines
    .map(
      (ln, i) => `<tspan x="${CX}" y="${nameTop + i * hLineH}">${esc(ln)}</tspan>`
    )
    .join('')}</text>
  <text x="${CX}" y="${attendingY}" text-anchor="middle" font-size="30" font-weight="700" fill="#161412">IS ATTENDING</text>

  <line x1="${LEFT}" y1="${bannerRuleY}" x2="${RIGHT}" y2="${bannerRuleY}" stroke="#161412" stroke-width="1.5"/>

  <!-- ===== Caption + hero photo (left) ===== -->
  <text font-size="18" font-style="italic" font-weight="700" fill="#161412"><tspan x="${heroX}" y="${caption1Y}">FRIENDS &amp; BUILDERS GATHER TO</tspan><tspan x="${heroX}" y="${caption2Y}">WELCOME THE NEWEST MEMBER</tspan></text>
  ${heroMarkup(photo, heroX, heroY, heroW, heroH)}

  <!-- ===== Right sidebar ===== -->
  <line x1="${sbX - 13}" y1="${bannerRuleY + 12}" x2="${sbX - 13}" y2="${heroY + heroH}" stroke="#161412" stroke-width="1"/>

  <rect x="${sbX}" y="${bannerRuleY + 22}" width="${sbW}" height="34" fill="#161412"/>
  <text x="${sbX + sbW / 2}" y="${bannerRuleY + 45}" text-anchor="middle" font-size="17" letter-spacing="3" fill="#faf8f1" font-family="Oswald, Arial, sans-serif" font-weight="600">THE DETAILS</text>
  <text font-size="15" font-style="italic" fill="#2a2723">${tspans(detailLines, sbX, bannerRuleY + 84, 24)}</text>

  <text x="${sbX + sbW / 2}" y="${bannerRuleY + 176}" text-anchor="middle" font-size="19" font-weight="900" fill="#26538B" font-family="Oswald, Arial, sans-serif" letter-spacing="1">BREAKING NEWS</text>
  <line x1="${sbX}" y1="${bannerRuleY + 188}" x2="${RIGHT}" y2="${bannerRuleY + 188}" stroke="#161412" stroke-width="1"/>
  <text font-size="14.5" fill="#2a2723">${tspans(breakingLines, sbX, bannerRuleY + 214, 21)}</text>

  <!-- ===== Lower columns ===== -->
  <line x1="${LEFT}" y1="${colDivY}" x2="${RIGHT}" y2="${colDivY}" stroke="#161412" stroke-width="1.5"/>

  <!-- role kicker -->
  <g transform="translate(${LEFT + 96}, ${colDivY + 40})">
    <rect x="-96" y="-24" width="192" height="40" fill="#26538B"/>
    <text x="0" y="3" text-anchor="middle" font-size="18" letter-spacing="3" fill="#faf8f1" font-family="Oswald, Arial, sans-serif" font-weight="600">${esc(roleUpper)}</text>
  </g>

  <!-- body column (left) -->
  <text font-size="15.5" fill="#2a2723">${tspans(bodyLines, LEFT, colDivY + 90, 23)}</text>

  <!-- rsvp column (right) -->
  <text x="${sbX}" y="${colDivY + 36}" font-size="17" font-weight="900" fill="#161412" font-family="Oswald, Arial, sans-serif" letter-spacing="1">RSVP</text>
  <line x1="${sbX}" y1="${colDivY + 48}" x2="${RIGHT}" y2="${colDivY + 48}" stroke="#161412" stroke-width="1"/>
  <text font-size="14.5" fill="#2a2723">${tspans(rsvpLines, sbX, colDivY + 74, 21)}</text>

  <!-- ===== Event footer strip ===== -->
  <line x1="${LEFT}" y1="${footTop}" x2="${RIGHT}" y2="${footTop}" stroke="#161412" stroke-width="1.5"/>
  <text x="${CX}" y="${footTop + 46}" text-anchor="middle" font-size="30" font-weight="900" fill="#161412" letter-spacing="-0.5">AWS STUDENT COMMUNITY DAY</text>
  <text x="${LEFT}" y="${footTop + 84}" font-size="15" font-style="italic" fill="#2a2723">${esc(EVENT.dateLong)}</text>
  <text x="${RIGHT}" y="${footTop + 84}" text-anchor="end" font-size="14" letter-spacing="2" fill="#5b564d" font-family="Oswald, Arial, sans-serif">${esc(EVENT.location.toUpperCase())}</text>
  <line x1="${LEFT}" y1="${footTop + 104}" x2="${RIGHT}" y2="${footTop + 104}" stroke="#161412" stroke-width="0.75"/>
  <text x="${CX}" y="${footTop + 134}" text-anchor="middle" font-size="18" letter-spacing="6" fill="#26538B" font-weight="700" font-family="Oswald, Arial, sans-serif">BUILD &#183; CONNECT &#183; GROW</text>
</svg>`
}

export default function AttendingBadge() {
  const [name, setName] = useState('')
  const [role, setRole] = useState(BADGE_ROLES[0])
  const [photo, setPhoto] = useState(null)
  const [busy, setBusy] = useState(false)
  const previewRef = useRef(null)
  const fileInputRef = useRef(null)

  const svg = useMemo(() => buildBadgeSVG({ name, role, photo }), [name, role, photo])
  const previewSrc = useMemo(
    () => `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`,
    [svg]
  )

  // Read the chosen file, center-crop to the hero's landscape ratio and
  // store as a JPEG data URL so it stays small and exports cleanly.
  async function handlePhoto(e) {
    const file = e.target.files?.[0]
    if (!file || !file.type.startsWith('image/')) return
    const dataUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
    const img = new Image()
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = dataUrl
    })
    // Target the hero photo ratio (landscape ~ 1.28:1).
    const targetW = 900
    const targetH = 700
    const canvas = document.createElement('canvas')
    canvas.width = targetW
    canvas.height = targetH
    const ctx = canvas.getContext('2d')
    const targetRatio = targetW / targetH
    const srcRatio = img.width / img.height
    let sw, sh, sx, sy
    if (srcRatio > targetRatio) {
      // Source too wide — crop sides.
      sh = img.height
      sw = sh * targetRatio
      sx = (img.width - sw) / 2
      sy = 0
    } else {
      // Source too tall — crop top/bottom.
      sw = img.width
      sh = sw / targetRatio
      sx = 0
      sy = (img.height - sh) / 2
    }
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, targetW, targetH)
    setPhoto(canvas.toDataURL('image/jpeg', 0.85))
  }

  function clearPhoto() {
    setPhoto(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  // Rasterize the SVG to a high-res PNG blob for download / sharing.
  async function renderPngBlob(scale = 2) {
    const img = new Image()
    img.crossOrigin = 'anonymous'
    const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
    await new Promise((resolve, reject) => {
      img.onload = resolve
      img.onerror = reject
      img.src = url
    })
    const canvas = document.createElement('canvas')
    canvas.width = BADGE_W * scale
    canvas.height = BADGE_H * scale
    const ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/png'))
  }

  function fileName() {
    const slug = (name || 'my').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    return `aws-community-day-badge-${slug || 'pass'}.png`
  }

  async function handleDownload() {
    try {
      setBusy(true)
      const blob = await renderPngBlob(2)
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = fileName()
      document.body.appendChild(link)
      link.click()
      link.remove()
      setTimeout(() => URL.revokeObjectURL(link.href), 1000)
    } finally {
      setBusy(false)
    }
  }

  // Absolute URL of this page (falls back gracefully during SSR/build).
  function pageUrl() {
    if (typeof window !== 'undefined' && window.location) {
      return window.location.origin + window.location.pathname + '#badge'
    }
    return 'https://awsscd.example.com/#badge'
  }

  function shareText() {
    const who = name.trim() || 'I'
    const verb = name.trim() ? 'is' : 'am'
    return `${who} ${verb} attending AWS Student Community Day at Parul University on ${EVENT.date}! Build · Connect · Grow. #AWSCommunity #BuildConnectGrow`
  }

  // Native share sheet — the only path that can attach the badge image.
  async function handleNativeShare() {
    try {
      setBusy(true)
      const blob = await renderPngBlob(2)
      const file = new File([blob], fileName(), { type: 'image/png' })
      const payload = { title: 'I am attending!', text: shareText(), url: pageUrl() }
      if (navigator.canShare && navigator.canShare({ files: [file] })) {
        await navigator.share({ ...payload, files: [file] })
      } else if (navigator.share) {
        await navigator.share(payload)
      } else {
        await handleDownload()
      }
    } catch {
      /* user cancelled — no-op */
    } finally {
      setBusy(false)
    }
  }

  // Open a platform's web share dialog with a prefilled post.
  function openShareWindow(url) {
    window.open(url, '_blank', 'noopener,noreferrer,width=640,height=640')
  }

  const socialLinks = {
    linkedin: () => {
      // LinkedIn share only accepts a URL; the caption is added by the user
      // after the download. We open the sharing dialog for the event page.
      const u = encodeURIComponent(pageUrl())
      openShareWindow(`https://www.linkedin.com/sharing/share-offsite/?url=${u}`)
    },
    twitter: () => {
      const t = encodeURIComponent(shareText())
      const u = encodeURIComponent(pageUrl())
      openShareWindow(`https://twitter.com/intent/tweet?text=${t}&url=${u}`)
    },
    whatsapp: () => {
      const t = encodeURIComponent(`${shareText()} ${pageUrl()}`)
      openShareWindow(`https://api.whatsapp.com/send?text=${t}`)
    },
    facebook: () => {
      const u = encodeURIComponent(pageUrl())
      const q = encodeURIComponent(shareText())
      openShareWindow(`https://www.facebook.com/sharer/sharer.php?u=${u}&quote=${q}`)
    },
  }

  return (
    <section id="badge" className="section-pad">
      <div className="container-news">
        <SectionHeading
          label="Your Front Page"
          title="Claim Your Pass"
          kicker="Print your name on the record. Make an “I’m Attending” badge and share it with the community."
        />

        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          {/* Controls */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5 }}
            className="border-2 border-ink bg-paper-light p-6 md:p-8"
          >
            <label className="label" htmlFor="badge-name">
              Your Name
            </label>
            <input
              id="badge-name"
              type="text"
              value={name}
              maxLength={28}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Aisha Patel"
              className="mt-2 w-full border-2 border-ink bg-paper px-4 py-3 font-display text-xl font-bold outline-none placeholder:text-ink-faded/60 focus:shadow-press-sm"
            />

            <p className="label mt-6">Your Photo</p>
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <input
                ref={fileInputRef}
                id="badge-photo"
                type="file"
                accept="image/*"
                onChange={handlePhoto}
                className="hidden"
              />
              <label
                htmlFor="badge-photo"
                className="btn-ghost cursor-pointer"
              >
                {photo ? 'Change Photo' : 'Upload Photo'}
              </label>
              {photo && (
                <button
                  type="button"
                  onClick={clearPhoto}
                  className="font-headline text-xs uppercase tracking-[0.2em] text-ink-faded underline decoration-ink-faded/40 underline-offset-4 transition-colors hover:text-aws-smile"
                >
                  Remove
                </button>
              )}
            </div>
            <p className="mt-2 font-type text-[0.65rem] uppercase tracking-[0.15em] text-ink-faded">
              Stays on your device — nothing is uploaded to a server.
            </p>

            <p className="label mt-6">I'm Coming As</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {BADGE_ROLES.map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setRole(r)}
                  className={`border-2 border-ink px-3 py-2 font-headline text-xs uppercase tracking-[0.15em] transition-all duration-150 ${
                    role === r
                      ? 'bg-aws-orange text-paper-light'
                      : 'bg-paper text-ink hover:-translate-y-0.5 hover:shadow-press-sm'
                  }`}
                >
                  {r}
                </button>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <button
                type="button"
                onClick={handleDownload}
                disabled={busy}
                className="btn-press justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {busy ? 'Preparing…' : 'Download Badge ↓'}
              </button>
              <button
                type="button"
                onClick={handleNativeShare}
                disabled={busy}
                className="btn-ghost justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                Share Image
              </button>
            </div>

            <p className="label mt-7">Share Directly</p>
            <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
              <button
                type="button"
                onClick={socialLinks.linkedin}
                aria-label="Share on LinkedIn"
                className="flex items-center justify-center gap-2 border-2 border-ink bg-[#0A66C2] px-3 py-2.5 font-headline text-xs uppercase tracking-[0.15em] text-paper-light transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-press-sm"
              >
                <LinkedInIcon /> LinkedIn
              </button>
              <button
                type="button"
                onClick={socialLinks.twitter}
                aria-label="Share on X (Twitter)"
                className="flex items-center justify-center gap-2 border-2 border-ink bg-ink px-3 py-2.5 font-headline text-xs uppercase tracking-[0.15em] text-paper-light transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-press-sm"
              >
                <XIcon /> X
              </button>
              <button
                type="button"
                onClick={socialLinks.whatsapp}
                aria-label="Share on WhatsApp"
                className="flex items-center justify-center gap-2 border-2 border-ink bg-[#25D366] px-3 py-2.5 font-headline text-xs uppercase tracking-[0.15em] text-ink transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-press-sm"
              >
                <WhatsAppIcon /> WhatsApp
              </button>
              <button
                type="button"
                onClick={socialLinks.facebook}
                aria-label="Share on Facebook"
                className="flex items-center justify-center gap-2 border-2 border-ink bg-[#1877F2] px-3 py-2.5 font-headline text-xs uppercase tracking-[0.15em] text-paper-light transition-transform duration-150 hover:-translate-y-0.5 hover:shadow-press-sm"
              >
                <FacebookIcon /> Facebook
              </button>
            </div>

            <p className="mt-4 font-type text-[0.7rem] uppercase leading-relaxed tracking-[0.2em] text-ink-faded">
              Tip: download your badge first, then attach it to the post. On phones, “Share Image” attaches it for you. See you at Parul University on {EVENT.date}.
            </p>
          </motion.div>

          {/* Live preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex justify-center"
          >
            <div className="w-full max-w-[420px] border-2 border-ink bg-paper-light p-2 shadow-press">
              <img
                ref={previewRef}
                src={previewSrc}
                alt="Preview of your I am attending front page"
                className="block w-full"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

// --- Brand icons (inline SVG, currentColor where possible) ---
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function XIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M18.24 2.25h3.31l-7.23 8.26L22.5 21.75h-6.63l-5.19-6.79-5.95 6.79H1.42l7.73-8.83L1.5 2.25h6.8l4.69 6.2 5.25-6.2zm-1.16 17.52h1.83L7.01 4.13H5.05l12.03 15.64z" />
    </svg>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.87 1.22 3.07.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.17-1.42-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.86 9.86 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2z" />
    </svg>
  )
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z" />
    </svg>
  )
}
