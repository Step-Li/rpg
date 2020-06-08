import { IUpdateWorksAction, UPDATE_WORKS } from "../actionTypes";
import { IWorkProps } from "../../types/work";

export default function (store: IWorkProps[] = [], action: IUpdateWorksAction) {
    switch (action.type) {
        case UPDATE_WORKS:
            const systems: string[] = [];
            action.works.forEach(({ system }) => {
                if (system) {
                    systems.push(system);
                }
            })
            return Array.from(new Set<string>(systems));
        default:
            return store;
    }
}
