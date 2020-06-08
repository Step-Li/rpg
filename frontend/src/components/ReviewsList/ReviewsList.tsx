import React from "react";
import { makeStyles, createStyles } from "@material-ui/core";
import { IReview } from "../../types/work";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import { useSelector } from "react-redux";
import { IStore } from "../../redux/store";
import { AddReview } from "../AddReview/AddReview";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            marginTop: 8,
        },
        gridList: {
            flexWrap: 'nowrap',
            transform: 'translateZ(0)',
            width: '100%',
        },
    }),
);

interface IProps {
    reviews: IReview[];
    workId: string;
}

export default function ReviewsList(props: IProps) {
    const classes = useStyles();
    const isAdmin = useSelector((store: IStore) => store.isAdmin);

    return (
        <div className={classes.root}>
            {props.reviews.map(review => (
                <ReviewCard {...review} />
            ))}
            {isAdmin ? (
                <AddReview workId={props.workId} />
            ) : null}
        </div>
    );
}
