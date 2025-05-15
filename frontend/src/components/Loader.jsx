import React, { useEffect, useState } from "react";
import "./Loader.css";

const Loader = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.random() * 10;
        if (next >= 100) {
          clearInterval(interval);
          if (onComplete) onComplete();
          return 100;
        }
        return next;
      });
    }, 300);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="loader-container">
      <div className="loader-bar">
        <div
          className="loader-bar-fill"
          style={{ width: `${Math.floor(progress)}%` }}
        ></div>
      </div>
      <div className="loader-percentage">{Math.floor(progress)}%</div>
    </div>
  );
};

export default Loader;
