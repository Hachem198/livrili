import axios from "axios";
import React, { useEffect, useState } from "react";
import userStore from "../store/userStore/userStore";

export const Profile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [formData, setFormData] = useState({
    email: "user@example.com",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    phoneNumber: "55 123 456",
  });

  const [isEditing, setIsEditing] = useState({
    email: false,
    password: false,
    phoneNumber: false,
  });

  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const toggleEdit = (field) => {
    setIsEditing({
      ...isEditing,
      [field]: !isEditing[field],
    });
    setErrors({});
    setSuccessMessage("");
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = () => {
    const { currentPassword, newPassword, confirmPassword } = formData;
    const newErrors = {};

    if (!currentPassword) {
      newErrors.currentPassword = "Current password is required";
    }

    if (newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters";
    }

    if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d{3}-\d{3}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const handleSubmit = (field) => {
    let valid = true;
    let fieldErrors = {};

    if (field === "email") {
      if (!validateEmail(formData.email)) {
        fieldErrors.email = "Please enter a valid email address";
        valid = false;
      }
    } else if (field === "password") {
      fieldErrors = validatePassword();
      valid = Object.keys(fieldErrors).length === 0;
    } else if (field === "phoneNumber") {
      if (!validatePhone(formData.phoneNumber)) {
        fieldErrors.phoneNumber =
          "Please enter a valid phone number (format: 55-123-456)";
        valid = false;
      }
    }

    if (valid) {
      setSuccessMessage(`Your ${field} has been updated successfully!`);
      setIsEditing({
        ...isEditing,
        [field]: false,
      });

      if (field === "password") {
        setFormData({
          ...formData,
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      }
    } else {
      setErrors(fieldErrors);
    }
  };
  const getUser = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v1/api/auth`, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      set;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {}, []);
  return (
    <div className="p-24">
      <div className="max-w-2xl mx-auto p-6 py-20 rounded-lg shadow-lg border border-gray-700">
        <h1 className="text-2xl font-bold mb-6 text-gray-100">
          Profile Settings
        </h1>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-900 text-green-100 rounded border border-green-700">
            {successMessage}
          </div>
        )}

        <div className="space-y-6">
          {/* Email Section */}
          <div className="border-b border-gray-700 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-200">
                Email Address
              </h2>
              <button
                onClick={() => toggleEdit("email")}
                className="text-blue-400 hover:text-blue-300"
              >
                {isEditing.email ? "Cancel" : "Edit"}
              </button>
            </div>

            {!isEditing.email ? (
              <p className="text-gray-400">{formData.email}</p>
            ) : (
              <div>
                <div className="mb-2">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email address"
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
                <button
                  onClick={() => handleSubmit("email")}
                  className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Email
                </button>
              </div>
            )}
          </div>

          {/* Password Section */}
          <div className="border-b border-gray-700 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-200">Password</h2>
              <button
                onClick={() => toggleEdit("password")}
                className="text-blue-400 hover:text-blue-300"
              >
                {isEditing.password ? "Cancel" : "Change Password"}
              </button>
            </div>

            {!isEditing.password ? (
              <p className="text-gray-400">••••••••</p>
            ) : (
              <div className="space-y-2">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    name="currentPassword"
                    value={formData.currentPassword}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.currentPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.currentPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.newPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.newPassword}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleSubmit("password")}
                  className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700"
                >
                  Update Password
                </button>
              </div>
            )}
          </div>

          {/* Phone Number Section */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-200">
                Phone Number
              </h2>
              <button
                onClick={() => toggleEdit("phoneNumber")}
                className="text-blue-400 hover:text-blue-300"
              >
                {isEditing.phoneNumber ? "Cancel" : "Edit"}
              </button>
            </div>

            {!isEditing.phoneNumber ? (
              <p className="text-gray-400">{formData.phoneNumber}</p>
            ) : (
              <div>
                <div className="mb-2">
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="55-123-456"
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => handleSubmit("phoneNumber")}
                  className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700"
                >
                  Save Phone Number
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
