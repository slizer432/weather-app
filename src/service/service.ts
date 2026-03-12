import { fetchWeather } from "../lib/weather";

async function getData(city: string) {
  return await fetchWeather("current.json", city);
}

export async function getWind(city: string) {
  const data = await getData(city);
  return {
    wind: data.current.wind_kph as number,
    direction: data.current.wind_dir as string,
  };
}

export async function getLocation(city: string) {
  const data = await getData(city);
  return {
    location: data.location.name as string,
  };
}
