import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Ticker from './components/ui/Ticker'
import Hero from './components/sections/Hero'
import Story from './components/sections/Story'
import Expect from './components/sections/Expect'
import Speakers from './components/sections/Speakers'
import GetInvolved from './components/sections/GetInvolved'
import Schedule from './components/sections/Schedule'
import Showcase from './components/sections/Showcase'
import Gallery from './components/sections/Gallery'
import AttendingBadge from './components/sections/AttendingBadge'
import FinalCTA from './components/sections/FinalCTA'

const TICKER_ITEMS = [
  'AWS STUDENT COMMUNITY DAY',
  'PARUL UNIVERSITY',
  '12 DEC 2026',
  'BUILD · CONNECT · GROW',
  'VOL. 01 · NO. 01',
  'CLOUD · AI · DEVOPS · SERVERLESS',
]

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="paper-sheet min-h-screen">
        <main>
          <Hero />
          <Ticker items={TICKER_ITEMS} />
          <Story />
          <Expect />
          <Speakers />
          <GetInvolved />
          <Schedule />
          <Showcase />
          <Gallery />
          <AttendingBadge />
          <FinalCTA />
        </main>
        <Footer />
      </div>
    </div>
  )
}
