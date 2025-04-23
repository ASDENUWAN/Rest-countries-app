import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

export default function CountryCard({ country, onRemove }) {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  const handleClick = () => {
    navigate(`/country/${country.cca3}`);
  };

  const handleFavorite = () => {
    const key = `favorites_${user.username}`;
    const current = JSON.parse(localStorage.getItem(key) || "[]");
    if (!current.includes(country.cca3)) {
      localStorage.setItem(key, JSON.stringify([...current, country.cca3]));
      alert(`${country.name.common} added to favorites!`);
    } else {
      alert("Already in favorites");
    }
  };

  return (
    <div className="card h-100 shadow-sm">
      <img
        src={country.flags.png}
        className="card-img-top"
        alt={`Flag of ${country.name.common}`}
        onClick={handleClick}
        style={{ height: "200px", objectFit: "cover", cursor: "pointer" }}
      />
      <div className="card-body">
        <h5 className="card-title">{country.name.common}</h5>
        <p className="card-text">
          <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
          <br />
          <strong>Region:</strong> {country.region}
          <br />
          <strong>Population:</strong> {country.population.toLocaleString()}
        </p>
        {user &&
          (onRemove ? (
            <button
              className="btn btn-outline-danger w-100 mt-2"
              onClick={() => onRemove(country.cca3)}
            >
              ❌ Remove from Favorites
            </button>
          ) : (
            <button
              className="btn btn-outline-success w-100 mt-2"
              onClick={handleFavorite}
            >
              ❤️ Add to Favorites
            </button>
          ))}
      </div>
    </div>
  );
}
