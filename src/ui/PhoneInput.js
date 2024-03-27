import "react-international-phone/style.css";
import { PhoneInput } from "react-international-phone";
import { useState } from "react";

const CustomPhoneInput = ({ value, onChange, defaultCountry }) => {
    const [phone, setPhone] = useState("");
    console.log(phone)

    return (
        <div>
            <PhoneInput defaultCountry="us" value={phone} onChange={(value) => {
                setPhone(value);
            }} />
        </div>
    );
};

export default CustomPhoneInput;
