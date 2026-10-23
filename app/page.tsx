/* eslint-disable @next/next/no-img-element */
import Wordmark from './components/Wordmark';
import StickyHeader from './components/StickyHeader';
import HeroFilm from './components/HeroFilm';
import Categories from './components/Categories';
import Reveal from './components/Reveal';
import ApplyForm from './components/ApplyForm';
import { categories, questions } from './content';

export default function Home() {
  return (
    <>
      <StickyHeader />
      <header className="ink hero" id="top">
        <div className="wrap">
          <div className="top">
            <a href="#top" aria-label="Menzura, home"><Wordmark /></a>
            <a className="btn btn-line btn-sm" href="#apply">Apply</a>
          </div>
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 className="t-hero">One house. Every room.</h1>
              <div className="chalk" aria-hidden="true">
                <span className="rule" />
                <span className="tick" style={{ left: 0 }} />
                <span className="tick" style={{ left: '33.4%' }} />
                <span className="tick" style={{ left: '66.6%' }} />
                <span className="tick" style={{ right: 0 }} />
              </div>
              <div className="hero-foot" style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <p className="t-lead">A private house of 500 members. Your wardrobe made to your measure every month, and a welcome among peers wherever you go. By invitation only.</p>
                <div className="actions">
                  <a className="btn btn-solid" href="#apply">Apply for membership</a>
                  <a className="btn btn-line" href="#apply" data-invite="">I have an invitation</a>
                </div>
              </div>
            </div>
            <HeroFilm />
          </div>
        </div>
      </header>

      <main>
        <section className="section indigo" aria-labelledby="h-handles">
          <div className="wrap">
            <div className="head">
              <h2 id="h-handles" className="t-section">What the house handles</h2>
              <p className="muted">Five things the house takes care of, so you don’t have to. Open each to see everything included; pieces marked Principal are part of The Principal membership.</p>
            </div>
            <Categories items={categories} />
          </div>
        </section>

        <section className="section ink" aria-labelledby="h-belong">
          <div className="wrap">
            <div className="head">
              <h2 id="h-belong" className="t-section">Two ways to belong</h2>
              <p>Membership is yearly, reviewed and offered personally. The Principal’s terms are shared with you directly. Shipping and duties are shown with each delivery, so nothing is due at your door.</p>
            </div>
            <div className="tiers">
              <article className="tier">
                <div className="tier-head"><h3 className="t-card">The Member</h3><p className="t-small">For the man who wants his wardrobe handled, month by month.</p></div>
                <div className="tier-service"><h4 className="t-sub" style={{ margin: 0, fontWeight: 400 }}>Your service experience</h4><p>A monthly piece proposed from the current collection, guided by your record and your calendar. You approve, swap or hold it from your phone.</p></div>
                <div className="includes">
                  <div className="price"><p className="t-meta muted">2027 membership from</p><div className="price-row"><span className="price-amount">$24,000</span><span className="price-unit">USD a year</span></div></div>
                  <h4 className="t-sub" style={{ margin: 0, fontWeight: 400 }}>What is included</h4>
                  <ul className="items">
                    <li>A piece made to your measure every month</li>
                    <li>A personal stylist who works with you, or with your assistant</li>
                    <li>A portrait session every month, directed by your stylist</li>
                    <li>The circle: dinners, hosting your own guests, introductions and two invitations a year</li>
                    <li>Privileges at partner hotels and invitation-only restaurants</li>
                    <li>The fit commitment, the occasion guarantee, the privacy promise and your place held</li>
                  </ul>
                </div>
                <div className="grow" />
                <a className="btn btn-solid" href="#apply" data-tier="The Member">Apply as a Member</a>
              </article>
              <article className="tier tier-principal">
                <div className="tier-head"><h3 className="t-card">The Principal</h3><p className="t-small">For the man whose calendar asks more of his wardrobe.</p></div>
                <div className="tier-service"><h4 className="t-sub" style={{ margin: 0, fontWeight: 400 }}>Your service experience</h4><p>Dedicated attention for the man who needs a wardrobe that keeps pace with travel, events and changing seasons.</p></div>
                <div className="price"><p className="t-meta muted">Terms</p><div className="price-row"><span className="price-personal">Offered personally</span></div></div>
                <div className="includes">
                  <h4 className="t-sub" style={{ margin: 0, fontWeight: 400 }}>What is included</h4>
                  <ul className="items">
                    <li>Everything in The Member, plus</li>
                    <li>Three further commissions a year, for occasions you choose</li>
                    <li>A dedicated stylist who replies within hours, seven days a week</li>
                    <li>Extended portrait sessions on location, with grooming</li>
                    <li>Pieces delivered by hand, and cared for as long as you are a member</li>
                    <li>The house on call, wherever you are</li>
                  </ul>
                </div>
                <div className="grow" />
                <a className="btn btn-line" href="#apply" data-tier="The Principal">Apply as a Principal</a>
              </article>
            </div>
            <div className="footnote">
              <p className="fit t-sub">If a garment does not fit as it should, we alter or remake it.</p>
              <p>Founding members, who joined before the house opened, keep their founding number and status for as long as they remain members.</p>
            </div>
          </div>
        </section>

        <section className="section paper" aria-labelledby="h-craft">
          <div className="wrap">
            <h2 id="h-craft" className="statement">Every piece is cut for one man, in premium cloth, by hand.</h2>
            <div className="proof">
              {[
                ['The cloth', 'Premium cloth, chosen by the house for each collection. Every piece carries a note naming its cloth and the month it was made.'],
                ['The making', 'Cut and finished by hand in a master tailor’s workshop, to the house’s own designs. Nothing is released before it has been worn.'],
                ['The fit', 'Measured once and fitted once when you join, then refined with every piece. If anything is not right, we alter or remake it.'],
              ].map(([t, d], i) => (
                <Reveal as="article" key={t} delay={i * 0.15}><h3 className="t-card">{t}</h3><p>{d}</p></Reveal>
              ))}
            </div>
            <p className="process">Measured once. A piece every month. Delivered anywhere, with duties shown before you approve.</p>
          </div>
        </section>

        <section className="section indigo" aria-labelledby="h-trad">
          <div className="wrap">
            <h2 id="h-trad" className="t-section" style={{ maxWidth: 560 }}>Two traditions, one standard.</h2>
            <div className="cards">
              <figure className="card">
                <img src="/images/tradition-boardroom.jpg" alt="A man in a navy suit standing in a quiet stone hallway" width={1152} height={928} loading="lazy" />
                <p className="caption">Front, cut two</p>
                <h3 className="t-card">The Boardroom</h3>
                <p>Suits, dinner jackets and overcoats for the life you lead.</p>
              </figure>
              <figure className="card">
                <img src="/images/tradition-heritage.jpg" alt="A seated man in a cream agbada and cap in a dark, book-lined room" width={1152} height={928} loading="lazy" />
                <p className="caption">Body, cut one on the fold</p>
                <h3 className="t-card">The Heritage</h3>
                <p>Agbadas and kaftans for the occasions that matter most.</p>
              </figure>
            </div>
          </div>
        </section>

        <section className="section paper" aria-labelledby="h-note">
          <div className="wrap split">
            <h2 id="h-note" className="t-section">A note from the house</h2>
            <div className="letter">
              <p>For years, the best-dressed men we knew had the same problem. Their suits came from the best names in the world and still did not fit. The ones who found a great tailor rarely had time to go back for the fittings. And the finest agbadas we had ever seen were made an ocean away.</p>
              <p>Menzura began with one of those tailors, and a simple question: what if his hands could reach any man, anywhere, while asking almost none of his time? Today a member is measured once, and the house does the rest.</p>
              <div className="signature"><strong>The house</strong><span className="t-small">Menzura</span></div>
            </div>
          </div>
        </section>

        <section className="section paper" aria-labelledby="h-q" style={{ paddingTop: 0 }}>
          <div className="wrap split">
            <h2 id="h-q" className="t-section">Questions</h2>
            <div className="faq">
              {questions.map((g) => (
                <div key={g.group}>
                  <p className="q-group">{g.group}</p>
                  {g.items.map((q) => (<details key={q.q}><summary>{q.q}</summary><p>{q.a}</p></details>))}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section indigo" id="apply" aria-labelledby="h-apply">
          <div className="wrap split">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <h2 id="h-apply" className="t-section">Apply for membership</h2>
              <p>The house reviews every application personally and replies within one business day.</p>
            </div>
            <ApplyForm />
          </div>
        </section>
      </main>

      <footer className="indigo footer">
        <div className="wrap footer-row">
          <div><Wordmark /><p className="t-small">Delivered worldwide</p></div>
          <p>menzura.co</p>
          <nav className="footer-links" aria-label="Legal"><a href="/privacy">Privacy</a><a href="/terms">Terms</a><a href="mailto:house@menzura.co">Contact</a></nav>
          <p>© 2026 Menzura</p>
        </div>
      </footer>
    </>
  );
}
