import { IUpdateWorksAction, UPDATE_WORKS } from "../actionTypes";
import { IWorkProps } from "../../types/work";

export default function(store: IWorkProps[] = [], action: IUpdateWorksAction) {
    switch (action.type) {
        case UPDATE_WORKS:
            return Array.from(new Set<string>(action.works.map(work => work.system)));
        default:
            return store;
    }
}
