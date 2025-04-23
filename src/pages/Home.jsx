import { useEffect, useState } from "react";
import { getAllCountries, getCountriesByName } from "../api/countries";
import CountryCard from "../components/CountryCard";
import SearchBar from "../components/SearchBar";
import RegionFilter from "../components/RegionFilter";
import LanguageFilter from "../components/LanguageFilter";

export default function Home() {
  const [allCountries, setAllCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [region, setRegion] = useState("");
  const [language, setLanguage] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const data = await getAllCountries();
        setAllCountries(data);
        setFilteredCountries(data);
      } catch (err) {
        console.error("Error loading countries", err);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  useEffect(() => {
    filterCountries();
  }, [searchQuery, region, language, allCountries]);

  const filterCountries = () => {
    let results = [...allCountries];

    if (searchQuery) {
      results = results.filter((c) =>
        c.name.common.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (region) {
      results = results.filter((c) => c.region === region);
    }

    if (language) {
      results = results.filter(
        (c) => c.languages && Object.values(c.languages).includes(language)
      );
    }

    setFilteredCountries(results);
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🌍 Explore Countries</h1>
      <SearchBar query={searchQuery} onChange={setSearchQuery} />

      <div className="row">
        <div className="col-md-6">
          <RegionFilter selectedRegion={region} onChange={setRegion} />
        </div>
        <div className="col-md-6">
          <LanguageFilter selectedLanguage={language} onChange={setLanguage} />
        </div>
      </div>

      {loading ? (
        <p className="text-center mt-5">Loading countries...</p>
      ) : (
        <div className="row mt-3">
          {filteredCountries.map((country) => (
            <div className="col-md-4 mb-4" key={country.cca3}>
              <CountryCard country={country} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
