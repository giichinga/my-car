import { useState, useCallback, useMemo } from "react";
import { MODELS_BY_MAKE } from "../data/filterOptions";

const INITIAL_FILTERS = {
  search: "",
  make: "",
  model: "",
  yearMin: "",
  yearMax: "",
  priceMin: "",
  priceMax: "",
  location: "",
  color: "",
  transmission: "",
  condition: "all",
};

/**
 * Owns all state and behaviour for the hero search/filter panel:
 *  - the collapsed search bar value
 *  - whether the expanded filter panel is open
 *  - every individual filter field
 *  - the make → model dependency (changing make resets/limits model)
 *  - clearing all filters back to defaults
 *  - building the final query object you'd send to your API/DB
 *
 * Kept out of the component file because this is more logic than a
 * presentational component should own — the component just renders
 * whatever this hook gives it.
 */
export function useVehicleFilters({ totalCount = 0 } = {}) {
  const [filters, setFilters] = useState(INITIAL_FILTERS);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  // ── Field setters ────────────────────────────────────────────
  const setField = useCallback((field, value) => {
    setFilters((prev) => {
      const next = { ...prev, [field]: value };

      // Changing make invalidates whatever model was selected,
      // since models are scoped to a make.
      if (field === "make") {
        next.model = "";
      }

      return next;
    });
  }, []);

  const setSearch = useCallback((value) => setField("search", value), [setField]);
  const setMake = useCallback((value) => setField("make", value), [setField]);
  const setModel = useCallback((value) => setField("model", value), [setField]);
  const setYearMin = useCallback((value) => setField("yearMin", value), [setField]);
  const setYearMax = useCallback((value) => setField("yearMax", value), [setField]);
  const setPriceMin = useCallback((value) => setField("priceMin", value), [setField]);
  const setPriceMax = useCallback((value) => setField("priceMax", value), [setField]);
  const setLocation = useCallback((value) => setField("location", value), [setField]);
  const setColor = useCallback((value) => setField("color", value), [setField]);
  const setTransmission = useCallback((value) => setField("transmission", value), [setField]);
  const setCondition = useCallback((value) => setField("condition", value), [setField]);

  // ── Derived data ─────────────────────────────────────────────
  // Models dropdown is empty/disabled until a make is chosen.
  const availableModels = useMemo(() => {
    if (!filters.make) return [];
    return MODELS_BY_MAKE[filters.make] ?? [];
  }, [filters.make]);

  // How many fields are non-default — drives whether "Clear filters"
  // is worth showing, and can badge the trigger icon later if wanted.
  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filters.search.trim()) count++;
    if (filters.make) count++;
    if (filters.model) count++;
    if (filters.yearMin) count++;
    if (filters.yearMax) count++;
    if (filters.priceMin) count++;
    if (filters.priceMax) count++;
    if (filters.location) count++;
    if (filters.color) count++;
    if (filters.transmission) count++;
    if (filters.condition !== "all") count++;
    return count;
  }, [filters]);

  const hasActiveFilters = activeFilterCount > 0;

  // ── Panel control ────────────────────────────────────────────
  const openPanel = useCallback(() => setIsPanelOpen(true), []);
  const closePanel = useCallback(() => setIsPanelOpen(false), []);
  const togglePanel = useCallback(() => setIsPanelOpen((prev) => !prev), []);

  // ── Clear ────────────────────────────────────────────────────
  const clearFilters = useCallback(() => {
    setFilters(INITIAL_FILTERS);
  }, []);

  // Clears everything except the free-text search, since clicking
  // the "×" inside the search input shouldn't wipe the rest of the panel.
  const clearSearchOnly = useCallback(() => {
    setFilters((prev) => ({ ...prev, search: "" }));
  }, []);

  // ── Submit ───────────────────────────────────────────────────
  // Builds a clean query object — empty/default fields are omitted
  // so callers (API calls, URL params) don't have to filter them out.
  const buildQuery = useCallback(() => {
    const query = {};
    if (filters.search.trim()) query.search = filters.search.trim();
    if (filters.make) query.make = filters.make;
    if (filters.model) query.model = filters.model;
    if (filters.yearMin) query.yearMin = Number(filters.yearMin);
    if (filters.yearMax) query.yearMax = Number(filters.yearMax);
    if (filters.priceMin) query.priceMin = Number(filters.priceMin);
    if (filters.priceMax) query.priceMax = Number(filters.priceMax);
    if (filters.location) query.location = filters.location;
    if (filters.color) query.color = filters.color;
    if (filters.transmission) query.transmission = filters.transmission;
    if (filters.condition !== "all") query.condition = filters.condition;
    return query;
  }, [filters]);

  const submitSearch = useCallback(
    (onSearch) => {
      const query = buildQuery();
      onSearch?.(query);
    },
    [buildQuery]
  );

  return {
    filters,
    isPanelOpen,
    availableModels,
    activeFilterCount,
    hasActiveFilters,
    totalCount,

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

    openPanel,
    closePanel,
    togglePanel,

    clearFilters,
    clearSearchOnly,

    buildQuery,
    submitSearch,
  };
}