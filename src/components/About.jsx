import BuyButtons from "./BuyButtons";
import { SITE } from "../data/config";

export default function About() {
  return (
    <section id="about" className="about">
      <div className="wrap">
        <p className="eyebrow">About the book</p>
        <h2 className="section-title">A study guide that reads like a story</h2>
        <p>{SITE.about.intro}</p>
        <p>{SITE.about.body}</p>

        <div className="about-specs">
          <span>
            <strong>{SITE.about.pages}</strong>
            Length
          </span>
          <span>
            <strong>{SITE.about.price}</strong>
            Price
          </span>
          <span>
            <strong>Domain 1</strong>
            Available now
          </span>
        </div>

        <BuyButtons context="about" />
      </div>
    </section>
  );
}
