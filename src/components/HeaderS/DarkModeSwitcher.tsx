import useColorMode from "../hooks/useColorMode";
import React from "react"; // Add this line

const DarkModeSwitcher = () => {
  const [colorMode, setColorMode] = useColorMode();

  return (
    <li>
      <div
        onClick={() => {
          if (typeof setColorMode === "function") {
            setColorMode(colorMode === "light" ? "dark" : "dark");
          }
        }}
      >
      

    
      
      </div>
    </li>
  );
};

export default DarkModeSwitcher;
