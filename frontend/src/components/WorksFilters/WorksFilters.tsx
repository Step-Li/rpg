import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import { WorksFiltersEvaluation } from "./__Evaluation/WorksFilters__Evaluation";
import { WorksFiltersYear } from "./__Year/WorksFilters__Year";
import { WorksFiltersNomination } from "./__Nomination/WorksFilters__Nomination";
import { WorksFiltersSystem } from "./__System/WorksFilters__System";

import './WorksFilters.scss';

export function WorksFilters() {
    return (
        <Card variant="outlined" className="WorksFilters">
            <CardContent>
                <WorksFiltersSystem />
                <WorksFiltersYear />
                <WorksFiltersNomination />
                <WorksFiltersEvaluation />
            </CardContent>
        </Card>
    );
}
