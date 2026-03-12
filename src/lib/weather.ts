const API_KEY = import.meta.env.VITE_API_KEY;

if (!API_KEY) {
  throw new Error("API key is not defined.");
}

export async function fetchWeather(endpoint: string, city: string) {
  const url = `https://api.weatherapi.com/v1/${endpoint}?key=${API_KEY}&q=${city}`;
  const response = await fetch(url);
  const data = await response.json();
  return data;
}
