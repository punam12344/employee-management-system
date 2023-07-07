import { useFormik } from "formik";
import React from "react";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const navigate = useNavigate();

  const validationSchemas = () => {
    return Yup.object().shape({
      email: Yup.string()
        .required("Email is required")
        .email("Email is invalid"),

      password: Yup.string()

        .required("Password is required")
        .min(6, "Password must be at least 6 characters")
        .max(18, "Password must not exceed 40 characters"),
    });
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchemas,
    onSubmit: async (values) => {
      console.log(values);

      axios
        .post(
          "https://real-pear-fly-kilt.cyclic.app/accounts/authenticate",
          values
        )
        .then((y) => {
          console.log(y);
          navigate("/Employee");
        });
    },
  });
  return (
    <form onSubmit={formik.handleSubmit}>
      <Typography
        variant="h3"
        sx={{ color: "green", marginLeft: 68, marginTop: 3 }}
      >
        Login Form
      </Typography>
      <div>
        <TextField
          id="email"
          name="email"
          label="Email"
          value={formik.values.email}
          helperText={formik.touched.email ? formik.errors.email : ""}
          error={formik.touched.email && Boolean(formik.errors.email)}
          onChange={formik.handleChange}
          sx={{ marginLeft: 55, marginTop: 5 }}
          style={{width:500}}
        />
      </div>
      <div>
        <TextField
          id="password"
          name="password"
          label="Password"
          type="password"
          helperText={formik.touched.password ? formik.errors.password : ""}
          error={formik.touched.password && Boolean(formik.errors.password)}
          value={formik.values.password}
          onChange={formik.handleChange}
          sx={{ marginLeft: 55, marginTop: 3 }}
          style={{width:500}}
        />
      </div>
      <Button
        color="primary"
        variant="contained"
        type="submit"
        sx={{ marginLeft: 75, marginTop: 4 }}
      >
        Submit
      </Button>
    </form>
  );
}
