import React from "react";

import { makeStyles, createStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() =>
    createStyles({
        footer: {
            position: 'absolute',
            bottom: 0,
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            padding: 16,
        }
    }),
);

export function Footer() {
    const classes = useStyles();

    return <div className={classes.footer}>
        <Typography variant='caption' color='textSecondary'> RPG-Кашевар | 2020 </Typography>
    </div>;
}