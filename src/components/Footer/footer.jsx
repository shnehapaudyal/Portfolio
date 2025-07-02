import React from 'react';
import './footer.css';
import { FaLinkedin, FaGithub, FaMedium, FaInstagram, FaYoutube } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-name">© {new Date().getFullYear()} Subtle and Boring</p>
                <div className="footer-links">
                    <a href="https://www.linkedin.com/in/shneha-paudyal/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/shnehapaudyal" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://instagram.com/subtle_and_boring" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                        <FaInstagram />
                    </a>
                    <a href="https://youtube.com/@shnehapaudyal" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                        <FaYoutube />
                    </a>
                    <a href="https://medium.com/@eshnehapaudyal" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                        <FaMedium />
                    </a>
                </div>
            </div>
        </footer>
    );
}

export default Footer;