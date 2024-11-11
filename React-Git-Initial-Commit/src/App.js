import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginComponent from './Pages/Login/Login';
import RegisterComponent from './Pages/Login/Signup';
import Home from './Pages/Home';
import Balance from './Pages/Balance';
import DepositPage from './Pages/Deposite';
import WithdrawalPage from './Pages/Withdrawal';
import PrintReceiptPage from './Pages/PrintReceipt';
import PinChangePage from './Pages/PinChange';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<LoginComponent/>} />
          <Route path="/login" element={<LoginComponent/>} />
          <Route path="/signup" element={<RegisterComponent/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/balance" element={<Balance/>} />
          <Route path="/deposite" element={<DepositPage/>} />
          <Route path="/withdrawal" element={<WithdrawalPage/>} />
          <Route path="/print-receipt" element={<PrintReceiptPage/>} />
          <Route path="/pin-change" element={<PinChangePage/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
