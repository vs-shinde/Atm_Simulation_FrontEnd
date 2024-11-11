import React from 'react';
import Layout from '../Component/Layout';

const PrintReceiptPage = () => {
  // Dummy data for account info, ideally this should come from an API
  const accountInfo = {
    accountNo: '1234567890',
    name: 'John Doe',
    address: '123 Main Street, Springfield, USA',
    accountType: 'Savings',
    balance: 12345.67
  };

  return (
    <Layout>
      <div className="container d-flex  justify-content-center">
        <div className="card shadow" style={{ width: '500px', borderRadius: '15px' }}>
          <div className="card-body">
            <h3 className="card-title" style={{ color: '#FF7F50' }}>Account Information</h3>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 'bold' }}>Account No:</label>
              <p>{accountInfo.accountNo}</p>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 'bold' }}>Name:</label>
              <p>{accountInfo.name}</p>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 'bold' }}>Address:</label>
              <p>{accountInfo.address}</p>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 'bold' }}>Account Type:</label>
              <p>{accountInfo.accountType}</p>
            </div>
            <div className="mb-3">
              <label className="form-label" style={{ fontWeight: 'bold' }}>Balance:</label>
              <p>${accountInfo.balance.toFixed(2)}</p>
            </div>
          </div>
          <div className="card-footer" style={{ background: '#FF7F50', color: '#ffffff', borderBottomLeftRadius: '15px', borderBottomRightRadius: '15px' }}>
            <small>Updated: {new Date().toLocaleDateString()}</small>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrintReceiptPage;
