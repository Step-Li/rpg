import React, { useState } from "react";

import './Header.scss';
import {
    Hidden, Drawer, Divider, List, ListItem,
    ListItemIcon, ListItemText, makeStyles, Theme, createStyles,
    AppBar, Toolbar, IconButton, Typography, Button
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        // necessary for content to be below app bar
        toolbar: theme.mixins.toolbar,
        appBar: {
            display: 'flex',
            alignItems: 'center'
        },
        headerToolbar: {
            width: 950,
            maxWidth: '100%',
        },
        menu: {
            marginLeft: 'auto',
        }
    }),
);

export function Header() {
    const classes = useStyles();
    const [isOpen, setIsOpen] = useState(false);

    const handleDrawerToggle = () => setIsOpen(!isOpen);

    return (
        <>
            <AppBar className={classes.appBar} position="fixed">
                <Toolbar className={classes.headerToolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        className="MenuBurger"
                        onClick={handleDrawerToggle}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap>
                        RPG КАШЕВАР
                    </Typography>
                    <div className={`${classes.menu} MenuTabs`}>
                        <Link to="/about">
                            <Button color="inherit">О нас</Button>
                        </Link>
                        <Link to="/archive">
                            <Button color="inherit">Архив</Button>
                        </Link>
                        <Link to="/actual">
                            <Button color="inherit">Актуальное</Button>
                        </Link>
                        <a href="https://vk.com/rpgkashevar" target="_blank">
                            <Button color="inherit">VK</Button>
                        </a>
                    </div>
                </Toolbar>
            </AppBar>
            <nav aria-label="menu">
                <Hidden smUp implementation="css">
                    <Drawer
                        open={isOpen}
                        onClose={handleDrawerToggle}
                    >
                        <div>
                            <div className={classes.toolbar} />
                            <Divider />
                            <List>
                                {['О нас', 'Архив', 'Актуальное', 'VK'].map((text) => (
                                    <ListItem button key={text}>
                                        <ListItemText primary={text} />
                                    </ListItem>
                                ))}
                            </List>
                            <Divider />
                        </div>
                    </Drawer>
                </Hidden>
            </nav>
        </>
    );
}