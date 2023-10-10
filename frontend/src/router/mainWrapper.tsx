import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
interface Props {
  children: any;
}
const MainWrapper = ({ children }: Props) => {
  return (
    <div>
      <Header />
      {children}
  
    </div>
  );
};

export default MainWrapper;
