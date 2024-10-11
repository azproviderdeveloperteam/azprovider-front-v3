'use client'
import React from 'react';
import SsrIconBtn from "@/components/Buttons/SsrIconBtn";
import {useQuery} from "@tanstack/react-query";
import {getCompanyDetails} from "@/services/companyServices";
import Image from "next/image";

const CompanyDatailsSocials = ({slug} : any) => {
    const { data, isLoading, error } = useQuery({
        queryKey: [`getCompanyDetails+${slug}`],
        queryFn: () => getCompanyDetails(slug),
        retry: false,
        enabled: false, // This prevents re-fetching
    });

    return (
        <>
            <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>
                <Image src={'/dark-insta.svg'} alt={'dark-insta.svg'} width={40} height={40} />
            </SsrIconBtn>


            <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>
                <Image src={'/dark-whatsapp.svg'} alt={'dark-whatsapp.svg'} width={40} height={40} />
            </SsrIconBtn>

            <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>
                <Image src={'/dark-telegram.svg'} alt={'dark-telegram.svg'} width={40} height={40} />
            </SsrIconBtn>
        </>
    );
};

export default CompanyDatailsSocials;