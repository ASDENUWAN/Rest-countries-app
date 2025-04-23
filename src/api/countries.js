const BASE_URL = "https://restcountries.com/v3.1";

export async function getAllCountries() {
  const res = await fetch(`${BASE_URL}/all`);
  return await res.json();
}

export async function getCountriesByName(name) {
  const res = await fetch(`${BASE_URL}/name/${name}`);
  return await res.json();
}

export async function getCountriesByRegion(region) {
  const res = await fetch(`${BASE_URL}/region/${region}`);
  return await res.json();
}

export async function getCountryByCode(code) {
  const res = await fetch(`${BASE_URL}/alpha/${code}`);
  return await res.json();
}
