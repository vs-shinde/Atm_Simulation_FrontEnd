import React, { useEffect, useState, useTransition } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import hsbscLogo from "../../Assets/hsbcLogo.png";
import "./styles.css";
import creditCard from "../../Assets/credit-card2.jpg";
import LoadingDots from "../../Component/LoadingDots/LoadingDots";

const RegisterComponent = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    pin: "",
    contact: "",
  });
  const [error, setError] = useState("");
  const [showSuccessPopup, setSuccessPopup] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [isLoading, setIsLoading] = useState(false);

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

  const registerUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:8080/atm/user/create",
        formData
      );
      if (response?.data) {
        setIsLoading(false);
        setSuccessPopup(true);
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error registering user:", error);
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
    setIsLoading(true);
    startTransition(() => {
      const delayCheck = async () => {
        const duplicate = await checkDuplicateContact(formData?.contact);
        return new Promise((resolve) => {
          setTimeout(() => resolve(duplicate), 3000);
        });
      };
      delayCheck().then((duplicate) => {
        if (duplicate) {
          setIsLoading(false);
          setError("User already present with this contact number.");
          return;
        } else {
          registerUser();
        }
      });
    });
  };

  return (
    <div className="container-fluid">
      {(isPending || isLoading) && (
        <div className="loadingWrapper">
          <h4 style={{ marginBottom: "20px" }}>Loading ... </h4>
          {<LoadingDots />}
        </div>
      )}
      {showSuccessPopup && (
        <div className="modalWrapper">
          <div className={"card shadow modalContent"}>
            <div className="card-body">
              <i
                style={{ color: "limegreen", fontSize: "30px" }}
                class="bi bi-check-circle-fill"
              ></i>
              <h4 className="card-title ">Successfully registered !</h4>
              <div className="card-title">
                <a href="/login" style={{ color: "#FF7F50" }}>
                  Click here
                </a>{" "}
                to Login
              </div>
            </div>
          </div>
        </div>
      )}
      <div>
        <img src={hsbscLogo} className="logo" />
      </div>
      <div className="row w-100">
        <div className="col-md-6 fixed-section d-flex flex-column align-items-center justify-content-center">
          <h1 className="heading">Welcome to Our Services</h1>
          <p className="subHeading">
            Join us to experience the best in class service.
          </p>
          <img src={creditCard} alt="Welcome" className=" creditCardImg" />
        </div>
        <div className="col-md-6 scrollable-section d-flex  justify-content-center">
          <div className="container" style={{ maxWidth: "550px" }}>
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center">
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
                          Name *
                        </label>
                        <input
                          type="text"
                          className={`form-control inputText`}
                          id="name"
                          placeholder="Enter name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="address"
                          className={`form-label formLabel`}
                        >
                          Address *
                        </label>
                        <input
                          type="text"
                          className={`form-control inputText`}
                          id="address"
                          placeholder="Enter address"
                          value={formData.address}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label
                          htmlFor="contact"
                          className={`form-label formLabel`}
                        >
                          Contact No *
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
                          required
                        />
                      </div>
                    </div>
                    <div class="col">
                      <div className="mb-3">
                        <label
                          htmlFor="email"
                          className={`form-label formLabel`}
                        >
                          Email *
                        </label>
                        <input
                          type="email"
                          className={`form-control inputText`}
                          id="email"
                          placeholder="Enter email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="mb-3">
                        <label htmlFor="pin" className={`form-label formLabel`}>
                          PIN *
                        </label>
                        <input
                          type="password"
                          className={`form-control inputText`}
                          id="pin"
                          maxLength={4}
                          placeholder="Enter PIN"
                          value={formData.pin}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {error && (
                    <div className="error alert alert-danger">{error}</div>
                  )}
                  <button
                    type="submit"
                    className="submitButton btn btn-primary w-100"
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
