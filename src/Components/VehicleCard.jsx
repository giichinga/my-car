import { useState } from "react";
import "../assets/Styles/VehicleCard.css";

// ── Icons ──
function HeartIcon({ filled }) {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 21C12 21 3 14.5 3 8.5C3 5.42 5.42 3 8.5 3C10.24 3 11.91 3.81 13 5.08C14.09 3.81 15.76 3 17.5 3C20.58 3 23 5.42 23 8.5C23 14.5 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill={filled ? "currentColor" : "none"}
      />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9" r="2.5" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function OdometerIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v5l3 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function InspectionIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M9 5H7a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <rect x="9" y="3" width="6" height="4" rx="1" stroke="currentColor" strokeWidth="1.6" />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3-8.57A2 2 0 0 1 3.11 2h3a2 2 0 0 1 2 1.72c.13 1 .38 1.98.73 2.93a2 2 0 0 1-.45 2.11L7.09 9.91a16 16 0 0 0 5.55 5.55l1.15-1.15a2 2 0 0 1 2.11-.45c.95.35 1.93.6 2.93.73A2 2 0 0 1 22 16.92z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function CarPlaceholderIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 17H3a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h14l4 4v4a2 2 0 0 1-2 2h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="7.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="17.5" cy="17.5" r="2.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

// ── Helpers ──
function formatPrice(amount) {
  return new Intl.NumberFormat("en-KE").format(amount);
}

function formatMileage(km) {
  return new Intl.NumberFormat("en-KE").format(km);
}



// ── Component ───
/**
 * VehicleCard
 *
 * Props:
 *   vehicle  — one entry from car-data.json
 *   onView   — called when "View details" is clicked; receives the vehicle object
 *   onContact — called when "Contact seller" is clicked
 *   onInspect — called when "Get inspection" is clicked
 */
export default function VehicleCard({
  vehicle,
  onView,
  onContact,
  onInspect,
}) {
  const [saved, setSaved] = useState(false);

  if (!vehicle) return null;

  const {
    make,
    model,
    year,
    price,
    currency = "KES",
    mileage,
    mileage_unit = "km",
    condition,
    transmission,
    fuel_type,
    engine,
    location,
    images = [],
    badge,
  } = vehicle;

  const title = `${make} ${model} ${year}`;
  const primaryImage = images[0] ?? null;
  const photoCount = images.length;

  // Build specs tokens — only include defined values
  const specTokens = [engine, transmission, fuel_type].filter(Boolean);

  return (
    <article className="vehicle-card" aria-label={title}>

      {/* ── Image ── */}
      <div className="vehicle-card__image-wrap">
        {primaryImage ? (
          <img
            src={primaryImage}
            alt={title}
            className="vehicle-card__image"
            loading="lazy"
          />
        ) : (
          <div className="vehicle-card__image--placeholder">
            <CarPlaceholderIcon />
          </div>
        )}

        {/* Top-left badges */}
        <div className="vehicle-card__badges">
          {badge && (
            <span className="vehicle-card__badge vehicle-card__badge--featured">
              {badge}
            </span>
          )}
        </div>

        {/* Mileage bottom-left */}
        {mileage && (
          <span className="vehicle-card__mileage">
            <OdometerIcon />
            {formatMileage(mileage)} {mileage_unit}
          </span>
        )}

        {/* Photo count bottom-right */}
        {photoCount > 1 && (
          <span className="vehicle-card__photo-count">
            1 / {photoCount}
          </span>
        )}

        {/* Save button top-right */}
        <button
          className={`vehicle-card__save ${saved ? "vehicle-card__save--saved" : ""}`}
          aria-label={saved ? "Remove from saved" : "Save vehicle"}
          onClick={(e) => {
            e.stopPropagation();
            setSaved((s) => !s);
          }}
        >
          <HeartIcon filled={saved} />
        </button>
      </div>

      {/* ── Body ── */}
      <div className="vehicle-card__body">

        {/* Title */}
        <div className="vehicle-card__title-row">
          <h2 className="vehicle-card__title">{title}</h2>
        </div>

        {/* Location + listed time */}
        {(location) && (
          <div className="vehicle-card__meta">
            {location && (
              <>
                <PinIcon />
                <span>{location}</span>
              </>
            )}
            {location &&  <span>·</span>}
            
          </div>
        )}

        {/* Specs row */}
        <div className="vehicle-card__specs">
          {specTokens.map((spec, i) => (
            <span key={spec}>
              <span className="vehicle-card__spec">{spec}</span>
              {i < specTokens.length - 1 && (
                <span className="vehicle-card__spec-dot" aria-hidden="true">·</span>
              )}
            </span>
          ))}

          {condition && (
            <span className="vehicle-card__condition-pill">{condition}</span>
          )}
        </div>

        <div className="vehicle-card__divider" aria-hidden="true" />

        {/* Price */}
        <div className="vehicle-card__price-block">
          <p className="vehicle-card__price-label">Selling price</p>
          <p className="vehicle-card__price">
            <span className="vehicle-card__price-currency">{currency}</span>
            {formatPrice(price, currency)}
          </p>
        </div>

        {/* Action buttons */}
        <div className="vehicle-card__actions">
          <button
            className="vehicle-card__action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onInspect?.(vehicle);
            }}
          >
            <InspectionIcon />
            Get inspection
          </button>
          <button
            className="vehicle-card__action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onContact?.(vehicle);
            }}
          >
            <PhoneIcon />
            Contact seller
          </button>
        </div>

        {/* Primary CTA */}
        <button
          className="vehicle-card__cta"
          onClick={() => onView?.(vehicle)}
        >
          View details
          <ArrowRightIcon />
        </button>

      </div>
    </article>
  );
}