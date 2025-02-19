import React from "react";

export const Header = (props) => {
  return (
    <header id="header">
    <div className="intro">
      <div className="intro-text">
        <h1>{props.data ? props.data.title : "Loading"}<span></span></h1>
        <p>{props.data ? props.data.paragraph : "Loading"}</p>
        <a href="#features" className="btn btn-custom btn-lg page-scroll">
          Contacta a Ventas
        </a>
      </div>
      <img src="/img/mac.png" alt="Mac" className="foreground-image" />
    </div>
  </header>
  

  );
};
