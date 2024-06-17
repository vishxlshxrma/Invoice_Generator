import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Navbar from "../components/Navbar";

const PublicRoutes = () => {
  const isSignedIn = useAppSelector((state) => state.user.isSignedIn);

  return isSignedIn === false ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  );
};

export default PublicRoutes;
