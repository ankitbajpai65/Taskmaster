import React, { useState, useEffect } from 'react'
import {
    Button,
    Grid,
    Card,
    CardActions,
    CardContent,
    Typography,
    IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import BasicModal from '../Modal/BasicModal';
import { useNavigate } from 'react-router-dom';
import './Home.css'
import homeImg from '/login.png'


const Home = ({ userData }) => {
    const isLogin = localStorage.getItem("isLogin")
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [todo, setTodo] = useState({
        title: "",
        description: ""
    })
    const [allTodos, setAllTodos] = useState([]);

    const redirectToLogin = () => {
        navigate('/login');
    }

    const handleOpen = () => setOpen(true);

    const handleClose = () => {
        setOpen(false);
        setIsEditing(false)
        setTodo({
            title: '',
            description: ''
        })
    }

    const getAllTodos = () => {
        return fetch(`https://taskmaster-api-em9c.onrender.com/todo/getAllTodos/${userData?._id}`)
            .then((res) => {
                let result = res.json();
                return result;
            }).then((data) => {
                setAllTodos(data.data);
            })
    }

    useEffect(() => {
        if (userData?._id) {
            getAllTodos()
        }
    }, [userData]);

    const editBtnClick = (todoToEdit) => {
        handleOpen();
        setIsEditing(true);

        setTodo({
            id: todoToEdit._id,
            title: todoToEdit.title,
            description: todoToEdit.description,
        })
    }

    const handleEditTodo = (e) => {
        e.preventDefault();
        fetch('https://taskmaster-api-em9c.onrender.com/todo/editTodo', {
            method: "PATCH",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify(todo)
        })
            .then((res) => {
                let result = res.json();
                return result;
            }).then((data) => {
                // console.log(data);
                getAllTodos();
            })
        handleClose();
    }

    const handleDeleteTodo = (id) => {
        const confirmation = confirm('Are you sure you want to delete this todo!')

        if (confirmation) {
            fetch('https://taskmaster-api-em9c.onrender.com/todo/deleteTodo', {
                method: "DELETE",
                crossDomain: true,
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "Access-Control-Allow-Origin": "*",
                },
                body: JSON.stringify({ id })
            })
                .then((res) => res.json()).then((data) => {
                    // console.log(data);
                    getAllTodos();
                })
        }
    }

    return (
        <>
            {
                !isLogin ?
                    <Grid container className="homeDiv"
                        sx={{ height: '91vh' }}>
                        <Grid item md={6} className="homeImgCont">
                            <img src={homeImg} alt="" />
                        </Grid>
                        <Grid item xs={12} md={6} className="homeInfo">
                            <h1 className="message">Please Login to add and view todos!</h1>
                            <Button variant="contained" onClick={redirectToLogin} className="homeLoginBtn">Login</Button>
                        </Grid>
                    </Grid>
                    :
                    <div style={{ marginTop: '2.5rem' }}>
                        <button className="addBtn" onClick={handleOpen}>
                            <AddIcon className='addIcon' />
                        </button>
                        <BasicModal
                            open={open}
                            handleClose={handleClose}
                            todo={todo}
                            setTodo={setTodo}
                            getAllTodos={getAllTodos}
                            isEditing={isEditing}
                            setIsEditing={setIsEditing}
                            handleEditTodo={handleEditTodo}
                            userData={userData}
                        />
                        <Grid
                            container
                            spacing={5}
                            className={`cardContainer ${allTodos.length === 0 ? 'emptyCardContainer' : 'filledCardContainer'}`}>
                            {
                                allTodos?.length > 0 ? (
                                    allTodos.map((todo, index) => (
                                        <Grid item xs={12} sm={6} md={4} xl={3} key={index}
                                            sx={{ height: 'fit-content' }}
                                        >
                                            <Card
                                                sx={{
                                                    width: '100%',
                                                    position: 'relative',
                                                    background: 'var(--primary-20)',
                                                    boxShadow: 'none'
                                                }}
                                                className="cards"
                                                key={index}
                                            >
                                                <CardContent>
                                                    <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                                                        {todo.title}
                                                    </Typography>
                                                    <Typography variant="body2" sx={{ mb: 3 }}>
                                                        {todo.description}
                                                    </Typography>
                                                </CardContent>
                                                <CardActions sx={{
                                                    position: 'absolute',
                                                    right: '0rem',
                                                    bottom: '0rem'
                                                }}>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => editBtnClick(todo)}
                                                    >
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton
                                                        aria-label="delete"
                                                        onClick={() => handleDeleteTodo(todo._id)}
                                                    >
                                                        <DeleteIcon className='deleteIcon' />
                                                    </IconButton>
                                                </CardActions>
                                            </Card>
                                        </Grid>
                                    ))
                                ) : (
                                    <div style={{ color: 'var(--primary-30)', }}>
                                        <Typography variant="h3" component="div" sx={{ mb: 3, fontWeight: 'bold' }}>
                                            Your todo list is empty.
                                        </Typography>
                                        <Typography variant="h5" sx={{ mb: 3, textAlign: 'center' }}>
                                            Add some todos to get started.
                                        </Typography>
                                    </div>
                                )
                            }
                        </Grid>
                    </div>
            }
        </>
    )
}

export default Home