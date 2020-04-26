import { IWorkProps } from "../types/work";
import { IFilters } from "../types/filters";
import { UPDATE_WORKS, UPDATE_FILTERS, IUpdateWorksAction, ISetEditableWorkAction, IUpdateFiltersAction, SET_EDITABLE_WORK, SET_NEED_WORKS_FETCH, ISetNeedWorksFetch, ISetIsAdmin, SET_IS_ADMIN } from "./actionTypes";

export const updateWorks = (works: IWorkProps[]): IUpdateWorksAction => ({
    type: UPDATE_WORKS,
    works,
});

export const setEditableWork = (work: IWorkProps | null): ISetEditableWorkAction => ({
    type: SET_EDITABLE_WORK,
    work: work || null,
});

export const updateFilters = (filters: IFilters): IUpdateFiltersAction => ({
    type: UPDATE_FILTERS,
    filters,
});

export const setNeedWorksFetch = (needWorksFetch: boolean): ISetNeedWorksFetch => ({
    type: SET_NEED_WORKS_FETCH,
    needWorksFetch,
});

export const setIsAdmin = (isAdmin: boolean): ISetIsAdmin => ({
    type: SET_IS_ADMIN,
    isAdmin,
});
