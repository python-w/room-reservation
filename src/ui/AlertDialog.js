import React from 'react'
import { Button, Dialog } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

export default function AlertDialog({ isShow, handleClose, severity, alertTitle, alertmsg }) {

    return (
        <Dialog
            className="mui_dialog alert_dialog"
            open={isShow}
            onClose={handleClose}
            aria-labelledby="alert"
            aria-describedby="alert"
            scroll='body'
            fullWidth={true}
            maxWidth="sm"
        >
            <div className="modal_dialog">
                <Alert severity={severity} >
                    <AlertTitle>{alertTitle}</AlertTitle>
                    <p>{alertmsg}</p>
                    <div className="alertDialog_footer">
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Alert>
            </div>
        </Dialog>
    )
}
