import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import imgRegister from "../../assets/istockphoto-544749182-612x612.jpg";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  let [error, setError] = useState(null);
  let navigate = useNavigate();
  let validationSchema = yup.object({
    name: yup
      .string()
      .required("name is required")
      .min(3, "name min length is 3")
      .max(15, "name max length is 15"),
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
    phone: yup
      .string()
      .required("phone is required")
      .matches(/^01[0125][0-9]{8}$/, "phone must be egyption number"),
    age: yup
      .number()
      .required("age is required")
      .min(16, "age min is 16")
      .max(70, "age max is 70"),
  });

  async function onSubmit(values) {
    let loading = toast.loading("loading...");
    try {
      let { data } = await axios.post(
        "https://note-sigma-black.vercel.app/api/v1/users/signup",
        values
      );
      console.log(data);
      toast.success("all done");
      navigate("/login");
    } catch (error) {
      // console.log(error);
      toast.error(setError(error.response.data.msg));
    } finally {
      toast.dismiss(loading);
    }
  }
  let formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      phone: "",
      age: "",
    },
    onSubmit,
    validationSchema,
  });
  return (
    <>
      <div className=" flex flex-col md:flex-row justify-around items-center mt-20">
        <div className="img w-full md:w-1/2">
          <img
            className="w-3/4 mt-2 m-auto"
            src={imgRegister}
            alt="registerImages"
          />
        </div>
        <div className="w-full md:w-[40%] bg-white rounded-lg shadow-md px-8 py-10 mt-15 flex flex-col items-center">
          <h1 className="text-xl font-bold text-center  text-black dark:text-gray-700 mb-4">
            SignUp Now
          </h1>
          <form
            action="#"
            onSubmit={formik.handleSubmit}
            className=" w-full flex flex-col gap-4"
          >
            {error ? (
              <div className="bg-red-400 text-red-800 py-2 my-2 text-center w-50 m-auto">
                {error}
              </div>
            ) : (
              ""
            )}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="name"
                className="text-sm  text-black dark:text-gray-700 mr-2 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                id="name"
                name="name"
                className="w-full px-3 text-black dark:bg-green-300  py-2 rounded-md border border-green-300 dark:border-green-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {formik.touched.name && formik.errors.name ? (
              <div className="text-red-400">{formik.errors.name}</div>
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
                className="w-full px-3 text-black dark:bg-green-300  py-2 rounded-md border border-green-300 dark:border-green-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {formik.touched.password && formik.errors.password ? (
              <div className="text-red-400">{formik.errors.password}</div>
            ) : (
              ""
            )}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="phone"
                className="text-sm  text-black dark:text-gray-700 mr-2 mb-2"
              >
                Phone
              </label>
              <input
                type="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.phone}
                id="phone"
                name="phone"
                className="w-full px-3 text-black dark:bg-green-300  py-2 rounded-md border border-green-300 dark:border-green-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {formik.touched.phone && formik.errors.phone ? (
              <div className="text-red-400">{formik.errors.phone}</div>
            ) : (
              ""
            )}
            <div className="flex items-start flex-col justify-start">
              <label
                htmlFor="age"
                className="text-sm  text-black dark:text-gray-700 mr-2 mb-2"
              >
                Age
              </label>
              <input
                type="number"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.age}
                id="age"
                name="age"
                className="w-full px-3 text-black dark:bg-green-300  py-2 rounded-md border border-green-300 dark:border-green-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            {formik.touched.age && formik.errors.age ? (
              <div className="text-red-400">{formik.errors.age}</div>
            ) : (
              ""
            )}
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md shadow-sm cursor-pointer"
            >
              Sign Up
            </button>
          </form>

          <div className="mt-4 text-center">
            <span className="text-sm text-black dark:text-gray-700">
              Already have an account?{" "}
            </span>
            <Link to="/login" className="text-green-500 hover:text-green-600">
              Login
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
