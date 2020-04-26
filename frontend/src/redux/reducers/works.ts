import { IUpdateWorksAction, UPDATE_WORKS } from "../actionTypes";
import { IWorkProps } from "../../types/work";

export default function(store: IWorkProps[] = [], action: IUpdateWorksAction) {
    switch (action.type) {
        case UPDATE_WORKS:
            return action.works || [];
        default:
            return store;
    }
}
