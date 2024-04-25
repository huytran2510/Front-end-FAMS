import React from 'react';
import Logo from '../../img/image.png';
import '/node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../../css/header.css'


const FooterPanel = () => {
  return (
    <div className="header-panel">
      <div className="container">
        <img src={Logo} alt="Logo" className=' img-fluid logo'></img>
      </div>
    </div>
  );
};

export default FooterPanel;