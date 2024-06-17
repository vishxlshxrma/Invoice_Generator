import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import Navbar from "../components/Navbar";

const ProtectedRoutes = () => {
  const isSignedIn = useAppSelector((state) => state.user.isSignedIn);

  return isSignedIn === true ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoutes;
