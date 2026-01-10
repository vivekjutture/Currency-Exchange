import React, { useId } from "react";
import CurrencySelect from "./CurrencySelect";

function InputBox({
  label,
  amount,
  onAmountChange,
  onCurrencyChange,
  currencyOptions = [],
  selectedCurrency = "usd",
  amountDisable = false,
  currencyDisable = false,
}) {
  const amountInputId = useId();

  return (
    <div className="bg-white p-3 rounded-lg text-sm flex">
      <div className="w-1/2">
        <label
          htmlFor={amountInputId}
          className="text-black font-bold mb-2 inline-block"
        >
          {label}
        </label>
        <input
          id={amountInputId}
          className="outline-none w-full bg-transparent py-1.5"
          type="number"
          placeholder="Amount"
          disabled={amountDisable}
          value={amount}
          onChange={(e) =>
            onAmountChange && onAmountChange(Number(e.target.value))
          }
        />
      </div>
      <div className="w-1/2 flex flex-wrap justify-end text-right">
        <p className="text-black font-bold mb-2 w-full">Currency</p>
        {/* <select
          className="rounded-lg px-1 py-1 bg-gray-100 cursor-pointer outline-none"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
          disabled={currencyDisable}
        >
          {currencyOptions.map((currency) => (
            <option key={currency} value={currency}>
              {currency.toUpperCase()}
            </option>
          ))}
        </select> */}
        <CurrencySelect
          currencyOptions={currencyOptions}
          selectedCurrency={selectedCurrency}
          onCurrencyChange={onCurrencyChange}
          currencyDisable={currencyDisable}
        />
      </div>
    </div>
  );
}

export default InputBox;
