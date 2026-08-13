export default function Kontakt() {
    return(
        <div className="bg-kontakt min-h-[150vh] w-full">
            <div className="h-[20vh] w-screen bg-kontakttrans"></div>
            <a data-cursor='mail mig' href='mailto:eaa25emca@students.eaaa.dk' target='_blank' linktype='email'>
                <p className='text-[20vh] px-24 tracking-[-10%] leading-none font-epic text-accent-red'>
                    Skriv mig <br/> endelig
                </p>
            </a>
            <div className="pt-36 pb-18 text-center font-body text-white text-[24px] underline">
                eaa25emca@students.eaaa.dk
            </div>
            <div className=" w-[50vw] flex flex-col items-center justify-center ">
                <p className="relative left-[12vw] w-[40vw] bg-mainbg/70 font-body text-white text-[18px] px-6 py-2">
                    Har du brug for en ekstra hjerne og et par hænder til et igangværende UX/UI/webdesign-projekt, 
                    eller har du et projekt, du gerne vil implementere, men mangler ressourcerne? Så bør vi bestemt tale sammen!
                </p>
                <p className="relative left-[34vw] w-[30vw] bg-mainbg/70 font-body text-white text-[18px] px-6 py-2">
                    Ved ikke, hvad du skal sige? Ingen problem, bare start med noget i retning af: 
                    'Vi synes, du er det perfekte match, og vi vil gerne arbejde sammen med dig...' :)
                </p>
            </div>
        </div>
    )
}