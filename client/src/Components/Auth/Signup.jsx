import React, { useState } from 'react';
import {
    Grid,
    Typography,
    TextField,
    Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import baseUrl from "../../../config";
import './Auth.css';

const Signup = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: '',
    });

    const inputEvent = (e) => {
        setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSignupSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${baseUrl}/user/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            console.log(data);
            navigate('/login');
        } catch (error) {
            console.error('Error during signup:', error);
        }
    };

    const navigate = useNavigate();

    return (
        <Grid container columns={16} sx={{
            background: 'var(--primary-10)',
            minHeight: '91vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <Grid item xs={5} className="authContainer">
                <Typography variant="h4" gutterBottom sx={{ mb: 5, color: 'var(--primary-30)' }}>
                    Create free account
                </Typography>
                <form onSubmit={handleSignupSubmit}>
                    {['name', 'email', 'password'].map((field) => (
                        <TextField
                            key={field}
                            fullWidth
                            placeholder={`Enter ${field}`}
                            id="fullWidth"
                            className="inputField"
                            name={field}
                            value={user[field]}
                            onChange={inputEvent}
                        />
                    ))}
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
