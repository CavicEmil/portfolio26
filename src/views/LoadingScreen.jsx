import { useState, useEffect } from "react";

export default function LoadingScreen({ onLoaded }) {
  const [text, setText] = useState("");
  const [isExiting, setIsExiting] = useState(false);

  const words = ["Velkomme", "til", "portfolio", "af", "Emil", "Cavic","Velkomme", "til"];
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
            setTimeout(onLoaded, 1000);
        },500);
      }
    }, 500);
    return () => clearInterval(interval);
  }, [onLoaded]);


  return (
    <div className={`fixed h-full w-screen inset-0 bg-accent-red bg-loading z-100 
        ${
        isExiting ? "animate-mask-reveal" : ""
        }
      `}>
        <div className="h-screen flex flex-col justify-center items-center">
          <div className="text-center">
            <h1 className="font-bodoni  xl:text-[40dvh] text-[clamp(2.5rem,40dvh,5rem)] text-white uppercase">{text}</h1>
          </div>
          <p className="absolute xl:bottom-[15dvh] mt-[25dvh] text-center font-bodoni xl:text-[10dvh] text-[clamp(1.5rem,10dvh,4rem)] text-white uppercase animate-pulseloader">
                Indlæser
            </p>
        </div>
    </div>
  );
}



