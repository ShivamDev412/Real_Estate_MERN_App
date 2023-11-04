import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
interface Props {
  children: any;
}
const MainWrapper = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
    </>
  );
};

export default MainWrapper;
