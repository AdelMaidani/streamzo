import React, { useState } from "react";
import { Link } from "react-router-dom";
import liveIllustration from "../Assets/temp/live-illustration.png";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import Cookie from "universal-cookie";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();
  const [emailExist, setEmailExist] = useState(false);
  const [signingUp, setSigningUp] = useState(true);
  const cookies = new Cookie();

  const formik = useFormik({
    initialValues: {
      userName: "",
      fullName: "",
      email: "",
      password: "",
      address: "",
      profilePicture: "",
    },
    validationSchema: Yup.object({
      userName: Yup.string()
        .required("Required")
        .min(5, "Minimum 4 charecter required")
        .lowercase("please enter only lowercase"),
      fullName: Yup.string()
        .required("Required")
        .min(5, "Minimum 5 charecter required"),
      email: Yup.string()
        .required("Required")
        .min(10, "enter valid mail Id")
        .email("enter valid mail Id"),
      password: Yup.string()
        .required("enter password")
        .min(10, "Minimum 5 charecter required")
        .max(20, "Max 50 charecter required"),
      address: Yup.string().min(5, "enter valid address"),
      profilePicture: Yup.string().required("Profile picture is required"),
    }),
    onSubmit: async (values) => {
      setSigningUp(false);

      const files = document.getElementById(
        "profilePicture"
      ) as HTMLInputElement | null;

      function file() {
        if (files?.files?.length === 1) {
          return files.files[0];
        }
      }

      const url = await axios.get("http://localhost:5000/api/s3");

      await axios({
        method: "PUT",
        headers: { "content-type": "multipart/form-data" },
        url: url.data,
        data: file(),
      }).catch((err) => console.log(err));

      formik.values.profilePicture = url.data.split("?")[0];

      await axios
        .post("http://localhost:5000/api/user/register", values, {
          headers: { "Content-Type": "application/json" },
        })
        .then((res) => {
          if (res.data === "email already exist") {
            setSigningUp(true);
            setEmailExist(true);
          } else {
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
      <div className="w-full flex flex-col items-center mt-10">
        <img
          className="hidden md:block grayscale w-96 sticky top-20"
          src={liveIllustration}
          alt=""
        />
      </div>
      <form
        onSubmit={formik.handleSubmit}
        className="flex flex-col grow gap-10 justify-center"
      >
        <div className="flex">
          <span className="font-bold text-xl">Sign up</span>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-semibold">User Name</span>
          <input
            type="text"
            placeholder="jacob"
            name="userName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.userName}
            className="p-1 hover:border-black duration-500 border h-10 text-md"
          />
          <div className="h-1">
            {formik.touched.userName && formik.errors.userName ? (
              <p className="text-red-500">{formik.errors.userName}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-semibold">Full Name</span>
          <input
            type="text"
            name="fullName"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.fullName}
            placeholder="Jacob John"
            className="p-1 hover:border-black duration-500 border h-10 text-md"
          />
          <div className="h-1">
            {formik.touched.fullName && formik.errors.fullName ? (
              <p className="text-red-500">{formik.errors.fullName}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-semibold">Email</span>
          <input
            type="text"
            name="email"
            placeholder="aaa@email.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className="p-1 hover:border-black duration-500 border h-10 text-md"
          />
          <div className="h-1">
            {formik.touched.email && formik.errors.email ? (
              <p className="text-red-500">{formik.errors.email}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-semibold">Password</span>
          <input
            type="password"
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="PA$$w0rd"
            className="p-1 hover:border-black duration-500 border h-10 text-md"
          />
          <div className="h-1">
            {formik.touched.password && formik.errors.password ? (
              <p className="text-red-500">{formik.errors.password}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <span className="font-semibold">Address</span>
          <input
            type="text"
            name="address"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.address}
            placeholder="City, country"
            className="p-1 hover:border-black duration-500 border h-10 text-md"
          />
          <div className="h-1">
            {formik.touched.address && formik.errors.address ? (
              <p className="text-red-500">{formik.errors.address}</p>
            ) : null}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <label>Profile Picture</label>
          <input
            name="profilePicture"
            placeholder="Profile Picture"
            className="text-sm border-2 pt-5 pb-5 pl-2 pr-2 rounded-sm hover:border-black transition duration-500 "
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            id="profilePicture"
            type="file"
          />
          <div className="h-5 text-red-700">
            {formik.touched.profilePicture && formik.errors.profilePicture ? (
              <p>{formik.errors.profilePicture}</p>
            ) : null}
          </div>
        </div>
        <div>
          {signingUp ? (
            <button
              onBlur={formik.handleBlur}
              type="submit"
              name="submit"
              className="border-2 text-white font-bold p-2 border-black bg-black hover:bg-white hover:text-black duration-500"
            >
              Sign Up
            </button>
          ) : (
            <button className="border-2 text-white font-bold p-2 border-black bg-black hover:bg-white hover:text-black duration-500">
              Signing
            </button>
          )}
        </div>
        <div className="flex justify-between">
          {emailExist ? (
            <span className="text-red-500">
              {" "}
              Email already exist. Try loging in!
            </span>
          ) : (
            <span> </span>
          )}
          <Link
            to="/login"
            className="text-right underline underline-offset-1 hover:text-green-400 "
          >
            Allready Signed up ! ..loggin here
          </Link>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
