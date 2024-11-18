import React, { useState } from 'react';
import axios from 'axios';
import { jsPDF } from 'jspdf';
import Layout from '../Component/Layout';
import { useNavigate } from 'react-router-dom';

const WithdrawalPage = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [withdrawSuccess, setWithdrawSuccess] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(0);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };

  const handleWithdrawal = async (withdrawAmount) => {
    setWithdrawnAmount(withdrawAmount);
    setWithdrawSuccess(true);

    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');

    if (!userId || !token) {
      setError('User is not logged in.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/atm/accounts/withdraw', null, {
        params: {
          userId,
          token,
          amount: withdrawAmount
        }
      });

      if (response.status !== 200) {
        setError('Failed to withdraw amount. Please try again.');
        setWithdrawSuccess(false); // Revert success if withdrawal fails
      } else if (typeof response.data === 'string' && response.data.includes('limit')) {
        setError('You have reached your daily withdrawal limit of ₹20,000.');
        setWithdrawSuccess(false); // Revert success if withdrawal fails
      } else {
        // Fetch receipt data
        const receiptResponse = await axios.post('http://localhost:8080/atm/accounts/receipt', {
          userId,
          amount: withdrawAmount,
          token,
        });

        // Generate PDF receipt
        if (receiptResponse.status === 200) {
          const receiptData = receiptResponse.data;
          generatePdfReceipt(receiptData);
        }
      }
    } catch (error) {
      setError('Failed to withdraw amount. Please try again.');
      console.error('Error withdrawing amount:', error);
      setWithdrawSuccess(false); // Revert success if withdrawal fails
    }
  };

  const generatePdfReceipt = (data) => {
    const doc = new jsPDF();

    doc.text('Transaction Receipt', 10, 10);
    doc.text(`Account Name: ${data.accountName}`, 10, 20);
    doc.text(`Date & Time: ${data.dateTime}`, 10, 30);
    doc.text(`Available Balance: ₹${data.availableBalance}`, 10, 40);
    doc.text(`Withdrawn Amount: ₹${data.withdrawalBalance}`, 10, 50);

    doc.save('receipt.pdf');
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleWithdrawal(amount);
  };

  const handlePrintReceipt = () => {
    // window.print();
    // if (receiptResponse.status === 200) {
    //   const receiptData = receiptResponse.data;
    //   generatePdfReceipt(receiptData);
    // }
  };

  if (withdrawSuccess) {
    return (
      <Layout>
        <div className="container d-flex align-items-center justify-content-center">
          <div className="card p-4 text-center shadow" style={{ width: '500px', borderRadius: '15px', marginTop: '50px' }}>
            <div className="card-body">
              <h3 className="card-title" style={{ color: '#FF7F50' }}>Withdrawal Successful</h3>
              <p>₹{withdrawnAmount} has been withdrawn successfully!</p>
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
            <h3 className="card-title" style={{ color: '#FF7F50' }}>Withdraw Amount</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <input
                  type="number"
                  className="form-control"
                  id="withdrawAmount"
                  value={amount}
                  onChange={handleInputChange}
                  placeholder='Enter Amount'
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" style={{ backgroundColor: '#FF7F50', borderColor: '#FF7F50' }}>
                Withdraw
              </button>
            </form>
            <div className="mt-3">
              <button className="btn btn-outline-secondary m-2" onClick={() => handleWithdrawal(500)}>500</button>
              <button className="btn btn-outline-secondary m-2" onClick={() => handleWithdrawal(1000)}>1000</button>
              <button className="btn btn-outline-secondary m-2" onClick={() => handleWithdrawal(2000)}>2000</button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default WithdrawalPage;
