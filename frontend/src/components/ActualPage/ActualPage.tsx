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
                «RPG-Кашевар 2020» пройдёт во второй половине лета, так что точите карандаши, повторяйте теорию дизайна и собирайте команду для тестов — в общем, готовьтесь.
            </Typography>
            <Typography variant="body1" gutterBottom>
                Уже в июне мы предоставим обновлённый регламент. В нём изменится награждение, номинации и появятся более строгие правила по оформлению. Кроме этого, мы заложили больше времени на работу судей — число работ в 2019 году превзошло все ожидания!
            </Typography>
            <Typography variant="body1" gutterBottom>
                Сейчас идут переговоры с потенциальными судьями: блогерами, авторами и издателями, связанными с настольными ролевыми играми. Мы планируем увеличить штат и снизить нагрузка на каждого отдельно судью, чтобы они могли уделить больше внимания вашим работам.
            </Typography>
            <Typography variant="body1" gutterBottom>
                За новостями вы можете следить в нашей группе ВКонтакте — совсем скоро мы расскажем о работе, которую проделали за зиму.
            </Typography>
        </Paper>
    </>
}