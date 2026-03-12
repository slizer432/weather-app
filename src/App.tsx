import { useState, useEffect } from "react";
import SearchBar from "./components/SearchBar";
import Card from "./components/Card";

const App = () => {
  // store current date/time in state so React can re-render
  const [now, setNow] = useState<Date>(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setNow(new Date());
    }, 1000);
    // cleanup on unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <section className="flex min-w-1/3 min-h-screen justify-center p-8">
        <div className="w-full h-full max-w-md flex flex-col">
          <SearchBar />
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
          <h1 className="text-5xl text-center mt-17">Nama Kota</h1>
        </div>
      </section>
      <section className="bg-gray-200 min-w-2/3 min-h-screen p-8">
        <div className="flex">
          <h1 className="text-3xl">Today</h1>
        </div>
        <div className="mt-8 grid grid-cols-3 gap-6 gap-y-20">
          {Array.from({ length: 3 }).map(() =>
            Array.from({ length: 3 }).map((_, index) => (
              <Card
                key={index}
                title={`Card ${index + 1}`}
                value={`Value ${index + 1}`}
              />
            )),
          )}
        </div>
      </section>
    </div>
  );
};

export default App;
