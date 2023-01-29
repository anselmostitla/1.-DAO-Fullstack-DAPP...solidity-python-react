import React, { useEffect, useState } from "react";
import { FaUserSecret, FaMoon } from "react-icons/fa";
import { MdLightMode } from "react-icons/md";
import { connectWallet } from "../Blockchain.services";
import { truncate, useGlobalState } from "../store";


const Header = () => {
  const [connectedAccount] = useGlobalState("connectedAccount");
  const [theme, setTheme] = useState(localStorage.theme);
  const themeColor = theme === "dark" ? "light" : "dark";
  const darken = theme === "dark" ? true : false;
  
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(themeColor);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [themeColor, theme]);

  const toggleLight = () => {
    const root = window.document.documentElement;
    root.classList.remove(themeColor);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
    setTheme(themeColor);
  }

  return (
    <div className="sticky top-0 z-50 dark:text-blue-500">
      <nav
        className="navbar navbar-expand-lg 
          shadow-md py-2 relative flex items-center w-full
          justify-between bg-white dark:bg-[#212936]"
      >
        <div className="px-6 w-full flex flex-wrap items-center justify-between">
          <div className="grow flex justify-between items-center p-2">
            
            <a href="/" className="flex justify-start items-center space-x-3">
              <FaUserSecret className="cursor-pointer" size={25} />
              <span className="invisible md:visible">
                Dominon
              </span>
            </a>

            <div className="flex justify-center items-center space-x-5">
              {darken ?
              <MdLightMode onClick={toggleLight} className="cursor-pointer" size={25} />
              : <FaMoon onClick={toggleLight} className="cursor-pointer" size={25} />
              }
              {connectedAccount ? (
              <button
              className="px-4 py-2.5 bg-blue-600 font-medium text-sm leading-tight uppercase rounded-full text-white shadow-md 
              shadow-gray-400 active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:text-blue-500 dark:border
              dark:border-blue-500 dark:bg-transparent "
              // onClick={connectWallet}
            >
              {truncate(connectedAccount,4,4,11)}
            </button>
              ):(
                <button
                className="px-4 py-2.5 bg-blue-600 font-medium text-sm leading-tight uppercase rounded-full text-white shadow-md 
                shadow-gray-400 active:bg-blue-800 dark:shadow-transparent transition duration-150 ease-in-out dark:text-blue-500 dark:border
                dark:border-blue-500 dark:bg-transparent "
                onClick={connectWallet}
              >
                Connect Wallet
              </button>
              )}

            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Header;
