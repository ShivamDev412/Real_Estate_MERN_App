import React from "react";

interface FormWrapper {
  children: React.ReactNode;
}
const FormWrapper: React.FC<FormWrapper> = ({ children }) => {
  return (
    <section className="w-screen flex justify-center items-center my-[3rem]">
    <section className="bg-white rounded-lg shadow-lg p-3 w-[90%] sm:w-1/2 xl:w-[35%]">
      {children}
    </section>
  </section>
  );
};

export default FormWrapper;
