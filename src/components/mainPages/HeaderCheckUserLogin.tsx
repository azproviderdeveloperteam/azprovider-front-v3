'use client'
import React from 'react';
import {useGetUser} from "@/hooks/useAuth";
import LightBtn from "@/components/Buttons/LightBtn";
import Link from "next/link";

const HeaderCheckUserLogin = ({text , black} : any) => {
    const {data , isLoading , error} = useGetUser()

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