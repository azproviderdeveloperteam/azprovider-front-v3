import React, { useState, useRef } from 'react';
import { Tab, Tabs, TabsHeader } from "@material-tailwind/react";
import { CertificateIcon, MembershipIcon, PreInvoiceIcon, ProductIcon, ServiceIcon } from "@/components/icons";
import CompanyDetailsCertificates from "@/components/companyDetails/CompanyDetailsCertificates";
import CompanyDetailsMembership from "@/components/companyDetails/CompanyDetailsMembership";
import CompanyDetailsProducts from "@/components/companyDetails/CompanyDetailsProducts";
import CompanyDetailsServices from "@/components/companyDetails/CompanyDetailsServices";

const CompanyDetailsRightSide = ({ data }: any) => {
    const [activeTab, setActiveTab] = useState<any>('Products');

    // تعریف ref برای هر بخش
    const productsRef = useRef<HTMLDivElement>(null);
    const servicesRef = useRef<HTMLDivElement>(null);
    const certificatesRef = useRef<HTMLDivElement>(null);
    const membershipRef = useRef<HTMLDivElement>(null);
    const preRef = useRef<HTMLDivElement>(null);

    const tabs = [
        {
            label: "Products",
            value: "Products",
            icon: <ProductIcon />,
            ref: productsRef
        },
        {
            label: "Services",
            value: "Services",
            icon: <ServiceIcon />,
            ref: servicesRef
        },
        {
            label: "Pre-Invoices",
            value: "Pre-Invoices",
            icon: <PreInvoiceIcon />,
            ref: preRef
        },
        {
            label: "Certificates",
            value: "Certificates",
            icon: <CertificateIcon />,
            ref: certificatesRef
        },
        {
            label: "Membership",
            value: "Membership",
            icon: <MembershipIcon />,
            ref: membershipRef
        }
    ];

    const handleTabClick = (value: string, ref: React.RefObject<HTMLDivElement>) => {
        setActiveTab(value);
        ref.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    };

    return (
        <div className='w-full'>
            <Tabs id={'account-tabs'} value={activeTab}>
                <TabsHeader
                    className="text-primary-green-tb rounded-none border-b p-0 font-roboto bg-transparent h-[63px] overflow-x-auto no-scrollbar"
                    indicatorProps={{
                        className: "text-white bg-transparent border-b-4 border-primary-dark-b shadow-none rounded-none font-Poppins",
                    }}
                >
                    {tabs.map(({ label, value, icon, ref }) => (
                        <Tab
                            key={value}
                            value={value}
                            onClick={() => handleTabClick(value, ref)}
                            className={`${activeTab === value ? "text-primary-dark-b font-bold py-2" : "text-primary-green-tb font-bold py-2"} capitalize text-[1.2rem] shrink-0 lg:w-[12rem] w-[15vw]`}
                        >
                            <div className='w-full flex flex-row items-center justify-center'>
                                <div className='flex flex-row items-center justify-center p-1 lg:hidden'>{icon}</div>
                                <span className={'hidden lg:block'}>
                                     {label}
                                </span>
                            </div>
                        </Tab>
                    ))}
                </TabsHeader>
            </Tabs>

            <div className={'w-full px-5'}>
                <div ref={productsRef}>
                    <CompanyDetailsProducts data={data} />
                </div>
                <div ref={servicesRef}>
                    <CompanyDetailsServices data={data} />
                </div>
                <div ref={certificatesRef}>
                    <CompanyDetailsCertificates certificates={data?.certificates} />
                </div>
                <div ref={membershipRef}>
                    <CompanyDetailsMembership data={data} />
                </div>
            </div>
        </div>
    );
};

export default CompanyDetailsRightSide;