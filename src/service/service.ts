import { fetchWeather } from "../lib/weather";

export type WeatherApiResponse = {
  location: {
    name: string;
    localtime: string;
    tz_id: string;
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

type WeatherApiError = {
  error: {
    code: number;
    message: string;
  };
};

function errorCheck(data: unknown): data is WeatherApiError {
  return typeof data === "object" && data !== null && "error" in data;
}

export async function getData(city: string): Promise<WeatherApiResponse> {
  const data = (await fetchWeather("current.json", city)) as WeatherApiResponse;

  if (errorCheck(data)) {
    throw new Error(data.error.message);
  }
  return data as WeatherApiResponse;
}

export async function getAutoComplete(query: string) {
  return await fetchWeather("search.json", query);
}
