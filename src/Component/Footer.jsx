import React from "react";

const footerStyle = {
  background: "rgb(219, 0, 17)",
  height: "70px",
  textAlign: "center",
  alignItems: "center",
  display: "flex",
  justifyContent: "center",
};

const Footer = () => {
  return (
    <footer className="fixed-bottom text-white py-3" style={footerStyle}>
      <span>© 2024 Your Company. All rights reserved.</span>
    </footer>
  );
};

export default Footer;
