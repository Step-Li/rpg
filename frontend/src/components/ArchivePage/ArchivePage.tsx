import React from "react";
// @ts-ignore
import MetaTags from 'react-meta-tags';

import { getWorks as apiGetWorks } from "../../api/api";

import { WorksList } from "../WorksList/WorksList";
import { useSelector, useDispatch } from "react-redux";
import { setNeedWorksFetch, updateWorks } from "../../redux/actions";
import { IStore } from "../../redux/store";
import { Typography, Breadcrumbs, Link, makeStyles, Theme, createStyles, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        breadcrumbsPaper: {
            alignSelf: 'flex-start',
            width: '100%',
            marginBottom: 8,
        },
        breadcrumbs: {
            padding: 16,
            paddingLeft: 24,
        },
        archivePage: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',

            width: '1050px',
            maxWidth: '100%',
            margin: 16,
            marginBottom: 0,
        }
    }),
);

export function ArchivePage() {
    const classes = useStyles();
    const needWorksFetch = useSelector((store: IStore) => store.needWorksFetch);
    const dispatch = useDispatch();

    const getWorks = async () => {
        const works = await apiGetWorks();

        if (works) {
            dispatch(updateWorks(works));
        }
    }

    if (needWorksFetch) {
        dispatch(setNeedWorksFetch(false));
        getWorks();
    }

    return (
        <div className={classes.archivePage}>
            <MetaTags>
                <title>Архив работ - RPG-Кашевар</title>
                <meta name="description" content={
                    `Полное собрание работ участников конкурса разных годов. Здесь есть приключения на любой вкус. Можно совершенно бесплатно найти новую игру с любимой системой правил и тематикой.`} />
            </MetaTags>
            <Paper variant='outlined' className={classes.breadcrumbsPaper}>
                <Breadcrumbs className={classes.breadcrumbs} aria-label="breadcrumb">
                    <Link color="inherit" href="/">
                        RPG Кашевар
                    </Link>
                    <Typography color="textPrimary">Архив работ</Typography>
                </Breadcrumbs>
            </Paper>
            <WorksList />
        </div>
    );
}
