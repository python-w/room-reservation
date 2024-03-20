import Modal from '@mui/material/Modal';
import CheckIcon from '@mui/icons-material/Check';

export default function AddGuestModal({ open, handleClose }) {
    return (
        <Modal
            container={document.querySelector('section.portlet')}
            open={open}
            onClose={handleClose}
            aria-labelledby="add-guest"
            aria-describedby="add-guest"
        >
            <div className='modal_dialog'>
                <div className='add_guest_form'>
                    <h4>Add New Guest</h4>
                    <label>Name</label>
                    <input type="text" placeholder="Enter full name" />
                    <label>Email</label>
                    <input type="text" placeholder="Enter email address" />
                    <label>Phone Number</label>
                    <input type="text" placeholder="Enter phone number" />
                    <div className="d-flex justify-content-end">
                        <button className="btn btn-wc-primary">
                            <CheckIcon /> Add Guest
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
