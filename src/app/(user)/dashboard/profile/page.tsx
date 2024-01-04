'use client'
import React, {useState} from 'react';
import {Tab, Tabs, TabsHeader} from "@material-tailwind/react";
import ProfileAll from "@/components/dashboard/profile/ProfileAll";
import ProfileBInfo from "@/components/dashboard/profile/ProfileBInfo";
import ProfileContact from "@/components/dashboard/profile/ProfileContact";
import ProfileCertificates from "@/components/dashboard/profile/ProfileCertificates";
import ProfileProjects from "@/components/dashboard/profile/ProfileProjects";
import ProfileMembership from "@/components/dashboard/profile/ProfileMembership";
import {useQuery} from "@tanstack/react-query";
import {getBInfo, getCertificate, getContact, getMembership, getProjects} from "@/services/profileServices";

const ProfilePage = () => {
    const [activeTab, setActiveTab] = useState<any>('All');
    const data = [
        {
            label: "All",
            value: "All",
            desc: ``,
            icon : null
        },
        {
            label: "Business Information",
            value: "Business Information",
            desc: ``,
            icon : null
        },
        {
            label: "Contact",
            value: "Contact",
            desc: ``,
            icon : null
        },
        {
            label: "certificates",
            value: "certificates",
            desc: ``,
            icon : null
        },
        {
            label: "projects",
            value: "projects",
            desc: ``,
            icon : null
        },
        {
            label: "membership",
            value: "membership",
            desc: ``,
            icon : null
        },

    ];

    const {data : bInfoData, isPending :bInfoPending, error : bInfoError} = useQuery({
        queryKey: ['get-b-info',activeTab === 'All'],
        queryFn: getBInfo,
        retry:false,
    })

    const {data : contactData, isPending :contactPending, error : contactError} = useQuery({
        queryKey: ['get-contact',activeTab === 'All'],
        queryFn: getContact,
        retry:false,
    })

    const {data : certificateData, isPending :certificatePending, error : certificateError} = useQuery({
        queryKey: ['get-certificate',activeTab === 'All'],
        queryFn: getCertificate,
        retry:false,
    })

    const {data : projectsData, isPending :projectsPending, error : projectsError} = useQuery({
        queryKey: ['get-projects',activeTab === 'All'],
        queryFn: getProjects,
        retry:false,
    })
    const {data : membershipData, isPending :membershipPending, error : membershipError} = useQuery({
        queryKey: ['get-membership' ,activeTab === 'All'],
        queryFn: getMembership,
        retry:false,
    })

    return (
        <div className='w-full'>
            <div className='w-full h-[63px] '>
                <Tabs id={'account-tabs'} value={activeTab}>
                    <TabsHeader
                        defaultValue={'Account'}
                        className="text-primary-green-tb rounded-none border-b p-0 font-roboto bg-transparent  h-[63px] overflow-x-auto"
                        indicatorProps={{
                            className:
                                "text-white bg-transparent border-b-4 border-primary-dark-b shadow-none rounded-none font-Poppins",
                        }}
                    >
                        {data?.map(({ label, value,icon }) => (
                            <Tab key={value} value={value}
                                 onClick={() => {
                                     setActiveTab(value)
                                 }}
                                 className={`${activeTab === value ? " text-primary-dark-b font-bold py-2 font-roboto " : "font-bold text-primary-green-tb py-2 font-roboto bg-transparent "} capitalize text-[1.2rem] shrink-0 md:w-[15rem] w-[40vw]`}
                            >
                                <div className='w-full flex flex-row items-center justify-center'>
                                    <div className='flex flex-row items-center justify-center p-1'
                                         style={{filter:activeTab === value ? "invert(40%) sepia(52%) saturate(2334%) hue-rotate(199deg) brightness(98%) contrast(87%)":""}}
                                    >
                                        {icon}
                                    </div>
                                    {label}
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader>
                </Tabs>
            </div>

            <div className='w-full h-auto'>
                {
                    activeTab === 'All' ?
                        <ProfileAll data={{projectsData , membershipData , bInfoData ,contactData , certificateData}} />
                        : activeTab === 'Business Information' ?
                         <ProfileBInfo bInfoData={bInfoData?.data}/>
                            : activeTab === 'Contact' ?
                                <ProfileContact contactData={contactData?.data}/>
                                : activeTab === 'certificates' ?
                                    <ProfileCertificates  certificateData={certificateData?.data}/>
                                    : activeTab === 'projects' ?
                                        <ProfileProjects  projectsData={projectsData?.data}/>
                                        : activeTab === 'membership' ?
                                            <ProfileMembership  membershipData={membershipData?.data}/> : null
                }
            </div>
        </div>
    );
};

export default ProfilePage;