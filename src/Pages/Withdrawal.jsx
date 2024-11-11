import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import CSS for react-toastify
import axios from 'axios';
import { jsPDF } from 'jspdf';
import Layout from '../Component/Layout';
import { useNavigate } from 'react-router-dom';
 
const WithdrawalPage = () => {
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  const handleInputChange = (e) => {
    setAmount(e.target.value);
  };
 
  const handleWithdrawal = async (withdrawAmount) => {
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
 
      console.log('Response data:', response.data);
 
      if (response.status === 200) {
        if (typeof response.data === 'object' && response.data.balance !== undefined) {
          toast.success(`₹${withdrawAmount} has been withdrawn!`);
          setAmount('');
 
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
 
          navigate('/balance');
        } else if (typeof response.data === 'string' && response.data.includes('limit')) {
          setError('You have reached your daily withdrawal limit of ₹20,000.');
          toast.error('You have reached your daily withdrawal limit of ₹20,000.');
        } else {
          setError('Unexpected response format.');
          toast.error('Unexpected response format.');
        }
      } else {
        setError('Failed to withdraw amount. Please try again.');
        toast.error('Failed to withdraw amount. Please try again.');
      }
    } catch (error) {
      console.log('Error response data:', error.response?.data);
      const errorMsg = error.response?.data?.message || 'Failed to withdraw amount. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
      console.error('Error withdrawing amount:', error);
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
 
  return (
<Layout>
<div className="container d-flex align-items-center justify-content-center">
<div className="card p-4 text-center shadow" style={{ width: '500px', borderRadius: '15px' }}>
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
<ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
</div>
</Layout>
  );
};
 
export default WithdrawalPage;