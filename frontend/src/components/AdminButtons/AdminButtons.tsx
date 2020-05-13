import React from 'react';
import { useDispatch } from 'react-redux';

import { IconButton } from '@material-ui/core';
import { makeStyles, createStyles } from "@material-ui/core/styles";

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { IWorkProps } from '../../types/work';
import { deleteWork } from '../../api/api';
import { setNeedWorksFetch, setEditableWork } from '../../redux/actions';

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            marginRight: 8,
        },
    }),
);

interface IProps {
    work: IWorkProps;
}

export function AdminButtons({ work }: IProps) {
    const classes = useStyles();
    const dispatch = useDispatch();

    const deleteClickHandler = async () => {
        // eslint-disable-next-line
        const agreement = confirm("Точно хотите удалить работу \"" + work.title + "\"?");
        if (agreement) {
            const deleted = await deleteWork(work.id);

            if (deleted) {
                dispatch(setNeedWorksFetch(true));
            }
        }
    }

    const editClickHandler = () => {
        dispatch(setEditableWork(work));
    }

    return (
        <>
            <IconButton onClick={editClickHandler} aria-label="edit-work" className={classes.button}>
                <EditIcon />
            </IconButton>
            <IconButton onClick={deleteClickHandler} aria-label="delete-work" className={classes.button}>
                <DeleteIcon color="secondary" />
            </IconButton>
        </>
    )
}