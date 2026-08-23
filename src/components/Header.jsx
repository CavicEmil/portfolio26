import { useState, useEffect } from 'react';

export default function Header({activeSection, onNavigate }) {
  const links = [
     { id: 'landing', label: 'Hjem', classprop: 'before:pb-1 -pl-1 before:-translate-x-2 before:-translate-y-1' },
     { id: 'projekter', label: 'Projekter', classprop: 'before:-pt-2 before:translate-x-1 before:-translate-y-2' },
     { id: 'ommig', label: 'Om mig', classprop:'before:p-1 before:-translate-x-2 before:-translate-y-1' },
     { id: 'kontakt', label: 'Kontakt', classprop:'before:-p-2 before:-translate-y-2' },
  ];

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  },[]);

  return (
    <header className={`top-0 z-80 w-full h-[70px] ${
      isScrolled ? 'sticky backdrop-blur-lg ' : 'absolute'
      }`}>
      <div className="w-[90vw] h-full mx-auto border-b border-accent-red">
        <div className="flex justify-between items-center h-full w-full mx-auto px-8">
          <div className="flex-1"></div>
          <div className="flex-1"></div>
          <nav className="flex gap-8">
            {links.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`font-body text-white relative hover:text-white transition-colors 
              duration-300 hover:cursor-cell before:content-[''] before:absolute before:inset-0 
              before:bg-accent-red before:transform before:z-[-1] before:transition-opacity 
              before:opacity-0 hover:before:opacity-100 ${link.classprop}
              ${ activeSection === link.id ? 'before:opacity-100' : ''}
              `}>
                {link.label}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}