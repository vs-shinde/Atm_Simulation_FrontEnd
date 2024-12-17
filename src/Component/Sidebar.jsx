import React from "react";
import "../Styles/Sidebar.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

const SidebarComponent = ({ buttons }) => {
  const {logoutAction} = useAuth();
  const navigate = useNavigate();

  const handleClick = (btnLink) => {
    if(btnLink === '/logout'){
      const status = logoutAction();
      if(status===true){
        navigate('/');
      }
    }else{
      navigate(btnLink);
    }
  };

  return (
    <div
      className="d-flex flex-column flex-shrink-0 p-3"
      style={{ width: "250px", height: "100vh" }}
    >
      <ul className="nav nav-pills flex-column mb-auto">
        {buttons.map((button, index) => (
          <li key={index} className="nav-item">
            <button
              className="btn w-100 mb-5 mt-5"
              onClick={() => handleClick(button.link)}
            >
              {button.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SidebarComponent;
