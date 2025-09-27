import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Notfound.css'

const Notfound = () => {
  const navigate = useNavigate();

  const goHome = () => {
    navigate('/'); 
  };

  return (
    <div className="notfound-container" style={{ fontFamily: "yekanbakh-bold"}}>
      <div className="notfound-content">
        <h1 className="notfound-title">404</h1>
        <p className="notfound-message">این صفحه وجود ندارد</p>
        <button className="notfound-button" onClick={goHome}>برگشتن به صفحه اصلی</button>
      </div>
    </div>
  );
};

export default Notfound;
