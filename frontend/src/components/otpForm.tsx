import React, { useState, useRef, ChangeEvent, useEffect } from "react";
import Button from "./Button";

interface OTPFormProps {
  onComplete: (otp: string) => void;
  resendOtp: () => void;
}

const OTPForm: React.FC<OTPFormProps> = ({ onComplete, resendOtp }) => {
  const [otp, setOTP] = useState(["", "", "", ""]);
  const [timer, setTimer] = useState(60);
  const [enableBtn, setEnableBtn] = useState(false);
  useEffect(() => {
    if (otp.every((value) => value !== "")) {
      setEnableBtn(true);
    } else setEnableBtn(false);
  }, [otp]);
  useEffect(() => {
    let time: any;
    if (timer > 0) {
      time = setTimeout(() => setTimer(timer - 1), 1000);
    }
    return () => {
      clearTimeout(time);
    };
  }, [timer]);
  const inputRefs = [
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
    useRef<HTMLInputElement | null>(null),
  ];

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { value } = event.target;

    if (/^[0-9]$/.test(value) || value === "") {
      const newOTP = [...otp];
      newOTP[index] = value;
      setOTP(newOTP);

      if (value === "" && index > 0) {
        inputRefs[index - 1].current?.focus();
      } else if (index < 3 && value !== "") {
        inputRefs[index + 1].current?.focus();
      }
    }
  };
  const handleFormSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const otpString = otp.join("");
    onComplete(otpString);
  };
  const handleResendOtp = () => {
    resendOtp();
    setTimer(60);
  };
  return (
    <div className="flex flex-col w-[60%] md:w-1/2 items-center mt-4 mx-auto">
      <h2 className="text-xl">Enter OTP</h2>
      <form
        onSubmit={handleFormSubmit}
        className="flex gap-2 flex-col items-center my-4"
      >
        <div className="flex gap-2 md:gap-3">
          {otp.map((value, index) => (
            <input
              key={index}
              type="text"
              value={value}
              onChange={(e) => handleInputChange(e, index)}
              ref={inputRefs[index]}
              className="border p-3 rounded-lg w-[24%] text-center"
            />
          ))}
        </div>
        <div className="flex justify-end w-full text-slate-700 my-2">
          {timer === 0 ? (
            <button type="button" onClick={handleResendOtp}>
              Resend Otp
            </button>
          ) : (
            <p>00:{timer < 10 ? `0${timer}` : timer} sec</p>
          )}
        </div>
        <div className="w-fit mt-2">
          <Button
            value="Verify OTP"
            type="submit"
            className="bg-slate-700"
            disabled={!enableBtn}
          />
        </div>
      </form>
    </div>
  );
};

export default OTPForm;
