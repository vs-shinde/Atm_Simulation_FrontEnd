import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import hsbscLogo from "../../Assets/hsbcLogo.png";
import "./styles.css";
import creditCard from "../../Assets/credit-card1.jpg";


const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    pin: "",
    contact: "",
  });
  const [error, setError] = useState("");
  // const [showSuccessPopup ,setSuccessPopup] = useState(false)

  useEffect(() => {
    const { name, email, address, pin, contact } = formData;
    if (!name || !email || !address || !pin || !contact) {
      setError("");
    }
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    if ((id === "pin" || id === "contact") && !/^\d*$/.test(value)) {
      return; // Only allow numeric values
    }
    setFormData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const validateForm = () => {
    const { name, email, address, pin, contact } = formData;
    if (!name || !email || !address || !pin || !contact) {
      return "All fields are required.";
    }
    if (!/^\d{4}$/.test(pin)) {
      return "PIN should be exactly 4 digits.";
    }
    if (!/^\d{10}$/.test(contact)) {
      return "Contact number should be exactly 10 digits.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address.";
    }
    return null;
  };

  const checkDuplicateContact = async (contact) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/atm/user/validateContactNumber",
        {
          params: { contact },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error checking contact number:", error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    const isDuplicate = await checkDuplicateContact(formData.contact);
    if (isDuplicate) {
      setError("User already present with this contact number.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/atm/user/create",
        formData
      );
      console.log("User registered:", response.data);
      // setSuccessPopup(true);
      // You can add more actions here, like redirecting the user to another page
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex">
      {/* {showSuccessPopup && (
        <div
          className="container"
          style={{ maxWidth: "400px", marginTop: "8%", marginBottom: "2%" }}
        >
          <div className="card shadow">
            <div className="card-body">
              <div className="card-title">Successfully completed signup</div>
            </div>
          </div>
        </div>
      )
      } */}
      <div>
        <img
          src={hsbscLogo}
          style={{
            position: "absolute",
            right: "2rem",
            top: "0.5rem",
            height: "25px",
            width: "36px",
          }}
        />
      </div>
      <div className="row w-100">
        <div
          className="col-md-6 d-flex flex-column align-items-center justify-content-center"
          style={{ backgroundColor: "#db0011", color: "#ffffff" }}
        >
          <h1>Welcome to Our Service</h1>
          <p>Join us to experience the best in class service.</p>
          <img
            src={creditCard}
            alt="Welcome"
            className="img-fluid"
            style={{ maxWidth: "80%", borderRadius: "10px" }}
          />
        </div>
        <div className="col-md-6 d-flex  justify-content-center">
          <div
            className="container"
            style={{ maxWidth: "550px", marginTop: "8%", marginBottom: "2%" }}
          >
            <div className="card shadow">
              <div className="card-body">
                <h3
                  className="card-title text-center"
                  style={{ color: "#db0011", marginBottom: "20px" }}
                >
                  Register <hr style={{ color: "gray" }} />
                </h3>
                <form onSubmit={handleSubmit}>
                  <div class="row">
                    <div class="col">
                      <div className="mb-3">
                        <label
                          htmlFor="name"
                          className={`form-label formLabel`}
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className={`form-control inputText`}
                          id="name"
                          placeholder="Enter name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="address"
                          className={`form-label formLabel`}
                        >
                          Address
                        </label>
                        <input
                          type="text"
                          className={`form-control inputText`}
                          id="address"
                          placeholder="Enter address"
                          value={formData.address}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="contact"
                          className={`form-label formLabel`}
                        >
                          Contact No
                        </label>
                        <input
                          type="tel"
                          className={`form-control inputText`}
                          id="contact"
                          // pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
                          placeholder="Enter contact no"
                          value={formData.contact}
                          onChange={handleChange}
                          maxLength={10}
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className={`form-label formLabel`}
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className={`form-control inputText`}
                          id="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="pin" className={`form-label formLabel`}>
                          PIN
                        </label>
                        <input
                          type="password"
                          className={`form-control inputText`}
                          id="pin"
                          maxLength={4}
                          placeholder="Enter PIN"
                          value={formData.pin}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div
                      className="alert alert-danger"
                      style={{ padding: "8px 16px", fontStyle: "italic" }}
                    >
                      {error}
                    </div>
                  )}
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    style={{
                      backgroundColor: "#FF7F50",
                      borderColor: "#FF7F50",
                      marginTop: "0.8rem",
                    }}
                  >
                    Register
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <p>
                    Already have an account?{" "}
                    <Link to="/login" style={{ color: "#FF7F50" }}>
                      Login here
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponent;
