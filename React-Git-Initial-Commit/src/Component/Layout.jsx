import React from "react";
import NavbarComponent from "./Navbar";
import SidebarComponent from "./Sidebar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  const RightsidebarButtons = [
    { label: "Get Balance", link: "/balance" },
    { label: "Deposit", link: "/deposite" },
    { label: "Withdraw", link: "/withdrawal" }
  ];
  const LeftsidebarButtons = [
    { label: "Pin Change", link: "/pin-change" },
    { label: "Print Receipt", link: "/print-receipt" }
  ];

  return (
    <>
      <NavbarComponent username="Pratik" />
      <div className="container-fluid">
        <div className="row">
          <div className="col-3">
            <SidebarComponent buttons={LeftsidebarButtons} btnLink={LeftsidebarButtons.btnLink} />
          </div>
          <div className="col-6">
            <div
              className="content"
              style={{
                padding: "20px",
                minHeight: "100vh",
              }}
            >
              {children}
            </div>
          </div>
          <div className="col-3">
            <SidebarComponent buttons={RightsidebarButtons} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Layout;
