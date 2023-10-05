import Cookies from "js-cookie";
const useAuth = () => Cookies.get("access-token");
export default useAuth;
