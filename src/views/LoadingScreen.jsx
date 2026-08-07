import { useState, useEffect } from "react";

export default function LoadingScreen({ onLoaded }) {
  const [text, setText] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const words = ["Velkomme", "til", "portfolio", "af", "Emil", "Cavic"];
  const loadingText = "Indlæser";

  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex < words.length) {
        setText(words[currentIndex]);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
            setIsExiting(true);
            setTimeout(onLoaded, 3000);
        },500);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [onLoaded]);


  return (
    <div className={`fixed inset-0 bg-accent-red bg-loading flex flex-col justify-center items-center z-100 
        ${
        isExiting ? "animate-mask-reveal" : ""
        }
      `}>
      <div className="text-center">
        <h1 className="font-bodoni text-[40vh] text-white uppercase">{text}</h1>
      </div>
      <p className="absolute bottom-[15vh] text-center font-bodoni text-[10vh] text-white uppercase animate-pulseloader">
            Indlæser
        </p>
    </div>
  );
}



