# THE HIGHLIGHT — AWS Student Community Day

An editorial, newspaper-style event website for **AWS Student Community Day at Parul University**.
Built with **React + Vite + Tailwind CSS + Framer Motion**.

## Concept

The poster becomes a living digital newspaper: vintage editorial aesthetic, black + off-white
paper texture, large serif headlines, condensed typography, thin newspaper rules, and AWS orange
used sparingly as an accent — with motion and interaction layered on top.

## Getting started

```bash
cd frontend
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

To create a production build:

```bash
npm run build
npm run preview
```

## Structure

```
frontend/
├── index.html
├── tailwind.config.js
├── src/
│   ├── main.jsx
│   ├── App.jsx              # assembles all sections
│   ├── index.css            # theme, paper grain, component classes
│   ├── data/content.js      # ALL editable copy lives here
│   └── components/
│       ├── Navbar.jsx
│       ├── Footer.jsx
│       ├── ui/              # Reveal, SectionHeading, Ticker, Brandmarks
│       └── sections/        # Hero, Story, Expect, Speakers,
│                            #   Schedule, Showcase, Gallery, FinalCTA
```

## Editing content

Open `src/data/content.js` — event details, navigation, speakers, schedule,
showcase copy and stats are all defined there. No component edits needed for
routine updates.

## Swapping in real images

The gallery and showcase use styled placeholders. Drop your photos into
`public/` and replace the placeholder `<div>`s with `<img>` tags in
`Gallery.jsx` and `Showcase.jsx`.
