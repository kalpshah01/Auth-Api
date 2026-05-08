import React, { useState } from "react";

import {
  useDispatch,
  useSelector,
} from "react-redux";

import {
  forgotPassword,
  setOtpVerify,
} from "../redux/AuthSlice";

function ForgotPassword() {

  const dispatch = useDispatch();

  const { otpVerify } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");

  const [formData, setFormData] = useState({
    otp: "",
    newPassword: "",
  });

  const handleVerify = async (e) => {

    e.preventDefault();

    const result = await dispatch(
      forgotPassword({ email })
    );

    if (
      result.meta.requestStatus ===
      "fulfilled"
    ) {

      dispatch(setOtpVerify(true));
    }
  };

  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <>

      {/* EMAIL */}

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) =>
          setEmail(e.target.value)
        }
      />

      <button onClick={handleVerify}>
        Verify
      </button>

      {/* SHOW AFTER VERIFY */}

      {otpVerify && (

        <>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            onChange={handleChange}
          />

          <input
            type="password"
            name="newPassword"
            placeholder="New Password"
            onChange={handleChange}
          />
        </>
      )}

    </>
  );
}

export default ForgotPassword;
