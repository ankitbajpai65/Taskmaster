import React, { useState } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import baseUrl from "../../../config";
import { useFormik } from 'formik';
import { SignupSchema } from './validationSchema';
import './Auth.css';

const Signup = () => {
    const navigate = useNavigate();
    const [authError, setAuthError] = useState('');
    // const [user, setUser] = useState({
    //     name: '',
    //     email: '',
    //     password: '',
    // });

    // const inputEvent = (e) => {
    //     setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    // };

    const handleSignupSubmit = async (e) => {
        // e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(formik.values),
            });

            const data = await response.json();

            if (data.status === 'error')
                setAuthError(data.message);
            else
                navigate('/login');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validationSchema: SignupSchema,
        onSubmit: handleSignupSubmit
    });

    return (
        <Grid container columns={16} sx={{
            background: 'var(--primary-10)',
            minHeight: '91vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Grid item xs={14} sm={10} md={6} xl={5} className="authContainer">
                <Typography
                    variant="h4"
                    gutterBottom
                    className="authHead"
                    sx={{ mb: 5, color: 'var(--primary-30)' }}
                >
                    Create free account
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    {['name', 'email', 'password'].map((field) => (
                        <TextField
                            key={field}
                            fullWidth
                            placeholder={`Enter ${field}`}
                            id="fullWidth"
                            className="inputField"
                            name={field}
                            // value={user[field]}
                            // onChange={inputEvent}
                            value={formik.values[field]}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched[field] && Boolean(formik.errors[field])}
                            helperText={formik.touched[field] && formik.errors[field]}
                        />
                    ))}
                    {authError && (
                        <Typography variant="div" color="error">
                            {authError}
                        </Typography>
                    )}
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ mt: 5 }}
                        className="authMainBtn"
                    >
                        Signup
                    </Button>
                    <Typography variant="div" gutterBottom>
                        <Typography variant="span" sx={{ mb: 5 }}>
                            Already have an account?
                        </Typography>
                        <Button
                            variant="text"
                            className="authNavBtn"
                            onClick={() => navigate('/login')}
                        >
                            Login
                        </Button>
                    </Typography>
                </form>
            </Grid>
        </Grid>
    );
};

export default Signup;
