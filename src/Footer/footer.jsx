import React from 'react';
import './Footer.css';
import { FaLinkedin, FaGithub, FaMedium } from 'react-icons/fa';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <p className="footer-name">© {new Date().getFullYear()} Your Name</p>
                <div className="footer-links">
                    <a href="https://linkedin.com/in/yourusername" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                        <FaLinkedin />
                    </a>
                    <a href="https://github.com/yourusername" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                        <FaGithub />
                    </a>
                    <a href="https://medium.com/@yourusername" target="_blank" rel="noopener noreferrer" aria-label="Medium">
                        <FaMedium />
                    </a>
                </div>
            </div>
        </footer>
    );
}
