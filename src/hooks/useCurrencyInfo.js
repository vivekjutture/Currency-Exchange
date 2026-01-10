import { useEffect, useState } from "react";
const baseUrl = import.meta.env.VITE_CURRENCY_API_BASE;

export default function useCurrencyInfo(currency) {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(`${baseUrl}/${currency.toLowerCase()}.json`)
      .then((response) => response.json())
      .then((response) => setData(response[currency.toLowerCase()]));
  }, [currency]);

  return data;
}
