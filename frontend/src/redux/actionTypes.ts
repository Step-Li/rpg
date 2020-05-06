import { IWorkProps } from "../types/work";
import { IFilters } from "../types/filters";

export const UPDATE_WORKS = 'UPDATE_WORKS';
export const SET_EDITABLE_WORK = 'SET_EDITABLE_WORK';
export const UPDATE_FILTERS = 'UPDATE_FILTERS';
export const SET_NEED_WORKS_FETCH = 'SET_NEED_WORKS_FETCH';
export const SET_IS_ADMIN = 'SET_IS_ADMIN';
export const SELECT_WORK = 'SELECT_WORK';

interface IAction {
    type: string;
}

export interface IUpdateWorksAction extends IAction {
    works: IWorkProps[],
}

export interface ISetEditableWorkAction extends IAction {
    work: IWorkProps | null,
}

export interface IUpdateFiltersAction extends IAction {
    filters: IFilters,
}

export interface ISetNeedWorksFetch extends IAction {
    needWorksFetch: boolean,
}

export interface ISetIsAdmin extends IAction {
    isAdmin: boolean,
}

export interface ISelectWorkAction extends IAction {
    work: IWorkProps | null,
}
