import ENDPOINTS from "../utils/endpoints";
import { Outlet, Navigate } from "react-router-dom";
import MainWrapper from "./mainWrapper";
import useAuth from "../utils/auth";
function PublicRoute() {
  const auth = useAuth();
  return auth ? (
    <Navigate to={ENDPOINTS.HOME} />
  ) : (
    <MainWrapper>
      <Outlet />
    </MainWrapper>
  );
}

export default PublicRoute;
