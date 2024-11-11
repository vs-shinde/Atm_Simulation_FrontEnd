import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginComponent = () => {
  const [accountNo, setAccountNo] = useState('');
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/atm/user/login', {
        accountNumber: accountNo,
        pin: pin,
      });

      if (response.data.token) {
        // Save the token and userId in local storage
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        // Redirect to the home page
        navigate('/home');
       console.log('User ID:', response?.data?.userId);
       console.log('User token:', response?.data?.token);
      }
    } catch (error) {
      setError('Invalid account number or PIN');
    }
    
  };

  return (
    <div className="container-fluid min-vh-100 d-flex">
      <div className="row w-100">
        <div className="col-md-6 d-flex flex-column align-items-center justify-content-center" style={{ backgroundColor: '#db0011', color: '#ffffff' }}>
          <h1 className='mt-5'>Welcome to Our Service</h1>
          <p>Your journey to easy banking starts here.</p>
          <img src="../cards.png" alt="Welcome" className="img-fluid" style={{ maxWidth: '80%', borderRadius: '10px' }} />
        </div>
        <div className="col-md-6 d-flex align-items-center justify-content-center">
          <div className="container" style={{ maxWidth: '400px' }}>
            <div className="card shadow">
              <div className="card-body">
                <h3 className="card-title text-center" style={{ color: '#db0011' }}>Login</h3>
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="accountNo" className="form-label">Account No</label>
                    <input
                      type="text"
                      className="form-control"
                      id="accountNo"
                      placeholder="Enter Account No"
                      value={accountNo}
                      onChange={(e) => setAccountNo(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="pin" className="form-label">PIN</label>
                    <input
                      type="password"
                      className="form-control"
                      id="pin"
                      placeholder="Enter PIN"
                      value={pin}
                      onChange={(e) => setPin(e.target.value)}
                    />
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                  <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#FF7F50', borderColor: '#FF7F50' }}>Login</button>
                </form>
                <div className="mt-3 text-center">
                  <p>Not registered? <Link to="/signup" style={{ color: '#FF7F50' }}>Sign up here</Link></p>
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
