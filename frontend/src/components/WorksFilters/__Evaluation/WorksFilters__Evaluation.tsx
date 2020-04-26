import React, { ChangeEvent } from "react";
import Typography from '@material-ui/core/Typography';
import { StyledSlider } from "./StyledSlider";

import { useSelector, useDispatch } from "react-redux";
import { updateFilters } from "../../../redux/actions";
import { IStore } from "../../../redux/store";
import { FormControl, InputLabel } from "@material-ui/core";

function getStringRange(range: number[]) {
    return range[0] === range[1] ? range[0].toString() : `${range[0]}-${range[1]}`;
}

export function WorksFiltersEvaluation() {
    const evaluationRange = useSelector((state: IStore) => state.filters.evaluationRange);
    const maxEvaluation = useSelector((state: IStore) => state.filters.maxEvaluation);
    const dispatch = useDispatch();

    const onChange = (_: ChangeEvent<{}>, newValue: number | number[]) => {
        dispatch(updateFilters({
            evaluationRange: newValue,
        }));
    };

    return maxEvaluation ? (
        <div className={'WorksFilters-Filter EvaluationFilter'}>
                <InputLabel htmlFor="evaluation-slider" className="Label">
                    Оценка: {Array.isArray(evaluationRange) ? getStringRange(evaluationRange) : evaluationRange}
                </InputLabel>
                <StyledSlider
                    value={evaluationRange}
                    onChange={onChange}
                    valueLabelDisplay="auto"
                    aria-labelledby="evaluation-slider"
                    max={maxEvaluation}
                    min={1}
                />
        </div>
        ) : null;
}
