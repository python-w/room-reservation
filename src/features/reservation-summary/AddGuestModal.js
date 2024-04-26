import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from "../../contexts/SearchContext";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { Modal } from "@material-ui/core";

export default function AddGuestModal({ open, handleClose, roomId }) {
  const { dispatch } = useSearch();

  const [formData, setFormData] = useState({
    guestname: "",
    email: "",
    phone: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch({ type: "ADD_GUEST", payload: { guestRoomId: roomId, formData } });
    handleClose();
  };

  return (
    <Modal
      container={document.querySelector("section.portlet")}
      className="mui_modal"
      open={open}
      onClose={handleClose}
      aria-labelledby="add-guest"
      aria-describedby="add-guest"
    >
      <div className="modal_dialog">
        <div className="add_guest_form">
          <h4>Add New Guest</h4>
          <form onSubmit={handleSubmit}>
            <label>Name</label>
            <input
              type="text"
              name="guestname"
              value={formData.guestname}
              onChange={handleChange}
              placeholder="Enter full name"
              required
            />
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email address"
              required
            />
            <label>Phone Number</label>
            <PhoneInput
              defaultCountry="us"
              value={formData.phone}
              onChange={handlePhoneChange}
              placeholder="Enter phone number"
            />
            <div className="d-flex justify-content-end">
              <button className="btn btn-wc-primary">
                <FontAwesomeIcon icon={faCheck} />
                Add Guest
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
}
