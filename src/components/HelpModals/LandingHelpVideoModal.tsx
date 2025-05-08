'use client'
import React, {useEffect, useState} from 'react';
import AzDialog from "@/components/dialog/AzDialog";
import {getCookie, setCookie} from "cookies-next";
import {Button, Checkbox, DialogBody, DialogHeader, IconButton} from "@material-tailwind/react";
import Image from "next/image";
import { Select, Option } from "@material-tailwind/react";
import {useQuery} from "@tanstack/react-query";
import {getLandingWelcomeVideo} from "@/services/helpServices";
import VideoPlayer from "@/components/VideoPlayer";
import RegisterBtn from "@/components/Buttons/RegisterBtn";

const LandingHelpVideoModal = () => {


    const [open , setOpen] = useState<boolean>(false)
    const [selectedLang ,setSelectedLang] = useState<any>('en')
    const [dontShow , setDontShow] = useState(false)
    useEffect(()=>{
        if(getCookie("AZ_DIALOG") !== 'viewed'){
            setOpen(true)
        }

    },[])


    const {data, isPending , error } = useQuery({
        queryKey: ['get-landing' ],
        queryFn: getLandingWelcomeVideo,
        retry:false,
    })


    const gotIt = () =>{
       if(dontShow){
           setCookie("AZ_DIALOG" , 'viewed')
           setOpen(false)
       }else  setOpen(false)
    }

    const countries = data?.data?.map((x : any)=>({key:x?.language_code , value : x?.language_code , label:x?.language_name}))
    const selectedData = data?.data?.find((x:any) => x?.language_code === selectedLang) ||  data?.data?.[0]
    return (
        <AzDialog    open={open}   handler={()=>setOpen(e => !e)} >
            <DialogHeader className={'w-full flex flex-row items-center justify-between '}>
                <div>
                    {selectedData?.title}
                </div>
                <div className={'grow flex flex-row items-center justify-end'}>
                   {countries?.length > 0 &&
                       <div className={'max-w-[10rem] mr-12'}>
                           <Select
                               value={selectedLang}
                               onChange={(val) => {
                                   setSelectedLang(val)}
                               }
                               size="lg"
                               label="Select Country"

                               selected={(element: any) =>
                                   element &&
                                   React.cloneElement(element, {
                                       disabled: true,
                                       className:
                                           "!max-w-[2rem] flex items-center opacity-100 px-0 gap-2 pointer-events-none",
                                   })
                               }
                           >
                               {countries?.map(({ label , key } : {label :string , key : string}) => (
                                   <Option key={key}
                                           className="flex items-center gap-2"
                                           value={key}

                                   >
                                       {label}
                                   </Option>
                               ))}
                           </Select>
                       </div>
                   }
                   <IconButton className={'bg-transparent focus:shadow-none !shadow-none'} onClick={()=>setOpen(e => !e)}>
                       <Image src={'/exit.svg'} alt={'exit.svg'} width={15} height={15} />
                   </IconButton>
                </div>
            </DialogHeader>

            <DialogBody className={'w-full min-h-[30rem]'}>
                <p className='w-full text-center px-5'>
                    {selectedData?.description}
                </p>
                <div className='w-full mt-7 rounded-lg overflow-hidden'>

                    {/*<VideoPlayer url={selectedData?.media_files?.[0]?.video || ''}  />*/}
                    <video
                        src={selectedData?.media_files?.[0]?.video || ''}
                        className={`w-full`}
                        controls
                    />
                </div>
                <Checkbox label={'Don’t show me again'} checked={dontShow} onChange={()=>setDontShow(!dontShow)}/>

                <div className='w-full flex flex-row items-center justify-center'>
                    <RegisterBtn otherClass={'!w-full md:!w-[15rem] !font-bold'} onClick={gotIt}>
                        Got It!
                    </RegisterBtn>
                </div>
            </DialogBody>
        </AzDialog>
    );
};

export default LandingHelpVideoModal;