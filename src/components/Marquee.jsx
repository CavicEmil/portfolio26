import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { SiFigma, SiGithub, SiHtml5, SiJavascript, SiReact, SiTailwindcss, SiNodedotjs } from 'react-icons/si';
import { GrAdobeCreativeCloud } from "react-icons/gr";
import { IoLogoCss3 } from "react-icons/io";
import { TbFileTypeSql } from "react-icons/tb";

const items = [
  'UX-design', 'UI-design', 'UX/UI-prototyping', 'Webudvikling',
  <SiHtml5 />, <IoLogoCss3  />, <SiJavascript />, <SiReact />,
  <SiTailwindcss />, <SiNodedotjs />, <TbFileTypeSql />, <SiGithub />, <SiFigma />, <GrAdobeCreativeCloud />,
];

export default function Marquee() {
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 20,
        ease: 'none',
        repeat: -1,
      });
    }, trackRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden w-full ">
      <div ref={trackRef} className="flex gap-12 w-max text-white text-[20px] py-12 leading-1">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-2 whitespace-nowrap">{item}</span>
        ))}
      </div>
    </div>
  );
}