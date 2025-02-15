'use client'
import React from 'react';
import Image from "next/image";
import {Avatar} from "@material-tailwind/react";
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next-nprogress-bar";
import {useAuth} from "../../../contexts/AuthContext";

const UserCard = () => {


    const router = useRouter()
    const {user} = useAuth()

    const percentage = 100;

    return (
        user ? user?.userData ?
        <div className='w-full bg-primary-gray-100 p-5 rounded-[1.5rem] relative cursor-pointer' onClick={()=>router.push('/dashboard/profile?tab=bInfo')} style={{boxShadow:'0px 12px 20px 0px rgba(0, 0, 0, 0.08)'}}>
            <Image src={'/yellow-diamond.svg'} alt={'yellow-diamond'} width={40} height={40} className={'absolute left-[0.1rem] top-[0.2rem] z-10'}/>
            <div className='w-full flex flex-row items-center justify-start'>
                <div className=''>
                    <div className='w-[4.3rem] absolute translate-y-[-5px] translate-x-[-5px]'>
                        <CircularProgressbar value={percentage} text={`${percentage}%`}
                                             styles={buildStyles({
                                                 // Rotation of path and trail, in number of turns (0-1)


                                                 // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                                                 strokeLinecap: 'butt',

                                                 // Text size
                                                 textSize: '16px',

                                                 // How long animation takes to go from one percentage to another, in seconds
                                                 pathTransitionDuration: 0.5,

                                                 // Can specify path transition in more detail, or remove it entirely
                                                 // pathTransition: 'none',

                                                 // Colors
                                                 pathColor: `rgba(69, 171, 6, 1), ${percentage / 100})`,
                                                 textColor: '#45AB06',
                                                 trailColor: '#F8F8F8',
                                                 backgroundColor: '#45AB06',
                                             })}
                        />

                    </div>

                    <Avatar className={'aspect-square'} src={user?.userData?.logo ? `${user?.userData?.logo}` :`/no-image.svg` } alt="avatar" size="lg"/>

                    <div className='text-[#45AB06] font-thin mt-2 text-center w-full text-[0.6rem]'>
                        {/*73% Completed*/}
                    </div>
                </div>

                <div className='ml-5'>
                    <div className='text-[1rem] font-bold'>
                        {`${user?.userData?.first_name ? user?.userData?.first_name :""} ${user?.userData?.last_name ? user?.userData?.last_name :""}`}
                    </div>

                    {/*<div className='text-[1.2rem] text-[#5F5F5F] font-bold mt-[-0.4rem]'>*/}
                    {/*    /!*Front-end developer*!/*/}
                    {/*</div>*/}
                    {/*<div className='text-[1rem] text-[#7A7A7A]'>*/}
                    {/*    /!*Gold Account*!/*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
            : null
            : null
    );
};

export default UserCard;