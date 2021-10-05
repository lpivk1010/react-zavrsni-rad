import React from "react";

import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";

const FooterIcons = () => (
  <div className="footer-icons">
    <ul>
      <li>
        <FaFacebookF className="footer-icon" />
      </li>
      <li>
        <FaInstagram className="footer-icon" />
      </li>
      <li>
        <FaTwitter className="footer-icon" />
      </li>
      <li>
        <FaLinkedinIn className="footer-icon" />
      </li>
      <li>
        <FaYoutube className="footer-icon" />
      </li>
    </ul>
  </div>
);

export default FooterIcons;
