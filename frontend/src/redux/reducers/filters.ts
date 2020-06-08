import { IUpdateFiltersAction, UPDATE_FILTERS, UPDATE_WORKS, IUpdateWorksAction } from "../actionTypes";
import { IFilters } from "../../types/filters";

export default function (store: IFilters = {}, action: IUpdateFiltersAction & IUpdateWorksAction) {
    switch (action.type) {
        case UPDATE_FILTERS:
            return {
                ...store,
                ...action.filters,
            };
        case UPDATE_WORKS:
            let maxEvaluation = 0;

            action.works.forEach(work => {
                maxEvaluation = Math.max(work.evaluation, maxEvaluation);
            });

            return {
                ...store,
                evaluationRange: store.evaluationRange || [0, maxEvaluation],
                maxEvaluation,
            };
        default:
            return store;
    }
}
