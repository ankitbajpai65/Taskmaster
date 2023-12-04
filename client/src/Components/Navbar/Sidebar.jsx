import React from 'react';
import {
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText
} from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import './Navbar.css';

const drawerWidth = 240;

export default function Sidebar({
    openDrawer,
    allTodos,
    setFilteredTodos,
    getAllTodos,
    activeDrawerButton,
    setActiveDrawerButton
}) {
    const getTrashTodos = () => {
        console.log(`getTrashTodos runs`);
        const trashedTodos = allTodos.filter((todo) => todo.is_trash);
        console.log(trashedTodos);
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
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Drawer>
    );
}