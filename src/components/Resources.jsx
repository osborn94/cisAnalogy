import { RESOURCES } from "../data/resources";
import { trackEvent } from "../lib/analytics";

export default function Resources() {
  return (
    <section id="resources" className="resources">
      <div className="wrap">
        <p className="eyebrow">Recommended resources</p>
        <h2 className="section-title">Books, courses, and tools I recommend</h2>

        <div className="resource-grid">
          {RESOURCES.map((r, i) => (
            <div className="resource-card" key={i}>
              <div
                className="resource-thumb"
                role="img"
                aria-label={`${r.title} cover`}
              />
              <div className="resource-body">
                <h3>{r.title}</h3>
                <p className="provider">{r.provider}</p>
                {r.disclosure && (
                  <span className="disclosure">{r.disclosure}</span>
                )}
                <p className="blurb">{r.blurb}</p>
                <a
                  className="link"
                  href={r.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() =>
                    trackEvent("resource_click", { resource: r.title })
                  }
                >
                  Visit {r.provider}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
