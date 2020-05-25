import React from "react";
import { Avatar, Typography, Card, makeStyles, createStyles, CardContent, CardHeader } from "@material-ui/core";
import { IReview } from "../../types/work";

const useStyles = makeStyles(() =>
    createStyles({
        card: {
            height: '100%',
            whiteSpace: 'pre-wrap',
        },
        content: {
            height: '100%',
        }
    }),
);

export function ReviewCard(props: IReview) {
    const classes = useStyles();
    const { text, author } = props;
    return (
        <Card variant='outlined' className={classes.card}>
            <CardHeader
                avatar={
                <Avatar aria-label="recipe">
                    RPG
                </Avatar>
                }
                title={author}
                subheader="Отзыв о работе"
            />
            <CardContent className={classes.content}>
                <Typography id="form-file" color="textPrimary">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
}
