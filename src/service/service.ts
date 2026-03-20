import { fetchWeather } from "../lib/weather";

export type WeatherApiResponse = {
  location: {
    name: string;
  };
  current: {
    is_day: number;
    temp_c: number;
    condition: {
      text: string;
      icon: string;
    };
    wind_kph: number;
    wind_dir: string;
    humidity: number;
    feelslike_c: number;
    uv: number;
    pressure_mb: number;
    windchill_c: number;
    gust_kph: number;
    heatindex_c: number;
    cloud: number;
  };
};

export async function getData(city: string): Promise<WeatherApiResponse> {
  return (await fetchWeather("current.json", city)) as WeatherApiResponse;
}
