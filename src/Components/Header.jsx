// Header.jsx
import React from 'react';
import LogoAndName from './LogoAndName';

const Header = () => {
  return (
    <header className="bg-[#6B9ABC] flex justify-between items-center text-white p-4 text-center gap-2">
      <h1 className=" "><LogoAndName/></h1>
     <h1 className='font-mono'>
      Just imagine your color 🤔
     </h1>
    </header>
  );
};

export default Header;
