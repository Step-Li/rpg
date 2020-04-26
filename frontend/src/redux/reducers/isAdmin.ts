import { ISetIsAdmin, SET_IS_ADMIN } from "../actionTypes";

export default function(store: boolean = true, action: ISetIsAdmin) {
    switch (action.type) {
        case SET_IS_ADMIN:
            return action.isAdmin;
        default:
            return store;
    }
}
