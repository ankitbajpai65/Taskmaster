import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const containerStyle = {
    height: '91vh',
    background: 'var(--primary-10)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--primary-30)',
};

const linkStyle = {
    color: 'var(--primary-30)',
    fontSize: '1.6rem',
    fontWeight: '600'
}

const Error = () => {
    return (
        <div style={containerStyle}>
            <Typography variant="h3" component="div" sx={{ mb: 3, fontWeight: 'bold' }}>
                Oops! Page Not Found
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
                It seems like the page you're looking for doesn't exist or has been moved.
            </Typography>
            <Link to="/" style={linkStyle}>
                Go back to the home page
            </Link>
        </div>
    )
}

export default Error