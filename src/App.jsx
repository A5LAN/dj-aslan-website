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

const wdMoments = [
  { n: '01', title: 'The Grand Entrance', body: 'The lights shift and the room turns toward the door. You are announced into a space that already feels like yours.', img: '/images/wedding-main.jpg' },
  { n: '02', title: 'Dinner and Toasts', body: 'Warm light and a considered soundtrack hold the room while the words that matter are spoken.', img: '/images/wedding-setup.jpg' },
  { n: '03', title: 'The First Dance', body: 'Light, sound, and a low rolling fog, where the venue allows, turn one song into the scene you will replay for years.', img: '/images/wedding-main-2.jpg' },
  { n: '04', title: 'The Dance Floor', body: 'The energy builds, and so does the room. We read the crowd, move the lighting with it, and keep everyone in it.', img: '/images/wedding-main-3.jpg' },
  { n: '05', title: 'The Last Song', body: 'A finale chosen with you, so the night ends on the exact feeling you want everyone to carry home.', img: '/images/wedding-main-4.jpg' },
]

const wdTiers = [
  { key: 'tier1', label: 'Collection I', name: 'Essential', tagline: 'The foundation of a great night.', items: ['Open-format DJ for your full reception', 'Professional sound system for ceremony & reception', 'Wireless microphones for toasts & speeches'] },
  { key: 'tier2', label: 'Collection II', name: 'Signature', tagline: 'Where the room begins to transform.', items: ['Everything in Essential', 'Custom uplighting for your venue', 'Dedicated MC & timeline coordination with your planner'] },
  { key: 'tier3', label: 'Collection III', name: 'Prestige', tagline: 'The full ASLAN experience.', items: ['Everything in Signature', 'First-dance fog effect (venue permitting)', 'Monogram & dance-floor lighting design'] },
]

