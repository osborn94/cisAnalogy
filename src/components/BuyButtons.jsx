import { SALES_CHANNELS } from "../data/salesChannels";
import { trackEvent } from "../lib/analytics";

/**
 * Renders one button per active sales channel. Used in both the
 * About section and the Series section so there's a single source
 * of truth for where the book can be bought — add a channel in
 * data/salesChannels.js and it shows up everywhere this component
 * is used.
 */
export default function BuyButtons({ channels, context, className = "" }) {
  const list = (channels ?? SALES_CHANNELS).filter((c) => c.active);

  if (list.length === 0) return null;

  return (
    <div className={`btn-row ${className}`}>
      {list.map((channel) => (
        <a
          key={channel.id}
          className="btn btn-primary"
          href={channel.url}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackEvent("buy_click", { platform: channel.id, context })
          }
        >
          Buy on {channel.name}
        </a>
      ))}
    </div>
  );
}
