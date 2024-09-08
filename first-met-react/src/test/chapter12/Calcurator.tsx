import { useState } from "react";
import TemperatureInput from "./TemperatureInput";
import { Chapter12Props2 } from "./types";

export const BoilingVerdict = (props: Chapter12Props2) => {
  if (props.celsius >= 100) {
    return <p>물이 끓습니다.</p>;
  }

  return <p>물이 끓지 않습니다.</p>;
};

export const toCelsius = (fahrenheit: number): number => {
  return ((fahrenheit - 32) * 5) / 9;
};

export const toFahrenheit = (celsius: number): number => {
  return (celsius * 9) / 5 + 32;
};

export const tryConvert = (temperature: string, convert: Convert) => {
  const input = parseFloat(temperature);

  if (Number.isNaN(temperature)) {
    return "";
  }

  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;

  return rounded.toString();
};

export type Convert = (v: number) => number;

const Calculator = () => {
  const [temperature, setTemperature] = useState<string>("");
  const [scale, setScale] = useState<string>("c");

  const handleCelsiusChange = (temperature: string) => {
    setTemperature(temperature);
    setScale("c");
  };

  const handleFahrenheitChange = (temperature: string) => {
    setTemperature(temperature);
    setScale("f");
  };

  const celsius =
    scale === "f" ? tryConvert(temperature, toCelsius) : temperature;
  const fahrenheit =
    scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature;

  return (
    <div>
      <TemperatureInput
        scale="c"
        tempreature={celsius}
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        tempreature={fahrenheit}
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict celsius={parseFloat(celsius)} />
    </div>
  );
};

export default Calculator;
