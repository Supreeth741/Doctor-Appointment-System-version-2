import React from 'react'
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

function Footer() {
    const creatorName = 'Supreeth TP'; // Replace with your name
    const socialLinks = [
      { icon: FaGithub, url: 'https://github.com/your-username' }, // Replace with your links
      { icon: FaTwitter, url: 'https://twitter.com/your-username' },
      { icon: FaLinkedin, url: 'https://www.linkedin.com/in/your-username' },
    ];

  return (
    <>
    <footer className="bg-gray-800 text-white py-4 text-center">
      <p>Created by {creatorName}</p>
      <ul className="flex justify-center space-x-4 mt-2">
        {socialLinks.map((link) => (
          <li key={link.url}>
            <a href={link.url} target="_blank" rel="noreferrer" className="hover:text-gray-400">
              <link.icon className="w-5 h-5" />
            </a>
          </li>
        ))}
      </ul>
    </footer>
    </>
  )
}

export default Footer