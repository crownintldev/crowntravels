
//@ts-nocheck

import Link from 'next/link';
import React, { useState, Fragment } from 'react';
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
import DropDown from './dropdown';
import MegaMenu from './MegaMenu';




const Navlink = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Link className='font-semibold' href="/" onClick={onClose}>
        Home
      </Link>
      <div>
        <DropDown
          onLinkClick={onClose}
          alignment="sm:text-start p-3 "
          text="About"
          icon={
            <MdOutlineKeyboardArrowDown
              className="mt-1"
              aria-hidden="true"
            />
          }
          array={[
            {
              items: [
                { id: "1",  title: "About Member", subtitle:"CEO",href: "/team" },
                { id: "2", title: "About Company", subtitle:"CROWN",href: "/about" },
                { id: "3", title: "Meet Our Team", subtitle:"CROWN TEAM",href: "/developer" },
                { id: "4", title: "Company Profile", subtitle:"PDF PROFILE",href: "/about" },
              ],
            },
          ]}
        />
      </div>


      <div>
        <MegaMenu
          onLinkClick={onClose}
          className={"  h-fit "}
          alignment="md:overflow-y-hidden z-50 overflow-y-scroll h-screen w-full gap-3 left-0 p-1 md:p-3 lg:p-5 sm:text-start   "
          text="Service"
          icon={
            <MdOutlineKeyboardArrowDown
              className="mt-1"
              aria-hidden="true"
            />
          }
          
        />
      </div>
      <Link className='font-semibold' href="/product" onClick={onClose}>
        Product
      </Link>
      <Link className='font-semibold' href="/contact" onClick={onClose}>
        Contact
      </Link>
    </>
  );
};

export default Navlink;