import React, { useState } from "react";
import { Button, Modal, makeStyles, Theme, createStyles, Backdrop, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';

import { WorkForm } from "../WorkForm/WorkForm";
import { useSelector } from "react-redux";
import { IStore } from "../../redux/store";

const useStyles = makeStyles((theme: Theme) =>
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
        addButton: {
            margin: 8,
        }
    })
);

export function AddWork(props: { variant?: 'outlined' | 'text' }) {
    const classes = useStyles();
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const isAdmin = useSelector((store: IStore) => store.isAdmin);

    const openAddModal = () => setIsAddModalOpen(true);
    const closeAddModal = () => setIsAddModalOpen(false);

    return isAdmin ? (
        <>
            <Button variant={props.variant} onClick={openAddModal} className={classes.addButton}>Добавить работу</Button>
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
    ) : null;
}