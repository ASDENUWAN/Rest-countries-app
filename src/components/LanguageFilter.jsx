const languages = [
  "English",
  "Spanish",
  "French",
  "Arabic",
  "Portuguese",
  "German",
  "Chinese",
  "Hindi",
  "Russian",
];

export default function LanguageFilter({ selectedLanguage, onChange }) {
  return (
    <div className="mb-3">
      <label htmlFor="language-select" className="form-label">
        Filter by Language
      </label>
      <select
        id="language-select" // ✅ Add this
        className="form-select"
        value={selectedLanguage}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Languages</option>
        {languages.map((lang) => (
          <option key={lang} value={lang}>
            {lang}
          </option>
        ))}
      </select>
    </div>
  );
}
