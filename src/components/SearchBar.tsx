import { Search } from "lucide-react";
import { useState } from "react";

interface Props {
  onSearch: (city: string) => void;
}

const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = value.trim();
    if (!city) return;
    onSearch(city);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center w-full mb-8 px-4 py-2 rounded-full bg-gray-200"
    >
      <input
        type="text"
        placeholder="Search for a city..."
        className="w-full outline-none"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type="submit">
        <Search color="#1434d7" strokeWidth={3.0} />
      </button>
    </form>
  );
};

export default SearchBar;
