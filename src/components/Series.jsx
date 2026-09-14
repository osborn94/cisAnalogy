import { SERIES } from "../data/series";
import BuyButtons from "./BuyButtons";

export default function Series() {
  return (
    <section id="series" className="series">
      <div className="wrap">
        <p className="eyebrow">The series</p>
        <h2 className="section-title">Five books, one for each CISA domain</h2>

        <div className="series-grid">
          {SERIES.map((book) => {
            const available = book.status === "available";
            return (
              <div
                key={book.domain}
                className={`domain-card ${available ? "available" : "locked"}`}
              >
                {!available && <span className="stamp">Soon</span>}
                <span className="num">{String(book.domain).padStart(2, "0")}</span>
                <h3>{book.title}</h3>
                <p className="status">
                  {available ? "Available now" : "Coming soon"}
                </p>
                {available && (
                  <BuyButtons
                    channels={book.buyLinks?.length ? book.buyLinks : undefined}
                    context={`series-domain-${book.domain}`}
                    className="series-buy"
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
