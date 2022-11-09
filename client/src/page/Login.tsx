import { useState } from "react";
import loginIllustration from "../Assets/temp/loginIllustration.png";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const cookies = new Cookie();
  const [checkCredentials, setCheckCredentials] = useState(false);
  const [logging, setLogging] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .required("Enter your registed email Id ")
        .min(5, "Enter valid email Id")
        .max(40, "Enter valid email Id"),
      password: Yup.string()
        .required("password required to login")
        .min(5, "Enter valid password")
        .max(20, "Enter valid password"),
    }),
    onSubmit: (values) => {
      setLogging(true);
      axios
        .post("http://localhost:5000/api/user/login", values, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data === "Email or password wrong") {
            setLogging(false);
            setCheckCredentials(true);
          } else {
            setCheckCredentials(false);
            cookies.set("token", res.data.token, { path: "/" });
            navigate("/myVideos");
            window.location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
  });

  return (
    <div className="p-10 md:grid grid-cols-2">
      <div className="w-full flex flex-col mt-10 items-center">
        <img
          src={loginIllustration}
          className="hidden md:block grayscale w-96 sticky top-20"
          alt="loginImage"
        />
      </div>

      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col grow gap-10 justify-center"
      >
        <div className="flex">
          <span className="font-bold text-xl">Login</span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-semibold">Email</span>
          <input
            type="text"
            name="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="hover:border-black duration-500 border h-10 text-md p-2"
          />
        </div>
        <div className="h-1">
          {formik.touched.email && formik.errors.email ? (
            <p className="text-red-500">{formik.errors.email}</p>
          ) : null}
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-semibold">Password</span>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className="hover:border-black duration-500 border h-10 text-md p-2"
          />
        </div>
        <div className="h-1">
          {formik.touched.password && formik.errors.password ? (
            <p className="text-red-500">{formik.errors.password}</p>
          ) : null}
        </div>
        {logging ? (
          <button className="border-2 text-white font-bold p-2 border-black bg-black hover:bg-white hover:text-black duration-500">
            Verifying...
          </button>
        ) : (
          <button
            type="submit"
            className="border-2 text-white font-bold p-2 border-black bg-black hover:bg-white hover:text-black duration-500"
          >
            Loggin
          </button>
        )}
        <div className="flex justify-between">
          {checkCredentials ? (
            <span className="text-red-500 font-bold">
              Password or email incorrect
            </span>
          ) : (
            <span></span>
          )}
          <Link
            to="/signup"
            className="text-right underline underline-offset-2 hover:text-green-400 "
          >
            New ! .. Sign Up here
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Login;
