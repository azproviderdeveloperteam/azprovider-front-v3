"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getCompanyDetails } from "@/services/companyServices";
import Image from "next/image";
import noImage from "@/public/no-image.svg";
import SsrIconBtn from "@/components/Buttons/SsrIconBtn";
import ProductCard from "@/components/Cards/ProductCard";
import AvatarSsr from "@/components/Cards/AvatarSsr";
import Link from "next/link";
import CompanyDetailsContacts from "@/components/mainPages/CompanyDetailsContacts";
import CompanyDetailsAddresses from "@/components/mainPages/CompanyDetailsAddresses";
import CompanyDatailsSocials from "@/components/mainPages/CompanyDatailsSocials";
import FullPageLoading from "@/components/loaders/FullPageLoading";
import {useAuth} from "../../../../contexts/AuthContext";
import { useSearchParams } from "next/navigation";
import {EditGreenIcon, EditInformationBtnIcon} from "@/components/icons";
import {Button} from "@material-tailwind/react";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import EmployeesList from "@/components/companyDetails/EmployeesList";
import CompanyDetailsRightSide from "@/components/companyDetails/companyDetailsRightSide";

const CompanyDetailPage = ({ params }: { params: { slug: string } }) => {

    const monthNamesFull = [ "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December" ];

    const monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    const searchParams = useSearchParams();
    const {user} = useAuth()

    const isEditMode = searchParams.get("edit") === "true";
    const checkUser = user?.userData?.user === params.slug
    const viewEditMode = isEditMode && checkUser

    const { data : d, isLoading, error } = useQuery({
        queryKey: ["companyDetails", params.slug],
        queryFn: () => getCompanyDetails(params.slug), // فرستادن توکن
    });

    const data = d?.data


    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `Azprovider`,
                    text: data?.first_name ? data?.first_name + ' ' + data?.last_name : ' ',
                    url: window.location.href,
                });
            } catch (error) {
                console.error( error);
            }
        } else {

        }
    };


    if(isLoading) return <FullPageLoading/>


    return (
        <div className='w-full py-28 px-5'>
            <div className='max-w-[95rem]   m-auto w-full  px-[5%] lg:px-0'>
                <Image src={data?.logo ? `${data?.logo}` : noImage?.src} alt={data?.business_information?.name}
                       height={200} width={500} className={'w-full h-[17rem] object-cover rounded-[1.3rem]'}/>
                <div className='relative w-[7rem] h-[7rem] translate-y-[-4.5rem]'>
                    <AvatarSsr src={data?.logo ? `${data?.logo}` : noImage?.src} alt={data?.business_information?.name}
                               className={'w-[7rem] h-[7rem] object-cover rounded-[1.3rem] translate-x-[4rem]   shadow-[0px_4px_8px_0px_rgba(0,_0,_0,_0.24)]'}/>
                    {
                        viewEditMode &&
                        <div
                            className='absolute bg-[#F3F3F3] border-4 border-white w-8 h-8 bottom-[-5%] left-[130%] rounded-full cursor-pointer'>
                            <EditGreenIcon/>
                        </div>
                    }

                </div>
                <div className='w-full grid grid-cols-12 gap-4 mt-[-2rem]'>
                    <div className='col-span-12 lg:col-span-3'>
                        {
                            viewEditMode &&
                            <div className='w-full flex flex-row items-center justify-center'>
                                <Button variant="outlined"
                                        className={'border-2 border-primary-green-tb rounded-2xl text-primary-green-tb normal-case flex items-center gap-3'}>
                                    <EditInformationBtnIcon/> Edit Business info
                                </Button>
                            </div>
                        }

                        <div className='w-full flex flex-col items-center justify-center mt-8'>
                            <h1 className='text-[1.4rem] font-bold text-primary-dark-b'>
                                {data?.first_name ? data?.first_name + ' ' + data?.last_name : 'No Name Yet'}
                                <span className='ml-1'>
                                            <SsrIconBtn onClick={handleShare}>
                                                <Image src={'/go-to-page-icon.svg'} alt={'go-to-page-icon.svg'}
                                                       width={30}
                                                       height={30}/>
                                            </SsrIconBtn>
                                        </span>
                            </h1>
                            <div className='flex flex-row items-start justify-start gap-2'>
                                <div
                                    className='bg-[#A1A1A1] px-1 text-[0.7rem] text-white rounded-[0.3rem] flex flex-row items-center justify-start'>
                                    <Image src={'/star-light.svg'} alt={'star-light'} width={21} height={21}/>
                                    <div className='ml-1 text-[0.87rem] '>
                                        {data?.rate ? data?.rate : ' - '}

                                    </div>
                                </div>
                                <h2 className='text-[#A1A1A1] ml-2'>
                                    {data?.business_information?.international_name ? data?.business_information?.international_name : ' '}
                                </h2>
                            </div>
                            <p className='mt-2 text-justify'>
                                {/*{data?.short_description + 'Lorem ipsum dolor sit amet consectetur. Non non lorem tellus feugiat dui gravida fermentum facilisi feugiat. Diam dignissim lectus lacinia aliquam sollicitudin sagittis auctor tellus. Dui amet arcu adipiscing rhoncus. Adipiscing augue tempus pellentesque venenatis tempus laoreet. Egestas mauris eget enim id sed interdum. Eget tortor quam viverra adipiscing hac. Velit nunc nunc suspendisse nunc vestibulum vitae. Ullamcorper nibh metus elit non vel dictum volutpat venenatis ipsum. Aliquam leo penatibus interdum magna erat nec. Non augue urna phasellus lectus pellentesque. Vitae amet nibh ultrices sed lectus pretium nulla eleifend.'}*/}
                            </p>

                            <CompanyDetailsContacts slug={params?.slug}/>
                            <div className={`flex flex-row items-center justify-start text-primary-dark-b  `}>

                                <CompanyDatailsSocials slug={params?.slug}/>


                                <div className='font-thin text-[#8E8E8E] text-[0.7rem] ml-1'>
                                    {
                                        data?.created_at ?
                                            `Created Profile ${new Date(data?.created_at)?.getUTCDate()} ${monthNames[new Date(data?.created_at)?.getUTCMonth()]} ${new Date(data?.created_at)?.getUTCFullYear()} `
                                            :
                                            ' - '
                                    }
                                </div>
                            </div>
                            <Image src={'/gray-location.svg'} alt={`location of ${data?.business_information?.name}`}
                                   width={20}
                                   height={20}/>

                            <CompanyDetailsAddresses slug={params?.slug}/>
                            <EmployeesList employees={data?.employees} />
                        </div>
                    </div>
                    <div className='col-span-12 lg:col-span-9'>
                        <CompanyDetailsRightSide data={data}/>
                    </div>
                </div>


            </div>
        </div>
    );
};

export default CompanyDetailPage;

