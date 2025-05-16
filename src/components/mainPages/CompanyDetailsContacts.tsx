'use client'
import React from 'react';
import SsrIconBtn from "@/components/Buttons/SsrIconBtn";
import {useQuery} from "@tanstack/react-query";
import {getCompanyDetails} from "@/services/companyServices";
import Image from "next/image";

const CompanyDetailsContacts = ({slug} : any) => {
    const {data , isPending , error } = useQuery({
        queryKey: [`getCompanyDetails+${slug}` ],
        queryFn: () => getCompanyDetails(slug),
        retry:false,
    })

    const contacts = data?.data?.contact?.[0]

    const sendEmail = () => {
        window.location.href = `mailto:${data?.data?.email}`
    };
    const handleCall = () => {
        window.location.href = `tel:${data?.data?.mobile}`
    };

    const handleCallTell = () => {
        window.location.href = `tel:${contacts?.tel}`
    };


    return (

        <div className={'w-full lg:w-1/2 flex flex-row items-center justify-end'}>
            {data?.data?.email?.length > 1 &&     <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'} onClick={sendEmail}>
                <Image src={'/icon-for-send-email.svg'} alt={'icon-for-send-email.svg'} width={40} height={40} />
            </SsrIconBtn>}


            {data?.data?.mobile?.length > 1 &&
                <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}  onClick={handleCall}>
                    <Image src={'/call-company.svg'} alt={'call-company.svg'} width={40} height={40} />
                </SsrIconBtn>
            }
            {contacts?.tel &&
                <SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}  onClick={handleCallTell}>
                    <Image src={'/call-company.svg'} alt={'call-company.svg'} width={40} height={40} />
                </SsrIconBtn>
            }


            {/*<SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>*/}
            {/*    <Image src={'/send-message-company.svg'} alt={'send-message-company.svg'} width={40} height={40} />*/}
            {/*</SsrIconBtn>*/}

            {/*<SsrIconBtn className={'bg-transparent shadow-none focus:shadow-none'}>*/}
            {/*    <Image src={'/bookmark-not-fill.svg'} alt={'bookmark-not-fill.svg'} width={40} height={40} />*/}
            {/*</SsrIconBtn>*/}

        </div>


    );
};

export default CompanyDetailsContacts;