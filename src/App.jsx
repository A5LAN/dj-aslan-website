import { useState, useEffect } from 'react'

const FORM_ENDPOINT = 'https://formspree.io/f/xpwdzgbb'
const EMAIL = 'sales@aslangroup.ca'
const INSTAGRAM = 'https://www.instagram.com/_djaslan/'

const history = [
  ['The Drink', 'now Crown Bar & Social · Waterloo'],
  ['Pub on King', 'Waterloo'],
  ["Phil's", 'Waterloo'],
  ['The Frog', 'London'],
  ['Pub on Richmond', 'closed'],
]

const services = [
  { n: '01', title: 'Weddings', body: 'Ceremony, cocktail hour and reception. One DJ, one plan, a dance floor that stays full.', cta: 'Book Now for your date' },
  { n: '02', title: 'Corporate & Private', body: 'Galas, launches, holiday parties and private celebrations, set to the room and the guest list.', cta: 'Book Now for your event' },
]
const showcase = ['/images/wedding-main.jpg', '/images/wedding-main-2.jpg', '/images/wedding-main-3.jpg', '/images/wedding-main-4.jpg']

const steps = [
  ['I', 'Book Now', 'Share your date, venue and guest count. Pricing is tailored to each event.'],
  ['II', 'Consult', 'A short call to shape the evening and confirm the details.'],
  ['III', 'Perform', 'You enjoy the night. The music takes care of itself.'],
]

const HOME_TITLE = document.title
const p = (names) => names.map((n) => `/images/${n}`)
const categories = [
  { key: 'wedding', label: 'Weddings', images: p(['wedding-1.jpg', 'wedding-2.jpg', 'wedding-3.jpg', 'wedding-setup.jpg']) },
  { key: 'private', label: 'Private Parties', images: p(['private-party.jpg', 'private-party-2.jpg']) },
  { key: 'corporate', label: 'Corporate', images: p(['corporate-golf.jpg', 'corporate-golf-2.JPG']) },
  { key: 'club', label: 'Clubs', images: p(['club.jpg', 'club-2.jpg', 'club-3.jpg', 'club-4.jpg', 'club-5.jpg', 'club-6.jpg', 'club-7.jpg', 'club-8.JPG']) },
  { key: 'chef', label: "Chef's Hall", images: p(['IMG_0018.jpg', 'chef-hall.jpg', 'chef-hall-2.jpg', 'chef-hall-3.jpg', 'chef-hall-4.jpg']) },
  { key: 'jacks', label: "Jack Astor's", images: p(['jacks.jpg', 'jacks-burlington.jpg', 'jacks-eaton.jpg', 'jacks-vaughan.jpg', 'jacks-vaughan-2.jpg']) },
]
const uncategorized = p(['special-event.jpg', 'djing-bracelet.jpg', 'playdium-fairview.jpg', 'IMG_8043.jpg'])
const allImages = [...categories.flatMap((c) => c.images), ...uncategorized]

