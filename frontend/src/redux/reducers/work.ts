import { ISelectWorkAction, SELECT_WORK } from "../actionTypes";
import { IWorkProps } from "../../types/work";

export default function(store: IWorkProps | null = null, action: ISelectWorkAction) {
    switch (action.type) {
        case SELECT_WORK:
            return action.work || null;
        default:
            return store;
    }
}
