import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundImage: "linear-gradient(to bottom, #FFFFFF, #D8E7F7)",
        padding: "20px 0",
        textAlign: "center",
        fontFamily: "Montserrat",
        fontSize: "18px",
      }}
    >
     <div style={{ marginBottom: "20px" }}>
        <a href="https://www.instagram.com/your_instagram" target="_blank" rel="noopener noreferrer" style={{ color: '#006DA3', marginRight: '20px' }}>
          <i className="bi bi-instagram" style={{ fontSize: '30px' }}></i>
        </a>
        <a href="https://www.facebook.com/your_facebook" target="_blank" rel="noopener noreferrer" style={{ color: '#006DA3' }}>
          <i className="bi bi-facebook" style={{ fontSize: '30px' }}></i>
        </a>
      </div>
      <div>
        <a href="/products" style={{ color: "#006DA3", marginRight: "20px", textDecoration: "none", fontFamily:"Montserrat" }}>
          Products 
        </a>
        <a style={{ color: "#006DA3", marginRight: "20px", textDecoration: "none" }}>
          |
        </a>
        <a href="/about" style={{ color: "#006DA3", marginRight: "20px", textDecoration: "none" }}>
          About
        </a>
        <a style={{ color: "#006DA3", marginRight: "20px", textDecoration: "none" }}>
          |
        </a>
        <a href="/faq" style={{ color: "#006DA3", marginRight: "20px", textDecoration: "none" }}>
          FAQ
        </a>
        <a style={{ color: "#006DA3", marginRight: "20px", textDecoration: "none" }}>
          |
        </a>
        <a href="/blog" style={{ color: "#006DA3", marginRight: "20px", textDecoration: "none" }}>
          Blog
        </a>
        <a style={{ color: "#006DA3", marginRight: "20px", textDecoration: "none" }}>
          |
        </a>
        <a href="/contact" style={{ color: "#006DA3", textDecoration: "none" }}>
          Contact
        </a>
      </div>
    </footer>
  );
};

export default Footer;
