import React from 'react';
import { Box, Modal, Button } from '@mui/material';
import baseUrl from "../../../config";
import './BasicModal.css'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

function BasicModal(
    {
        open,
        handleClose,
        todo,
        setTodo,
        getAllTodos,
        isEditing,
        setIsEditing,
        handleEditTodo,
        userData
    }) {

    const inputEvent = (e) => {
        setTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }

    const handleCreateTodo = (e) => {
        e.preventDefault();
        setIsEditing(false);

        fetch(`${baseUrl}/todo/create_todo`, {
            method: "POST",
            crossDomain: true,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({ ...todo, user: userData._id })
        })
            .then((res) => {
                let result = res.json();
                return result;
            }).then((data) => {
                getAllTodos();
            })
        handleClose();
        setTodo({
            title: '',
            description: '',
        });
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                className="modal"
            >
                <Box sx={style} className="modalBox">
                    <form
                        onSubmit={!isEditing ? handleCreateTodo : handleEditTodo}
                    >
                        <input type="text" placeholder='Add title' id="title" name="title" value={todo.title} onChange={inputEvent} />
                        <textarea row="6" col="10" placeholder='Take a note...' id="description" sx={{ mt: 2 }} name="description" value={todo.description} onChange={inputEvent} />
                        <Button
                            type="submit"
                            variant="contained"
                            className="myBtn"
                            sx={{
                                position: 'absolute',
                                right: '2rem',
                                bottom: '2rem',
                                background: "var(--primary-30)",
                            }}
                        >{isEditing ? "Edit" : "Add"}
                        </Button>
                    </form>
                </Box>
            </Modal>
        </div>
    );
}

export default BasicModal;