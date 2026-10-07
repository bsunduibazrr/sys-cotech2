"use client";
import { useState } from "react";
type Unit = "Celseus" | "Fahrenheit" | "Kelvin" | "";
export default function TemperatureConverter() {
  const [temperature, setTemperature] = useState<string>("");
  const [fromUnit, setFromUnit] = useState<Unit>("");
  const [toUnit, setToUnit] = useState<Unit>("");
  const [result, setResult] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<"from" | "to" | null>(null);
  const isFormValid =
    temperature.trim() !== "" && fromUnit !== "" && toUnit !== "";
  const convertTemperature = (val: number, from: Unit, to: Unit): number => {
    if (from === to) return val;
    let Celseus: number;

    if (from === "Celseus") {
      Celseus = val;
    } else if (from === "Fahrenheit") {
      Celseus = ((val - 32) * 5) / 9;
    } else {
      Celseus = val - 273.15;
    }
    if (to === "Celseus") {
      return Celseus;
    } else if (to === "Fahrenheit") {
      return (Celseus * 9) / 5 + 32;
    } else {
      return Celseus + 273.15;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) return;
    const numericVal = parseFloat(temperature);
    if (isNaN(numericVal)) {
      setResult("Please enter a valid number.");
      return;
    }
    const converted = convertTemperature(numericVal, fromUnit, toUnit);
    const formattedResult = Number.isInteger(converted)
      ? converted.toString()
      : converted.toFixed(1);

    setResult(`${temperature} ${fromUnit} is ${formattedResult} ${toUnit}`);
  };
  const selectFromUnit = (unit: Unit) => {
    setFromUnit(unit);
    setOpenDropdown(null);
    setResult(null);
  };
  const selectToUnit = (unit: Unit) => {
    setToUnit(unit);
    setOpenDropdown(null);
    setResult(null);
  };
  return (
    <main
      className="min-h-screen bg-white flex justify-center items-center px-6 py-10"
      onClick={() => setOpenDropdown(null)}
    >
      <section
        className="w-full max-w-[1320px] rounded-[22px] border-[3px] border-[#292929] bg-white px-8 py-12 sm:px-16"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-[42px] font-normal leading-tight tracking-[-1px] text-[#242424]">
          Temperature Converter
        </h1>
        <p className="mt-4 text-[25px] leading-none text-[#292929]">
          Enter the temperature, select units and submit
        </p>
        <form onSubmit={handleSubmit} className="mt-12">
          <div className="flex flex-wrap items-start gap-5">
            <input
              type="number"
              step="any"
              placeholder="0.00"
              value={temperature}
              onChange={(e) => {
                setTemperature(e.target.value);
                setResult(null);
              }}
              className="h-[65px] w-[120px] rounded-[18px] border-[3px] border-[#292929] bg-white px-5 text-center text-[28px] text-[#222] outline-none placeholder:text-[#222] focus:ring-0"
            />
            <div className="relative w-[200px]">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === "from" ? null : "from")
                }
                className="flex h-[65px] w-full items-center justify-between rounded-[18px] border-[3px] border-[#292929] bg-white px-6 text-[26px] text-[#222] outline-none"
              >
                <span>{fromUnit || "From Unit"}</span>
                <span
                  className={`text-[20px] transition-transform ${
                    openDropdown === "from" ? "rotate-180" : ""
                  }`}
                >
                  ˅
                </span>
              </button>
              {openDropdown === "from" && (
                <div className="absolute left-0 top-[73px] z-50 w-full overflow-hidden rounded-[18px] border-[3px] border-[#292929] bg-white shadow-lg">
                  <button
                    type="button"
                    onClick={() => selectFromUnit("Fahrenheit")}
                    className="block w-full px-6 py-4 text-left text-[25px] text-[#222] transition-colors hover:bg-gray-100"
                  >
                    Fahrenheit
                  </button>
                  <button
                    type="button"
                    onClick={() => selectFromUnit("Celseus")}
                    className="block w-full px-6 py-4 text-left text-[25px] text-[#222] transition-colors hover:bg-gray-100"
                  >
                    Celseus
                  </button>
                  <button
                    type="button"
                    onClick={() => selectFromUnit("Kelvin")}
                    className="block w-full px-6 py-4 text-left text-[25px] text-[#222] transition-colors hover:bg-gray-100"
                  >
                    Kelvin
                  </button>
                </div>
              )}
            </div>
            <div className="relative w-[200px]">
              <button
                type="button"
                onClick={() =>
                  setOpenDropdown(openDropdown === "to" ? null : "to")
                }
                className="flex h-[65px] w-full items-center justify-between rounded-[18px] border-[3px] border-[#292929] bg-white px-6 text-[26px] text-[#222] outline-none"
              >
                <span>{toUnit || "To Unit"}</span>
                <span
                  className={`text-[20px] transition-transform ${
                    openDropdown === "to" ? "rotate-180" : ""
                  }`}
                >
                  ˅
                </span>
              </button>
              {openDropdown === "to" && (
                <div className="absolute left-0 top-[73px] z-50 w-full overflow-hidden rounded-[18px] border-[3px] border-[#292929] bg-white shadow-lg">
                  <button
                    type="button"
                    onClick={() => selectToUnit("Fahrenheit")}
                    className="block w-full px-6 py-4 text-left text-[25px] text-[#222] transition-colors hover:bg-gray-100"
                  >
                    Fahrenheit
                  </button>
                  <button
                    type="button"
                    onClick={() => selectToUnit("Celseus")}
                    className="block w-full px-6 py-4 text-left text-[25px] text-[#222] transition-colors hover:bg-gray-100"
                  >
                    Celseus
                  </button>
                  <button
                    type="button"
                    onClick={() => selectToUnit("Kelvin")}
                    className="block w-full px-6 py-4 text-left text-[25px] text-[#222] transition-colors hover:bg-gray-100"
                  >
                    Kelvin
                  </button>
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={!isFormValid}
              className={`h-[65px] w-[200px] rounded-[18px] bg-black text-[28px] text-white transition-all ${
                isFormValid
                  ? "cursor-pointer hover:bg-[#222]"
                  : "cursor-not-allowed opacity-40"
              }`}
            >
              Convert
            </button>
          </div>
          {result && (
            <section className="mt-8 rounded-[22px] bg-white">
              <p className="mt-10 text-[27px] font-normal text-[#2fa24f]">
                {result}
              </p>
            </section>
          )}
        </form>
      </section>
    </main>
  );
}
