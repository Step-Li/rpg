import React, { useState } from "react";

import { Document, Page } from 'react-pdf/dist/entry.webpack';
import { IconButton, Modal, CardActions, Backdrop, makeStyles, Theme, createStyles, Typography } from "@material-ui/core";

import CloseIcon from '@material-ui/icons/Close';
import RightIcon from '@material-ui/icons/ChevronRight';
import LeftIcon from '@material-ui/icons/ChevronLeft';
import EyeIcon from '@material-ui/icons/Visibility';

interface IProps {
    file: string | {
        url: string;
        httpHeaders?: Record<string, string>;
    }
}

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
        actions: {
            color: '#fff',
        }
    }),
);

export function PdfViewer(props: IProps) {
    const classes = useStyles();
    const [isShowModalOpen, setIsShowModalOpen] = useState(false);

    const [pageNumber, setPageNumber] = useState(1);
    const [numPages, setNumPages] = useState<number | null>(null);

    const openShowModal = () => setIsShowModalOpen(true);
    const closeShowModal = () => setIsShowModalOpen(false);

    const nextPage = () => {
        if (numPages && pageNumber < numPages) {
            setPageNumber(pageNumber + 1);
        }
    }

    const prevPage = () => {
        if (pageNumber > 1) {
            setPageNumber(pageNumber - 1);
        }
    }

    const viewPortHeight = window.innerHeight;

    return (
        <>
            <IconButton onClick={openShowModal}>
                <EyeIcon />
            </IconButton>
            <Modal
                className={classes.modal}
                open={isShowModalOpen}
                onClose={closeShowModal}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <>
                    <IconButton className={classes.closeButton} onClick={closeShowModal} aria-label="edit-close">
                        <CloseIcon />
                    </IconButton>
                    <Document
                        file={props.file}
                        onLoadSuccess={({ numPages }) => setNumPages(numPages)}
                    >
                        <Page height={viewPortHeight * 0.8} pageNumber={pageNumber} />
                    </Document>
                    <CardActions className={classes.actions}>
                        <IconButton onClick={prevPage} aria-label="pdf-left">
                            <LeftIcon color="inherit" />
                        </IconButton>
                        <Typography>Страница {pageNumber} из {numPages}</Typography>
                        <IconButton onClick={nextPage} aria-label="pdf-right">
                            <RightIcon color="inherit" />
                        </IconButton>
                    </CardActions>
                </>
            </Modal>
        </>
    );
}