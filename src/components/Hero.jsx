import { SITE } from "../data/config";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="wrap">
        <div className="hero-copy">
          <p className="eyebrow">{SITE.hero.eyebrow}</p>
          <h1>{SITE.tagline}</h1>
          <p className="hero-sub">{SITE.hero.subtitle}</p>
          <div className="btn-row">
            <a className="btn btn-primary" href="#about">
              Buy Domain 1
            </a>
            <a className="btn btn-outline" href="#series">
              See the series
            </a>
          </div>
        </div>

        <div className="hero-cover" aria-hidden="true">
          
          <img src="/cisImage2.jpg" alt="" />
        </div>
      </div>
    </section>
  );
}
