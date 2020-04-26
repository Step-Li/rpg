import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { createStyles, makeStyles, Theme, Button, Modal, Backdrop } from "@material-ui/core";

import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

import { WorkCard } from "../WorkCard/WorkCard";
import { WorkForm } from "../WorkForm/WorkForm";
import { WorksFilters } from "../WorksFilters/WorksFilters";
import { getFilterByEvalutaion, getFilterByYears, getFilterByNomination, getFilterBySystems } from "./filters";

import { IWorkProps } from "../../types/work";
import { IStore } from "../../redux/store";
import { setEditableWork, setNeedWorksFetch } from "../../redux/actions";

import './WorksList.scss';

interface IProps {
    onDeleteClick?: (id: string) => void;
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
    })
);

export function WorksList(props: IProps) {
    const classes = useStyles();
    const works = useSelector((state: IStore) => state.works);
    const filters = useSelector((state: IStore) => state.filters);
    const editableWork = useSelector((state: IStore) => state.editableWork);
    const isAdmin = useSelector((state: IStore) => state.isAdmin);
    const dispatch = useDispatch();

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => {
        setIsAddModalOpen(false);
    }

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

    const renderCreateModal = () => {
        return (
            <>
                <Button onClick={openAddModal} className={classes.addButton}>Добавить работу</Button>
                <Modal
                    className={classes.modal}
                    open={isAddModalOpen}
                    onClose={closeAddModal}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <>
                        <IconButton onClick={closeAddModal} aria-label="edit-close" className={classes.closeButton}>
                            <CloseIcon />
                        </IconButton>
                        <WorkForm onWorkPost={closeAddModal} />
                    </>
                </Modal>
            </>
        );
    }

    const { onDeleteClick } = props;

    const filteredWorks = works
        .filter(getFilterByEvalutaion(filters.evaluationRange))
        .filter(getFilterByYears(filters.years))
        .filter(getFilterByNomination(filters.nomination))
        .filter(getFilterBySystems(filters.systems));

    return (
        <div className="WorksList">
            <WorksFilters />
            {isAdmin ? renderCreateModal() : null}
            {editableWork ? renderEditModal(editableWork) : null}
            {filteredWorks.length > 0 ? filteredWorks.map(work => (
                <WorkCard
                    key={work.id}
                    {...work}
                    onDeleteClick={onDeleteClick}
                />)
            ) : 'Работы не найдены'}
        </div>
    )
}
