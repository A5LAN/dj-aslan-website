import { useState } from 'react'

const FORM_ENDPOINT = 'https://formspree.io/f/xpwdzgbb'
const EMAIL = 'sales@aslangroup.ca'
const INSTAGRAM = 'https://www.instagram.com/_djaslan/'

const venues = [
  { name: "Chef's Hall", note: 'Resident DJ', img: '/images/chef-hall.jpg' },
  { name: "Jack Astor's", note: 'Resident DJ · Multiple locations across Ontario', img: '/images/jacks.jpg' },
]

const history = [
  ['The Drink', 'now Crown Bar & Social · Waterloo'],
  ['Pub on King', 'Waterloo'],
  ["Phil's", 'Waterloo'],
  ['The Frog', 'London'],
  ['Pub on Richmond', 'closed'],
]

const services = [
  { n: '01', title: 'Weddings', body: 'Ceremony, cocktail hour and reception. One DJ, one plan, a dance floor that stays full.', cta: 'Request a quote for your date' },
  { n: '02', title: 'Corporate & Private', body: 'Galas, launches, holiday parties and private celebrations, set to the room and the guest list.', cta: 'Request a quote for your event' },
]

const steps = [
  ['I', 'Request a quote', 'Share your date, venue and guest count. Pricing is tailored to each event.'],
  ['II', 'Consult', 'A short call to shape the evening and confirm the details.'],
  ['III', 'Perform', 'You enjoy the night. The music takes care of itself.'],
]

const gallery = ['/images/dj-aslan.JPG', '/images/djing-bracelet.jpg', '/images/special-event.jpg', '/images/jacks-eaton.jpg']

function Header() {
  return (
    <header className="wrap top">
      <a href="#top" className="logo">ASLAN</a>
      <nav>
        <a href="#services">Weddings</a>
        <a href="#services">Corporate &amp; Private</a>
        <a href="#residencies">Residencies</a>
        <a href="#about">About</a>
        <a href="#inquire" className="gold">Request a quote</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="wrap hero">
      <div className="eyebrow">Toronto &amp; the GTA</div>
      <h1>The night, <em>composed.</em></h1>
      <p>DJ and entertainment for weddings, luxury private celebrations and corporate events.</p>
      <div className="cta">
        <a href="#inquire" className="btn">Request a quote</a>
        <a href="#reel" className="link">Watch the reel</a>
      </div>
      <div id="reel" className="reel">
        <video src="/videos/wedding.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="ASLAN performing at a wedding" />
      </div>
    </section>
  )
}

function Residencies() {
  return (
    <section id="residencies" className="wrap sec">
      <div className="eyebrow">Residencies</div>
      <h2 className="h2" style={{ maxWidth: 760, marginBottom: 48 }}>Resident DJ at Chef's Hall and Jack Astor's.</h2>
      <div className="venues">
        {venues.map((v) => (
          <div className="venue" key={v.name}>
            <div className="ph"><img src={v.img} alt={v.name} /></div>
            <h3>{v.name}</h3>
            <div className="muted">{v.note}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

function Experience() {
  return (
    <section id="experience" className="wrap sec">
      <div className="track">
        <div>
          <div className="eyebrow">Track record</div>
          <h2 className="h2">Open-format DJ since 2016.</h2>
          <p className="muted" style={{ margin: 0 }}>No set list. Years of reading rooms across Ontario, brought to your event.</p>
        </div>
        <div>
          {history.map(([name, place]) => (
            <div className="row" key={name}><b>{name}</b><small>· {place}</small></div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Services() {
  return (
    <section id="services" className="wrap sec">
      <div className="cards">
        {services.map((s) => (
          <div className="card" key={s.n}>
            <div className="eyebrow">{s.n}</div>
            <h3>{s.title}</h3>
            <p>{s.body}</p>
            <a href="#inquire" className="link gold">{s.cta}</a>
          </div>
        ))}
      </div>
      <div className="gallery">
        {gallery.map((src) => <img key={src} src={src} alt="ASLAN DJing at an event" />)}
      </div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="wrap sec">
      <div className="about">
        <img src="/images/dj-aslan.JPG" alt="Portrait of Aslan" />
        <div>
          <div className="eyebrow">About</div>
          <h2 className="h2">Deep-house roots. A feel for the room.</h2>
          <p className="muted" style={{ margin: 0 }}>
            Aslan has been an open-format DJ since 2016, playing rooms across Ontario and now resident at Chef's Hall and Jack Astor's.
            With no set list and a deep-house foundation, he reads the crowd and builds the night around your guests, from an elegant
            ceremony to a packed dance floor.
          </p>
        </div>
      </div>
    </section>
  )
}

function Process() {
  return (
    <section className="wrap sec">
      <div className="steps">
        {steps.map(([n, t, d]) => (
          <div className="step" key={n}>
            <div className="eyebrow">{n}</div>
            <h3>{t}</h3>
            <p className="muted">{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Inquire() {
  const [status, setStatus] = useState('idle')

  async function onSubmit(e) {
    e.preventDefault()
    const form = e.target
    setStatus('sending')
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { Accept: 'application/json' },
        body: new FormData(form),
      })
      if (!res.ok) throw new Error('request failed')
      form.reset()
      setStatus('ok')
    } catch {
      setStatus('err')
    }
  }

  return (
    <section id="inquire" className="wrap sec">
      <div className="inquire">
        <div>
          <div className="eyebrow">Request a quote</div>
          <h2 className="h2" style={{ marginBottom: 20 }}>Check your date.</h2>
          <p className="muted" style={{ margin: 0 }}>Tell us about your event and we'll send a tailored quote. We reply within one business day.</p>
        </div>
        <form onSubmit={onSubmit}>
          <input className="hp" type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />
          <input type="hidden" name="_subject" value="New quote request – ASLAN website" />
          <div className="fld"><label htmlFor="n-name">Name</label><input className="f" id="n-name" name="name" required /></div>
          <div className="fld"><label htmlFor="n-email">Email</label><input className="f" id="n-email" type="email" name="email" required /></div>
          <div className="fld"><label htmlFor="n-phone">Phone</label><input className="f" id="n-phone" type="tel" name="phone" /></div>
          <div className="fld">
            <label htmlFor="n-type">Event type</label>
            <select className="f" id="n-type" name="event-type">
              <option>Wedding</option>
              <option>Corporate event</option>
              <option>Private party</option>
              <option>Other</option>
            </select>
          </div>
          <div className="fld"><label htmlFor="n-date">Event date</label><input className="f" id="n-date" type="date" name="date" /></div>
          <div className="fld"><label htmlFor="n-venue">Venue / city</label><input className="f" id="n-venue" name="venue" /></div>
          <div className="fld"><label htmlFor="n-guests">Guest count</label><input className="f" id="n-guests" name="guests" inputMode="numeric" /></div>
          <div className="fld full"><label htmlFor="n-msg">Tell us about the evening</label><textarea className="f" id="n-msg" name="message" /></div>
          <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Request a quote'}</button>
          {status === 'ok' && <p className="msg ok" role="status">Thank you. We'll be in touch within one business day.</p>}
          {status === 'err' && <p className="msg err" role="alert">Something went wrong. Please try again or email {EMAIL}.</p>}
        </form>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="wrap">
      <a href="#top" className="logo">ASLAN</a>
      <div>Toronto &amp; the GTA · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
      <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>Instagram</a>
      <div>© {new Date().getFullYear()} Aslan Group</div>
    </footer>
  )
}

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Residencies />
        <Experience />
        <Services />
        <About />
        <Process />
        <Inquire />
      </main>
      <Footer />
    </>
  )
}
