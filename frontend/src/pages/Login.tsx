import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useUserLogin } from "../hooks/userHooks";
import { signIn } from "../store/slices/userSlice";
import LoadingButton from "../components/LoadingButton";
import { FormState } from "../types";
import { AxiosError } from "axios";

interface ErrorResponse {
  message: string;
}

const Login = () => {
  const { mutateAsync: loginUser } = useUserLogin();
  const [formState, setFormState] = useState<FormState>({
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };

  const [loading, setLoading] = useState(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(String(email).toLowerCase());
  };

  const handleError = (error: AxiosError<ErrorResponse>) => {
    toast.error(error?.response?.data?.message || "Something went wrong!");
    console.error(error);
    setLoading(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateEmail(formState.email)) {
      toast.error("Invalid email address");
      return;
    }
    try {
      setLoading(true);
      const data = await loginUser(formState);
      if (data?._id) {
        dispatch(signIn(data));
        setLoading(false);
        toast.success("Signed successfully");
        nav("/");
      }
    } catch (error) {
      handleError(error as AxiosError<ErrorResponse>);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Sign in</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className={`w-full px-3 py-2 border rounded focus:outline-none `}
              value={formState.email}
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={`w-full px-3 py-2 border rounded focus:outline-none `}
              value={formState.password}
              onChange={handleChange}
            />
          </div>
          <LoadingButton
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            isLoading={loading}
          >
            Sign In
          </LoadingButton>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-500 hover:text-blue-600">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
