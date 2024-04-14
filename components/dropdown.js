import React, { useState } from "react";
import Link from "next/link";

export default function Dropdown({ items }) {
  const [isOpen, setIsOpen] = useState(false);
  const menuItems = items?.children ? items.children : [];
  const titleIcon = items?.icon ? items.icon : "";
  const title = items?.title ? items.title : "";
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <div className="dropdown">
        <button className="nav-link dropdown-toggle text-white" onClick={toggleDropdown}>
        <i className={titleIcon} style={{ color: "white" }}></i>
        &nbsp;{title}
        </button>
        <ul className={`dropdown-menu ${isOpen ? "show" : ""}`}>
          {menuItems.map((item) => (
            <li>
              <Link href="#" className="dropdown-item">
              <img src={item.img} />
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
