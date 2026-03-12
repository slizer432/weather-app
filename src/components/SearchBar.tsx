import { Search } from "lucide-react";

const SearchBar = () => {
  return (
    <div className="flex items-center w-full mb-8 px-4 py-2 rounded-full bg-gray-200">
      <input
        type="text"
        placeholder="Search for a city..."
        className="w-full outline-none"
      />
      <Search color="#1434d7" strokeWidth={3.0} />
    </div>
  );
};

export default SearchBar;
