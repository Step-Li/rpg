import { combineReducers } from "redux";
import works from "./works";
import filters from "./filters";
import systems from "./systems";
import editableWork from "./editableWork";
import needWorksFetch from "./needWorksFetch";
import isAdmin from "./isAdmin";

export default combineReducers({
    works,
    filters,
    systems,
    editableWork,
    needWorksFetch,
    isAdmin
});
