import React from "react";
import Header from "../components/Header";
interface Props {
  children: React.ReactNode;
}
const MainWrapper: React.FC<Props> = ({ children }) => {
  return (
    <div>
      {" "}
      <Header />
      {children}
    </div>
  );
};

export default MainWrapper;
