import { useState } from "react";

export function useStoreState<T>(defaultStore: T): [T, (store: Partial<T>) => void] {
    const [store, setStore] = useState(defaultStore);

    function setStoreState(newStore: Partial<T>) {
        setStore({...store, ...newStore});
    }

    return [store, setStoreState];
}
