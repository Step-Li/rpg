import { SET_EDITABLE_WORK, ISetEditableWorkAction } from "../actionTypes";
import { IWorkProps } from "../../types/work";

export default function(store: IWorkProps | null = null, action: ISetEditableWorkAction) {
    switch (action.type) {
        case SET_EDITABLE_WORK:
            return action.work;
        default:
            return store;
    }
}
