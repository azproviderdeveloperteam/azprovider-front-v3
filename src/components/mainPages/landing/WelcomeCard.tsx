import React from 'react';
import ship from '@/public/ship.png'
import {texts} from "@/utils/texts";
import SearchBox from "@/components/mainPages/landing/SearchBox";
import Image from "next/image";

 const WelcomeCard = () => {
    const text = texts.eng
     const myTexts = text.homePage.welcomeCard
    return (
        <div className={`w-full flex flex-col items-center justify-center h-[45rem] bg-cover bg-center bg-no-repeat relative`} style={{backgroundImage:`url(${ship.src})`}}>
            <div className='bg-[#051926] bg-opacity-90  w-full h-full flex flex-col items-center justify-center'>
                <h2 className='text-[3rem] w-full  lg:w-[73%] 2xl:w-[39%] font-bold text-center inline-block text-transparent bg-clip-text' style={{backgroundImage:"linear-gradient(88deg, #AE88FF 7.72%, #FFA3F7 48.06%, #FFCB8E 91.92%)"}}>
                    {myTexts.title}
                </h2>

                <div className='w-full flex flex-col lg:flex-row items-center justify-center'>
                    {
                        myTexts.subtitles.map((item , index) =>{
                            return(
                                <div key={index+1} className='flex flex-row items-center justify-center text-secondary-yellow mr-5 mt-4'>
                                    <div className='w-[1rem] aspect-square rounded-full bg-secondary-yellow mr-2'/>
                                    <h4>
                                        {item}
                                    </h4>

                                </div>
                            )
                        })
                    }
                </div>

                {/*<SearchBox texts={myTexts}/>*/}
                {/*<div className='flex flex-row items-center justify-center text-secondary-yellow '>*/}
                {/*    <Image src={'/loaction-icon.svg'} alt={'location-icon'} width={22} height={22}/>*/}
                {/*    <h4 className='ml-2'>*/}
                {/*        {myTexts.searchBox.sub}*/}
                {/*    </h4>*/}

                {/*</div>*/}
            </div>
            <div className='absolute w-full max-w-[71rem] aspect-[1.517287234] top-[69%]'>
                <Image src={'/dashboard-in-landing.png'} alt={'az-provider-dashboard'} fill
                       className={'!w-full !h-full'}
                 />
            </div>

        </div>
    );
};

export default WelcomeCard;