function GalleryPage() {
  const [cat, setCat] = useState('all')
  const [big, setBig] = useState(null)
  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Gallery | ASLAN | DJ for Weddings & Corporate Events | Toronto & the GTA'
    return () => { document.title = HOME_TITLE }
  }, [])
  useEffect(() => {
    if (!big) return
    const onKey = (e) => { if (e.key === 'Escape') setBig(null) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [big])
  const images = cat === 'all' ? allImages : categories.find((c) => c.key === cat).images
  return (
    <main>
      <section className="wrap sec gal-page">
        <div className="eyebrow">Gallery</div>
        <h1 className="h2" style={{ marginBottom: 32 }}>Moments behind the decks.</h1>
        <div className="tabs" role="tablist">
          <button type="button" role="tab" aria-selected={cat === 'all'} className={cat === 'all' ? 'on' : ''} onClick={() => setCat('all')}>All</button>
          {categories.map((c) => (
            <button type="button" role="tab" aria-selected={cat === c.key} key={c.key} className={cat === c.key ? 'on' : ''} onClick={() => setCat(c.key)}>{c.label}</button>
          ))}
        </div>
        <div className="gallery">
          {images.map((src) => (
            <button type="button" className="g-item" key={src} onClick={() => setBig(src)} aria-label="View photo">
              <img src={src} alt="ASLAN DJing at an event" />
            </button>
          ))}
        </div>
      </section>
      {big && (
        <div className="lightbox" onClick={() => setBig(null)}>
          <img src={big} alt="ASLAN DJing at an event" />
        </div>
      )}
    </main>
  )
}

function Header() {
  return (
    <header className="wrap top">
      <a href="/#top" className="logo brand" aria-label="ASLAN">
        <img src="/images/aslan-mark.svg" alt="" width="44" height="44" />
        <span>ASLAN</span>
      </a>
      <nav>
        <a href="/#services">Weddings</a>
        <a href="/gallery">Gallery</a>
        <a href="/#residencies">Residencies</a>
        <a href="/#about">About</a>
        <a href="/#inquire" className="gold">Book Now</a>
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section id="top" className="wrap hero">
      <div className="eyebrow">Serving Toronto &amp; The GTA</div>
      <h1>The night, <em>composed.</em></h1>
      <p>DJ and entertainment for weddings, luxury private celebrations and corporate events.</p>
      <div className="cta">
        <a href="#inquire" className="btn">Book Now</a>
        <a href="#inquire" className="link">Request Recent Mixes</a>
      </div>
      <div id="reel" className="reel">
        <video src="/videos/wedding.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="ASLAN performing at a wedding" />
      </div>
    </section>
  )
}

function VenueSlider({ images, name, note, delay = 0 }) {
  const [i, setI] = useState(0)
  const n = images.length
  useEffect(() => {
    let t
    const start = setTimeout(() => {
      t = setInterval(() => setI((x) => (x + 1) % n), 4500)
    }, delay)
    return () => { clearTimeout(start); clearInterval(t) }
  }, [n, delay, i])
  const go = (d) => setI((i + d + n) % n)
  return (
    <div className="venue">
      <div className="slider">
        <div className="slides" style={{ transform: `translateX(-${i * 100}%)` }}>
          {images.map((src, k) => (
            <div className="slide" key={src} style={{ '--bg': `url(${src})` }}>
              <img src={src} alt={`${name} ${k + 1}`} />
            </div>
          ))}
        </div>
        <button type="button" className="sl-btn prev" onClick={() => go(-1)} aria-label="Previous photo">‹</button>
        <button type="button" className="sl-btn next" onClick={() => go(1)} aria-label="Next photo">›</button>
        <div className="sl-dots">
          {images.map((_, k) => (
            <button type="button" key={k} className={k === i ? 'on' : ''} onClick={() => setI(k)} aria-label={`Photo ${k + 1}`} />
          ))}
        </div>
      </div>
      <div className="venue-cap">
        <h3>{name}</h3>
        <span className="muted">{note}</span>
      </div>
    </div>
  )
}

function Residencies() {
  return (
    <section id="residencies" className="wrap sec">
      <div className="eyebrow" style={{ marginBottom: 32 }}>Residencies</div>
      <div className="venues">
        <VenueSlider
          name="Chef's Hall"
          note="Resident DJ"
          images={['/images/IMG_0018.jpg', '/images/chef-hall-3.jpg', '/images/chef-hall-4.jpg', '/images/chef-hall-2.jpg']}
        />
        <VenueSlider
          name="Jack Astor's"
          note="Resident DJ · Multiple locations across Ontario"
          delay={2200}
          images={['/images/jacks.jpg', '/images/jacks-burlington.jpg', '/images/jacks-eaton.jpg', '/images/jacks-vaughan.jpg']}
        />
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
      <div className="showcase">
        {showcase.map((src) => <img key={src} src={src} alt="ASLAN DJing at a wedding" />)}
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
          <div className="eyebrow">Book Now</div>
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
          <button className="btn" type="submit" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Book Now'}</button>
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
      <a href="/#top" className="logo brand" aria-label="ASLAN">
        <img src="/images/aslan-mark.svg" alt="" width="36" height="36" />
        <span>ASLAN</span>
      </a>
      <div>Toronto &amp; the GTA · <a href={`mailto:${EMAIL}`}>{EMAIL}</a></div>
      <a href={INSTAGRAM} target="_blank" rel="noreferrer" style={{ minHeight: 44, display: 'inline-flex', alignItems: 'center' }}>Instagram</a>
      <div>© {new Date().getFullYear()} Aslan Group</div>
    </footer>
  )
}

export default function App() {
  const isGallery = window.location.pathname.replace(/\/+$/, '') === '/gallery'
  return (
    <>
      <Header />
      {isGallery ? (
        <GalleryPage />
      ) : (
        <main>
          <Hero />
          <Residencies />
          <Experience />
          <Services />
          <About />
          <Process />
          <Inquire />
        </main>
      )}
      <Footer />
    </>
  )
}
