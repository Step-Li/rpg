import React from 'react';
import { useSelector } from 'react-redux';

import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import {
    Table, TableBody, TableCell, TableContainer,
    TablePagination, TableRow, Paper,
} from '@material-ui/core';

import { AddWork } from '../AddWork/AddWork';
import { Order, getComparator, stableSort } from './__Header/sort';
import { WorksTableHead } from './__Header/WorksTableHeader';

import { IStore } from '../../redux/store';
import { IWorkProps } from '../../types/work';

import { WorksTableRow } from './__Row/WorksTableRow';

interface IWorksTableProps {
    works: IWorkProps[];
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
        footer: {
            display: 'flex',
            justifyContent: 'space-between',
            paddingLeft: 8,
        }
    }),
);

export function WorksTable(props: IWorksTableProps) {
    const classes = useStyles();

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
                                .map((work: IWorkProps) => <WorksTableRow {...work} />)}
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
