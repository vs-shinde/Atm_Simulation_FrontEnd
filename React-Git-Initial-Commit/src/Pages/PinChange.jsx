import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import Layout from '../Component/Layout';

const PinChangePage = () => {
  const [pin, setPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const userId = localStorage.getItem('userId');
  const navigate = useNavigate();

  const handlePinChange = async () => {
    if (pin === confirmPin) {
      try {
      const response = await axios.post('http://localhost:8080/atm/user/updatePin', null, {
        params: {
          userId,
          newPin: pin
        }
      });
        if(response.status === 200) {
          toast.info(response.data.message);
          
          setTimeout(() => {
            navigate('/login');
          }, 3000);
        }
      
    } catch (error) {
      //setError('Failed to update pin. Please try again.');
      console.error('Failed to update pin:', error);
    }
  } else {
    toast.error('PINs do not match. Please try again.');
  }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handlePinChange();

  }

  return (
    <Layout>
      <div className="container d-flex align-items-center justify-content-center mt-5">
        <div className="card p-4 text-center shadow" style={{ width: '400px', borderRadius: '15px' }}>
          <div className="card-body">
            <h3 className="card-title" style={{ color: '#FF7F50' }}>Change PIN</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="pin"
                  value={pin}
                  maxLength="4"
                  pattern="\d{4}"
                  onChange={(e) => setPin(e.target.value)}
                  required
                  placeholder='Enter PIN'
                />
              </div>
              <div className="mb-3">
                <input
                  type="password"
                  className="form-control"
                  id="confirmPin"
                  value={confirmPin}
                  maxLength="4"
                  pattern="\d{4}"
                  onChange={(e) => setConfirmPin(e.target.value)}
                  required
                  placeholder='Confirm PIN'
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#FF7F50', borderColor: '#FF7F50' }}>
                Change PIN
              </button>
            </form>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Layout>
  );
};

export default PinChangePage;
