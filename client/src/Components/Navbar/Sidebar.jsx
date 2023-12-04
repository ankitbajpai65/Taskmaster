import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import NotesIcon from '@mui/icons-material/Notes';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';
import './Navbar.css';

const drawerWidth = 240;

export default function Sidebar({
    openDrawer,
    handleDrawerToggle,
    allTodos,
    setFilteredTodos,
    getAllTodos,
    activeDrawerButton,
    setActiveDrawerButton
}) {
    const getTrashTodos = () => {
        const trashedTodos = allTodos.filter((todo) => todo.is_trash);
        setFilteredTodos(trashedTodos)
    }

    const handleDrawerButton = (text) => {
        setActiveDrawerButton(text);

        switch (text) {
            case "Todos":
                getAllTodos();
                break;
            case "Archive":
                break;
            case "Trash":
                getTrashTodos();
                break;
            default:
                break;
        }
        handleDrawerToggle()
    }

    return (
        <Drawer
            className="myDrawer"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                },
            }}
            variant="persistent"
            anchor="left"
            open={openDrawer}
        >
            <List>
                {['Todos', 'Archive', 'Trash'].map((text, index) => (
                    <ListItem
                        key={text}
                        disablePadding
                        className={`${text === activeDrawerButton && `activeDrawerButton`}`}
                    >
                        <ListItemButton
                            onClick={() => handleDrawerButton(text)}
                            disabled={text === 'Archive'}
                        >
                            <ListItemIcon>
                                {text === 'Todos' && <NotesIcon />}
                                {text === 'Archive' && <ArchiveIcon />}
                                {text === 'Trash' && <DeleteIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}