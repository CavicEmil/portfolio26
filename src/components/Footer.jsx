import { useState, useEffect } from 'react';
import tarantino from '../assets/tarantino.gif'

export default function Footer({ onNavigateToppen }) {
  const [showImprint, setShowImprint] = useState(false);

  const toggleImprint = () => {
    showImprint ? setShowImprint(false) : setShowImprint(true);
  };

  return (
    <footer className="min-h-screen relative h-full py-36 gap-12 bg-footer flex flex-col items-center justify-center border-t-1 border-white/50 overflow-hidden">
      <div className='h-[20vh] w-screen font-body text-white text-[1rem] flex flex-row justify-center gap-36 '>
        <p>  &#169; Emil Čavić </p>
        <p className='cursor-pointer hover:text-accent-red transform transition-color transition-size duration-700 ease-in-out hover:text-[1.5rem]' onClick={toggleImprint}> Impressum </p>
      </div>
  
      <div className={`h-full w-[50vw] absolute bg-mainbg right-0 p-36 transition-transform duration-900 ease-in-out transform ${showImprint ? '-translate-x-0' : 'translate-x-full'}`}>
        <p className='font-bodoni text-[36px] text-white pb-12'>Anerkendelse</p>
        <p className='font-body text-lg text-white'>
          En særlig tak til: <br/>
          Hero billede: Peder Severin Krøyer 'Sankt Hansblus på Skagen strand' <br/>
          Kontakt billede: Carl Bloch 'Fra et romersk osteria' <br/>
          Christopher Waltz gif af tumblr user fyeahmovies https://www.tumblr.com/underratedcharactersimagines/656773509326995456/for-the-old-man-simp-hour-thing-christoph-waltz <br/>
          Quentin Tarantino gif af giphy @BAFTA https://giphy.com/gifs/bafta-baftas-bafta-film-awards-2020-ifH8IOSp9gyPM1oGA4
        </p>
        <div onClick={toggleImprint}
          className='bg-transparent w-[150px] text-[24px] text-center hover:bg-accent-red transition-color duration-300 cursor-pointer 
              border-solid border-1 rounded-full border-white text-epic text-white text-[1rem] pt-1 pb-2 px-2 m-24'>
            Luk
        </div>
      </div>
      
      <div className='flex flex-row gap-12 items-center justify-evenly text-[1.5rem] font-body text-white'>
        <img src={tarantino} />
        <p>...tak for din opmærksomhed!</p>
       </div>
      <div className='text-[1.5rem] font-body text-white'>Ikke fundet det, du søger? Så er det bedst du læser det hele igen fra toppen:</div>
      <div  onClick={() => onNavigateToppen()}
        className='bg-transparent hover:bg-accent-red transition-colors duration-300 cursor-pointer border-solid border-1 rounded-full border-white 
        text-epic text-white text-[2rem] pt-2 pb-4 px-4'>
        Til toppen
      </div>
    </footer>
  );
}