import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="w-full text-center py-6 bg-white text-black dark:bg-black dark:text-white transition-all">
      <div className="container mx-auto px-6">
        <p className="mb-4 text-sm">
          &copy; {new Date().getFullYear()} Prabhu Kiran Avula. All rights reserved.
        </p>
        <div className="flex justify-center space-x-6">
          <a
            href="mailto:prabhuavula7@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
          >
            <FaEnvelope className="w-6 h-6" />
          </a>
          <a
            href="https://github.com/prabhuavula7"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
          >
            <FaGithub className="w-6 h-6" />
          </a>
          <a
            href="https://linkedin.com/in/prabhuavula"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-orange-500 dark:hover:text-orange-400"
          >
            <FaLinkedin className="w-6 h-6" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
