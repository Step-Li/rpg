import React from "react";
import { Order } from "./sort";
import { IWorkProps } from "../../../types/work";
import { useSelector } from "react-redux";
import { IStore } from "../../../redux/store";
import { TableHead, TableRow, TableCell, TableSortLabel } from "@material-ui/core";

interface IWorksTableHeadProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IWorkProps) => void;
    order: Order;
    orderBy: string;
}

interface HeadCell {
    id: keyof IWorkProps;
    label: string;
    align?: 'left' | 'right';
}

const headCells: HeadCell[] = [
    { id: 'title', label: 'Название работы' },
    { id: 'author', label: 'Автор' },
    { id: 'nomination', label: 'Номинация' },
    // { id: 'adventureType', label: 'Тип приключения' },
    { id: 'system', label: 'Система' },
    { id: 'year', label: 'Год конкурса', align: 'right' },
    { id: 'evaluation', label: 'Оценка', align: 'right' },
];

export function WorksTableHead(props: IWorksTableHeadProps) {
    const { order, orderBy, onRequestSort } = props;
    const isAdmin = useSelector((store: IStore) => store.isAdmin);

    const createSortHandler = (property: keyof Omit<IWorkProps, 'adventureType'>) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.align}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={
                                //@ts-ignore
                                createSortHandler(headCell.id)
                            }
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
                <TableCell key='file' align='right'>PDF</TableCell>
                {isAdmin ? <TableCell key='actions' align='right'>Админка</TableCell> : null}
            </TableRow>
        </TableHead>
    );
}
