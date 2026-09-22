import { useState } from "react";

import { SITE } from "../data/config";
import { trackEvent } from "../lib/analytics";

const ZOHO_ACTION = "https://zcv2-zcmp.maillist-manage.eu/weboptin.zc";

const ZOHO_ZX = "14af21ab2e";
const ZOHO_ZCLD = "1417d3a38c1f4b81";
const ZOHO_ZCTD = "1417d3a38c1f0921";
const ZOHO_FORM_IX = "3z0c1ead44210b301bf99ce57f1dde84b3d3e93fa4aa502028b0a78de5555bec0c";


export default function Notify({
  releaseName = "Domain 2",
  eyebrow = `${releaseName} is coming`,
  title = `Leave your email and I'll let you know when it's available`,
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState("idle");

  function handleSubmit(e) {
    e.preventDefault();

    const cleanEmail = email.trim();

    if (!cleanEmail || !consent) {
      return;
    }

    setStatus("loading");

    /*
     * Create the actual Zoho Campaigns form.
     *
     * We are NOT clicking Zoho's JavaScript button.
     * We are submitting the same POST fields that
     * Zoho generated in the working form.
     */
    const form = document.createElement("form");

    form.method = "POST";
    form.action = ZOHO_ACTION;
    form.target = "zohoSignupResponse";
    form.style.display = "none";

    const fields = {
      CONTACT_EMAIL: cleanEmail,
      submitType: "optinCustomView",
      emailReportId: "",
      formType: "QuickForm",
      zx: ZOHO_ZX,
      zcvers: "2.0",
      oldListIds: "",
      mode: "OptinCreateView",
      zcld: ZOHO_ZCLD,
      zctd: ZOHO_ZCTD,
      zc_trackCode: "ZCFORMVIEW",
      zc_formIx: ZOHO_FORM_IX,
    };

    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");

      input.type = "hidden";
      input.name = name;
      input.value = value;

      form.appendChild(input);
    });

    document.body.appendChild(form);

    form.submit();

    /*
     * Give Zoho time to process the request.
     *
     * The response is loaded into the hidden iframe,
     * so the CISAnalogy page itself does not redirect.
     */
    setTimeout(() => {
      setStatus("ok");
      setEmail("");
      setConsent(false);

      trackEvent("mailing_list_signup", {
        list: `${releaseName.toLowerCase().replace(/\s+/g, "-")}-notify`,
      });

      form.remove();
    }, 2000);
  }

  return (
    <section id="notify" className="notify">
      <div className="wrap">
        <p className="eyebrow">{eyebrow}</p>

        <h2 className="section-title">{title}</h2>

        <form
          className="notify-form"
          onSubmit={handleSubmit}
          noValidate
        >
          <input
            type="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            aria-label="Email address"
            autoComplete="email"
          />

          <label className="consent-row">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              required
              disabled={status === "loading"}
            />

            <span>
              I agree to receive emails about future CISAnalogy releases.
              Read the{" "}
              <a href={SITE.privacyNoticeUrl}>
                privacy notice
              </a>
              . You can unsubscribe at any time.
            </span>
          </label>

          <div>
            <button
              className="btn btn-primary"
              type="submit"
              disabled={status === "loading" || !consent}
            >
              {status === "loading" ? "Subscribing…" : "Subscribe"}
            </button>
          </div>
        </form>

        {/* Zoho receives its response here instead of redirecting the page */}
        <iframe
          name="zohoSignupResponse"
          title="Zoho signup response"
          aria-hidden="true"
          tabIndex="-1"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            border: "0",
            opacity: 0,
            pointerEvents: "none",
          }}
        />

        {status === "ok" && (
          <p className="notify-status ok" role="status">
            Thanks for subscribing. Please check your email to confirm your
            subscription.
          </p>
        )}

        {status === "err" && (
          <p className="notify-status" role="status">
            Something went wrong. Please try again shortly.
          </p>
        )}
      </div>
    </section>
  );
}
