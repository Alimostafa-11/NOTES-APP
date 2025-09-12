import React, { useContext } from "react";
import logo from "../../assets/cute-paper-note-paper-note-template-notes-memo-and-to-do-lists-used-in-a-diary-or-office-vector.jpg";
import { Link, useNavigate } from "react-router-dom";
import { userContext } from "../../context/user.context";

const Navbar = () => {
  let navigate = useNavigate();
  let { token, setToken } = useContext(userContext);
  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    navigate("/login");
  }
  return (
    <>
      <nav className="fixed top-0 py-4  left-0 w-full z-50 bg-teal-400 border-b backdrop-blur-lg bg-opacity-80">
        <div className="mx-auto max-w-7xl px-6 sm:px-6 lg:px-8 ">
          <div className="relative flex h-16 justify-between">
            <div className="flex flex-1 items-stretch pt-2 justify-start">
              <img className="block h-12 w-auto" src={logo} alt="logo" />
              <h1 className="text-black text-2xl font-bold p-2">NOTES</h1>
            </div>
            <div className="flex-shrink-0 flex px-2 py-3 items-center space-x-8">
              {token == null ? (
                <>
                  {" "}
                  <Link
                    className="text-gray-700 text-lg  font-medium"
                    to={"/login"}
                  >
                    Login
                  </Link>
                  <Link
                    className="text-gray-800 text-lg inline-flex items-center justify-center px-3 py-2 font-medium "
                    to={"/register"}
                  >
                    Register
                  </Link>{" "}
                </>
              ) : (
                <button
                  className="text-gray-800 text-lg inline-flex items-center justify-center px-3 py-2 font-medium cursor-pointer"
                  onClick={logout}
                >
                  Log Out
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
