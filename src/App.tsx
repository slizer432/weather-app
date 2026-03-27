import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import "./lib/weather";
import { getData, type WeatherApiResponse } from "./service/service";
import Loading from "./components/Loading";

const App = () => {
  // store current date/time in state so React can re-render
  const [now, setNow] = useState<Date>(new Date());
  const [data, setData] = useState<WeatherApiResponse | null>(null);
  const [city, setCity] = useState<string>("Jakarta");

  const value = [
    {
      label: "Wind",
      value: data?.current.wind_kph + " Km/h",
      footer: data?.current.wind_dir,
    },
    { label: "Humidity", value: data?.current.humidity + "%" },
    { label: "Real Feel", value: data?.current.feelslike_c + "°C" },
    { label: "UV Index", value: data?.current.uv },
    { label: "Pressure", value: data?.current.pressure_mb + " mb" },
    { label: "Wind Chill", value: data?.current.windchill_c + "°C" },
    { label: "Gust", value: data?.current.gust_kph + " Km/h" },
    { label: "Heat Index", value: data?.current.heatindex_c + "°C" },
    { label: "Cloud", value: data?.current.cloud + "%" },
  ];

  const title = [
    "Wind",
    "Humidity",
    "Real Feel",
    "UV Index",
    "Pressure",
    "Wind Chill",
    "Gust",
    "Heat Index",
    "Cloud",
  ];

  useEffect(() => {
    getData(city).then(setData);

    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, [city]);

  if (!data) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center min-h-screen">
      <section className="flex min-w-1/3 min-h-screen justify-center p-8">
        <div className="w-full h-full max-w-md flex flex-col">
          <SearchBar onSearch={setCity} />
          <div className="flex flex-col items-center mt-8">
            <img src={data.current.condition.icon} alt="" width={150} />
            <h1 className="mt-10 font-medium text-7xl">
              {data.current.temp_c}°C
            </h1>
            <p className="mt-4 text-xl">{data.current.condition.text}</p>
          </div>
          <div className="border-2 border-gray-200 w-[70%] my-6 mx-auto"></div>
          {/* Garis bates cuaca */}
          <div className="flex flex-col items-center mt-6">
            <p className="text-xl">{now.toLocaleDateString()}</p>
            <p id="clock" className="text-xl">
              {now.toLocaleTimeString()}
            </p>
            <p className="text-xl">
              {data.current.is_day === 1 ? "Day" : "Night"}
            </p>
          </div>
          <h1 className="text-5xl text-center mt-17">{city}</h1>
        </div>
      </section>
      <section className="bg-gray-200 min-w-2/3 min-h-screen p-8">
        <div className="flex">
          <h1 className="text-3xl">Today</h1>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-18">
          {title.map((title, index) => (
            <Card
              key={index}
              title={title}
              value={value[index].value || "N/A"}
              footer={value[index].footer}
            />
          ))}
        </div>
        <p className="mt-8 text-l">
          data provided by
          <a
            href="https://www.weatherapi.com/"
            className="text-blue-800"
            target="blank"
          >
            {" "}
            weatherAPI.{" "}
          </a>
          Design by
          <a
            href="https://dribbble.com/shots/22065403-Weather-App-Landing-Page-Design"
            className="text-blue-800"
            target="blank"
          >
            {" "}
            Link
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default App;
