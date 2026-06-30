import "../assets/Styles/Footer.css";
import logo from "../assets/Images/logo.png";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__top">
        <img className="footer__logo" src={logo} alt="Logo" />
        <ul>
            <h1 className="footer__title" >Marketplace</h1>
            <li><a href="/browse-cars">Browse Cars</a></li>
            <li><a href="/locally-used">Locally Used</a></li>
            <li><a href="/imports">Imports</a></li>
            <li><a href="/brand-new">Brand New</a></li>
            <li><a href="/financing">Financing</a></li>
        </ul>
        <ul>
            <h1 className="footer__title" >Parts & Accessories</h1>
            <li><a href="/infotainment-systems">Infotainment Systems</a></li>
            <li><a href="/lighting">Lighting</a></li>
            <li><a href="/safety-tracking">Safety & Tracking</a></li>
            <li><a href="/cameras">Cameras</a></li>
            <li><a href="/performance">Performance</a></li>
        </ul>
        <ul>
            <h1 className="footer__title" >Company</h1>
            <li><a href="/about-us">About Us</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/careers">Careers</a></li>
            <li><a href="/faqs">FAQs</a></li>
        </ul>
       
      </div>
      <div className="footer__bottom">
     <p className="text-center ">
        &copy; {new Date().getFullYear()} My Car Kenya. All rights reserved.
      </p>
      <ul>
        <li><a href="/terms">Terms</a></li> |
        <li><a href="/privacy">Privacy</a></li> |
        <li><a href="/cookies">Cookies</a></li>
      </ul>
      </div>
      
    </footer>
  );
}