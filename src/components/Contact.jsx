import { SITE } from "../data/config";

export default function Contact() {
  const mailtoHref = `mailto:${SITE.email}?subject=${encodeURIComponent(
    SITE.contactSubject
  )}`;

  return (
    <section id="contact" className="contact">
      <div className="wrap">
        <h2 className="section-title">Contact</h2>
        <a className="contact-email" href={mailtoHref}>
          {SITE.email}
        </a>
        <div className="social-row">
          <a href={SITE.social.x} target="_blank" rel="noopener noreferrer">
            X
          </a>
          <a
            href={SITE.social.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
