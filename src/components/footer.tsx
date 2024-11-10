import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-200 text-center p-4 mt-8">
      <p>&copy; {currentYear} Inventory System. All rights reserved.</p>
    </footer>
  );
};

export default Footer;