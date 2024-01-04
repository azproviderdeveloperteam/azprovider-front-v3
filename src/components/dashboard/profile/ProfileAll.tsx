'use client'
import React, {useRef, useState} from 'react';
import {texts} from "@/utils/texts";
import Image from "next/image";

const ProfileAll = ({data , children}:any) => {
    const {projectsData , membershipData , bInfoData ,contactData , certificateData} = data
    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.all

        // const ourRef = useRef(null);
        // const [isMouseDown, setIsMouseDown] = useState(false);
        // const mouseCoords = useRef({
        //     startX: 0,
        //     startY: 0,
        //     scrollLeft: 0,
        //     scrollTop: 0
        // });
        //
        // const [isScrolling, setIsScrolling] = useState(false);
        // const handleDragStart = (e : any) => {
        //     if (!ourRef.current) return
        //     const slider = ourRef.current.children[0];
        //     const startX = e.pageX - slider.offsetLeft;
        //     const startY = e.pageY - slider.offsetTop;
        //     const scrollLeft = slider.scrollLeft;
        //     const scrollTop = slider.scrollTop;
        //     mouseCoords.current = {startX, startY, scrollLeft, scrollTop}
        //     setIsMouseDown(true)
        //     document.body.style.cursor = "grabbing"
        // }
        // const handleDragEnd = () => {
        //     setIsMouseDown(false)
        //     if (!ourRef.current) return
        //     document.body.style.cursor = "default"
        // }
        // const handleDrag = (e : any) => {
        //     if (!isMouseDown || !ourRef.current) return;
        //     e.preventDefault();
        //     const slider = ourRef.current.children[0];
        //     console.log(slider)
        //     const x = e.pageX - slider.offsetLeft;
        //     const y = e.pageY - slider.offsetTop;
        //     const walkX = (x - mouseCoords.current.startX) * 1.5;
        //     const walkY = (y - mouseCoords.current.startY) * 1.5;
        //     slider.scrollLeft = mouseCoords.current.scrollLeft - walkX;
        //     slider.scrollTop = 0;
        //     console.log(walkX, walkY ,  slider.scrollLeft ,  (x - mouseCoords.current.startX) * 1.5)
        // }
        //
        // console.log(data)

    return (
        <div   className='w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory pt-5'>

        {/*<div ref={ourRef} onMouseDown={handleDragStart} onMouseUp={handleDragEnd} onMouseMove={handleDrag}  className='w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory pt-5'>*/}
                {
                   bInfoData &&

                    <div  className='min-w-[36rem] bg-[#F8F8F8] aspect-[1.2] p-5 lg:p-8 rounded-[1rem] mr-4 snap-start overflow-auto'>
                        <div className='w-full text-left font-bold text-primary-dark-b capitalize'>
                            {myTexts.bInfo.title}
                        </div>
                        {
                            bInfoData?.logo
                             ? <Image alt={'aaa'} src={`${process.env.MEDIA_URL}${bInfoData?.logo}`} width={35} height={35} className={'rounded-full object-cover aspect-square mt-2'} />
                                :
                                <Image alt={'aaa'} src={`/no-image.svg`} width={35} height={35} className={'rounded-full object-cover aspect-square mt-2'} />
                        }
                        {
                            bInfoData?.international_name &&
                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                    {`InterNational Name :`}
                                </div>

                                <div className='w-3/5 text-[1rem] truncate'>
                                    { bInfoData?.international_name}
                                </div>
                            </div>
                        }


                        {
                            bInfoData?.brand_name &&
                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                    {`Brand Name : `}
                                </div>

                                <div className='w-3/5 text-[1rem] truncate'>
                                    { bInfoData?.brand_name}
                                </div>
                            </div>
                        }

                        {
                            bInfoData?.cell_phone &&
                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                    {`Cell Phone :`}
                                </div>

                                <div className='w-3/5 text-[1rem] truncate'>
                                    { bInfoData?.cell_phone}
                                </div>
                            </div>
                        }


                        {
                            bInfoData?.email &&
                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                    {`Email :`}
                                </div>

                                <div className='w-3/5 text-[1rem] truncate'>
                                    { bInfoData?.email}
                                </div>
                            </div>
                        }

                        {
                            bInfoData?.local_name &&
                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                    {`Local Name :`}
                                </div>

                                <div className='w-3/5 text-[1rem] truncate'>
                                    { bInfoData?.local_name}
                                </div>
                            </div>
                        }

                        {
                            bInfoData?.contact_person &&
                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                    {`Contact Person :`}
                                </div>

                                <div className='w-3/5 text-[1rem] truncate'>
                                    { bInfoData?.contact_person}
                                </div>
                            </div>
                        }
                    </div>
                }


                 {
                     contactData &&

                     <div  className='min-w-[36rem] bg-[#F8F8F8] aspect-[1.2] p-5 lg:p-8 rounded-[1rem] mr-4 snap-start '>
                         <div className='w-full text-left font-bold text-primary-dark-b capitalize'>
                             {myTexts.contact.title}
                         </div>
                         {
                             contactData?.phone &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`Tell :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.phone}
                                 </div>
                             </div>
                         }
                         {
                             contactData?.fax &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`Fax :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.fax}
                                 </div>
                             </div>
                         }

                         {
                             contactData?.website &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`website :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.website}
                                 </div>
                             </div>
                         }

                         {
                             contactData?.instagram &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`instagram :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.instagram}
                                 </div>
                             </div>
                         }

                         {
                             contactData?.whatsapp &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`whatsapp :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.whatsapp}
                                 </div>
                             </div>
                         }

                         {
                             contactData?.address &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`location title :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.address}
                                 </div>
                             </div>
                         }

                         {
                             contactData?.country &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`city / country :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.country}
                                 </div>
                             </div>
                         }
                         {
                             contactData?.state &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`province / state :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.state}
                                 </div>
                             </div>
                         }
                         {
                             contactData?.street &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`  street / allay :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.street}
                                 </div>
                             </div>
                         }
                         {
                             contactData?.building &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`building :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.building}
                                 </div>
                             </div>
                         }



                         {
                             contactData?.zip_code &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`zip code :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.zip_code}
                                 </div>
                             </div>
                         }

                     </div>
                 }

                 {
                     certificateData &&

                     <div  className='min-w-[36rem] bg-[#F8F8F8] aspect-[1.2] p-5 lg:p-8 rounded-[1rem] mr-4 snap-start overflow-auto'>
                         <div className='w-full text-left font-bold text-primary-dark-b capitalize'>
                             {myTexts.certificate.title}
                         </div>
                         <div className='w-full'>
                             {
                                 certificateData?.map((item : any , index : number)=>{
                                     return(
                                         <div key={index+1} className='w-full flex flex-col items-start justify-start border-b-[1px] border-dashed border-[#898989]'>
                                             {
                                                 item?.file
                                                     ? <Image alt={item?.title ? item?.title : 'aa'} src={`${process.env.MEDIA_URL}${item?.file}`} width={35} height={35} className={'rounded-full object-cover aspect-square mt-2'} />
                                                     :
                                                     <Image alt={item?.title ? item?.title : 'aa'} src={`/no-image.svg`} width={35} height={35} className={'rounded-full object-cover aspect-square mt-2'} />
                                             }
                                             {
                                                 item?.title &&
                                                 <div className='w-full flex flex-row items-center justify-start my-1'>
                                                     <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                         {`Title:`}
                                                     </div>

                                                     <div className='w-3/5 text-[1rem] truncate'>
                                                         { item?.title}
                                                     </div>
                                                 </div>
                                             }

                                             {
                                                 item?.grade &&
                                                 <div className='w-full flex flex-row items-center justify-start my-1'>
                                                     <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                         {`Grade:`}
                                                     </div>

                                                     <div className='w-3/5 text-[1rem] truncate'>
                                                         { item?.grade}
                                                     </div>
                                                 </div>
                                             }

                                             {
                                                 item?.type &&
                                                 <div className='w-full flex flex-row items-center justify-start my-1'>
                                                     <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                         {`Type:`}
                                                     </div>

                                                     <div className='w-3/5 text-[1rem] truncate'>
                                                         { item?.type}
                                                     </div>
                                                 </div>
                                             }

                                             {
                                                 item?.source &&
                                                 <div className='w-full flex flex-row items-center justify-start my-1'>
                                                     <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                         {`Source Link:`}
                                                     </div>

                                                     <div className='w-3/5 text-[1rem] truncate'>
                                                         { item?.source}
                                                     </div>
                                                 </div>
                                             }
                                         </div>
                                     )
                                 })
                             }
                         </div>
                     </div>
                 }

                 {
                     projectsData &&

                     <div  className='min-w-[36rem] bg-[#F8F8F8] aspect-[1.2] p-5 lg:p-8 rounded-[1rem] mr-4 snap-start '>
                         <div className='w-full text-left font-bold text-primary-dark-b capitalize'>
                             {myTexts.projects.title}
                         </div>
                     </div>
                 }

                 {
                     membershipData &&

                     <div  className='min-w-[36rem] bg-[#F8F8F8] aspect-[1.2] p-5 lg:p-8 rounded-[1rem] mr-4 snap-start '>
                         <div className='w-full text-left font-bold text-primary-dark-b capitalize'>
                             {myTexts.memberShip.title}
                         </div>
                     </div>
                 }

             </div>
     );
};

export default ProfileAll;