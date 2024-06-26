"use client";

import React, { createContext, useContext, useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisVertical } from "@fortawesome/free-solid-svg-icons";
import { useOutsideClickModal } from "./HooksComps/useOutsideClickModal";

// Menus.js component is a compound component, will be used to create Menus.

// Menus Context
const MenusContext = createContext();

function Menus({ children }) {
  const [openId, setOpenId] = useState("");
  const [position, setPosition] = useState(null);

  const close = () => setOpenId("");
  const open = setOpenId;

  return (
    <MenusContext.Provider
      value={{ openId, close, open, position, setPosition }}
    >
      {children}
    </MenusContext.Provider>
  );
}

// define Menus.functions
function Menu({ children }) {
  return <div className="flex items-center justify-center">{children}</div>;
}

function Toggle({ id }) {
  const { openId, close, open, setPosition } = useContext(MenusContext);

  function handleClick(e) {
    const rectPosition = e.target.closest("button").getBoundingClientRect();
    setPosition({
      x: window.innerWidth - rectPosition?.width - rectPosition?.x,
      y: rectPosition?.y + rectPosition?.height + 8,
    });

    openId === "" || openId !== id ? open(id) : close();
  }

  return (
    <button
      onClick={handleClick}
      className="bg-none border-none p-1 rounded-sm transform translate-x-2 transition-all duration-200 hover:bg-gray-100"
    >
      <FontAwesomeIcon
        className="size-4 text-gray-700"
        icon={faEllipsisVertical}
      />
    </button>
  );
}

function List({ id, children }) {
  const { openId, close, position } = useContext(MenusContext);

  const ref = useOutsideClickModal(close);

  const style = {
    right: `${position?.x}px`,
    top: `${position?.y}px`,
  };

  if (openId !== id) return null;

  return (
    <ul
      ref={ref}
      className="fixed z-[1] bg-gray-50 space-y-1 shadow-md rounded-md"
      style={style}
    >
      {children}
    </ul>
  );
}

function Button({ onClick, disabled, title, children }) {
  const { close } = useContext(MenusContext);

  function handleClick() {
    onClick?.();
    close();
  }

  return (
    <li className="w-full">
      <button
        className="btn-xs w-full justify-start btn btn-outline border-none hover:bg-gray-500"
        onClick={handleClick}
        disabled={disabled}
        title={title}
      >
        {children}
      </button>
    </li>
  );
}

// connecting
Menus.Menu = Menu;
Menus.Toggle = Toggle;
Menus.List = List;
Menus.Button = Button;

export default Menus;
