import React, { useState, ChangeEvent } from "react";
import { Button, Card, CardContent, makeStyles, createStyles, TextField } from "@material-ui/core";
import { addReview } from "../../api/api";
import { useStoreState } from "../../hooks/useStoreState";
import { IReview } from "../../types/work";

const useStyles = makeStyles(() =>
    createStyles({
        card: {
            height: '100%',
            minHeight: 100,
            backgroundColor: '#f0f0f0',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        },
        button: {
            width: '100%',
            height: '100%',
        },
        content: {
            width: '100%',
            height: '100%',
            padding: 0,
            '&:last-child': {
                padding: 0,
            }
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            padding: 12,
        },
        text: {
            margin: '12px 0',
            flexBasis: '50%',
            '&:last-child:not(:first-child)': {
                marginLeft: 8,
            }
        },
        plusminus: {
            display: 'flex',
        },
    }),
);

interface IProps {
    workId: string;
}

export function AddReview(props: IProps) {
    const classes = useStyles();
    const [clicked, setClicked] = useState(false);
    const [state, setState] = useStoreState<IReview>({
        author: '',
        text: '',
    });

    const clickHandler = () => {
        addReview(state, props.workId);
        setClicked(false);
    };

    const changeHandler = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState({
            [e.target.name]: e.target.value,
        })
    }

    return (
        <Card variant='outlined' className={classes.card}>
            <CardContent className={classes.content}>
                {clicked ? (
                    <form className={classes.form}>
                        <TextField
                            name="author"
                            label="Автор отзыва"
                            variant="outlined"
                            value={state.author}
                            onChange={changeHandler}
                        />
                        <div className={classes.plusminus}>
                            <TextField
                                name="positive"
                                variant="outlined"
                                className={classes.text}
                                multiline
                                label="Плюсы"
                                rows={5}
                                value={state.positive}
                                onChange={changeHandler}
                            />
                            <TextField
                                name="negative"
                                variant="outlined"
                                className={classes.text}
                                multiline
                                label="Минусы"
                                rows={5}
                                value={state.negative}
                                onChange={changeHandler}
                            />
                        </div>
                        <TextField
                            name="text"
                            variant="outlined"
                            className={classes.text}
                            multiline
                            label="Текст"
                            rows={5}
                            value={state.text}
                            onChange={changeHandler}
                        />
                        <Button onClick={clickHandler} variant="outlined">
                            Добавить
                        </Button>
                    </form>
                ) : (
                        <Button className={classes.button} onClick={() => setClicked(true)}>
                            Добавить отзыв
                        </Button>
                    )}
            </CardContent>
        </Card>
    );
}
