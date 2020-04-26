import React from "react";

import { getWorks as apiGetWorks, deleteWork } from "../../api/api";

import './AdminPanel.scss';
import { WorksList } from "../WorksList/WorksList";
import { useSelector, useDispatch } from "react-redux";
import { setNeedWorksFetch, updateWorks } from "../../redux/actions";
import { IStore } from "../../redux/store";
import { Typography, Breadcrumbs, Link, makeStyles, Theme, createStyles } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        breadcrumbs: {
            alignSelf: 'flex-start',
            padding: 16,
            paddingLeft: 24,
        }
    }),
);

export function AdminPanel() {
    const classes = useStyles();
    const needWorksFetch = useSelector((store: IStore) => store.needWorksFetch);
    const dispatch = useDispatch();

    const getWorks = async () => {
        const works = await apiGetWorks();

        if (works) {
            dispatch(updateWorks(works));
        }
    }

    const deleteClickHandler = async (id: string) => {
        const deleted = await deleteWork(id);

        if (deleted) {
            await getWorks();
        }
    }

    if (needWorksFetch) {
        dispatch(setNeedWorksFetch(false));
        getWorks();
    }

    return (
        <div className="AdminPanel">
            <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    RPG Кашевар
                </Link>
                <Typography color="textPrimary">Архив работ</Typography>
            </Breadcrumbs>
            <WorksList
                onDeleteClick={deleteClickHandler}
            />
        </div>
    );
}