function WeddingsPage() {
  const [status, setStatus] = useState('idle')

  useEffect(() => {
    window.scrollTo(0, 0)
    document.title = 'Weddings | ASLAN | DJ for Weddings & Corporate Events | Toronto & the GTA'
    return () => { document.title = HOME_TITLE }
  }, [])

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
    <div className="wd">
      <header className="wd-nav">
        <nav className="wd-nav-inner">
          <a href="#wd-difference" className="wd-logo">ASLAN <span>GROUP</span></a>
          <div className="wd-navlinks">
            <a href="#wd-difference">The Difference</a>
            <a href="#wd-night">Your Night</a>
            <a href="#wd-collections">Collections</a>
            <a href="#wd-inquire" className="wd-btn wd-btn-line" style={{ padding: '13px 26px', fontSize: 12 }}>Book a Consultation</a>
          </div>
        </nav>
      </header>

      <main>
        <section id="wd-difference" className="wd-section wd-light">
          <div className="wd-inner">
            <div className="wd-head">
              <div className="wd-eyebrow">The ASLAN Difference</div>
              <h2 className="wd-h2">Anyone can play music.<br />We create the moment.</h2>
              <p className="wd-lede">A great playlist fills a room. An experience changes it. Here is how the night feels different when ASLAN Group is in charge of it.</p>
              <div className="wd-cta-row">
                <a href="#wd-inquire" className="wd-btn wd-btn-ink">Book a Consultation</a>
                <a href="#wd-collections" className="wd-btn wd-btn-ink-line">Explore the Collections</a>
              </div>
            </div>

            <div className="wd-compare">
              <div className="wd-compare-col std">
                <div className="wd-compare-label">A standard wedding DJ</div>
                <div className="wd-compare-title">Plays the songs.</div>
                <div className="wd-compare-list">
                  <div className="wd-compare-item">Brings a speaker and a microphone</div>
                  <div className="wd-compare-item">Makes the announcements</div>
                  <div className="wd-compare-item">Works from a playlist</div>
                  <div className="wd-compare-item">Packs up when the last song ends</div>
                </div>
              </div>
              <div className="wd-compare-col us">
                <div className="wd-compare-label">ASLAN Group</div>
                <div className="wd-compare-title">Creates the memory.</div>
                <div className="wd-compare-list">
                  <div className="wd-compare-item">Entertainers and a team who run the room, not just the music</div>
                  <div className="wd-compare-item">Uplighting designed around your venue</div>
                  <div className="wd-compare-item">A first dance wrapped in atmosphere, with fog where the venue allows</div>
                  <div className="wd-compare-item">A night directed moment by moment</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="wd-night" className="wd-section wd-dark">
          <div className="wd-inner">
            <div className="wd-head">
              <div className="wd-script" style={{ fontSize: 'clamp(44px,5.4vw,68px)' }}>Your night,</div>
              <h2 className="wd-h2" style={{ margin: 0 }}>moment by moment</h2>
              <p className="wd-lede">From the first step into the room to the final song, every moment is shaped on purpose.</p>
            </div>
            <div className="wd-night">
              {wdMoments.map((m, idx) => (
                <div className={`wd-moment${idx % 2 ? ' rev' : ''}`} key={m.n}>
                  <div className="wd-moment-text">
                    <div className="wd-moment-num">{m.n}</div>
                    <h3 className="wd-moment-title">{m.title}</h3>
                    <p className="wd-moment-body">{m.body}</p>
                  </div>
                  <div className="wd-moment-img">
                    <img src={m.img} alt={m.title} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="wd-collections" className="wd-section wd-light">
          <div className="wd-inner">
            <div className="wd-head">
              <div className="wd-eyebrow">The Collections</div>
              <h2 className="wd-h2">Three ways to shape your night</h2>
              <p className="wd-lede">Each collection builds on the one before it, and each can be extended with add-ons. Pricing is shared in a private consultation, so every quote fits your event.</p>
            </div>

            <div className="wd-cards">
              {wdTiers.map((t) => (
                <div className={`wd-card ${t.key}`} key={t.key}>
                  <div className="wd-card-label">{t.label}</div>
                  <h3 className="wd-card-title">{t.name}</h3>
                  <div className="wd-card-tagline">{t.tagline}</div>
                  <div className="wd-card-list">
                    {t.items.map((it) => <div className="wd-card-item" key={it}>{it}</div>)}
                  </div>
                  <a href="#wd-inquire" className="wd-card-link">Inquire about {t.name} →</a>
                </div>
              ))}
            </div>

            <div className="wd-addons">
              <div className="wd-script" style={{ fontSize: 40 }}>Make it yours</div>
              <p className="wd-lede" style={{ maxWidth: 560, margin: '8px auto 0' }}>Every collection can be extended with lighting, atmosphere, and more.</p>
              <div className="wd-addon-list">
                <span className="wd-addon">Uplighting</span>
                <span className="wd-addon">First-dance fog (venue permitting)</span>
                <span className="wd-addon">Monogram projection</span>
                <span className="wd-addon">Extended hours</span>
              </div>
            </div>
          </div>
        </section>

        <section className="wd-section wd-testimonial">
          <div className="wd-testimonial-inner">
            <div className="wd-quote-mark" aria-hidden="true">&ldquo;</div>
            <blockquote className="wd-quote">Aslan read the room perfectly all night. The dance floor never emptied, and the first dance with the fog was better than we imagined.</blockquote>
            <div className="wd-quote-by">Recent ASLAN Group couple</div>
          </div>
        </section>

        <section id="wd-inquire" className="wd-section wd-dark">
          <div className="wd-inquire-inner">
            <div className="wd-inquire-text">
              <div className="wd-eyebrow">Begin Here</div>
              <div className="wd-inquire-script">Let&apos;s create</div>
              <h2 className="wd-h2" style={{ margin: 0 }}>your moment.</h2>
              <p className="wd-lede" style={{ maxWidth: '44ch' }}>Tell us about your celebration. We will reach out to talk through your vision, your venue, and which collection fits the night you imagine.</p>
            </div>

            <form className="wd-form" onSubmit={onSubmit}>
              <input className="hp" type="text" name="_gotcha" tabIndex="-1" autoComplete="off" aria-hidden="true" />
              <input type="hidden" name="_subject" value="New wedding inquiry – ASLAN website" />
              <div className="wd-fld">
                <label htmlFor="w-name">Your name(s)</label>
                <input className="wd-input" id="w-name" name="name" type="text" required />
              </div>
              <div className="wd-fld">
                <label htmlFor="w-email">Email</label>
                <input className="wd-input" id="w-email" name="email" type="email" required />
              </div>
              <div className="wd-row2">
                <div className="wd-fld">
                  <label htmlFor="w-date">Event date</label>
                  <input className="wd-input" id="w-date" name="date" type="date" />
                </div>
                <div className="wd-fld">
                  <label htmlFor="w-type">Event type</label>
                  <select className="wd-input" id="w-type" name="event-type">
                    <option>Wedding</option>
                    <option>Private celebration</option>
                    <option>Corporate event</option>
                    <option>Other</option>
                  </select>
                </div>
              </div>
              <div className="wd-fld">
                <label htmlFor="w-msg">The night you imagine</label>
                <textarea className="wd-input" id="w-msg" name="message" rows="4" />
              </div>
              <div>
                <button className="wd-btn wd-btn-gold" type="submit" disabled={status === 'sending'}>
                  {status === 'sending' ? 'Sending…' : 'Request a Consultation'}
                </button>
              </div>
              {status === 'ok' && <p className="msg ok" role="status">Thank you. We&apos;ll be in touch within one business day.</p>}
              {status === 'err' && <p className="msg err" role="alert">Something went wrong. Please try again or email {EMAIL}.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="wd-footer">
        <div className="wd-footer-inner">
          <div>
            <div className="wd-logo">ASLAN <span>GROUP</span></div>
            <div className="wd-footer-script">Moments that last.</div>
          </div>
          <div className="wd-footer-links">
            <a href={`mailto:${EMAIL}`}>{EMAIL}</a>
            <a href={INSTAGRAM} target="_blank" rel="noreferrer">Instagram</a>
            <span>Toronto &amp; the GTA</span>
          </div>
        </div>
        <div className="wd-footer-bottom">© {new Date().getFullYear()} ASLAN Group. All rights reserved.</div>
      </footer>
    </div>
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
        <a href="/weddings">Weddings</a>
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
  const path = window.location.pathname.replace(/\/+$/, '')
  if (path === '/weddings') return <WeddingsPage />
  const isGallery = path === '/gallery'
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
