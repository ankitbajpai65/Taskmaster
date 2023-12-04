import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, "Name must be 2 characters at minimum")
        .max(50, 'Name must be 50 characters at maximum')
        .required("Name is required"),
    email: Yup.string()
        .email("Invalid email address format")
        .required("Email is required"),
    password: Yup.string()
        .min(5, "Password must be 5 characters at minimum")
        .required("Password is required"),
});

const LoginSchema = Yup.object().shape({
    email: Yup.string()
        .email("Invalid email address format")
        .trim()
        .required("Email is required"),
    password: Yup.string()
        .required("Password is required"),
});

export { SignupSchema, LoginSchema };
