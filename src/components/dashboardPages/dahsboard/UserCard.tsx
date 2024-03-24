'use client'
import React from 'react';
import Image from "next/image";
import {Avatar} from "@material-tailwind/react";
import { CircularProgressbar , buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import {useQueryClient} from "@tanstack/react-query";

const UserCard = () => {


    const queryClient = useQueryClient()

    const profile = queryClient.getQueryData(['get-user-profile-header'])

    const percentage = 100;

    console.log(profile)


    return (
        <div className='w-full bg-primary-gray-100 p-5 rounded-[1.5rem] relative' style={{boxShadow:'0px 12px 20px 0px rgba(0, 0, 0, 0.08)'}}>
            <Image src={'/yellow-diamond.svg'} alt={'yellow-diamond'} width={50} height={50} className={'absolute left-0 top-[-17px] !z-[9999]'}/>
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

                    <Avatar className={'aspect-square'} src="https://docs.material-tailwind.com/img/face-2.jpg" alt="avatar" size="lg"/>

                    <div className='text-[#45AB06] font-thin mt-2 text-center w-full text-[0.6rem]'>
                        {/*73% Completed*/}
                    </div>
                </div>

                <div className='ml-5'>
                    <div className='text-[1rem] font-bold'>
                        {`${profile?.data?.first_name ? profile?.data?.first_name :""} ${profile?.data?.last_name ? profile?.data?.last_name :""}`}
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
    );
};

export default UserCard;