import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import userStore from "../store/userStore/userStore";
import { keys, set } from "mobx";
import {toast} from "sonner";

export const Profile = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  let sendData = ({
  });
  const [formData, setFormData] = useState({
    oldFirstName : "John",
    newFirstNameInput: "",
    oldLastName: "wick",
    newLastNameInput: "",
    oldEmail: "user@example.com",
    oldEmailInput: "",
    newEmailInput: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    oldPhoneNumber: "55 123 456",
    oldPhoneNumberInput:"",
    newPhoneNumberInput:"",
  });
  const [updated, setUpdated] = useState(false);

  const [isEditing, setIsEditing] = useState({
    firstName : false,
    lastName : false,
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
  const restInput = () => {
    setFormData({
     ...formData,
     newFirstNameInput: "",
     newLastNameInput: "",
     oldEmailInput: "",
     newEmailInput: "",
     currentPassword: "",
     newPassword: "",
     confirmPassword: "",
     oldPhoneNumberInput: "",
     newPhoneNumberInput: "",
   });
    
  }
  const toggleEdit = (field) => {
    setIsEditing({
      ...isEditing,
      [field]: !isEditing[field],
    });
    restInput();
    console.log(formData);
    setErrors({});
    setSuccessMessage("");
  };

  const validateLastNameOrFirstName = ( name) => {
    const regex = /^[a-zà-ÿ]+(?:['-][a-zà-ÿ]+)*$/i;
    return regex.test(name);
    
  }
  const validateEmail = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const {oldEmailInput, newEmailInput} = formData;
    const erros = {};

    if (!oldEmailInput) {
      erros.oldEmailInput = "Old email is required";
    }else if(!emailRegex.test(oldEmailInput)) {
      erros.oldEmailInput = "Please enter a valid email address";
    }
    if(!newEmailInput || !emailRegex.test(newEmailInput)) {
      erros.newEmailInput = "Please enter a valid email address";
    }
    return erros;
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

  const validatePhone = () => {
    const phoneRegex = /^\d{8}$/;
    const {oldPhoneNumberInput, newPhoneNumberInput} = formData;
    const erros = {};

    if (!oldPhoneNumberInput) {
      erros.oldPhoneNumberInput = "Old phone number is required";
    }else if(!phoneRegex.test(oldPhoneNumberInput)) {
      erros.oldPhoneNumberInput = "Please enter a valid phone number (format: 55123456)";
    }
    if(!newPhoneNumberInput || !phoneRegex.test(newPhoneNumberInput)) {
      erros.newPhoneNumberInput = "Please enter a valid phone number (format: 55123456)";
    }
    return erros;
  };
  const handleSubmit = async(field) => {
    let valid = true;
    let fieldErrors = {};

  switch(field) {
   case "lastName":
      if(!validateLastNameOrFirstName(formData.newLastNameInput)) {
        fieldErrors.newLastNameInput = "Please enter a valid Last Name";
        valid = false;
      }else{
        sendData.lastName = formData.newLastNameInput;
      }
      break;
   case "firstName":
      if(!validateLastNameOrFirstName(formData.newFirstNameInput)) {
        fieldErrors.newFirstNameInput = "Please enter a valid First Name";
        valid = false;
      }else{
        sendData.firstName = formData.newFirstNameInput;
      }
      break;
      case "email":
        fieldErrors = validateEmail();
        valid = Object.keys(fieldErrors).length === 0;
        if(valid) {
          sendData.oldEmail = formData.oldEmailInput
          sendData.newEmail = formData.newEmailInput;
        }
        
      break;
      case "password":
        fieldErrors = validatePassword();
        valid = Object.keys(fieldErrors).length === 0;
        if(valid) {
          sendData.oldPassword = formData.currentPassword;
          sendData.newPassword = formData.newPassword;
          sendData.confirmNewPassword = formData.confirmPassword;
        }
      break;
      case "phoneNumber":
        fieldErrors = validatePhone();
        valid = Object.keys(fieldErrors).length === 0;
        if(valid) {
          sendData.oldPhone = formData.oldPhoneNumberInput;
          sendData.newPhone = formData.newPhoneNumberInput;
        }
      break;
  }
  
  if (valid) {
         try {
           const  res = await axios.put(`${apiUrl}/v1/api/auth`, sendData, {
              headers: { Authorization: `Bearer ${userStore.token}` },
            })
            //console.log(res.data)
            //console.log(res.data.clientOrDeliveryGuy)
           userStore.setToken(res.data.authResponseDto.token);
           userStore.setUser(res.data.clientOrDeliveryGuy);
            setSuccessMessage(`Your ${field} has been updated successfully!`);
            setIsEditing({
              ...isEditing,
              [field]: false,
            });
            setUpdated(!updated);
          
         } catch (error) {
          if(error.response.status === 422) {
           // console.log(error.response.data);
            toast.error(error.response.data.fields[0].message);
            
          
         }
          
        }     
       }  else {
      setErrors(fieldErrors);
    }
  };
  const getUser = async () => {
    try {
      const res = await axios.get(`${apiUrl}/v1/api/auth`, {
        headers: { Authorization: `Bearer ${userStore.token}` },
      });
      //console.log(res.data)
      userStore.setUser(res.data);
      setFormData({
        ...formData,
        oldFirstName : res.data.firstName || "John",
        oldLastName: res.data.lastName || "wick",
        oldEmail: res.data.email || "user@example.com",
        oldPhoneNumber: res.data.phone || "55 123 456",
      })
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
       getUser();
    }, [updated]);
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
          {/* First Name */}
          <div className="border-b border-gray-700 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-200">
               First Name
              </h2>
              <button
                onClick={() => toggleEdit("firstName")}
                className="text-blue-400 hover:text-blue-300"
              >
                {isEditing.firstName ? "Cancel" : "Edit"}
              </button>
            </div>

            {!isEditing.firstName? (
              <p className="text-gray-400">{formData.oldFirstName}</p>
            ) : (
              <div>
                <div className="mb-2">
                  <label htmlFor = "newFirstNameInput"  className="block text-sm font-medium text-gray-300 mb-1 "> new First Name</label>
                  <input
                    type="email"
                    name="newFirstNameInput"
                    id="newFirstNameInput"
                    value={formData.newFirstNameInput}
                    placeholder = {formData.oldFirstName}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 focus:border-transparent"
                  />
                  {errors.newFirstNameInput && (
                    <p className="text-red-400 text-sm mt-1">{errors.newFirstNameInput}</p>
                  )}
                </div>
                <button
                  onClick={() => handleSubmit("firstName")}
                  className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700"
                >

                  Save First Name
                </button>
              </div>
            )}
          </div>
          {/* Last Name */}
          <div className="border-b border-gray-700 pb-4">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-medium text-gray-200">
                Last Name
              </h2>
              <button
                onClick={() => toggleEdit("lastName")}
                className="text-blue-400 hover:text-blue-300"
              >
                {isEditing.lastName ? "Cancel" : "Edit"}
              </button>
            </div>

            {!isEditing.lastName? (
              <p className="text-gray-400">{formData.oldLastName}</p>
            ) : (
              <div>
                <div className="mb-2">
                  <label htmlFor = "newLastNameInput"  className="block text-sm font-medium text-gray-300 mb-1 "> new First Name</label>
                  <input
                    type="email"
                    name="newLastNameInput"
                    id="newLastNameInput"
                    value={formData.newLastNameInput}
                    placeholder = {formData.oldLastName}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 focus:border-transparent"
                  />
                  {errors.newLastNameInput && (
                    <p className="text-red-400 text-sm mt-1">{errors.newLastNameInput}</p>
                  )}
                </div>
                <button
                  onClick={() => handleSubmit("lastName")}
                  className="bg-blue-600 text-gray-100 px-4 py-2 rounded hover:bg-blue-700"
                >

                  Save Last Name
                </button>
              </div>
            )}
          </div>
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
              <p className="text-gray-400">{formData.oldEmail}</p>
            ) : (
              <div>
                <div className="mb-2">
                  <label htmlFor = "oldEmail"  className="block text-sm font-medium text-gray-300 mb-1 "> old email</label>
                  <input
                    type="email"
                    name="oldEmailInput"
                    id="oldEmail"
                    value={formData.oldEmailInput}
                    placeholder = {formData.oldEmail}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2 focus:border-transparent"
                  />
                  {errors.oldEmailInput && (
                    <p className="text-red-400 text-sm mt-1">{errors.oldEmailInput}</p>
                  )}
                  <label htmlFor = "newEmail"  className="block text-sm font-medium text-gray-300 mb-1 "> new email</label>
                  <input
                    type="email"
                    name="newEmailInput"
                    id="newEmail"
                    value={formData.newEmailInput}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="new Email address"
                  />
                  {errors.newEmailInput && (
                    <p className="text-red-400 text-sm mt-1">{errors.newEmailInput}</p>
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
              <p className="text-gray-400">{formData.oldPhoneNumber}</p>
            ) : (
              <div>
                <div className="mb-2">
                  <label htmlFor="oldPhoneNumberInput" className="block text-sm font-medium text-gray-300 mb-1">
                    old Phone Number
                  </label>
                  <input
                    type="tel"
                    name="oldPhoneNumberInput"
                    id="oldPhoneNumberInput"
                    value={formData.oldPhoneNumberInput}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded mb-2 text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={formData.oldPhoneNumber.replaceAll(" ","-")}
                  />
                  {errors.oldPhoneNumberInput && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.oldPhoneNumberInput}
                    </p>
                  )}
                  <label htmlFor="newPhoneNumberInput" className="block text-sm font-medium text-gray-300 mb-1 ">
                    new Phone Number
                  </label>
                  <input
                    type="tel"
                    name="newPhoneNumberInput"
                    id="newPhoneNumberInput"
                    value={formData.newPhoneNumberInput}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-800 border border-gray-600 rounded text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder={
                    "new Phone Number"
                  }
                  />
                  {errors.newPhoneNumberInput && (
                    <p className="text-red-400 text-sm mt-1">
                      {errors.newPhoneNumberInput}
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
