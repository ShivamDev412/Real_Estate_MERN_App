import React, { ChangeEvent, useState } from "react";
import { countryCodeJson } from "../utils/constant";
interface Props {
  id: string;
  value: string | number;
  type?: string;
  label?: string;
  min?: number;
  max?: number;
  disabled?: boolean;

  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
interface CountryCodeProps extends Props {
  countryCodeValue: (value: string) => void;
  code?: string;
}
interface TextAreaProps {
  id: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}
interface ToggleSwitchProps {
  id: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<Props> = ({
  id,
  onChange,
  value,
  type = "string",
  disabled = false,
}) => {
  return (
    <input
      type={type}
      placeholder={id.replace(/([a-z])([A-Z])/g, "$1 $2")}
      id={id}
      name={id}
      value={value}
      disabled={disabled}
      className="border p-3 rounded-lg placeholder:capitalize w-full"
      onChange={onChange}
    />
  );
};
export const PhoneNoInput: React.FC<CountryCodeProps> = ({
  id,
  onChange,
  value,
  countryCodeValue,
  code = "",
}) => {
  const [countryCode, setCountryCode] = useState(code !== "" ? code : "+1");
  const handleCountryCodeChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCountryCode(e.target.value);
    countryCodeValue(e.target.value);
  };
  return (
    <div className="flex items-center gap-2">
      <select
        className="border p-3 rounded-l-lg"
        onChange={handleCountryCodeChange}
        value={countryCode}
      >
        {countryCodeJson.map((countryCode) => (
          <option
            value={countryCode.dial_code}
            className="p-1 bg-white"
            key={countryCode.code}
          >
            {countryCode.code} &nbsp;
            {countryCode.dial_code}
          </option>
        ))}
      </select>
      <input
        type="string"
        placeholder="Phone Number"
        id={id}
        name={id}
        maxLength={10}
        value={value}
        className="border p-3 rounded-lg placeholder:capitalize w-full"
        onChange={onChange}
      />
    </div>
  );
};
export const Textarea: React.FC<TextAreaProps> = ({ id, onChange, value }) => {
  return (
    <textarea
      placeholder={id}
      id={id}
      name={id}
      value={value}
      rows={5}
      className="border p-3 rounded-lg placeholder:capitalize resize-none overflow-y-auto"
      onChange={onChange}
    />
  );
};
export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  id,
  checked,
  onChange,
}) => {
  return (
    <div className="flex items-center gap-2 my-1">
      <p className="capitalize">{id.replace(/([a-z])([A-Z])/g, "$1 $2")}</p>
      <div className="relative inline-block w-12 h-6">
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={onChange}
          className="sr-only"
        />
        <label
          htmlFor={id}
          className={`block w-12 h-6 rounded-full cursor-pointer transition-all duration-300 ease-in-out ${
            checked ? "bg-green-600" : "bg-gray-400"
          }`}
        >
          <div
            className={`absolute w-5 h-5 bg-white rounded-full transition-transform duration-300 ease-in-out ${
              checked
                ? "transform translate-x-[27px] translate-y-[2px]"
                : "transform translate-x-[1px] translate-y-[2px]"
            }`}
          ></div>
        </label>
      </div>
    </div>
  );
};
export const NumberInput: React.FC<Props> = ({
  id,
  onChange,
  value,
  label,
  min,
  max,
}) => {
  return (
    <div className="flex items-center">
      <label htmlFor={id} className="capitalize mr-2">
        {label}
      </label>
      <input
        type="number"
        id={id}
        name={id}
        value={value}
        min={min}
        max={max}
        className="border p-3 rounded-lg placeholder:capitalize w-full"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
