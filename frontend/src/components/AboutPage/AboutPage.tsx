import React from "react";
import { Paper, Typography, makeStyles, createStyles, Breadcrumbs } from "@material-ui/core";
//@ts-ignore
import MetaTags from 'react-meta-tags';

const year = new Date().getFullYear();

const useStyles = makeStyles(createStyles({
    body: {
        width: 850,
        maxWidth: '100%',
        padding: 20,
        marginTop: 16,
        height: '100%',
    },
    breadcrumb: {
        marginBottom: 16,
    }
}));

export function AboutPage() {
    const classes = useStyles();

    return <>
        <MetaTags>
            <title> RPG-Кашевар {year} - Конкурс настольных ролевых игр</title>
            <meta name="description" content={
                `RPG-Кашевар — конкурс разработки игр, который проводится с 2009 года. В его рамках участники создают приключения и новые игровые системы. Любишь DnD или Pathfinder? Заходи к нам и попробуй свои силы в гейм-дизайне!`} />
        </MetaTags>
        <Paper className={classes.body}>
            <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
                <Typography color="inherit">RPG-Кашевар</Typography>
                <Typography color="textPrimary">О конкурсе</Typography>
            </Breadcrumbs>

            <Typography variant="h4" component="h1" gutterBottom>
                Что такое RPG-Кашевар?
        </Typography>
            <Typography variant="body1" gutterBottom>
                RPG-Кашевар — конкурс разработки, который проводится с 2009 года.
                В его рамках участники пишут приключения и самостоятельные настольные ролевые игры.
                На этом сайте можно посмотреть и скачать работы, присланные в прошлые годы, почитать,
                как проходили конкурсы и узнать новости про актуальный.
        </Typography>
            <Typography variant="body1" gutterBottom>
                Чтобы принять участие не нужно платить взносов или приносить рекомендательные письма
                — участие бесплатное, главное чтобы работа соответствовала условиям.
                Условия, а также новости и другую полезную информацию о ближайшем мероприятии ты можешь увидеть в
                разделе «Актуальное» или нашей группе Вконтакте.
        </Typography>
            <Typography variant="body1" gutterBottom>
                RPG-Кашевар — это возможность испытать себя, получить обратную связь от судей и
                товарищей по хобби и, конечно, выиграть ценные призы. Мы обогащаем русскоязычное
                сообщество и вместе создаём базу приключений, которыми сможет пользоваться любой желающий.
        </Typography>
        </Paper>
    </>
}