import React from 'react';
import hsbscLogo from "../Assets/hsbcLogo.png";

const NavbarComponent = ({ username }) => {
  return (
    <nav className="navbar navbar-expand-lg" style={{ backgroundColor: '#db0011' }}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/" style={{ color: '#ffffff', fontWeight: 'bold' }}>HSBC ATM</a>
        <div style={{marginRight:"1rem"}}>
        <img
          src={hsbscLogo}
          style={{
            height: "28px",
            width: "38px",
          }}
        />
      </div>
        {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          
        </div> */}
      </div>
    </nav>
  );
};

export default NavbarComponent;
