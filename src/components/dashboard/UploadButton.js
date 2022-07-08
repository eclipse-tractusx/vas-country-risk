import React, { useState, useEffect, Component } from "react";
import "./styles.scss";
import {Button, Dropzone } from "cx-portal-shared-components";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";

const UploadButton = () => {

    //Upload Button Handlers
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button
                className="UploadButton"
                size="small"
                onClick={handleClickOpen}
            >
                Upload Rating
            </Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <DialogContent dividers>
                    <Dropzone
                        accept="image/*,audio/*,video/*"
                        errorStatus={[
                            "error_upload_params",
                            "exception_upload",
                            "error_upload",
                            "aborted",
                            "ready",
                        ]}
                        getUploadParams={function noRefCheck() { }}
                        onChangeStatus={function noRefCheck() { }}
                        onClick={function noRefCheck() { }}
                        statusText={{
                            aborted: "Aborted",
                            done: "Done",
                            error_file_size: "Error file size",
                            error_upload: "Error_upload",
                            error_upload_params: "Error_upload_params",
                            error_validation: "Error validation",
                            exception_upload: "Exception_upload",
                            getting_upload_params: "Getting upload_params",
                            headers_received: "Headers_received",
                            preparing: "Preparing",
                            ready: "Ready",
                            rejected_file_type: "Rejected file type",
                            rejected_max_files: "Rejected max files",
                            removed: "Removed",
                            restarted: "Restarted",
                            started: "Started",
                            uploading: "Uploading",
                        }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                    <Button autoFocus onClick={handleClose}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <div class="divider" />
            <Button className="DownloadButton" size="small">
                Download Template
            </Button>
        </div>
    );

};

export default UploadButton;