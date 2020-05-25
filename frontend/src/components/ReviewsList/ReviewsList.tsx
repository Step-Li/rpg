import React from "react";
import { GridList, GridListTile, makeStyles, createStyles } from "@material-ui/core";
import { IReview } from "../../types/work";
import { ReviewCard } from "../ReviewCard/ReviewCard";
import { useSelector } from "react-redux";
import { IStore } from "../../redux/store";
import { AddReview } from "../AddReview/AddReview";

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
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
            <GridList cellHeight="auto" className={classes.gridList} cols={2.5}>
                {props.reviews.map(review => (
                    <GridListTile key={review.author}>
                        <ReviewCard {...review} />
                    </GridListTile>
                ))}
                {isAdmin ? (
                    <GridListTile>
                        <AddReview workId={props.workId} />
                    </GridListTile>
                ) : null}
            </GridList>
        </div>
    );
}