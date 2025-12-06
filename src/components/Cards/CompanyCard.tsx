'use client'
import React, {useState} from 'react';
import {Avatar, IconButton} from "@material-tailwind/react";
import noImage from '../../../public/no-image.svg'
import Image from "next/image";
import Link from "next/link";
import CompanyDetailsContacts from "@/components/mainPages/CompanyDetailsContacts";
import {useAuth} from "../../contexts/AuthContext";
import {EditCompanyCardIcon, ViewCompanyCardIcon} from "@/components/icons";
import {useRouter} from "next-nprogress-bar";
import SsrIconBtn from "@/components/Buttons/SsrIconBtn";
import toast from "react-hot-toast";
import SendRequestProductPage from "@/components/dialog/SendRequestProductPage";
import RequestCompanyForm from "@/components/dialog/RequestCompanyForm";
const CompanyCard = ({item , topItem = false} : any) => {

    const router = useRouter()

    //
    const {user} = useAuth()

    const login = user?.login


    const getRandomBgColor = () => {
        const bgClasses = [
            'bg-primary-green-lg100',
            'bg-primary-green-lg400',
            'bg-primary-green-sg900',
            'bg-primary-green-wgd',
            'bg-primary-green-mg',
            'bg-primary-green-cb',
            'bg-primary-green-shg',
            'bg-primary-green-tb',
            'bg-primary-purple-300',
            'bg-primary-purple-600',
            'bg-primary-purple-800',
            'bg-primary-gray-400',
            'bg-primary-dark-g',
            'bg-primary-dark-b',
            'bg-primary-dark-p',
            'bg-secondary-red',
            'bg-secondary-yellow',
            'bg-secondary-peach',
        ];
        const randomIndex = Math.floor(Math.random() * bgClasses.length);
        return bgClasses[randomIndex];
    };

    return (
        <div  className={`w-full bg-[#F8F8F8] min-h-[5.3rem] py-3 rounded-[1.2rem] shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.10)] flex flex-col md:flex-row items-center justify-between px-4 ${topItem ? 'border-l-4 border-l-primary-green-wgd mb-12' :''}`}>
            <Link href={`/companies/${item?.user}${topItem ? '?edit=true' :""}`} className='w-full md:w-3/12  px-2 flex flex-row items-center justify-start cursor-pointer'>
                {
                    item?.logo ?
                    <Avatar src={item?.logo ? `${item?.logo}` : noImage.src} />
                        :
                        <div className={`w-[3rem] h-[3rem] rounded-full ${getRandomBgColor()} flex flex-row items-center justify-center text-[1.1rem] text-[#ffffff]`}>                            {item?.international_name ? item?.international_name?.[0] : item?.first_name?.[0] +item?.last_name?.[0] || ''}
                        </div>
                }
                <div className={'flex flex-col items-start justify-center h-full ml-2'}>
                    <h2 className='text-[1.1rem] font-bold'>
                        {item?.international_name ? item?.international_name :  ""}

                    </h2>
                    <div className='flex flex-row items-center justify-start'>
                        <div className='bg-[#A1A1A1] px-1 text-[0.7rem] text-white rounded-[0.3rem] flex flex-row items-center justify-start'>
                            <Image src={'/star-light.svg'} alt={'star-light'} width={21} height={21} />
                            <div className='ml-1 text-[0.87rem] '>
                                { item?.rate  ? item?.rate : ' - '}

                            </div>
                        </div>
                        <h3 className='text-[#A1A1A1] text-[0.9rem] ml-2'>
                            {item?.first_name +' '+item?.last_name}

                        </h3>
                    </div>
                </div>
            </Link>
            <div className='w-full md:w-3/12 px-2'>
                {
                    item?.business_role?.map((x : any)=>x?.title+', ')
                }
            </div>
            {/*<div className='w-full md:w-2/12  px-2 text-[0.9rem]'>*/}
            {/*   <div> {`Profile Created ${new Date(item?.created_at)?.getUTCDate()} ${monthNames[new Date(item?.created_at)?.getUTCMonth()] } ${new Date(item?.created_at)?.getUTCFullYear()}`}</div>*/}
            {/*    <div className='mt-1'> {`Last Update ${new Date(item?.updated_at)?.getUTCDate()} ${monthNames[new Date(item?.updated_at)?.getUTCMonth()] } ${new Date(item?.updated_at)?.getUTCFullYear()}`}</div>*/}

            {/*</div>*/}
            <div className='w-full md:w-2/12  px-2'>
                <div>
                    {`${item?.country ? item?.country+',' : ''}  ${item?.city ? item?.city : ''}`}
                </div>
                <div className={'truncate'}>
                    {`${item?.latest_business_activity?.title ? item?.latest_business_activity?.title  : ''}`}
                </div>
            </div>
            <div className='w-full md:w-2/12  px-2 flex flex-row items-center justify-end'>
                {/*{*/}
                {/*    user?.login ?*/}
                {/*        onMouseIn ?*/}
                {/*            <CompanyDetailsContacts slug={item?.user}/>*/}
                {/*            :<>*/}
                {/*                <IconButton className={'bg-transparent shadow-none focus:shadow-none'}>*/}
                {/*                    <Image src={'/call-company.svg'} alt={'call-company.svg'} width={21} height={21} />*/}
                {/*                </IconButton>*/}


                {/*                <IconButton className={'bg-transparent shadow-none focus:shadow-none'}>*/}
                {/*                    <Image src={'/send-message-company.svg'} alt={'send-message-company.svg'} width={21} height={21} />*/}

                {/*                </IconButton>*/}
                {/*            </>*/}
                {/*        :*/}
                {/*        null*/}

                {/*}*/}
                {/*{*/}
                {/*    topItem ?*/}
                {/*        <>*/}
                {/*            <IconButton onClick={()=>router.push(`/companies/${item?.user}${topItem ? '?edit=true' :""}`)}   className={'bg-transparent shadow-none focus:shadow-none'}>*/}
                {/*                <EditCompanyCardIcon />*/}
                {/*            </IconButton>*/}
                {/*            <IconButton onClick={()=>router.push(`/companies/${item?.user}`)} className={'bg-transparent shadow-none focus:shadow-none'}>*/}
                {/*                <ViewCompanyCardIcon/>*/}
                {/*            </IconButton>*/}

                {/*        </>*/}

                {/*        :*/}

                {/*            <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'} onClick={()=>{*/}
                {/*                if(login){*/}

                {/*                }else {*/}
                {/*                    toast.error('You Must Be Login First')*/}
                {/*                }*/}

                {/*            }}>*/}
                {/*                <Image src={'/icon-for-send-email.svg'} alt={'icon-for-send-email.svg'} width={40} height={40} />*/}
                {/*            </SsrIconBtn>*/}
                {/*            // <CompanyDetailsContacts slug={item?.user}/>*/}

                {/*}*/}

                <RequestCompanyForm btnTitle={'Contact Request'} companyId={item?.id}/>


                {/*{*/}
                {/*    // item?.mobile &&*/}
                {/*    <IconButton className={'bg-transparent shadow-none focus:shadow-none'}>*/}
                {/*        <Image src={'/call-company.svg'} alt={'call-company.svg'} width={21} height={21} />*/}
                {/*    </IconButton>*/}
                {/*}*/}

                {/*<IconButton className={'bg-transparent shadow-none focus:shadow-none'}>*/}
                {/*    <Image src={'/send-message-company.svg'} alt={'send-message-company.svg'} width={21} height={21} />*/}

                {/*</IconButton>*/}
                {/*<IconButton className={'bg-transparent shadow-none focus:shadow-none'}>*/}
                {/*    <Image src={'/bookmark-not-fill.svg'} alt={'bookmark-not-fill.svg'} width={21} height={21} />*/}

                {/*</IconButton>*/}


            </div>
        </div>
    );
};

export default CompanyCard;