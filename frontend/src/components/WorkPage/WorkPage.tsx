import React, { useEffect, useState } from "react";
// @ts-ignore
import MetaTags from 'react-meta-tags';

import { RouteComponentProps } from "react-router-dom";
import { getWork as apiGetWork } from "../../api/api";

import {
    Paper, Card, CardContent, CardHeader,
    CardMedia, makeStyles, createStyles, Link, Typography, Button,
} from "@material-ui/core";
import OpenInNewIcon from '@material-ui/icons/OpenInNew';
import SaveIcon from '@material-ui/icons/Save';

import { IWorkProps } from "../../types/work";
import ReviewsList from "../ReviewsList/ReviewsList";
import './WorkPage.scss';

const year = new Date().getFullYear();

const useStyles = makeStyles(() =>
    createStyles({
        media: {
            height: 300,
            width: 200,
            border: '1px solid #eee',
            marginRight: '8px',
        },
        title: {
            paddingBottom: 0,
            margin: 0,
        },
        icon: {
            marginRight: 4,
        },
        links: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
        },
        card: {
            display: 'flex',
        }
    }),
);
export function WorkPage(props: RouteComponentProps<{ id: string }>) {
    const classes = useStyles();
    const [work, setWork] = useState<IWorkProps | null>(null);

    const getWork = async () => {
        const newWork = await apiGetWork(props.match.params.id);
        setWork(newWork);
    };

    useEffect(() => {
        getWork();
    }, []);

    return work ? (
        <div className='WorkPage'>
            <MetaTags>
                <title>{work.title} - RPG-Кашевар</title>
                <meta name="description" content={
                    `${work.title} - это настольная ролевая игра, написанная на конкурс RPG-Кашевар ${year} года. Скачайте и играйте!`} />
            </MetaTags>
            <Card variant='outlined'>
                <CardHeader title={work.title} component='h1' className={classes.title} />
                <CardContent>
                    <div className={classes.card}>
                        {work.imgUrl ?
                            <CardMedia
                                className={classes.media}
                                image={work.imgUrl}
                                title={work.title}

                            />
                            : null}
                        <div className={classes.links}>
                            {work.finalUrl ? <Link href={work.finalUrl} color='inherit'>
                                <Button>
                                    <OpenInNewIcon className={classes.icon} />
                                Финальная версия игры
                            </Button>
                            </Link> : null}
                            <Button>
                                <SaveIcon className={classes.icon} />
                            Конкурсная работа
                        </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
            {work.description ? <Card variant='outlined'>
                <CardHeader title="Описание" />
                <CardContent>
                    {work.description}
                </CardContent>
            </Card> : null}
            {work.reviews ? <ReviewsList workId={work.id} reviews={work.reviews} /> : null}
        </div>
    ) : <Paper className='WorkPage'>Загрузка</Paper>
}