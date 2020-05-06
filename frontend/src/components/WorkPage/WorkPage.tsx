import React, { useEffect } from "react";
import { RouteComponentProps } from "react-router-dom";
import { getWork as apiGetWork } from "../../api/api";

import { useSelector, useDispatch } from "react-redux";
import { IStore } from "../../redux/store";
import { selectWork } from "../../redux/actions";
import { Paper } from "@material-ui/core";

export function WorkPage(props: RouteComponentProps<{id: string}>) {
    const work = useSelector((store: IStore) => store.work);
    const dispatch = useDispatch();
    const getWork = async () => {
        const work = await apiGetWork(props.match.params.id);
        dispatch(selectWork(work));
    };

    useEffect(() => {
        getWork();
    });
    
    return work ? (
        <Paper>{work.title}</Paper>
    ) : <Paper>Загрузка</Paper>
}