import React, { useState, useEffect } from 'react';
import { styled } from '@mui/material/styles';
import {
    AppBar,
    Toolbar,
    IconButton,
    Button,
    InputBase,
    MenuItem,
    Menu,
    Avatar,
    Box,
    ListItemIcon
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import baseUrl from "../../../config";
import './Navbar.css';

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: '#d9e9e5',
    '&:hover': {
        backgroundColor: '#d9e9e5',
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '30%',
    },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

export default function Navbar({ userData, setUserData }) {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        localStorage.clear();
        navigate('/');
    }

    useEffect(() => {
        fetch(`${baseUrl}/user/profile`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${window.localStorage.getItem("token")}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setUserData(data.data);
            });
    }, [userData]);


    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
                elevation: 0,
                sx: {
                    overflow: 'visible',
                    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                    mt: 1.5,
                    '& .MuiAvatar-root': {
                        width: 32,
                        height: 32,
                        ml: -0.5,
                        mr: 1,
                    },
                },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
            <MenuItem onClick={handleClose}>
                <Avatar /> {userData?.name}
            </MenuItem>
            <MenuItem onClick={handleClose}>
                <ListItemIcon>
                    <Settings fontSize="small" />
                </ListItemIcon>
                Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
                <ListItemIcon>
                    <Logout fontSize="small" />
                </ListItemIcon>
                Logout
            </MenuItem>
        </Menu>
    );

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" sx={{ background: 'white', color: 'black' }} className="navbar">
                <Toolbar sx={{
                    justifyContent: 'space-between'
                }}>
                    <Box sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '2rem'
                    }}>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <img
                            src="/logo2.png"
                            alt=""
                            onClick={() => navigate('/')}
                            className="logoImg"
                        />
                    </Box>
                    <Search xs={6}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </Search>
                    <Box
                        sx={{
                            height: '3rem',
                            display: 'flex'
                        }}>
                        {
                            !userData ?
                                <Button
                                    variant="contained"
                                    className="navBtn myBtn"
                                    onClick={() => navigate('/login')}
                                    sx={{ background: "var(--primary-30)" }}
                                >
                                    Login
                                </Button>
                                :
                                <>
                                    <IconButton
                                        size="large"
                                        edge="end"
                                        aria-label="account of current user"
                                        aria-controls={menuId}
                                        aria-haspopup="true"
                                        onClick={handleClick}
                                        color="inherit"
                                    >
                                        <AccountCircle sx={{ fontSize: '3rem' }} className="profileIcon"/>
                                    </IconButton>
                                </>
                        }
                    </Box>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </Box>
    );
}
