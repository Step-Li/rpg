import React from "react";

import { createStyles, makeStyles, Paper } from "@material-ui/core";

import { AddWork } from "../../AddWork/AddWork";

const useStyles = makeStyles(() =>
    createStyles({
        paper: {
            paddingTop: 20,
            paddingBottom: 12,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }
    })
);

export function WorksListNoWorks() {
    const classes = useStyles();
    return (
        <Paper variant="outlined" className={classes.paper}>
            Работы не найдены
            <AddWork variant="outlined" />
        </Paper>
    )
}