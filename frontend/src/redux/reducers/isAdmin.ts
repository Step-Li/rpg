import { ISetIsAdmin, SET_IS_ADMIN } from "../actionTypes";
import { getCookie } from "../../api/api";

export default function(store: boolean = false, action: ISetIsAdmin) {
    switch (action.type) {
        case SET_IS_ADMIN:
            return action.isAdmin;
        default:
            return Boolean(getCookie('access_token'));
    }
}
