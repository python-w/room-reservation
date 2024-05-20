import { useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { useSearch } from "../../contexts/SearchContext";
import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { Modal, TextField } from "@material-ui/core";
import Error from "../../ui/Error";
import { PhoneNumberUtil } from 'google-libphonenumber';

export default function AddGuestModal({ open, handleClose, bookingId, validateReservation }) {
  const { dispatch } = useSearch();

  const [formData, setFormData] = useState({
    guestname: "",
    email: "",
    phone: "",
    homePhone: ""
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePhoneChange = (fieldName, value) => {
    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: value,
    }));
  };

  const emailMandatoryForGuestCreation = true;
  const phoneMandatoryForGuestCreation = true;
  const showHomePhoneForGuestCreation = true;

  const validateGuestForm = () => {
    const newErrors = {};
    if (!formData.guestname) {
      newErrors.guestname = 'Please enter your guest name';
    }
    if (emailMandatoryForGuestCreation) {
      if (!formData.email) {
        newErrors.email = 'Please enter your guest email';
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = 'Please enter a valid email';
      }
    }
    if (phoneMandatoryForGuestCreation) {
      if (formData.phone === "" || formData.phone.length < 6) {
        newErrors.phone = 'Please enter your guest cell number';
      } else if (formData.phone && !isPhoneValid(formData.phone)) {
        newErrors.phone = 'Please enter a valid cell number';
      }
    }
    if (formData.phone.length > 6 && !isPhoneValid(formData.homePhone)) {
      newErrors.homePhone = 'Please enter a valid phone number';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleBlur = () => {
    validateGuestForm();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateGuestForm()) {
      dispatch({ type: "ADD_GUEST", payload: { guestBookingId: bookingId, formData } });
      handleClose();
      validateReservation()
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
      BackdropProps={{
        onClick: (event) => event.stopPropagation()
      }}
    >
      <div className="modal_dialog">
        <div className="modal_header">
          <h2>Add New Guest</h2>
        </div>
        <div className="modal_body">
          <div className="add_guest_form">
            <form onSubmit={handleSubmit}>
              <div className="form_group">
                <label>Full Name</label>
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
                <label>Cell Number</label>
                <PhoneInput
                  defaultCountry="us"
                  value={formData.phone}
                  onChange={(value) => handlePhoneChange('phone', value)}
                  placeholder="Enter cell number"
                  onBlur={handleBlur}
                />
                {errors.phone && <Error message={errors.phone} />}
              </div>
              {showHomePhoneForGuestCreation &&
                <div className="form_group">
                  <label>Home Phone Number</label>
                  <PhoneInput
                    defaultCountry="us"
                    value={formData.homePhone}
                    onChange={(value) => handlePhoneChange('homePhone', value)}
                    placeholder="Enter home phone number"
                    onBlur={handleBlur}
                  />
                  {errors.homePhone && <Error message={errors.homePhone} />}
                </div>
              }
              <div className="d-flex justify-content-end">
                <button className="btn btn-wc-primary">
                  <FontAwesomeIcon icon={faCheck} className="mr-2" />
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
