import "./App.css";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./store/hooks";
import { useEffect } from "react";
import { signIn } from "./store/slices/userSlice";
import LoadingScreen from "./components/LoadingScreen";
import { useUserGet } from "./hooks/userHooks";
import PublicRoutes from "./Routes/PublicRoutes";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ProtectedRoutes from "./Routes/ProtectedRoutes";
import Homepage from "./pages/Homepage";
import Invoice from "./pages/Invoice";

function App() {
  const { data, isLoading } = useUserGet();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (data) {
      dispatch(signIn(data));
    }
  }, [data, dispatch]);

  if (isLoading) {
    return <LoadingScreen isLoading={isLoading} />;
  }

  return (
    <>
      <Toaster />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/invoices" element={<Invoice />} />
          <Route path="/" element={<Homepage />} />
        </Route>
        <Route element={<PublicRoutes />}>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
