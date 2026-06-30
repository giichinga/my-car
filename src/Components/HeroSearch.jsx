import { useRef, useEffect } from "react";
import { useVehicleFilters } from "../Hooks/useVehicleFilters";
import {
  MAKES,
  LOCATIONS,
  COLORS,
  TRANSMISSIONS,
  CONDITIONS,
} from "../Data/filterOptions";
import "../assets/Styles/HeroSearch.css";

// -- Icons --
function SlidersIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M2 5h8M13 5h3M2 13h3M8 13h8M5 2.5v5M13 10.5v5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
      <circle cx="5" cy="5" r="1.6" fill="currentColor" />
      <circle cx="13" cy="13" r="1.6" fill="currentColor" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M2 2l10 10M12 2L2 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ChevronIcon() {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
      <path
        d="M2 3.5L5 6.5L8 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BadgeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="8" fill="#c1392a" />
      <path
        d="M5.5 9.2l2.2 2.2 4.5-4.8"
        stroke="#fff"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ArrowRightIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
      <path
        d="M4 7h6M7 4l3 3-3 3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

// -- Component --
export default function HeroSearch({
  totalCount = 9743,
  onSearch,
  onViewVerified,
  backgroundImageUrl,
}) {
  const {
    filters,
    isPanelOpen,
    availableModels,

    setSearch,
    setMake,
    setModel,
    setYearMin,
    setYearMax,
    setPriceMin,
    setPriceMax,
    setLocation,
    setColor,
    setTransmission,
    setCondition,

    togglePanel,
    closePanel,
    clearFilters,
    clearSearchOnly,
    submitSearch,
  } = useVehicleFilters({ totalCount });

  const wrapRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) {
        closePanel();
      }
    }
    if (isPanelOpen) {
      document.addEventListener("mousedown", handleClick);
    }
    return () => document.removeEventListener("mousedown", handleClick);
  }, [isPanelOpen, closePanel]);

  function handleSubmit(e) {
    e.preventDefault();
    submitSearch(onSearch);
  }

  return (
    <section
      className="hero-search"
      style={
        backgroundImageUrl
          ? { backgroundImage: `linear-gradient(180deg, rgba(10,12,18,0.55), rgba(10,12,18,0.75)), url(${backgroundImageUrl})` }
          : undefined
      }
    >
      <div className="hero-search__content">
        <p className="hero-search__eyebrow">Kenya's Biggest</p>
        <h1 className="hero-search__title">Motor vehicle & acessories marketplace</h1>

        <form
          ref={wrapRef}
          className={`hero-search__panel ${isPanelOpen ? "hero-search__panel--open" : ""}`}
          onSubmit={handleSubmit}
        >
          {/* ── Search row ── */}
          <div className="hero-search__row">
            <div className="hero-search__input-wrap">
              <input
                type="text"
                className="hero-search__input"
                placeholder="Search Make, Model..."
                value={filters.search}
                onChange={(e) => setSearch(e.target.value)}
                aria-label="Search make or model"
              />
              {filters.search ? (
                <button
                  type="button"
                  className="hero-search__clear-input"
                  aria-label="Clear search text"
                  onClick={clearSearchOnly}
                >
                  <CloseIcon />
                </button>
              ) : (
                <button
                  type="button"
                  className="hero-search__sliders"
                  aria-label={isPanelOpen ? "Hide filters" : "Show filters"}
                  aria-expanded={isPanelOpen}
                  onClick={togglePanel}
                >
                  <SlidersIcon />
                </button>
              )}
            </div>

            <button type="submit" className="hero-search__submit">
              Search {totalCount.toLocaleString()} cars
            </button>
          </div>

          <button
            type="button"
            className="hero-search__verified"
            onClick={onViewVerified}
          >
            <span className="hero-search__verified-badge">
              <BadgeIcon />
            </span>
            <span className="hero-search__verified-text">
              <span className="hero-search__verified-title">
                My Car Kenya Verified only
                <span className="hero-search__verified-pill">Recommended</span>
              </span>
              <span className="hero-search__verified-sub">
                Inspected, validated &amp; ready to drive
              </span>
            </span>
            <span className="hero-search__verified-cta">
              View verified cars
              <ArrowRightIcon />
            </span>
          </button>

          {/* ─ Expanded filter grid ─ */}
          {isPanelOpen && (
            <div className="hero-search__filters">
              <div className="hero-search__field">
                <label className="hero-search__label" htmlFor="filter-make">
                  Select make
                </label>
                <div className="hero-search__select-wrap">
                  <select
                    id="filter-make"
                    className="hero-search__select"
                    value={filters.make}
                    onChange={(e) => setMake(e.target.value)}
                  >
                    <option value="">Any</option>
                    {MAKES.map((make) => (
                      <option key={make} value={make}>
                        {make}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              <div className="hero-search__field">
                <label className="hero-search__label" htmlFor="filter-model">
                  Select model
                </label>
                <div className="hero-search__select-wrap">
                  <select
                    id="filter-model"
                    className="hero-search__select"
                    value={filters.model}
                    onChange={(e) => setModel(e.target.value)}
                    disabled={!filters.make}
                  >
                    <option value="">
                      {filters.make ? "Any" : "Select make first"}
                    </option>
                    {availableModels.map((model) => (
                      <option key={model} value={model}>
                        {model}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              <div className="hero-search__field">
                <span className="hero-search__label">Year range</span>
                <div className="hero-search__range">
                  <input
                    type="number"
                    inputMode="numeric"
                    className="hero-search__range-input"
                    placeholder="Min"
                    value={filters.yearMin}
                    onChange={(e) => setYearMin(e.target.value)}
                    aria-label="Minimum year"
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    className="hero-search__range-input"
                    placeholder="Max"
                    value={filters.yearMax}
                    onChange={(e) => setYearMax(e.target.value)}
                    aria-label="Maximum year"
                  />
                </div>
              </div>

              <div className="hero-search__field">
                <span className="hero-search__label">Price (KES)</span>
                <div className="hero-search__range">
                  <input
                    type="number"
                    inputMode="numeric"
                    className="hero-search__range-input"
                    placeholder="Min"
                    value={filters.priceMin}
                    onChange={(e) => setPriceMin(e.target.value)}
                    aria-label="Minimum price"
                  />
                  <input
                    type="number"
                    inputMode="numeric"
                    className="hero-search__range-input"
                    placeholder="Max"
                    value={filters.priceMax}
                    onChange={(e) => setPriceMax(e.target.value)}
                    aria-label="Maximum price"
                  />
                </div>
              </div>

              <div className="hero-search__field">
                <label className="hero-search__label" htmlFor="filter-location">
                  Location
                </label>
                <div className="hero-search__select-wrap">
                  <select
                    id="filter-location"
                    className="hero-search__select"
                    value={filters.location}
                    onChange={(e) => setLocation(e.target.value)}
                  >
                    <option value="">All locations</option>
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>
                        {loc}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              <div className="hero-search__field">
                <label className="hero-search__label" htmlFor="filter-color">
                  Color
                </label>
                <div className="hero-search__select-wrap">
                  <select
                    id="filter-color"
                    className="hero-search__select"
                    value={filters.color}
                    onChange={(e) => setColor(e.target.value)}
                  >
                    <option value="">Any</option>
                    {COLORS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              <div className="hero-search__field">
                <label className="hero-search__label" htmlFor="filter-transmission">
                  Transmission
                </label>
                <div className="hero-search__select-wrap">
                  <select
                    id="filter-transmission"
                    className="hero-search__select"
                    value={filters.transmission}
                    onChange={(e) => setTransmission(e.target.value)}
                  >
                    <option value="">Any</option>
                    {TRANSMISSIONS.map((tx) => (
                      <option key={tx} value={tx}>
                        {tx}
                      </option>
                    ))}
                  </select>
                  <ChevronIcon />
                </div>
              </div>

              {/* ─ Condition && clear row ─ */}
              <div className="hero-search__bottom-row">
                <div className="hero-search__radios">
                  {CONDITIONS.map((c) => (
                    <label key={c.value} className="hero-search__radio">
                      <input
                        type="radio"
                        name="condition"
                        value={c.value}
                        checked={filters.condition === c.value}
                        onChange={() => setCondition(c.value)}
                      />
                      <span className="hero-search__radio-dot" aria-hidden="true" />
                      {c.label}
                    </label>
                  ))}
                </div>

                <button
                  type="button"
                  className="hero-search__clear-btn"
                  onClick={clearFilters}
                >
                  <CloseIcon />
                  Clear filters
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </section>
  );
}