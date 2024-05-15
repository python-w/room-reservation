import React from 'react'
import { Modal } from '@material-ui/core'

export default function AlertModal({isShow, handleClose, children}) {  

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
                {children}               
            </div>
        </Modal>
    )
}
