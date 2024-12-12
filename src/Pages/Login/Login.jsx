import React, { useState, useTransition } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import hsbscLogo from "../../Assets/hsbcLogo.png";
import creditCard from "../../Assets/credit-card2.jpg";
import LoadingDots from "../../Component/LoadingDots/LoadingDots";
import "./styles.css";

const LoginComponent = () => {
  const [accountNo, setAccountNo] = useState("");
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

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
    } finally {
      setIsLoading(false);
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
    <div className="container-fluid">
      {isLoading && (
        <div className="loadingWrapper">
          <h4 style={{ marginBottom: "20px" }}>Loading ... </h4>
          {<LoadingDots />}
        </div>
      )}
      <div>
        <img src={hsbscLogo} className="logo" />
      </div>
      <div className="row w-100">
        <div className="col-md-6 fixed-section d-flex flex-column align-items-center justify-content-center">
          <h1 className="heading">Welcome to Our Services</h1>
          <p className="subHeading">
            Your journey to easy banking starts here.
          </p>
          <img src={creditCard} alt="Welcome" className=" creditCardImg" />
        </div>
        <div className="col-md-6 scrollable-section d-flex  justify-content-center">
          <div className="container" style={{ maxWidth: "400px" }}>
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center">
                  Login <hr style={{ color: "gray" }} />
                </h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label
                      htmlFor="accountNo"
                      className={`form-label formLabel`}
                    >
                      Account number *
                    </label>
                    <input
                      type="text"
                      className={`form-control inputText`}
                      id="accountNo"
                      placeholder="Enter account no"
                      value={accountNo}
                      onChange={handleChange}
                      maxLength={12}
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
                      placeholder="Enter PIN"
                      value={pin}
                      maxLength={4}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  {error && (
                    <div className="error alert alert-danger">{error}</div>
                  )}
                  <button
                    type="submit"
                    className="submitButton btn btn-primary w-100"
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
