import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Layout from '../Component/Layout';
import { useAuth } from '../Context/AuthContext';

const DepositPage = () => {
  const {token,userId} = useAuth();
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [depositSuccess, setDepositSuccess] = useState(false);
  const [depositedAmount, setDepositedAmount] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleDeposit = async (depositAmount) => {
    setDepositedAmount(depositAmount);
    setDepositSuccess(true);


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

      if (response.status !== 200) {
        setError('Failed to deposit amount. Please try again.');
        setDepositSuccess(false); // Revert success if deposit fails
      }
    } catch (error) {
      setError('Failed to deposit amount. Please try again.');
      console.error('Error depositing amount:', error);
      setDepositSuccess(false); // Revert success if deposit fails
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleDeposit(amount);
  };

  const handlePrintReceipt = () => {
    window.print();
  };

  if (depositSuccess) {
    return (
      <Layout>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="card p-4 text-center shadow" style={{ width: '500px', borderRadius: '15px', marginTop: '50px' }}>
            <div className="card-body">
              <h3 className="card-title" style={{ color: '#FF7F50' }}>Deposit Successful</h3>
              <p>{depositedAmount} has been deposited successfully!</p>
              <button className="btn btn-primary m-2" onClick={() => navigate('/balance')}>Go to Balance</button>
              <button className="btn btn-secondary m-2" onClick={handlePrintReceipt}>Print Receipt</button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container d-flex align-items-center justify-content-center">
        <div className="card p-4 text-center shadow" style={{ width: '500px', borderRadius: '15px', marginTop: '50px' }}>
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
      </div>
    </Layout>
  );
};

export default DepositPage;
