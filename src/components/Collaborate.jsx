import { SITE } from "../data/config";

export default function Collaborate() {
  const mailtoHref = `mailto:${SITE.email}?subject=${encodeURIComponent(
    SITE.collaborateSubject
  )}`;

  return (
    <section id="collaborate" className="collaborate">
      <div className="wrap">
        <h2 className="section-title">Collaborate</h2>
        <p className="lead">
          Open to speaking, cross-promotion, training partnerships and study
          groups.
        </p>
        <a className="btn btn-primary" href={mailtoHref}>
          Get in touch
        </a>
      </div>
    </section>
  );
}
