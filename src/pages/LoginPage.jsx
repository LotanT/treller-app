import React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

export const LoginPage = () => {
  const validate = (values) => {
    console.log("values", values);
    const errors = {};
    if (!values.email) {
      errors.email = "Required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
      errors.email = "Invalid email address";
    }
    if (values.password.length < 3) {
      errors.password = "Too short";
    }
    return errors;
  };

  const handleSubmit = (values, { setSubmitting }) => {
    setTimeout(() => {
      alert(JSON.stringify(values, null, 2));
      setSubmitting(false);
    }, 400);
  };

  const CustomInput = (props) => <TextField variant="outlined" {...props} />;

  return (
    <div>
      <h1>My Form</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        validate={validate}
        onSubmit={handleSubmit}
      >
        {(props) => {
          return (
            <Form className="login-form">
              <Field
                type="email"
                name="email"
                label="Email Address"
                as={CustomInput}
              />
              <ErrorMessage name="email" component="div" />
              <Field
                type="password"
                name="password"
                label="Password"
                as={CustomInput}
              />
              <ErrorMessage name="password" component="div" />
              <Button
                variant="contained"
                type="submit"
                disabled={props.isSubmitting}
              >
                Submit
              </Button>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};
