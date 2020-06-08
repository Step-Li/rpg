import React from "react";
import { Typography, Card, makeStyles, createStyles, CardContent, CardHeader, Divider, Theme, IconButton } from "@material-ui/core";
import { IReview } from "../../types/work";
import DeleteIcon from '@material-ui/icons/Delete';
import { deleteReview } from "../../api/api";
import { useSelector } from "react-redux";
import { IStore } from "../../redux/store";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        card: {
            height: '100%',
            whiteSpace: 'pre-wrap',
            position: 'relative',
        },
        content: {
            height: '100%',
            paddingTop: 0,
        },
        text: {
            marginBottom: 12,
            flexBasis: '50%',
            '&:last-child:not(:first-child)': {
                marginLeft: 8,
            },
        },
        plusminus: {
            display: 'flex',
        },
        dividerVert: {
            height: 'inherit',
        },
        dividerHor: {
            marginBottom: 12,
        },
        success: {
            color: theme.palette.success.main,
        },
        deleteIcon: {
            position: 'absolute',
            top: 8,
            right: 8,
        }
    }),
);

export function ReviewCard(props: IReview) {
    const classes = useStyles();
    const isAdmin = useSelector((store: IStore) => store.isAdmin)
    const { text, author, positive, negative, reviewId } = props;

    const deleteClickHandler = () => {
        // eslint-disable-next-line
        const agreement = confirm("Точно хотите удалить отзыв?");
        if (agreement) {
            reviewId && deleteReview(reviewId);
        }
    }

    return (
        <Card variant='outlined' className={classes.card}>
            {isAdmin ? <IconButton onClick={deleteClickHandler} className={classes.deleteIcon}>
                <DeleteIcon />
            </IconButton> : null }
            <CardHeader
                title={author}
                subheader="Отзыв о работе"
            />
            <CardContent className={classes.content}>
                <div className={classes.plusminus}>
                    {positive ? <>
                        <div className={classes.text}>
                            <Typography id="form-file" variant='h6' className={classes.success}>Понравилось:</Typography>
                            <Typography id="form-file" color="textPrimary">
                                {positive}
                            </Typography>
                        </div>
                    </> : null}
                    {positive && negative ? <Divider className={classes.dividerVert} orientation="vertical" /> : null}
                    {negative ? <>
                        <div className={classes.text}>
                            <Typography id="form-file" variant='h6' color="secondary">Не понравилось:</Typography>
                            <Typography id="form-file" color="textPrimary">
                                {negative}
                            </Typography>
                        </div>
                    </> : null}
                </div>
                <Divider className={classes.dividerHor}/>
                <Typography id="form-file" color="textPrimary">
                    {text}
                </Typography>
            </CardContent>
        </Card>
    );
}
