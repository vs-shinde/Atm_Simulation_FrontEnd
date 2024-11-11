import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Component/Layout';

const DepositPage = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDeposit = async (depositAmount) => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      setError('User is not logged in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/atm/accounts/deposit', null, {
        params: {
          userId,
          token,
          amount: depositAmount
        }
      });
      if (response.status === 200) {
        toast.success(`${depositAmount} has been deposited!`);
        setTimeout(() => {
          navigate('/balance');
        }, 3000);
      }
    } catch (error) {
      setError('Failed to deposit amount. Please try again.');
      console.error('Error depositing amount:', error);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleDeposit(amount);
  };

  return (
    <Layout>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="card p-4 text-center shadow" style={{ width: '500px', borderRadius: '15px' }}>
          <div className="card-body">
            <h3 className="card-title" style={{ color: '#FF7F50' }}>Deposit Amount</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="depositAmount"
                  value={amount}
                  onChange={handleInputChange}
                  placeholder='Enter Amount'
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#FF7F50', borderColor: '#FF7F50' }}>
                Deposit
              </button>
            </form>
            <div className="mt-3">
              <button className="btn btn-outline-secondary m-2" onClick={() => handleDeposit(500)}>500</button>
              <button className="btn btn-outline-secondary m-2" onClick={() => handleDeposit(1000)}>1000</button>
              <button className="btn btn-outline-secondary m-2" onClick={() => handleDeposit(2000)}>2000</button>
            </div>
          </div>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
      </div>
    </Layout>
  );
};

export default DepositPage;
