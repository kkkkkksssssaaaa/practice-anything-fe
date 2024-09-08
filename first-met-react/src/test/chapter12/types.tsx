export interface Chapter12Props {
  tempreature: string;
  scale: keyof typeof ScaleNames;
  onTemperatureChange(value: string): void;
}

export interface Chapter12Props2 {
  celsius: number;
}

export const ScaleNames = {
  c: "섭씨",
  f: "화씨",
};
