const regions = ["Africa", "Americas", "Asia", "Europe", "Oceania"];

export default function RegionFilter({ selectedRegion, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor="region-select" className="form-label">
        Filter by Region
      </label>
      <select
        id="region-select" // ✅ Add this
        className="form-select"
        value={selectedRegion}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Regions</option>
        {regions.map((r) => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </select>
    </div>
  );
}
