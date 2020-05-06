import { IWorkProps } from "../../../types/work";

export type Order = 'asc' | 'desc';

export function descendingComparator(a: IWorkProps, b: IWorkProps, orderBy: keyof IWorkProps) {
    let aProp = a[orderBy];
    let bProp = b[orderBy];

    if (aProp === undefined || aProp === null) {
        aProp = '';
    }

    if (bProp === undefined || bProp === null) {
        bProp = '';
    }

    if (bProp < aProp) {
        return -1;
    }

    if (bProp > aProp) {
        return 1;
    }

    return 0;
}

export function getComparator(
    order: Order,
    orderBy: keyof IWorkProps,
): (a: IWorkProps, b: IWorkProps) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

export function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);

    console.log(stabilizedThis);
    
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });

    return stabilizedThis.map((el) => el[0]);
}
