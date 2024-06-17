import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { signOut } from "../store/slices/userSlice";
import toast from "react-hot-toast";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { useState } from "react";

const Navbar = () => {
  const isSignedIn = useAppSelector((state) => state.user.isSignedIn);
  const dispatch = useAppDispatch();
  const nav = useNavigate();
  const [sideBarOpen, setSideBarOpen] = useState(false);

  const buttons = [
    {
      label: "LOGIN",
      path: "/login",
      className:
        "bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-5 rounded-md",
      showWhenSignedIn: false,
    },
    {
      label: "SIGN UP",
      path: "/signup",
      className:
        "bg-green-500 hover:bg-green-600 text-white py-1.5 px-5 rounded-md ml-4",
      showWhenSignedIn: false,
    },
    {
      label: "HOME",
      path: "/",
      className:
        "bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-5 rounded-md",
      showWhenSignedIn: true,
    },
    {
      label: "INVOICES",
      path: "/invoices",
      className:
        "bg-blue-500 hover:bg-blue-600 text-white py-1.5 px-5 rounded-md",
      showWhenSignedIn: true,
    },
    {
      label: "LOG OUT",
      action: () => {
        dispatch(signOut());
        nav("/login");
        toast.success("Logged out successfully");
      },
      className:
        "bg-red-500 hover:bg-red-600 text-white py-1.5 px-5 rounded-md",
      showWhenSignedIn: true,
    },
  ];

  const renderButtons = (showWhenSignedIn: boolean) =>
    buttons
      .filter((button) => button.showWhenSignedIn === showWhenSignedIn)
      .map((button, index) => (
        <button
          key={index}
          className={button.className}
          onClick={() => {
            if (button.path) nav(button.path);
            if (button.action) button.action();
            setSideBarOpen(false);
          }}
        >
          {button.label}
        </button>
      ));

  return (
    <>
      <nav className="bg-gray-800 px-4 py-2">
        <div className="mx-auto px-4">
          <div className="flex justify-between items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-semibold text-sm lg:text-xl">
                Invoice Generator
              </span>
            </div>
            {!isSignedIn ? (
              <div className="hidden md:flex">{renderButtons(false)}</div>
            ) : (
              <>
                <div className="hidden md:flex gap-4">
                  {renderButtons(true)}
                </div>
              </>
            )}
            <div className="md:hidden">
              <IoMdMenu
                className="text-white text-2xl cursor-pointer"
                onClick={() => setSideBarOpen(true)}
              />
            </div>
          </div>
        </div>
      </nav>
      <div
        className={`fixed inset-y-0 right-0 bg-gray-800 w-64 p-4 transform ${
          sideBarOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out md:hidden z-50`}
      >
        <div className="flex justify-end">
          <IoMdClose
            className="text-white text-2xl cursor-pointer"
            onClick={() => setSideBarOpen(false)}
          />
        </div>
        <nav className="mt-10 flex flex-col items-center space-y-6">
          {renderButtons(isSignedIn)}
        </nav>
      </div>
      {sideBarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setSideBarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Navbar;
