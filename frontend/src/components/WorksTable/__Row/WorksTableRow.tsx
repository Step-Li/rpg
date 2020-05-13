import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router';

import { IWorkProps } from "../../../types/work";
import { TableRow, TableCell, makeStyles, createStyles } from "@material-ui/core";
import { NOMINATIONS, ADVENTURES } from "../../../constants/nominations";
import { FileButtons } from "../../FileButtons/FileButtons";
import { AdminButtons } from "../../AdminButtons/AdminButtons";

import { IStore } from '../../../redux/store';

const useStyles = makeStyles(() =>
    createStyles({
        actions: {
            padding: 0,
            whiteSpace: 'nowrap',
        },
    }),
);

export function WorksTableRow(props: IWorkProps) {
    const classes = useStyles();
    const history = useHistory();
    const isAdmin = useSelector((store: IStore) => store.isAdmin);

    const {
        title, nomination, adventureType,
        evaluation, system, year, filePath, id
    } = props;

    const rowClickHandler = () => {
        history.push('/work/' + id);
    }

    return (
        <TableRow
            hover
            role="checkbox"
            tabIndex={-1}
            key={title}
        >
            <TableCell component="th" scope="row" onClick={rowClickHandler}>
                {title}
            </TableCell>
            <TableCell onClick={rowClickHandler}>{NOMINATIONS[nomination]}</TableCell>
            <TableCell onClick={rowClickHandler}>{adventureType && ADVENTURES[adventureType]}</TableCell>
            <TableCell onClick={rowClickHandler}>{system}</TableCell>
            <TableCell onClick={rowClickHandler} align="right">{year}</TableCell>
            <TableCell onClick={rowClickHandler} align="right">{evaluation}</TableCell>
            <TableCell id="file" className={classes.actions}>
                {filePath ? <FileButtons id={id} /> : null}
            </TableCell>
            {isAdmin ? (
                <TableCell id="actions" padding='none' className={classes.actions}>
                    <AdminButtons work={props} />
                </TableCell>
            ) : null}
        </TableRow>
    );
}