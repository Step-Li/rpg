import React from "react";
import { Modal, makeStyles, createStyles, Backdrop, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import { WorkForm } from "../WorkForm/WorkForm";
import { useSelector, useDispatch } from "react-redux";
import { IStore } from "../../redux/store";
import { setEditableWork } from "../../redux/actions";

const useStyles = makeStyles(() =>
    createStyles({
        modal: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
        },
        closeButton: {
            position: 'absolute',
            top: 10,
            right: 10,
        },
    })
);

export function EditWork() {
    const classes = useStyles();
    const editableWork = useSelector((store: IStore) => store.editableWork);
    const dispatch = useDispatch();

    const closeModal = () => dispatch(setEditableWork(null));

    return editableWork ? (
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
    ) : null;
}