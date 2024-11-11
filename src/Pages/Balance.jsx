import React, { useEffect, useState } from "react";
import Layout from "../Component/Layout";
import axios from 'axios';

const Balance = () => {
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userId = localStorage.getItem('userId');
        const token = localStorage.getItem('token');

        // Check if userId and token exist
        if (!userId || !token) {
          setError('User is not logged in.');
          return;
        }

        const response = await axios.get('http://localhost:8080/atm/accounts/balance', {
          params: {
            userId,
            token,
            amount: 1000 // Update or remove this if not required
          }
        });

        setBalance(response.data.balance);
      } catch (error) {
        setError('Failed to fetch balance. Please try again.');
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, []);

  return (
    <Layout>
      <div className="container d-flex align-items-center justify-content-center mt-5">
        <div className="card text-center shadow" style={{ width: '350px', borderRadius: '15px' }}>
          <div className="card-body">
            <h3 className="card-title" style={{ color: '#FF7F50' }}>Account Balance</h3>
            {error ? (
              <p className="card-text text-danger">{error}</p>
            ) : balance !== null ? (
              <p className="card-text display-4" style={{ fontWeight: 'bold', color: '#343a40' }}>
                {balance.toFixed(2)}
              </p>
            ) : (
              <p className="card-text">Loading...</p>
            )}
          </div>
          <div className="card-footer" style={{ background: '#FF7F50', color: '#ffffff', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
            <small>Updated: {new Date().toLocaleDateString()}</small>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Balance;
