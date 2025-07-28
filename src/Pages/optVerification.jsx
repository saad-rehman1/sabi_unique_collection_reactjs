import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import { FaShieldAlt } from "react-icons/fa";

export default function OtpVerification() {
  const { handleSubmit, formState: { isSubmitting } } = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const token = location?.state?.token || localStorage.getItem("otpToken");
  if (location?.state?.token) {
    localStorage.setItem("otpToken", location.state.token);
  }

  const inputRefs = [useRef(), useRef(), useRef(), useRef()];
  const otpDigits = useRef(["", "", "", ""]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/^[0-9]$/.test(value)) {
      otpDigits.current[index] = value;
      if (index < 3) inputRefs[index + 1].current.focus();
    } else {
      otpDigits.current[index] = "";
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      otpDigits.current[index] = "";
      if (index > 0 && !e.target.value) inputRefs[index - 1].current.focus();
    }
  };

  const onSubmit = async () => {
    const fullOtp = otpDigits.current.join("");
    if (fullOtp.length !== 4) {
      toast.error("Please enter all 4 digits of the OTP");
      return;
    }

    try {
      const { data } = await axios.post(
        "https://www.backend.sabiuniquecollection.com/api/users/verify-otp",
        { otp: parseInt(fullOtp), token }
      );
      toast.success("OTP verified successfully!");
      localStorage.setItem("verifiedToken", token);
      navigate("/reset-password");
    } catch (error) {
      toast.error(error?.response?.data?.message || "Invalid or expired OTP");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-pink-100 to-pink-200 p-6">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8">
        <div className="flex items-center gap-2 justify-center mb-6">
          <FaShieldAlt className="text-pink-700 text-3xl" />
          <h2 className="text-2xl font-bold text-pink-700 tracking-wide">Verify Your Email</h2>
        </div>
        <p className="text-center text-gray-600 mb-4 text-sm">
          We've sent a verification code to your email address.
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="flex justify-center gap-4">
            {inputRefs.map((ref, index) => (
              <input
                key={index}
                ref={ref}
                type="text"
                inputMode="numeric"
                maxLength={1}
                className="w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-pink-500"
                onChange={(e) => handleChange(e, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
              />
            ))}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-700 text-white py-2 rounded-lg hover:bg-pink-800 transition"
          >
            {isSubmitting ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
        <p className="text-sm text-center text-gray-600 mt-4">
          Didn't receive the code?{" "}
          <button
            className="text-pink-700 font-semibold hover:underline"
            onClick={() => navigate("/forgot-password")}
          >
            Resend
          </button>
        </p>
      </div>
    </div>
  );
}
