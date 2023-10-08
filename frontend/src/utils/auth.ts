import Cookies from "js-cookie";
const useAuth = () => (Cookies.get("access-token") ? true : false);
export default useAuth;
