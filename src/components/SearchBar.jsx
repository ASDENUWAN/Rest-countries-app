export default function SearchBar({ query, onChange }) {
  return (
    <input
      type="text"
      className="form-control mb-3"
      placeholder="Search by country name..."
      value={query}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
