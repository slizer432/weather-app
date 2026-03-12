import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";
import "./lib/weather";
import { getWind } from "./service/service";

const App = () => {
  // store current date/time in state so React can re-render
  const [now, setNow] = useState<Date>(new Date());
  const [wind, setWind] = useState<{ wind: number; direction: string } | null>(
    null,
  );
  const [city, setCity] = useState("Jakarta");
  const title = [
    "Wind",
    "Humidity",
    "Pressure",
    "UV Index",
    "Pressure",
    "Change of Rain",
    "Temperature History",
    "Sun",
    "Moon",
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    });
    getWind(city).then((w) => setWind(w));
    // cleanup on unmount
    return () => clearInterval(timer);
  }, [city]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <section className="flex min-w-1/3 min-h-screen justify-center p-8">
        <div className="w-full h-full max-w-md flex flex-col">
          <SearchBar onSearch={setCity} />
          <div className="flex flex-col items-center mt-8">
            <img src="src\assets\react.svg" alt="" width={150} />
            <h1 className="mt-10 font-medium text-7xl">30℃</h1>
            <p className="mt-2 text-xl">Cloud</p>
          </div>
          <div className="border-2 border-gray-200 w-[70%] my-6 mx-auto"></div>
          {/* Garis bates cuaca */}
          <div className="flex flex-col items-center mt-6">
            <p className="text-xl">{now.toLocaleDateString()}</p>
            <p id="clock" className="text-xl">
              {now.toLocaleTimeString()}
            </p>
            <p className="text-xl">day</p>
          </div>
          <h1 className="text-5xl text-center mt-17">{city}</h1>
        </div>
      </section>
      <section className="bg-gray-200 min-w-2/3 min-h-screen p-8">
        <div className="flex">
          <h1 className="text-3xl">Today</h1>
        </div>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 gap-y-20">
          {title.map((title, index) => (
            <Card
              key={index}
              title={title}
              value={wind?.wind + " km/h"}
              footer={wind?.direction}
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default App;
