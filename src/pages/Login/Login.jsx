import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgLogin from "../../assets/51HaH+dO4yL._UF1000,1000_QL80_.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { userContext } from "../../context/user.context";
import toast from "react-hot-toast";

const Login = () => {
  let { token, setToken } = useContext(userContext);
  let [error, setError] = useState(null);
  let navigate = useNavigate();
  let validationSchema = yup.object({
    email: yup
      .string()
      .required("email is required")
      .email("email must be valid"),
    password: yup
      .string()
      .required("password is required")
      .matches(
        /^[A-Z][a-z0-9]{5,10}$/,
        "password must be start with uppercase and length between 6 to 10"
      ),
  });

  async function onSubmit(values) {
    let loading = toast.loading("loading...");
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signin",
        values
      );
      console.log(data);
      localStorage.setItem("token", data.token);
      setToken(data.token);
      toast.success("all done");
      navigate("/home");
    } catch (error) {
      // console.log(error);
      toast.error(setError("email or password is incorrect"));
    } finally {
      toast.dismiss(loading);
    }
  }
  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <div className=" flex flex-col md:flex-row justify-around items-center mt-20">
        <div className="img w-full md:w-1/2">
          <img className="w-3/4 mt-7 m-auto" src={imgLogin} alt="registerImages" />
        </div>
        <div className="w-full md:w-[40%] bg-white rounded-lg shadow-md px-8 py-10 flex flex-col items-center">
          <h1 className="text-xl font-bold text-center  text-black dark:text-gray-700 mb-8">
            SignIn Now
          </h1>
          <form
            action="#"
            onSubmit={formik.handleSubmit}
            className=" w-full flex flex-col gap-4"
          >
            {error ? (
              <div className="bg-red-400 text-red-800 py-2 my-2 text-center w-75 m-auto">
                {error}
              </div>
            ) : (
              ""
            )}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="email"
                className="text-sm  text-black dark:text-gray-700 mr-2 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                id="email"
                name="email"
                className="w-full px-3 text-black dark:bg-green-300  py-2 rounded-md border border-green-300 dark:border-green-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {formik.touched.email && formik.errors.email ? (
              <div className="text-red-400">{formik.errors.email}</div>
            ) : (
              ""
            )}

            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="password"
                className="text-sm  text-black dark:text-gray-700 mr-2 mb-2"
              >
                Password
              </label>
              <input
                type="password"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.password}
                id="password"
                name="password"
                className="w-full px-3 text-black dark:bg-green-300 py-2 rounded-md border border-green-300 dark:border-green-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-400">{formik.errors.password}</div>
            ) : (
              ""
            )}

            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm cursor-pointer"
            >
              Sign In
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-black dark:text-gray-700">
              Already have an account?{" "}
            </span>
            <Link
              to="/register"
              className="text-green-500 hover:text-green-600"
            >
              Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
