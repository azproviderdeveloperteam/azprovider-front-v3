'use client'
import React, {useEffect, useState} from 'react';
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/services/userProfileServices";
import {useAuth} from "../../contexts/AuthContext";
import Cookies from "js-cookie";
import {useRouter} from "next/navigation";

const HeaderCheckUserLogin = ({text , black} : any) => {

    const {user} = useAuth()

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

     return (
        isLoading ? null :
        data?.data?.az_account_type === 'user' && view ?
            <Link href={'/dashboard'}>
                <LightBtn border={true} otherClass={'mr-3'} black={black? black : false}>
                     Dashboard
                </LightBtn>
            </Link>
            :
            <>
                <Link href={'/register'}>
                    <LightBtn border={false} otherClass={'mr-3'} black={black? black : false}>
                        {text.register}
                    </LightBtn>
                </Link>
                <Link href={'/login'}>
                    <LightBtn border={true} otherClass={'mr-6'} black={black? black : false}>
                        {text.login}
                    </LightBtn>
                </Link>
            </>

    );
};

export default HeaderCheckUserLogin;