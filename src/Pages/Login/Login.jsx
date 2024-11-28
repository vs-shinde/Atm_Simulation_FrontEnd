import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import hsbscLogo from "../../Assets/hsbcLogo.png";
import creditCard from "../../Assets/credit-card1.jpg";

const LoginComponent = () => {
  const [accountNo, setAccountNo] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8080/atm/user/login",
        {
          accountNumber: accountNo,
          pin: pin,
        }
      );

      if (response?.data?.token) {
        // Save the token and userId in local storage
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        // Redirect to the home page
        navigate("/home");
        
      }
    } catch (error) {
      setError("Invalid account number or PIN");
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if ((id === "pin" || id === "accountNo") && !/^\d*$/.test(value)) {
      return;
    }
    if (id === "accountNo") {
      setAccountNo(value);
    }
    if (id === "pin") {
      setPin(value);
    }
  };

  return (
    <div className="container-fluid min-vh-100 d-flex">
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
          <h1 className="mt-5">Welcome to Our Service</h1>
          <p>Your journey to easy banking starts here.</p>
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
            style={{ maxWidth: "400px", marginTop: "8%", marginBottom: "2%" }}
          >
            <div className="card shadow">
              <div className="card-body">
                <h3
                  className="card-title text-center"
                  style={{ color: "#db0011" }}
                >
                  Login <hr style={{ color: "gray" }} />
                </h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label
                      htmlFor="accountNo"
                      className={`form-label formLabel`}
                    >
                      Account number
                    </label>
                    <input
                      type="text"
                      className={`form-control inputText`}
                      id="accountNo"
                      placeholder="Enter account no"
                      value={accountNo}
                      onChange={handleChange}
                      maxLength={12}
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
                      placeholder="Enter PIN"
                      value={pin}
                      maxLength={4}
                      onChange={handleChange}
                    />
                  </div>
                  {error && (
                    <div
                      className="alert alert-danger"
                      style={{
                        padding: "8px 16px",
                        fontStyle: "italic",
                        transition: "all 0.5s ease-out",
                      }}
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
                      marginTop: "0.5rem",
                    }}
                  >
                    Login
                  </button>
                </form>
                <div className="mt-3 text-center">
                  <p>
                    Not registered?{" "}
                    <Link to="/signup" style={{ color: "#FF7F50" }}>
                      Sign up here
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

export default LoginComponent;
