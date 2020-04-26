import { SET_NEED_WORKS_FETCH, ISetNeedWorksFetch } from "../actionTypes";

export default function(store: boolean = true, action: ISetNeedWorksFetch) {
    switch (action.type) {
        case SET_NEED_WORKS_FETCH:
            return action.needWorksFetch;
        default:
            return store;
    }
}
