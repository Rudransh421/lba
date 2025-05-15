import React, { useState } from 'react';
import "./Toast.css";


const Toast = ({ message, onClose }) => {
  const [activeSection, setActiveSection] = useState('main');

  // ✅ Clean up Gemini wrapper (header + ```html)
  const cleanHeader = message.replace(/={10,}\s*GEMINI AI RECOMMENDATIONS:\s*={10,}\s*```html/i, '');

  return (
    <div className="toast-success">
      <button className="toast-close" onClick={onClose}>×</button>

      <div className="toast-content">
        <div className="toast-message">
          {/* ✅ Safely render cleaned HTML message */}
          <div dangerouslySetInnerHTML={{ __html: cleanHeader }} />
        </div>
      </div>
    </div>
  );
};

export default Toast;
