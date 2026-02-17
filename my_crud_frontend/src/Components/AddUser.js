import { useState, useEffect } from "react";
import axios from "axios";

function AddUser({ fetchUsers, editUser, setEditUser }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phone: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  /* ------------------ EDIT MODE USER FILL DATA ------------------ */
  useEffect(() => {
    if (editUser) {
      setFormData({
        firstName: editUser.firstName,
        lastName: editUser.lastName,
        address: editUser.address,
        email: editUser.email,
        phone: editUser.phone
      });
    }
  }, [editUser]);

  /* ------------------ COMMON CHANGE ------------------ */
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /* ------------------ PHONE NUMBER VALIDATION ------------------ */
  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/\D/g, "");
    setFormData({ ...formData, phone: value });

    if (value && !/^[6-9]\d{0,9}$/.test(value)) {
      setPhoneError("Phone must start with 6,7,8 or 9");
    } else {
      setPhoneError("");
    }
  };

  /* ------------------ EMAIL VALIDATION ------------------ */
  const validateEmail = (email) => {
    const allowedDomains = ["gmail.com", "yahoo.com", "outlook.com", "hotmail.com"];
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!regex.test(email)) return "Please enter valid email";

    const domain = email.split("@")[1];
    if (!allowedDomains.includes(domain)) return "Please enter valid email";

    return "";
  };

  /* ------------------ SUBMIT DATA ------------------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    //----------------  FIRST VALIDATION ----------------
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.address ||
      !formData.email ||
      !formData.phone
    ) {
      setError("All fields are required");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(formData.phone)) {
      setPhoneError("Phone must be 10 digits & start with 6-9");
      return;
    }

    const emailMsg = validateEmail(formData.email);
    if (emailMsg) {
      setEmailError(emailMsg);
      return;
    }

    try {
      if (editUser) {

        //---------------------- UPDATE USER -------------------

        await axios.put(
          `http://localhost:5000/api/users/${editUser._id}`,
          formData
        );
        setSuccess("User updated successfully");
        setEditUser(null);
      } else {

        //---------------------- ADD USER ------------------------

        await axios.post("http://localhost:5000/api/users", formData);
        setSuccess("User added successfully");
      }

      setError("");
      setPhoneError("");
      setEmailError("");

      setFormData({
        firstName: "",
        lastName: "",
        address: "",
        email: "",
        phone: ""
      });

      fetchUsers();
    } catch (err) {
      setError("Failed to save user");
    }
  };

 
  return (
    <div className="flex justify-center">
      <div className="bg-white p-6 rounded-xl shadow-md w-full md:w-1/2">
        <h2 className="text-xl font-semibold text-center mb-4">
          {editUser ? "Update User" : "Add User"}
        </h2>

        {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
        {success && <p className="text-green-600 text-sm mb-2">{success}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
         
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={(e) => {
                if (!/^[A-Za-z\s]*$/.test(e.target.value)) {
                  setNameError("Only letters allowed");
                  return;
                }
                setNameError("");
                handleChange(e);
              }}
              className="border px-4 py-2 rounded-lg"
            />

            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={(e) => {
                if (!/^[A-Za-z\s]*$/.test(e.target.value)) {
                  setNameError("Only letters allowed");
                  return;
                }
                setNameError("");
                handleChange(e);
              }}
              className="border px-4 py-2 rounded-lg"
            />
          </div>

         
          <textarea
            name="address"
            rows="3"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            className="border px-4 py-2 rounded-lg w-full"
          />

         
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => {
              handleChange(e);
              setEmailError(validateEmail(e.target.value));
            }}
            className={`border px-4 py-2 rounded-lg w-full ${
              emailError && "border-red-500"
            }`}
          />
          {emailError && <p className="text-red-500 text-xs">{emailError}</p>}

         
          <input
            type="tel"
            name="phone"
            placeholder="Phone"
            maxLength={10}
            value={formData.phone}
            onChange={handlePhoneChange}
            className={`border px-4 py-2 rounded-lg w-full ${
              phoneError && "border-red-500"
            }`}
          />
          {phoneError && <p className="text-red-500 text-xs">{phoneError}</p>}

        
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg"
          >
            {editUser ? "Update User" : "Add User"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddUser;
