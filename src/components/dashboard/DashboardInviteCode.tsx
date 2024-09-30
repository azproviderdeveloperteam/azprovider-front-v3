'use client'
import React, {useState} from 'react';
import {texts} from "@/utils/texts";
import toast from "react-hot-toast";
import { useQRCode } from 'next-qrcode';
import {useAuth} from "../../contexts/AuthContext";
import {useQueryClient} from "@tanstack/react-query";

const DashboardInviteCode = () => {

    const text = texts.eng
    const myTexts = text.dashboard.pages.dashboard.widgets

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Text copied!")
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    const { Canvas } = useQRCode();

    const queryClient = useQueryClient()

    const profile : any = queryClient.getQueryData(['get-user-profile-header'])

    const code = profile?.data?.ref_code || ''
    const link = 'https://azprovider.com/register?code='+code
    return (
        <div className='w-full bg-primary-gray-100 p-5 rounded-[1.5rem]'>
            <div className='w-full flex flex-row items-center justify-between '>
                <h3 className='text-[#151515] font-bold text-[1.2rem]'>
                    {'Referral'} <span className='ml-1 text-[#7A7A7A] font-normal text-[1rem'>{'Invite your friends '}</span>
                </h3>

            </div>

            <div className='w-full flex flex-col items-center justify-center '>
                     <div className='w-full   rounded-[0.8rem] flex flex-row items-center justify-center px-4 py-1 text-[#6C6C6C]  cursor-pointer' onClick={()=>copyText(link)}>
                        <Canvas
                            text={link}
                            options={{
                                errorCorrectionLevel: 'M',
                                margin: 3,
                                scale: 4,
                                width: '100%',
                                color: {
                                    dark: '#010599FF',
                                    light: '#ffffff',
                                },
                            }}
                        />
                    </div>

                    Invitation Code
                    <div className='w-full border-[3px] border-primary-gray-400   rounded-[0.8rem] flex flex-row items-center justify-between px-4 py-1 text-[#6C6C6C] cursor-pointer' onClick={()=>copyText(code)}>
                        {code}
                    </div>

                    Share Link
                    <div className='w-full border-[3px] border-primary-gray-400  rounded-[0.8rem] flex flex-row items-center justify-between px-4 py-1 text-[#6C6C6C]  cursor-pointer' onClick={()=>copyText(link)}>
                        {link}
                    </div>

            </div>

        </div>
    );
};

export default DashboardInviteCode;