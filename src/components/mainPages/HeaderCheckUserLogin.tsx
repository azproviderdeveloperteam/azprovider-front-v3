'use client'
import React, {useEffect, useState} from 'react';
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/services/userProfileServices";
import {useAuth, useAuthActions} from "../../contexts/AuthContext";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";
import Image from "next/image";

const HeaderCheckUserLogin = ({text , black} : any) => {

    const {user} = useAuth()
    const dispatch = useAuthActions()
    const [view , setView] = useState(true)

    const router = useRouter()
    const {data , isLoading , error} = useQuery({
        queryKey:['get-user-profile-header' , user?.token],
        queryFn:getProfile,
        retry:false ,
        refetchOnWindowFocus: true
    })

    const cookieToken = Cookies.get('cookieToken')

    useEffect(()=>{
        if(cookieToken){
            if(cookieToken?.toString()?.length){
                if(cookieToken?.toString()?.length > 10){
                    setView(true)
                } else setView(false)
            } else setView(false)

        } else setView(false)
    },[data , user , router])

    useEffect(()=>{
        if(data?.data?.email){
            dispatch({type:"SIGNIN" ,value : data?.data})
        }
    },[data])
     return (
        isLoading ? null :
        data?.data?.id  && view ?
            <>
                <Link href={'/dashboard'} className='hidden lg:block'>
                    <LightBtn border={true} otherClass={'mr-3'} black={black? black : false}>
                        Dashboard
                    </LightBtn>
                </Link>
                <Link href={'/dashboard'} className=' lg:hidden'>
                    <Image src={'/profile.svg'} alt={'/profile.svg'} style={{filter:"invert(100%) sepia(65%) saturate(217%) hue-rotate(300deg) brightness(96%) contrast(99%)"}} width={35} height={35} />
                </Link>

            </>
            :
            <>
                <Link href={'/register'}  className='hidden lg:block'>
                    <LightBtn border={false} otherClass={'mr-3'} black={black? black : false}>
                        {text.register}
                    </LightBtn>
                </Link>
                <Link href={'/login'}  className='hidden lg:block'>
                    <LightBtn border={true} otherClass={'mr-6'} black={black? black : false}>
                        {text.login}
                    </LightBtn>
                </Link>


                <Link href={'/login'} className=' lg:hidden'>
                    <Image src={'/profile.svg'} alt={'/profile.svg'} style={{filter:"invert(100%) sepia(65%) saturate(217%) hue-rotate(300deg) brightness(96%) contrast(99%)"}} width={35} height={35} />
                </Link>
            </>

    );
};

export default HeaderCheckUserLogin;