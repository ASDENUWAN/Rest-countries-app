import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCountryByCode } from "../api/countries";

export default function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCountry() {
      try {
        const res = await getCountryByCode(code);
        setCountry(res[0]); // API returns an array
      } catch (err) {
        console.error("Error fetching country details", err);
      } finally {
        setLoading(false);
      }
    }

    fetchCountry();
  }, [code]);

  if (loading)
    return <p className="text-center mt-5">Loading country details...</p>;
  if (!country) return <p className="text-center mt-5">Country not found.</p>;

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-secondary mb-4">
        ← Back
      </Link>
      <div className="row">
        <div className="col-md-6">
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            className="img-fluid rounded shadow"
          />
        </div>
        <div className="col-md-6">
          <h2>{country.name.common}</h2>
          <p>
            <strong>Official Name:</strong> {country.name.official}
          </p>
          <p>
            <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          </p>
          <p>
            <strong>Region:</strong> {country.region}
          </p>
          <p>
            <strong>Population:</strong> {country.population.toLocaleString()}
          </p>
          <p>
            <strong>Languages:</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "N/A"}
          </p>
        </div>
      </div>
    </div>
  );
}
