import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../ContextAPI/Authcontext";
import { useFormik } from "formik";
import * as Yup from "yup";

function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuth();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim("No leading or trailing spaces")
        .strict(true)
        .matches(/^(?!\s*$).+$/, "Name cannot be empty or spaces only")
        .required("Name is required"),
      email: Yup.string()
        .trim("No leading or trailing spaces")
        .strict(true)
        .email("Invalid email")
        .required("Email is required"),
      password: Yup.string()
        .trim("No leading or trailing spaces")
        .strict(true)
        .matches(/^(?!\s*$).+$/, "Password cannot be empty or spaces only")
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      register(values.name, values.email, values.password);
      navigate("/login");
    },
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={formik.handleSubmit}
        className="bg-white p-10 rounded-2xl shadow-xl w-full max-w-md flex flex-col"
      >
        <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
          Register
        </h2>

        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Name"
          {...formik.getFieldProps("name")}
          className={`mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 ${
            formik.touched.name && formik.errors.name ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-red-500 text-sm mb-2">{formik.errors.name}</div>
        ) : null}

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Email"
          {...formik.getFieldProps("email")}
          className={`mb-4 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 ${
            formik.touched.email && formik.errors.email ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-500 text-sm mb-2">{formik.errors.email}</div>
        ) : null}

        {/* Password */}
        <input
          type="password"
          name="password"
          placeholder="Password"
          {...formik.getFieldProps("password")}
          className={`mb-6 px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-300 ${
            formik.touched.password && formik.errors.password ? "border-red-500" : "border-gray-300"
          }`}
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-500 text-sm mb-2">{formik.errors.password}</div>
        ) : null}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!formik.isValid || formik.isSubmitting}
          className="bg-purple-300 hover:bg-purple-400 transition-colors text-white font-semibold py-3 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage;
