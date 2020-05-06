import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme, Modal, Backdrop, Paper } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

// import { WorkCard } from "../WorkCard/WorkCard";
import { WorkForm } from "../WorkForm/WorkForm";
import { WorksFilters } from "../WorksFilters/WorksFilters";
import {
    getFilterByEvalutaion,
    getFilterByYears,
    getFilterByNomination,
    getFilterBySystems,
    getFilterByAdventureType
} from "./filters";

import { IWorkProps } from "../../types/work";
import { IStore } from "../../redux/store";
import { setEditableWork } from "../../redux/actions";

import './WorksList.scss';
import WorksTable from "../WorksTable/WorksTable";

interface IProps {
    onDeleteClick: (id: string) => void;
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        closeButton: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
        addButton: {
            gridColumnStart: 1,
            gridColumnEnd: 3,
            margin: 4,
        },
        modal: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        paper: {
            padding: 20,
        }
    })
);

export function WorksList(props: IProps) {
    const classes = useStyles();
    const works = useSelector((state: IStore) => state.works);
    const filters = useSelector((state: IStore) => state.filters);
    const editableWork = useSelector((state: IStore) => state.editableWork);
    const dispatch = useDispatch();

    const closeModal = () => dispatch(setEditableWork(null));

    const renderEditModal = (editableWork: IWorkProps) => {
        return (
            <Modal
                className={classes.modal}
                open
                onClose={closeModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <>
                    <IconButton onClick={closeModal} aria-label="edit-close" className={classes.closeButton}>
                        <CloseIcon />
                    </IconButton>
                    <WorkForm onWorkPost={closeModal} editableWork={editableWork} />
                </>
            </Modal>
        );
    }

    const { onDeleteClick } = props;

    const filteredWorks = works
        .filter(getFilterByEvalutaion(filters.evaluationRange))
        .filter(getFilterByYears(filters.years))
        .filter(getFilterByNomination(filters.nomination))
        .filter(getFilterByAdventureType(filters.adventureType))
        .filter(getFilterBySystems(filters.systems));

    return (
        <div className="WorksList">
            <WorksFilters />
            {editableWork ? renderEditModal(editableWork) : null}
            {filteredWorks.length > 0 ?
                <WorksTable works={filteredWorks} onDeleteClick={onDeleteClick} />
                : <Paper className={classes.paper}>Работы не найдены </Paper>}
        </div>
    )
}
