import React from "react";
import { Paper, Typography, makeStyles, createStyles, Breadcrumbs, Link } from "@material-ui/core";
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

export function ActualPage() {
    const classes = useStyles();

    return <>
        <MetaTags>
            <title>Актуальное - RPG-Кашевар {year}</title>
            <meta name="description" content={
                `Конкурс настольных ролевых игр RPG-Кашевар. Актуальная информация о времени проведения, призах и правилах ${year} года. Чтобы не пропустить новый конкурс, следите за обновлениями здесь.`} />
        </MetaTags>
        <Paper className={classes.body}>
            <Breadcrumbs className={classes.breadcrumb} aria-label="breadcrumb">
                <Link color="inherit" href="/">
                    <Typography color="inherit">RPG-Кашевар</Typography>
                </Link>
                <Typography color="textPrimary">Актуальное</Typography>
            </Breadcrumbs>

            <Typography variant="h5" component="h1" gutterBottom>
                Актуальное о конкурсе
        </Typography>
            <Typography variant="body1" gutterBottom>
                RPG-Кашевар 2020 пройдёт летом. Мы учли опыт прошлого конкурса: пересмотрим призовую систему, расширим команду и незначительно переработаем правила, чтобы они вызывали меньше вопросов.
        </Typography>
        </Paper>
    </>
}