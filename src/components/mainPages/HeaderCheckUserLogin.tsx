'use client'
import React from 'react';
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";
import {useQuery} from "@tanstack/react-query";
import {getProfile} from "@/services/userProfileServices";

const HeaderCheckUserLogin = ({text , black} : any) => {
    const {data , isLoading , error} = useQuery({
        queryKey:['get-user-profile-header'],
        queryFn:getProfile,
        retry:false ,
        refetchOnWindowFocus: true
    })
     return (
        isLoading ? null :
        data?.data?.az_account_type === 'user' ?
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