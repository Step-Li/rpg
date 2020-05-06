import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import {
    Table, TableBody, TableCell, TableContainer,
    TablePagination, TableRow, Paper, IconButton
} from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SaveIcon from '@material-ui/icons/Save';

import { IStore } from '../../redux/store';
import { setEditableWork } from '../../redux/actions';
import { IWorkProps } from '../../types/work';
import { Order, getComparator, stableSort } from './__Header/sort';
import { PdfViewer } from '../PdfViewer/PdfViewer';
import { WorksTableHead } from './__Header/WorksTableHeader';
import { AddWork } from '../AddWork/AddWork';
import { useHistory } from 'react-router';

const NOMINATIONS = {
    game: 'Игра',
    adventure: 'Приключение',
}

const ADVENTURES = {
    scenario: 'Сценарий',
    decoration: 'Декорация',
}

interface IWorksTableProps {
    works: IWorkProps[];
    onDeleteClick: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        actions: {
            padding: 0,
            whiteSpace: 'nowrap',
        },
        button: {
            display: 'inline',
        },
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: 8,
        }
    }),
);

export default function WorksTable(props: IWorksTableProps) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const history = useHistory();

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof IWorkProps>('title');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const isAdmin = useSelector((store: IStore) => store.isAdmin);

    const { works } = props;

    const requestSortHandler = (_: React.MouseEvent<unknown>, property: keyof IWorkProps) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const changePageHandler = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const changeRowsPerPageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const deleteClickHandler = (work: IWorkProps) => {
        // eslint-disable-next-line
        const agreement = confirm("Точно хотите удалить работу \"" + work.title + "\"?");
        if (agreement) {
            props.onDeleteClick(work.id);
        }
    }

    const rowClickHandler = (id: string) => {
        history.push('/work/' + id);
    }

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, works.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper} variant='outlined'>
                <TableContainer>
                    <Table
                        aria-labelledby="tableTitle"
                        size='medium'
                        aria-label="enhanced table"
                    >
                        <WorksTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={requestSortHandler}
                        />
                        <TableBody>
                            {stableSort<IWorkProps>(works, getComparator(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((work: IWorkProps, index: number) => {
                                    const labelId = `enhanced-table-checkbox-${index}`;

                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={work.title}
                                        >
                                            <TableCell component="th" id={labelId} scope="row" onClick={() => rowClickHandler(work.id)}>
                                                {work.title}
                                            </TableCell>
                                            <TableCell onClick={() => rowClickHandler(work.id)}>{NOMINATIONS[work.nomination]}</TableCell>
                                            <TableCell onClick={() => rowClickHandler(work.id)}>{work.adventureType && ADVENTURES[work.adventureType]}</TableCell>
                                            <TableCell onClick={() => rowClickHandler(work.id)}>{work.system}</TableCell>
                                            <TableCell onClick={() => rowClickHandler(work.id)} align="right">{work.year}</TableCell>
                                            <TableCell onClick={() => rowClickHandler(work.id)} align="right">{work.evaluation}</TableCell>
                                            <TableCell id="file" className={classes.actions}>
                                                {work.filePath ?
                                                    <>
                                                        <PdfViewer
                                                            file={{
                                                                url: 'works/download-file?id=' + work.id,
                                                                httpHeaders: {
                                                                    'Content-Type': 'application/pdf',
                                                                }
                                                            }}
                                                        />
                                                        <a download href={'http://localhost:3000/works/download-file?id=' + work.id} rel="noopener noreferrer" target="_blank">
                                                            <IconButton aria-label="save-work" className={classes.button}>
                                                                <SaveIcon />
                                                            </IconButton>
                                                        </a>
                                                    </> : null}
                                            </TableCell>
                                            {isAdmin ? (
                                                <TableCell id="actions" padding='none' className={classes.actions}>
                                                    <IconButton onClick={() => dispatch(setEditableWork(work))} className={classes.button} aria-label="edit-work">
                                                        <EditIcon />
                                                    </IconButton>
                                                    <IconButton onClick={() => deleteClickHandler(work)} className={classes.button} aria-label="delete-work">
                                                        <DeleteIcon color="secondary" />
                                                    </IconButton>
                                                </TableCell>
                                            ) : null}
                                        </TableRow>
                                    );
                                })}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={isAdmin ? 8 : 7} />
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={classes.footer}>
                    <AddWork />
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={works.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onChangePage={changePageHandler}
                        onChangeRowsPerPage={changeRowsPerPageHandler}
                    />
                </div>
            </Paper>
        </div>
    );
}
