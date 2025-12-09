'use client'
import React from 'react';
import {texts} from "@/utils/texts";
import Image from "next/image";

const ProfileAll = ({data , children}:any) => {
    const {projectsData , membershipData , bInfoData ,contactData , certificateData} = data
    const text = texts.eng
    const myTexts = text.dashboard.pages.profile.all
    const certificateList = Array.isArray(certificateData) ? certificateData : certificateData ? [certificateData] : []
    const projectList = Array.isArray(projectsData) ? projectsData : projectsData ? [projectsData] : []
    const membershipList = Array.isArray(membershipData) ? membershipData : membershipData ? [membershipData] : []


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
                             ? <Image alt={'aaa'} src={`${bInfoData?.logo}`} width={35} height={35} className={'rounded-full object-cover aspect-square mt-2'} />
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
                            bInfoData?.first_name &&
                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                    {`Person Name :`}
                                </div>

                                <div className='w-3/5 text-[1rem] truncate'>
                                    { bInfoData?.first_name + ' ' + bInfoData?.last_name }
                                </div>
                            </div>
                        }

                        {
                            bInfoData?.latest_business_activity &&
                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                    {`Latest business activity :`}
                                </div>

                                <div className='w-3/5 text-[1rem] truncate'>
                                    { bInfoData?.latest_business_activity?.title}
                                </div>
                            </div>
                        }

                        {
                            bInfoData?.country &&
                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                    {`Country/city :`}
                                </div>

                                <div className='w-3/5 text-[1rem] truncate'>
                                    { bInfoData?.country + ', '+ bInfoData?.city }
                                </div>
                            </div>
                        }
                    </div>
                }


                 {
                     contactData?.[0] &&

                     <div  className='min-w-[36rem] bg-[#F8F8F8] aspect-[1.2] p-5 lg:p-8 rounded-[1rem] mr-4 snap-start '>
                         <div className='w-full text-left font-bold text-primary-dark-b capitalize'>
                             {myTexts.contact.title}
                         </div>
                         {
                             contactData?.[0]?.phone &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`Tell :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.[0]?.phone}
                                 </div>
                             </div>
                         }
                         {
                             contactData?.[0]?.fax &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`Fax :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.[0]?.fax}
                                 </div>
                             </div>
                         }

                         {
                             contactData?.[0]?.website &&
                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                 <div className='w-2/5 text-[0.9rem] text-[#898989] capitalize'>
                                     {`website :`}
                                 </div>

                                 <div className='w-3/5 text-[1rem] truncate'>
                                     { contactData?.[0]?.website}
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
                    certificateList.length > 0 &&

                    <div  className='min-w-[36rem] bg-[#F8F8F8] aspect-[1.2] p-5 lg:p-8 rounded-[1rem] mr-4 snap-start overflow-auto'>
                        <div className='w-full text-left font-bold text-primary-dark-b capitalize'>
                            {myTexts.certificate.title}
                        </div>
                        <div className='w-full'>
                            {
                                certificateList?.map((item : any , index : number)=>{
                                    return(
                                        <div key={index+1} className='w-full flex flex-col items-start justify-start border-b-[1px] border-dashed border-[#898989]'>
                                            {
                                                (item?.image || item?.file)
                                                    ? <Image alt={item?.title ? item?.title : 'aa'} src={`${process.env.MEDIA_URL}${item?.image || item?.file}`} width={35} height={35} className={'rounded-full object-cover aspect-square mt-2'} />
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
                                                item?.serial_number &&
                                                <div className='w-full flex flex-row items-center justify-start my-1'>
                                                    <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                        {`Serial Number:`}
                                                    </div>

                                                    <div className='w-3/5 text-[1rem] truncate'>
                                                        { item?.serial_number}
                                                    </div>
                                                </div>
                                            }

                                            {
                                                item?.publisher_organization &&
                                                <div className='w-full flex flex-row items-center justify-start my-1'>
                                                    <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                        {`Publisher:`}
                                                    </div>

                                                    <div className='w-3/5 text-[1rem] truncate'>
                                                        { item?.publisher_organization}
                                                    </div>
                                                </div>
                                            }

                                            {
                                                item?.source_link &&
                                                <div className='w-full flex flex-row items-center justify-start my-1'>
                                                    <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                        {`Source Link:`}
                                                    </div>

                                                    <div className='w-3/5 text-[1rem] truncate'>
                                                        { item?.source_link}
                                                    </div>
                                                </div>
                                            }
                                            {
                                                item?.date &&
                                                <div className='w-full flex flex-row items-center justify-start my-1'>
                                                    <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                        {`Date:`}
                                                    </div>

                                                    <div className='w-3/5 text-[1rem] truncate'>
                                                        { item?.date?.toString()?.split('T')[0]}
                                                    </div>
                                                </div>
                                            }
                                            {
                                                item?.description &&
                                                <div className='w-full flex flex-row items-center justify-start my-1'>
                                                    <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                        {`Description:`}
                                                    </div>

                                                    <div className='w-3/5 text-[1rem] truncate'>
                                                        { item?.description}
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
                    projectList.length > 0 &&

                     <div  className='min-w-[36rem] bg-[#F8F8F8] aspect-[1.2] p-5 lg:p-8 rounded-[1rem] mr-4 snap-start '>
                         <div className='w-full text-left font-bold text-primary-dark-b capitalize'>
                             {myTexts.projects.title}
                         </div>
                        {
                            projectList?.map((item : any , index : number)=>{
                                 return(
                                     <div key={index+1} className='w-full flex flex-col items-start justify-start border-b-[1px] border-dashed border-[#898989]'>
                                         {
                                             (item?.image || item?.file)
                                                 ? <Image alt={item?.title ? item?.title : 'aa'} src={`${process.env.MEDIA_URL}${item?.image || item?.file}`} width={35} height={35} className={'rounded-full object-cover aspect-square mt-2'} />
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
                                             item?.customer_name &&
                                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                                 <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                     {`Customer Name:`}
                                                 </div>

                                                 <div className='w-3/5 text-[1rem] truncate'>
                                                     { item?.customer_name}
                                                 </div>
                                             </div>
                                         }

                                         {
                                             item?.date &&
                                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                                 <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                     {`Date:`}
                                                 </div>

                                                 <div className='w-3/5 text-[1rem] truncate'>
                                                     { item?.date?.toString()?.split('T')[0]}
                                                 </div>
                                             </div>
                                         }

                                         {
                                             item?.serial_number &&
                                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                                 <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                     {`Serial Number:`}
                                                 </div>

                                                 <div className='w-3/5 text-[1rem] truncate'>
                                                     { item?.serial_number}
                                                 </div>
                                             </div>
                                         }

                                         {
                                             item?.source_link &&
                                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                                 <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                     {`Source Link:`}
                                                 </div>

                                                 <div className='w-3/5 text-[1rem] truncate'>
                                                     { item?.source_link}
                                                 </div>
                                             </div>
                                         }

                                         {
                                             item?.description &&
                                             <div className='w-full flex flex-row items-center justify-start my-1'>
                                                 <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                     {`Description:`}
                                                 </div>

                                                 <div className='w-3/5 text-[1rem] truncate'>
                                                     { item?.description}
                                                 </div>
                                             </div>
                                         }
                                     </div>
                                 )
                             })
                         }
                     </div>
                 }

                {
                    membershipList.length > 0 &&

                     <div  className='min-w-[36rem] bg-[#F8F8F8] aspect-[1.2] p-5 lg:p-8 rounded-[1rem] mr-4 snap-start '>
                         <div className='w-full text-left font-bold text-primary-dark-b capitalize'>
                             {myTexts.memberShip.title}
                         </div>

                        <div className='w-full'>
                            {
                                membershipList.map((item: any, index: number) => (
                                    <div key={index+1}   className='w-full flex flex-col items-start justify-start border-b-[1px] border-dashed border-[#898989]'>
                                        {
                                            (item?.image || item?.file)
                                                ? <Image alt={item?.title ? item?.title : 'aa'} src={`${process.env.MEDIA_URL}${item?.image || item?.file}`} width={35} height={35} className={'rounded-full object-cover aspect-square mt-2'} />
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
                                            item?.serial_number &&
                                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                    {`Serial Number:`}
                                                </div>

                                                <div className='w-3/5 text-[1rem] truncate'>
                                                    { item?.serial_number}
                                                </div>
                                            </div>
                                        }

                                        {
                                            item?.publisher_organization &&
                                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                    {`Publisher:`}
                                                </div>

                                                <div className='w-3/5 text-[1rem] truncate'>
                                                    { item?.publisher_organization}
                                                </div>
                                            </div>
                                        }

                                        {
                                            item?.source_link &&
                                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                    {`Source Link:`}
                                                </div>

                                                <div className='w-3/5 text-[1rem] truncate'>
                                                    { item?.source_link}
                                                </div>
                                            </div>
                                        }

                                        {
                                            item?.date &&
                                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                    {`Date:`}
                                                </div>

                                                <div className='w-3/5 text-[1rem] truncate'>
                                                    { item?.date?.toString()?.split('T')[0]}
                                                </div>
                                            </div>
                                        }

                                        {
                                            item?.description &&
                                            <div className='w-full flex flex-row items-center justify-start my-1'>
                                                <div className='w-2/5 text-[0.9rem] text-[#898989]'>
                                                    {`Description:`}
                                                </div>

                                                <div className='w-3/5 text-[1rem] truncate'>
                                                    { item?.description}
                                                </div>
                                            </div>
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                }

             </div>
     );
};
export default ProfileAll;
