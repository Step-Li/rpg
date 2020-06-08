import React from "react";
import { useSelector } from "react-redux";
import { useHistory } from 'react-router';

import { Card, CardContent, Typography, CardActions } from "@material-ui/core";

import { AdminButtons } from "../AdminButtons/AdminButtons";
import { FileButtons } from "../FileButtons/FileButtons";

import { IWorkProps } from "../../types/work";
import { IStore } from "../../redux/store";

import { NOMINATIONS, ADVENTURES } from '../../constants/nominations';

import './WorkCard.scss';

export function WorkCard(props: IWorkProps) {
    const history = useHistory();
    const isAdmin = useSelector((store: IStore) => store.isAdmin);

    const { id, title, nomination, evaluation, system, year, filePath, adventureType } = props;

    const clickHandler = () => {
        history.push('/work/' + id);
    }

    return (
        <Card variant="outlined">
            <CardContent onClick={clickHandler}>
                <Typography color="textSecondary" gutterBottom>
                    {NOMINATIONS[nomination]}
                </Typography>
                <Typography variant="h5" component="h2">
                    {title}
                </Typography>
                <Typography color="textSecondary">
                    {year}
                </Typography>
                <Typography variant="body2" component="p">
                    {(nomination === 'adventure' && adventureType) ? <>Тип приключения: {ADVENTURES[adventureType]} <br /></> : null}
                    {system ? <> Система: {system} <br /> </> : null}
                    Оценка: {evaluation} <br />
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
                {filePath ? <FileButtons id={id} /> : null}
                {isAdmin ? <AdminButtons work={props} /> : null}
            </CardActions>
        </Card>
    );
}
