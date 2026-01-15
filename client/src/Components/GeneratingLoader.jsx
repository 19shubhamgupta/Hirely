import React from "react";
import "./GeneratingLoader.css";

const GeneratingLoader = () => {
  return (
    <div className="custom-loader">
      <div className="loader-wrapper">
        <span className="loader-letter">G</span>
        <span className="loader-letter">e</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">e</span>
        <span className="loader-letter">r</span>
        <span className="loader-letter">a</span>
        <span className="loader-letter">t</span>
        <span className="loader-letter">i</span>
        <span className="loader-letter">n</span>
        <span className="loader-letter">g</span>
        <span className="loader-letter">.</span>
        <span className="loader-letter">.</span>
        <span className="loader-letter">.</span>
        <div className="loader-circle"></div>
      </div>
    </div>
  );
};

export default GeneratingLoader;
