import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Document, Page } from 'react-pdf/dist/entry.webpack';
import Modal from 'react-modal';

import { Card, CardContent, Typography, CardActions, Button, IconButton, Collapse } from "@material-ui/core";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import CloseIcon from '@material-ui/icons/Close';
import SaveIcon from '@material-ui/icons/Save';
import RightIcon from '@material-ui/icons/ChevronRight';
import LeftIcon from '@material-ui/icons/ChevronLeft';

import { setEditableWork } from "../../redux/actions";
import { IStore } from "../../redux/store";

import { IWorkProps } from "../../types/work";

import './WorkCard.scss';
import { PdfViewer } from "../PdfViewer/PdfViewer";

interface IProps extends IWorkProps {
    onDeleteClick?: (id: string) => void;
}

const NOMINATIONS = {
    game: 'Игра',
    adventure: 'Приключение',
}

const ADVENTURES = {
    scenario: 'Сценарий',
    decoration: 'Декорация',
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        button: {
            marginRight: 8,
        },
        closeButton: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
        expand: {
            transform: 'rotate(0deg)',
            marginLeft: 'auto',
            transition: theme.transitions.create('transform', {
                duration: theme.transitions.duration.shortest,
            }),
        },
        expandOpen: {
            transform: 'rotate(180deg)',
        },
    }),
);


export function WorkCard(props: IProps) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const isAdmin = useSelector((store: IStore) => store.isAdmin);

    const [isCollapseExpanded, setIsCollapseExpanded] = useState(false);
    const handleExpandClick = () => {
        setIsCollapseExpanded(!isCollapseExpanded);
    }

    const { onDeleteClick, ...work } = props;

    const deleteClickHandler = () => {
        // eslint-disable-next-line
        const agreement = confirm("Точно хотите удалить работу \"" + props.title + "\"?");
        if (agreement && onDeleteClick) {
            onDeleteClick(props.id);
        }
    }

    const editClickHandler = () => {
        dispatch(setEditableWork(work));
    }

    const { id, title, nomination, evaluation, system, year, filePath, adventureType, description } = work;

    return (
        <Card variant="outlined">
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    {NOMINATIONS[nomination]}
                </Typography>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography color="textSecondary">
                    {year}
                </Typography>
                <Typography variant="body2" component="p">
                    {(nomination === 'adventure' && adventureType) ? <>Тип приключения: {ADVENTURES[adventureType]} <br /></> : null}
                        Система: {system} <br />
                        Оценка: {evaluation} <br />
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {filePath ?
                    <>
                        <PdfViewer
                            file={{
                                url: 'works/download-file?id=' + id,
                                httpHeaders: {
                                    'Content-Type': 'application/pdf',
                                }
                            }}
                        />
                        <a download href={'http://localhost:3000/works/download-file?id=' + id} rel="noopener noreferrer" target="_blank">
                            <IconButton aria-label="save-work" className={classes.button}>
                                <SaveIcon />
                            </IconButton>
                        </a>
                    </>: null}
                {isAdmin ? (
                    <>
                        <IconButton onClick={editClickHandler} aria-label="edit-work" className={classes.button}>
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={deleteClickHandler} aria-label="delete-work" className={classes.button}>
                            <DeleteIcon color="secondary" />
                        </IconButton>
                    </>
                ) : null}
                {description ? <IconButton
                    className={`${classes.expand} ${isCollapseExpanded ? classes.expandOpen : ''}`}
                    onClick={handleExpandClick}
                    aria-expanded={isCollapseExpanded}
                    aria-label="show more"
                >
                    <ExpandMoreIcon />
                </IconButton> : null}
            </CardActions>
            {description ? <Collapse in={isCollapseExpanded} timeout="auto" unmountOnExit>
                <CardContent>
                    <Typography paragraph>
                        {description}
                    </Typography>
                </CardContent>
            </Collapse> : null}
        </Card>
    );
}
