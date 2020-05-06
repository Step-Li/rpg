import { createStore } from "redux";
import rootReducer from "./reducers";
import { IWorkProps } from "../types/work";
import { IFilters } from "../types/filters";

export interface IStore {
    isAdmin: boolean;
    works: IWorkProps[];
    work: IWorkProps | null;
    filters: IFilters;
    systems: string[];
    editableWork: IWorkProps | null;
    needWorksFetch: boolean;
}

export default createStore(rootReducer);