import { useContext, useEffect, useState } from "react";
import { UserContext } from "../context/UserContext";
import { getCountryByCode } from "../api/countries";
import CountryCard from "../components/CountryCard";
import { Link } from "react-router-dom";

export default function Favorites() {
  const { user } = useContext(UserContext);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadFavorites = async () => {
    const key = `favorites_${user.username}`;
    const codes = JSON.parse(localStorage.getItem(key) || "[]");
    const promises = codes.map((code) =>
      getCountryByCode(code).then((res) => res[0])
    );
    const data = await Promise.all(promises);
    setFavorites(data);
    setLoading(false);
  };

  useEffect(() => {
    if (user) loadFavorites();
  }, [user]);

  const handleRemove = (codeToRemove) => {
    const key = `favorites_${user.username}`;
    const updatedCodes = JSON.parse(localStorage.getItem(key) || "[]").filter(
      (code) => code !== codeToRemove
    );
    localStorage.setItem(key, JSON.stringify(updatedCodes));
    setFavorites((prev) => prev.filter((c) => c.cca3 !== codeToRemove));
  };

  if (!user)
    return (
      <div className="container py-4">
        <p>Please login to see favorites.</p>
      </div>
    );

  return (
    <div className="container py-4">
      <Link to="/" className="btn btn-secondary mb-4">
        ← Back to Home
      </Link>
      <h2 className="text-center">🌟 Favorite Countries</h2>

      {loading ? (
        <p>Loading favorites...</p>
      ) : favorites.length === 0 ? (
        <p>No favorites added yet.</p>
      ) : (
        <div className="row">
          {favorites.map((country) => (
            <div className="col-md-4 mb-4" key={country.cca3}>
              <CountryCard country={country} onRemove={handleRemove} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
