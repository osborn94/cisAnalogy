import { useState } from "react";
import { SITE } from "../data/config";
import { trackEvent } from "../lib/analytics";

/**
 * MAILING LIST — placeholder until the account is connected.
 * ------------------------------------------------------------
 * Set NOTIFY_ENDPOINT once the mailing-list provider is ready (e.g. a
 * Mailchimp/ConvertKit form action URL). Until then, submissions are
 * validated in the browser and shown a success message, but nothing
 * is actually sent anywhere — swap the body of handleSubmit's try
 * block for a real fetch() call once you have the endpoint, and make
 * sure the provider's confirmation emails include an unsubscribe link
 * (most providers add this automatically).
 */
const NOTIFY_ENDPOINT = null;

export default function Notify({
  releaseName = "Domain 2",
  eyebrow = `${releaseName} is coming`,
  title = `Leave your email and I'll let you know when it's available`,
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle"); // idle | loading | ok | err

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email.trim() || !consent) return;

    setStatus("loading");

    if (!NOTIFY_ENDPOINT) {
      // Placeholder path — no provider connected yet.
      setTimeout(() => {
        setStatus("ok");
        setEmail("");
        setConsent(false);
        trackEvent("mailing_list_signup", { 
          list: `${releaseName.toLowerCase().replace(/\s+/g, "-")}-notify`, 
        });
      }, 400);
      return;
    }

    try {
      const res = await fetch(NOTIFY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) {
        setStatus("ok");
        setEmail("");
        setConsent(false);
        trackEvent("mailing_list_signup", { 
          list: `${releaseName.toLowerCase().replace(/\s+/g, "-")}-notify`,
        });
      } else {
        setStatus("err");
      }
    } catch {
      setStatus("err");
    }
  }

  return (
    <section id="notify" className="notify">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>

        <form className="notify-form" onSubmit={handleSubmit} noValidate>
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            aria-label="Email address"
          />

          <label className="consent-row">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
            />
            <span>
              I agree to receive emails about future CISAnalogy releases. Read
              the <a href={SITE.privacyNoticeUrl}>privacy notice</a>. You can
              unsubscribe at any time.
            </span>
          </label>

          <div>
            <button className="btn btn-primary" type="submit" disabled={status === "loading" || !consent}>
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
        </form>

        {status === "ok" && (
          <p className="notify-status ok" role="status">
            You're on the list — I'll email you when Domain 2 is out.
          </p>
        )}
        {status === "err" && (
          <p className="notify-status" role="status">
            Something went wrong. Please try again shortly.
          </p>
        )}

        {/* <p className="notify-placeholder-note">
          Mailing-list provider not yet connected — this form currently shows
          a success message locally. Wire up NOTIFY_ENDPOINT in
          src/components/Notify.jsx once the account is ready.
        </p> */}
      </div>
    </section>
  );
}
