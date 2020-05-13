import React from "react"
import { IconButton } from "@material-ui/core"
import SaveIcon from '@material-ui/icons/Save';

import { makeStyles, createStyles } from "@material-ui/core/styles";

import { PdfViewer } from "../PdfViewer/PdfViewer"

const useStyles = makeStyles(() =>
    createStyles({
        button: {
            marginRight: 8,
        },
    }),
);

interface IProps {
    id: string;
}

export function FileButtons(props: IProps) {
    const classes = useStyles();

    return (
        <>
            <PdfViewer
                file={{
                    url: '/api/download-file?id=' + props.id,
                    httpHeaders: {
                        'Content-Type': 'application/pdf',
                    }
                }}
            />
            <a download href={'/api/download-file?id=' + props.id} rel="noopener noreferrer" target="_blank">
                <IconButton aria-label="save-work" className={classes.button}>
                    <SaveIcon />
                </IconButton>
            </a>
        </>
    )
}