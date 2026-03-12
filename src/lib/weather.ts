const API_Key = "a22ddeb2cfc34f0b81c141617260203";
const BASE_URL = "http://api.weatherapi.com/v1";

export async function fetchWeatherData(location: string) {
  const response = await fetch(
    `${BASE_URL}/current.json?key=${API_Key}&q=${location}`,
  );
  if (!response.ok) {
    throw new Error("Failed to fetch weather data");
  }
  return response.json();
}
