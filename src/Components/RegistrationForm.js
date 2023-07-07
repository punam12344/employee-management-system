import { useFormik } from "formik";
import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Checkbox, Typography } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
  const navigate = useNavigate();
  const registrationvalidation = () => {
    return Yup.object().shape({
      title: Yup.string()
        .required("title is required")
        .oneOf(["MS", "Miss", "MRS", "MR"], "Please enter valid value"),

      firstName: Yup.string()
        .required("Please enter FirstName")
        .min(3, "Please enter correct value")
        .max(12, "Please enter valid name in range of 12"),

      lastName: Yup.string()
        .required("Please enter LastName")
        .min(3, "Please enter correct value")
        .max(12, "Please enter valid name in range of 12"),

      email: Yup.string()
        .required("Email is requred")
        .email("email is invalid"),

      password: Yup.string()
        .required("Password is required")
        .min(6, "Password must be atleast 6 characters")
        .max(18, "Password must not exceed 40 characters"),

      confirmPassword: Yup.string()
        .required("Confirmpassword is required")
        .oneOf([Yup.ref("password"), null], "Confirmpassword does not match"),

      acceptTerms: Yup.bool().oneOf([true], "Acceptterm is required"),
    });
  };
  const formik = useFormik({
    initialValues: {
      title: "",
      firstName: "",
      lastName: "",
      email: "",
      userName: "",
      password: "",
      confirmPassword: "",
      acceptTerms: true,
    },
    validationSchema: registrationvalidation,
    onSubmit: (values) => {
      console.log(values);

      axios
        .post("https://real-pear-fly-kilt.cyclic.app/accounts/register", values)
        .then((y) => {
          console.log(y);
          navigate("/LoginForm");
        })
        .catch(() => {});
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        variant="h3"
        sx={{ color: "green", marginLeft: 60, marginTop: 3 }}
      >
        Registration Form
      </Typography>
      <div>
        <TextField
          id="title"
          name="title"
          label="Title"
          value={formik.values.title}
          helpertext={formik.touched.title ? formik.errors.title : ""}
          error={formik.touched.title && Boolean(formik.errors.title)}
          onChange={formik.handleChange}
          sx={{ marginLeft: 55, marginTop: 3}}
          style={{width:500}}
        />
      </div>
      <div>
        <TextField
          id="firstName"
          name="firstName"
          label="FirstName"
          value={formik.values.firstName}
          helpertext={formik.touched.firstName ? formik.errors.firstName : ""}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          onChange={formik.handleChange}
          sx={{ marginLeft: 55, marginTop: 2 }}
          style={{width:500}}
        />
      </div>
      <div>
        <TextField
          id="lastName"
          name="lastName"
          label="LastName"
          value={formik.values.lastName}
          helpertext={formik.touched.lastName ? formik.errors.lastName : ""}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          onChange={formik.handleChange}
          sx={{ marginLeft: 55, marginTop: 2 }}
          style={{width:500}}
        />
      </div>
      <div>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          helpertext={formik.touched.email ? formik.errors.email : ""}
          error={formik.touched.email && Boolean(formik.errors.email)}
          onChange={formik.handleChange}
          sx={{ marginLeft: 55, marginTop: 2 }}
          style={{width:500}}
        />
      </div>
      <div>
        <TextField
          id="userName"
          name="userName"
          label="UserName"
          value={formik.values.userName}
          helpertext={formik.touched.userName ? formik.errors.userName : ""}
          error={formik.touched.userName && Boolean(formik.errors.userName)}
          onChange={formik.handleChange}
          sx={{ marginLeft: 55, marginTop: 2 }}
          style={{width:500}}
        />
      </div>
      <div>
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          helpertext={formik.touched.password ? formik.errors.password : ""}
          error={formik.touched.password && Boolean(formik.errors.password)}
          value={formik.values.password}
          onChange={formik.handleChange}
          sx={{ marginLeft: 55, marginTop: 2 }}
          style={{width:500}}
        />
      </div>
      <div>
        <TextField
          id="confirmPassword"
          name="confirmPassword"
          label="ConfirmPassword"
          type="password"
          helpertext={
            formik.touched.confirmPassword ? formik.errors.confirmPassword : ""
          }
          error={
            formik.touched.confirmPassword &&
            Boolean(formik.errors.confirmPassword)
          }
          value={formik.values.confirmPassword}
          onChange={formik.handleChange}
          sx={{ marginLeft: 55, marginTop: 2 }}
          style={{width:500}}
        />
      </div>

      <div>
        {/* Accept Terms  */}

        <Checkbox
          name="acceptTerms"
          value={formik.values.acceptTerms}
          helpertext={
            formik.touched.acceptTerms ? formik.errors.acceptTerms : ""
          }
          error={
            formik.touched.acceptTerms && Boolean(formik.errors.acceptTerms)
          }
          onClick={formik.handleChange}
          sx={{ marginLeft: 55 }}
        />

        <Button
          color="primary"
          variant="contained"
          type="submit"
          sx={{ marginTop: 2, marginLeft:10}}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
