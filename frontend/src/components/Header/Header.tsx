import React, { useState } from "react";

import './Header.scss';
import {
    Hidden, Drawer, Divider, List, ListItem,
    ListItemText, makeStyles, Theme, createStyles,
    AppBar, Toolbar, IconButton, Typography, Button
} from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from "react-router-dom";

import { MENU_TABS } from '../../constants/menu';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
                        {MENU_TABS.map(({ link, tab }) => <Link to={link}>
                            <Button color="inherit">{tab}</Button>
                        </Link>)}
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
                            <List className="MenuToolbar">
                                {MENU_TABS.map(({ link, tab }) => (
                                    <Link to={link}>
                                        <ListItem button key={tab}>
                                            <ListItemText color="inherit" primary={tab} />
                                        </ListItem>
                                    </Link>
                                ))}
                                <a href="https://vk.com/rpgkashevar" target="_blank">
                                    <ListItem button>
                                        <ListItemText primary="VK" />
                                    </ListItem>
                                </a>
                            </List>
                            <Divider />
                        </div>
                    </Drawer>
                </Hidden>
            </nav>
        </>
    );
}