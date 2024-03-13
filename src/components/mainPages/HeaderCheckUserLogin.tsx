'use client'
import React from 'react';
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/services/userProfileServices";
import {useAuth} from "../../contexts/AuthContext";
import Cookies from "js-cookie";

const HeaderCheckUserLogin = ({text , black} : any) => {

    const {user} = useAuth()


    const {data , isLoading , error} = useQuery({
        queryKey:['get-user-profile-header' , user?.token],
        queryFn:getProfile,
        retry:false ,
        refetchOnWindowFocus: true
    })

    const cookieToken = Cookies.get('cookieToken') ? Cookies.get('cookieToken')?.length > 10 ? true : false : false


     return (
        isLoading ? null :
        data?.data?.az_account_type === 'user' && cookieToken?
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