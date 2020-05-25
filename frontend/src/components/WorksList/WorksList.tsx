import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { WorksFilters } from "../WorksFilters/WorksFilters";
import {
    getFilterByEvalutaion,
    getFilterByYears,
    getFilterByNomination,
    getFilterBySystems,
    getFilterByAdventureType
} from "./filters";

import { IStore } from "../../redux/store";

import { WorksTable } from "../WorksTable/WorksTable";
import { EditWork } from "../EditWork/EditWork";
import { WorksListNoWorks } from "./__NoWorks/WorkListNoWorks";
import { WorkCard } from "../WorkCard/WorkCard";

import './WorksList.scss';

export function WorksList() {
    useEffect(() => {
        const resizeHandler = () => {
            setIsTouch(document.body.clientWidth <= 600);
        };

        window.addEventListener('resize', resizeHandler);

        return () => {
            window.removeEventListener('resize', resizeHandler);
        }
    }, []);
    const works = useSelector((state: IStore) => state.works);
    const filters = useSelector((state: IStore) => state.filters);
    const [isTouch, setIsTouch] = useState(document.body.clientWidth <= 600);

    const filteredWorks = works
        .filter(getFilterByEvalutaion(filters.evaluationRange))
        .filter(getFilterByYears(filters.years))
        .filter(getFilterByNomination(filters.nomination))
        .filter(getFilterByAdventureType(filters.adventureType))
        .filter(getFilterBySystems(filters.systems));

    const worksList = () => isTouch ? (
        filteredWorks.map(work => <WorkCard key={work.id} {...work} />)
    ) : <WorksTable works={filteredWorks} />;

    return (
        <div className="WorksList">
            <WorksFilters />
            <EditWork />
            {filteredWorks.length > 0 ?
                worksList()
                : <WorksListNoWorks />}
        </div>
    )
}
