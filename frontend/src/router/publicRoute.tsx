import ENDPOINTS from "../utils/endpoints";
import { Outlet, Navigate } from "react-router-dom";
import { Suspense } from "react";
import MainWrapper from "../wrappers/mainWrapper";
import useAuth from "../utils/auth";
function PublicRoute() {
  const auth = useAuth();
  return auth ? (
    <Navigate to={ENDPOINTS.HOME} />
  ) : (
    <MainWrapper>
      <Suspense fallback={<h2>Loading...</h2>}>
        <Outlet />
      </Suspense>
    </MainWrapper>
  );
}

export default PublicRoute;
