import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonType = "button" | "submit" | "reset";

interface Props {
  value: string;
  type?: ButtonType;
  className?: string;
  disabled: boolean;
}

const Button: React.FC<Props> = ({
  value,
  type = "button",
  className = "",
  disabled,
}) => {
  const buttonClasses = twMerge(
    "text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full",
    className
  );

  return (
    <button type={type} className={buttonClasses} disabled={disabled}>
      {value}
    </button>
  );
};

export default Button;
