"use client";

import React, { useState, useEffect } from "react";
import { CiLight } from "react-icons/ci";
import { CiDark } from "react-icons/ci";
import { Button } from "@radix-ui/themes";

const App = () => {
  // State to track the current theme
  const [theme, setTheme] = useState("light");

  // Effect to apply the theme class to the body element
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  // Function to toggle the theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <button
      className=" hover:bg-gray-400 rounded-full p-[0.35em] bg-gray-100"
      size={"1"}
      radius="full"
      color="gray"
      onClick={toggleTheme}
      variant="soft"
    >
      {theme === "light" ? (
        <p className="text-base text-black">
          <CiDark />
        </p>
      ) : (
        <p className="text-base text-black">
          <CiLight />
        </p>
      )}
    </button>
  );
};

export default App;
