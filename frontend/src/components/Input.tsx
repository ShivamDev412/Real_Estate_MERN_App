import React, { ChangeEvent } from "react";
interface Props {
  id: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}
const Input: React.FC<Props> = ({ id, type = "text", onChange }) => {
  return (
    <input
      type={type}
      placeholder={id}
      id={id}
      name={id}
      className="border p-3 rounded-lg"
      onChange={onChange}
    />
  );
};
export default Input;
