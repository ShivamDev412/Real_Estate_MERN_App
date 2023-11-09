import React from "react";
import { twMerge } from "tailwind-merge";

type ButtonType = "button" | "submit" ;

interface Props {
  value: any;
  type?: ButtonType;
  className?: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<Props> = ({
  value,
  type = "button",
  className = "",
  disabled = false,
  onClick,
}) => {
  const buttonClasses = twMerge(
    "text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 w-full",
    className
  );

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      onClick={onClick}
    >
      {value}
    </button>
  );
};

export default Button;
