import React, { ChangeEvent } from "react";
interface Props {
  id: string;
  value: string | number;
  type?: string;
  label?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
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
const Input: React.FC<Props> = ({ id, onChange, value }) => {
  return (
    <input
      type="text"
      placeholder={id}
      id={id}
      name={id}
      value={value}
      className="border p-3 rounded-lg placeholder:capitalize"
      onChange={onChange}
    />
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
      <p className="capitalize">{id}</p>
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
        min={0}
        className="border p-3 rounded-lg placeholder:capitalize w-full"
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
