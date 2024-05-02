import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from "../../contexts/SearchContext";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { Modal, TextField } from "@material-ui/core";
import Error from "../../ui/Error";
import { PhoneNumberUtil  } from 'google-libphonenumber';

export default function AddGuestModal({ open, handleClose, roomId }) {
  const { dispatch } = useSearch();

  const [formData, setFormData] = useState({
    guestname: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const phoneUtil = PhoneNumberUtil.getInstance();

  const isPhoneValid = (phone) => {
    try {
      return phoneUtil.isValidNumber(phoneUtil.parseAndKeepRawInput(phone));
    } catch (error) {
      return false;
    }
  };

  console.log(isPhoneValid(formData.phone))

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneChange = (value, countryData) => {
    setFormData((prevState) => ({
      ...prevState,
      phone: value,
    }));
  };



  const validate = () => {
    const newErrors = {};
    if (!formData.guestname) {
      newErrors.guestname = 'Please enter your guest name';
    }
    if (!formData.email) {
      newErrors.email = 'Please enter your email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!isPhoneValid(formData.phone)) {
      newErrors.phone = 'Please enter your phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleBlur = () => {
    validate();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      dispatch({ type: "ADD_GUEST", payload: { guestRoomId: roomId, formData } });
      handleClose();
    }
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
        <div className="modal_header">
          <h2>Add New Guest</h2>
        </div>
        <div className="modal_body">
          <div className="add_guest_form">
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label>Name</label>
                <input
                  type="text"
                  name="guestname"
                  value={formData.guestname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter full name"

                />
                {errors.guestname && <Error message={errors.guestname} />}
              </div>
              <div className="form_group">
                <label>Email</label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="Enter email address"
                />
                {errors.email && <Error message={errors.email} />}
              </div>
              <div className="form_group">
                <label>Phone Number</label>
                <PhoneInput
                  defaultCountry="us"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="Enter phone number"
                  onBlur={handleBlur}
                />
                {errors.phone && <Error message={errors.phone} />}
              </div>
              <div className="d-flex justify-content-end">
                <button className="btn btn-wc-primary">
                  <FontAwesomeIcon icon={faCheck} />
                  Add Guest
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
}
