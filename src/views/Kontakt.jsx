import { useIsMobile } from '../hooks/useIsMobile';


export default function Kontakt() {
    const isMobile = useIsMobile();

    return(
        <div className="bg-kontakt relative z-30 xl:min-h-[150dvh] w-screen overflow-hidden" id="kontakt">
            { !isMobile ?
                <>
                <div className="h-[20dvh] w-screen bg-kontakttrans"></div>
                <a data-cursor='mail mig' href='mailto:eaa25emca@students.eaaa.dk' target='_blank' linktype='email'>
                    <p className='text-[20vh] px-6 xl:px-24 tracking-[-10%] leading-none font-epic text-accent-red'>
                        Skriv mig <br/> endelig
                    </p>
                </a>
                </>
            :
                <div className='pt-20 text-[10dvh] font-epic text-accent-red tracking-[-10%] leading-[80%] flex flex-col w-[50dvw]'>
                    <a data-cursor='mail mig' href='mailto:eaa25emca@students.eaaa.dk' target='_blank' linktype='email'>
                        <p>Skriv</p>
                        <p className='text-center'>mig</p>
                        <p>endelig</p>
                    </a>
                </div>
            }
            <div className="pt-36 pb-18 text-center font-body text-white text-[24px] underline">
                {isMobile ? 
                    <a href='mailto:eaa25emca@students.eaaa.dk'>eaa25emca@students.eaaa.dk</a>
                    : <p>eaa25emca@students.eaaa.dk</p>
                }
                
            </div>
            <div className="w-dvw xl:w-[50vw] flex flex-col items-center justify-center ">
                <p className="relative xl:left-[12vw] w-[95dvw] xl:w-[40vw] bg-mainbg/70 font-body text-white text-[18px] px-6 py-2">
                    Har du brug for en ekstra hjerne og et par hænder til et igangværende UX/UI/webdesign-projekt, 
                    eller har du et projekt, du gerne vil implementere, men mangler ressourcerne? Så bør vi bestemt tale sammen!
                </p>
                <p className="relative xl:left-[34vw] w-[95dvw] xl:w-[30vw] bg-mainbg/70 font-body text-white text-[18px] px-6 my-6 xl:py-2">
                    Ved ikke, hvad du skal sige? Ingen problem, bare start med noget i retning af: 
                    'Vi synes, du er det perfekte match, og vi vil gerne arbejde sammen med dig...' :)
                </p>
            </div>
        </div>
    )
}