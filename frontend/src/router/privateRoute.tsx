import ENDPOINTS from "../utils/endpoints";
import { Outlet, Navigate } from "react-router-dom";
import MainWrapper from "./mainWrapper";
import useAuth from "../utils/auth";
function PrivateRoute() {
  const auth = useAuth();
  return auth ? (
    <MainWrapper>
      <Outlet />
    </MainWrapper>
  ) : (
    <Navigate to={ENDPOINTS.SIGNIN} />
  );
}

export default PrivateRoute;
