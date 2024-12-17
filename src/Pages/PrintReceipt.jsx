import Layout from '../Component/Layout';
import { jsPDF } from 'jspdf';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../Context/AuthContext';
const PrintReceiptPage = () => {
  const {token,userId} = useAuth();
  const [error, setError] = useState('');

  useEffect(() => {
  const handlePrintReceipt = async () => {
    
    if (!userId || !token) {
      setError('User is not logged in.');
      return;
    }
    try {
      const receiptResponse = await axios.post('http://localhost:8080/atm/accounts/currBalReceipt', null, {
        params: {
          userId,
          token
        }
      });
        // Generate PDF receipt
        if (receiptResponse.status === 200) {
          const receiptData = receiptResponse.data;
          generatePdfReceipt(receiptData);
        }
      
    } catch (error) {
      //setError('Failed to update pin. Please try again.');
      console.error('Failed to fetch details', error);
    }
  }

  const generatePdfReceipt = (data) => {
    const doc = new jsPDF();
 
    doc.text('Transaction Receipt', 10, 10);
    doc.text(`Account Number: ${data.accountNumber}`, 10, 20);
    doc.text(`Date & Time: ${data.dateTime}`, 10, 30);
    doc.text(`Available Balance: ₹${data.availableBalance}`, 10, 40);
 
    doc.save('receipt.pdf');
  };
  handlePrintReceipt();
}, []);

  return (
    <Layout>
      
    </Layout>
  );
};

export default PrintReceiptPage;
