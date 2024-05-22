import React from 'react'
import { Button, Modal } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab'

export default function AlertModal({ isShow, handleClose, severity, alertTitle, alertmsg }) {

    return (
        <Modal
            className="mui_modal alert_modal"
            open={isShow}
            onClose={handleClose}
            aria-labelledby="alert"
            aria-describedby="alert"
            BackdropProps={{
                onClick: (event) => event.stopPropagation()
            }}
        >
            <div className="modal_dialog">
                <Alert severity={severity} >
                    <AlertTitle>{alertTitle}</AlertTitle>
                    <p>{alertmsg}</p>
                    <div className="alertModal_footer">
                        <Button onClick={handleClose}>
                            Close
                        </Button>
                    </div>
                </Alert>
            </div>
        </Modal>
    )
}
