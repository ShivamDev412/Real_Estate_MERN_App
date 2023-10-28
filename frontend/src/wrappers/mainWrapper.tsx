import "react-toastify/dist/ReactToastify.css";
import Header from "../components/Header";
interface Props {
  children: any;
}
const MainWrapper = ({ children }: Props) => {
  return (
    <div className="flex flex-col min-h-[100vh] min-w-[100vw]">
      <Header />
      <main className="flex-grow">{children}</main>
    </div>
  );
};

export default MainWrapper;
