import React, { useState, useEffect } from "react";
import "./loading.css";

const LoadingDots = () => {
  //   const [dots, setDots] = useState("");
  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : ""));
  //     }, 600);
  //     return () => clearInterval(interval);
  //   }, []);
  //   return <div style={{ padding: "0px 2px" }}>{dots}</div>;
  return <div className="loader"></div>;
};

export default LoadingDots;
