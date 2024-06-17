import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { useUserSignup } from "../hooks/userHooks";
import { signIn } from "../store/slices/userSlice";
import LoadingButton from "../components/LoadingButton";
import { User } from "../types";
import { AxiosError } from "axios";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ErrorResponse {
  message: string;
}

interface FormState {
  name: string;
  email: string;
  password: string;
}

const Signup = () => {
  const { mutateAsync: registerUser } = useUserSignup();
  const [formState, setFormState] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<FormState>({
    name: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const nav = useNavigate();
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    setErrors({
      ...errors,
      [e.target.name]: "",
    });
  };

  const validateForm = () => {
    const newErrors = { ...errors };
    if (!formState.name.trim()) {
      newErrors.name = "Name is required";
    }
    if (!formState.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(formState.email.trim())) {
      newErrors.email = "Invalid email address";
    }
    if (!formState.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formState.password.trim().length < 8) {
      newErrors.password = "Password should be of minimum 8 characters length";
    }
    setErrors(newErrors);
    return Object.values(newErrors).every((error) => !error);
  };

  const handleError = (error: AxiosError<ErrorResponse>) => {
    toast.error(error?.response?.data?.message || "Something went wrong!");
    console.error(error);
    setLoading(false);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;
    try {
      setLoading(true);
      const data: User | null = await registerUser(formState);
      if (data?._id) {
        dispatch(signIn(data));
        setLoading(false);
        toast.success("Account created successfully");
        nav("/");
      }
    } catch (error) {
      handleError(error as AxiosError<ErrorResponse>);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white p-8 rounded shadow">
        <h1 className="text-2xl font-bold mb-4">Sign up</h1>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Full Name"
              className={`w-full px-3 py-2 border rounded focus:outline-none ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              value={formState.name}
              onChange={handleChange}
            />
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              className={`w-full px-3 py-2 border rounded focus:outline-none ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              value={formState.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div className="mb-4">
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              className={`w-full px-3 py-2 border rounded focus:outline-none ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              value={formState.password}
              onChange={handleChange}
            />
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <LoadingButton
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            isLoading={loading}
          >
            Sign Up
          </LoadingButton>
        </form>
        <div className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-500 hover:text-blue-600">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
