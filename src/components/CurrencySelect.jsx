import { useState, useRef, useEffect } from "react";

export default function CurrencySelect({
  currencyOptions,
  selectedCurrency,
  onCurrencyChange,
  currencyDisable,
}) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const filteredCurrencies = currencyOptions.filter((currency) =>
    currency.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="relative w-40" ref={dropdownRef}>
      {/* Select Button */}
      <button
        type="button"
        disabled={currencyDisable}
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between rounded-lg px-3 py-2 bg-gray-100 cursor-pointer outline-none"
      >
        <span>{selectedCurrency?.toUpperCase()}</span>

        {/* Arrow Icon */}
        <svg
          className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-10 mt-2 w-full rounded-xl bg-white shadow-lg border overflow-hidden text-center">
          {/* Search box */}
          <div className="p-2">
            <input
              type="text"
              placeholder="Search currency..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg px-3 py-2 bg-gray-100 outline-none text-center"
            />
          </div>

          {/* List */}
          <ul className="max-h-48 overflow-y-auto px-1 pb-2">
            {filteredCurrencies.length > 0 ? (
              filteredCurrencies.map((currency) => (
                <li
                  key={currency}
                  onClick={() => {
                    onCurrencyChange(currency);
                    setOpen(false);
                    setSearch("");
                  }}
                  className="mx-1 mb-1 rounded-lg px-3 py-2 cursor-pointer hover:bg-green-600 hover:text-white"
                >
                  {currency.toUpperCase()}
                </li>
              ))
            ) : (
              <li className="px-3 py-2 text-sm text-gray-400">
                No results found
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
