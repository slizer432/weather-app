import { Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { getAutoComplete } from "../service/service";

interface Props {
  onSearch: (city: string) => void;
}

type suggestion = {
  name: string;
  region: string;
  country: string;
};

const SearchBar = ({ onSearch }: Props) => {
  const [value, setValue] = useState("");
  const [suggestions, setSuggestions] = useState<suggestion[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [, setHoveredSuggestion] = useState<string | null>(null);
  const isSelectingSuggestion = useRef(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = value.trim();
    if (!city) return;
    onSearch(city);
    setValue("");
  };

  const DEBOUNCE_MS = 300;
  const MIN_CHARS = 2;

  useEffect(() => {
    if (isSelectingSuggestion.current) {
      isSelectingSuggestion.current = false;
      setValue("");
      return;
    }

    const query = value.trim();

    if (query.length < MIN_CHARS) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const timer = setTimeout(async () => {
      try {
        setLoading(true);
        const result = await getAutoComplete(query);
        setSuggestions((result ?? []) as suggestion[]);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
        setShowSuggestions(false);
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current) return;

      const target = event.target as Node;
      if (!containerRef.current.contains(target)) {
        setShowSuggestions(false);
        setHoveredSuggestion(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleInputFocus = () => {
    if (value.trim().length >= MIN_CHARS) {
      setShowSuggestions(true);
    }
  };

  return (
    <div ref={containerRef} className="relative w-full mb-8">
      <form
        onSubmit={handleSubmit}
        className="flex items-center w-full px-4 py-2 rounded-full bg-gray-200"
      >
        <input
          type="text"
          placeholder="Search for a city..."
          className="w-full outline-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onFocus={handleInputFocus}
        />
        <button type="submit">
          <Search color="#1434d7" strokeWidth={3.0} />
        </button>
      </form>

      {showSuggestions && (
        <ul
          className="absolute left-0 top-full mt-2 z-20 w-full bg-white shadow-lg border border-gray-200 max-h-64 overflow-auto"
          onMouseLeave={() => setHoveredSuggestion(null)}
        >
          {loading && <li className="px-4 py-3 text-gray-500">Loading...</li>}
          {!loading && suggestions.length === 0 && (
            <li className="px-4 py-4 text-gray-500">No recommendations</li>
          )}

          {!loading &&
            suggestions.map((s, idx) => (
              <li key={idx}>
                <button
                  type="button"
                  className="w-full text-left px-4 py-3 hover:bg-gray-100"
                  onMouseEnter={() => setHoveredSuggestion(s.name)}
                  onFocus={() => setHoveredSuggestion(s.name)}
                  onClick={() => {
                    isSelectingSuggestion.current = true;
                    setValue(s.name);
                    setHoveredSuggestion(null);
                    setSuggestions([]);
                    onSearch(s.name);
                    setShowSuggestions(false);
                  }}
                >
                  {s.name}, {s.region}, {s.country}
                </button>
              </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
