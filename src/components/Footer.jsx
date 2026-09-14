import { SITE } from "../data/config";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="wrap footer-row">
        <span>
          © {year} {SITE.brand}
        </span>
        <div className="footer-links">
          <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
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
          <a href={SITE.privacyNoticeUrl}>Privacy notice</a>
        </div>
      </div>
    </footer>
  );
}
