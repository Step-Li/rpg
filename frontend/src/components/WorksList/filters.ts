import { IWorkProps } from "../../types/work";

export function getFilterByEvalutaion(evalutaion: number | number[] | undefined) {
    if (evalutaion === undefined) {
        return (_: IWorkProps) => true;
    }

    return (work: IWorkProps) => {
        if (Array.isArray(evalutaion)) {
            return Number(work.evaluation) >= evalutaion[0] &&
                Number(work.evaluation) <= evalutaion[1];
        }

        return Number(work.evaluation) === evalutaion;
    }
}

export function getFilterByYears(years: string[] | undefined) {
    if (years === undefined || years.length === 0) {
        return (_: IWorkProps) => true;
    }

    return (work: IWorkProps) => {
        console.log(work.year);

        return years.some(year => String(year) === String(work.year));
    }
}

export function getFilterByNomination(nomination: string | undefined) {
    if (nomination === undefined) {
        return (_: IWorkProps) => true;
    }

    return (work: IWorkProps) => {
        return nomination === work.nomination;
    }
}

export function getFilterByAdventureType(adventureType: string | null | undefined) {
    if (adventureType === undefined) {
        return (_: IWorkProps) => true;
    }

    return (work: IWorkProps) => {
        return adventureType === work.adventureType;
    }
}

export function getFilterBySystems(systems: string[] | undefined) {
    if (!systems || systems.length === 0) {
        return (_: IWorkProps) => true;
    }

    return (work: IWorkProps) => {
        return systems.some(system => system === work.system);
    }
}
