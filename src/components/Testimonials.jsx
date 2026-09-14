import { TESTIMONIALS } from "../data/testimonials";

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="wrap">
        <p className="eyebrow">What people say</p>
        <h2 className="section-title">Endorsements and feedback from readers</h2>

        <div className="testimonial-grid">
          {TESTIMONIALS.map((t, i) => (
            <div className="testimonial-card" key={i}>
              <p className="quote">"{t.quote}"</p>
              <p className="attribution">
                <strong>{t.name}</strong>
                {t.title ? ` · ${t.title}` : ""}
                {t.url && (
                  <>
                    {" · "}
                    <a href={t.url} target="_blank" rel="noopener noreferrer">
                      Profile
                    </a>
                  </>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
