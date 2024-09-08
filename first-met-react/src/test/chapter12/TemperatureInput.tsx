import { Chapter12Props, ScaleNames } from "./types";

const TemperatureInput = (props: Chapter12Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    props.onTemperatureChange(e.target.value);
  };

  return (
    <fieldset>
      <legend>온도를 입력해주세요. (단위:{ScaleNames[props.scale]})</legend>
      <input value={props.tempreature} onChange={handleChange} />
    </fieldset>
  );
};

export default TemperatureInput;
