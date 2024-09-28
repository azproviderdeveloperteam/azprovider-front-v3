'use client'
import React, {useContext, useEffect, useState} from 'react';
import LoginTextSlider from "@/components/authPages/loginAndRegister/LoginTextSlider";
import {COUNTRIES, texts} from "@/utils/texts";
import Image from "next/image";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import MainInput from "@/components/inputs/MainInput";
import Link from "next/link";
import {useMutation} from "@tanstack/react-query";
import { registerSendOtp} from "@/services/authServices";
import axios, {AxiosError} from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

import ThreeDotsLoader from "@/components/loaders/ThreeDotsLoader";
import {Button} from "@material-tailwind/react";
import {useAuth, useAuthActions} from "../../../contexts/AuthContext";
import {useRouter} from "next/navigation";
import { useCookies } from 'next-client-cookies';
import Select from "react-select";
import {app} from "@/services/instance";

const  RegisterFirstStep =   ({nextStep } : any) => {
    const text = texts.eng
    const myTexts = text.register
    const [loginWithEmail , setLoginWithEmail] = useState(true)
    const dispatch = useAuthActions()
    const [country, setCountry] = useState<any>({ label: "🇮🇷 IR +98", key: "IR", value: "+98", countryName: "Iran" }); // Default selected value

    const schema = Yup
        .object({

        }).shape({
            email:Yup.string().required('Email Or Phone is required'),
            invitationCode : Yup.string()
        })
        .required()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})

    const cookies = useCookies();

    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : registerSendOtp
    })


    function validatePhone(phone : string)
    {
        const re = /^(\+\d{3})?\d{9}$/;
        return re.test(phone.replace(/\s+/g, ''));
    }

    function validateEmail(email: string)
    {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }



    const submit = async (d : any) =>{


        const formData = validateEmail(d?.email) ?
            { email:d?.email}
        :
            {mobile:`${country.value}${d?.email}`}
       try{
           const da = await mutateAsync(formData)



           nextStep(validateEmail(d?.email) ? d?.email :`${country.value}${d?.email}`)
       }catch (err){
            console.log(err)
           if(err instanceof AxiosError){
               if(err?.response?.data?.msg){
                   toast.error(err?.response?.data?.msg)
               }else if(err?.response?.data?.message){
                   toast.error(err?.response?.data?.message)
               }else if(err?.response?.data?.error){
                   toast.error(err?.response?.data?.error)
               }else if(err?.response?.data?.detail) {
                   toast.error(err?.response?.data?.detail)
               }else if(err?.response?.data?.email?.detail) {
                   toast.error(err?.response?.data?.email?.detail)
               }else {
                   toast.error('An Error occurred')
               }
           }
       }
    }


    useEffect(()=>{

        // fetch('https://api.ipify.org?format=json').then(response => {
        //     return response.json();
        // }).then((res: any) => {
        //      console.log(res?.ip)
        // }).catch((err: any) => console.error('Problem fetching my IP', err))
    },[])
    return (
        <>


            <div className='hidden lg:block w-[45%] relative'>
                <Image src={'/pink-vector.svg'} alt={'pink-vector'} width={350} height={350} className={'!absolute top-[44%] left-[-35%] z-[0]'}/>
                <Image src={'/gray-vector.svg'} alt={'gray-vector'} width={250} height={250} className={'!absolute top-[-2%] left-[82%] z-[0]'}/>
                <Image src={'/purple-vector.svg'} alt={'purple-vector'} width={550} height={550} className={'!absolute top-[-155%] left-[0%] z-[10]'}/>
                <div className='w-full flex flex-col items-start justify-center'>
                    <h1 className='w-full text-left capitalize leading-none	 text-transparent bg-clip-text font-bold text-[3.5rem]' style={{backgroundImage:"linear-gradient(88deg, #AE88FF 7.72%, #FFA3F7 48.06%, #FFCB8E 91.92%)"}}>
                        {myTexts.sayWelcome}
                    </h1>
                </div>

                <div className='w-full '>
                    <LoginTextSlider />
                </div>
            </div>

            <div className='w-full px-5 lg:px-0 lg:w-1/2 text-white'>
                <div className='w-full flex flex-col items-center justify-center relative z-[1]'>
                    <div className='w-full p-6 rounded-[1.5rem] bg-[#02131E]'>

                        <div className={'w-full flex flex-row items-center justify-start'}>
                            <Image src={'/register-title.svg'} alt={'register-title'} width={35} height={35} />

                            <h1 className='font-bold text-[1.7rem] ml-2'>
                                {myTexts.title}
                            </h1>

                        </div>


                        <form className='w-full grid grid-cols-12 mt-2 gap-4' onSubmit={handleSubmit(submit)}>
                            <div className='col-span-12'>
                                Invitation Code(optional)
                                <div className='mt-3'>
                                    <MainInput
                                        register={register}
                                        label={'invitation code'}
                                        error={errors?.invitationCode?.message}
                                        name={'invitationCode'}
                                        type={'text'}
                                        placeholder={'invitation Code'}
                                    />
                                </div>
                            </div>

                            <h3 className={'col-span-12 mt-4 text-[1.2rem]'}>
                                {myTexts.emailOrPhone}
                            </h3>
                            <div className='col-span-4 h-full '>
                                <div className=' text-[1.3rem] capitalize'>

                                </div>
                                <Select
                                    className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}

                                    onChange={(e)=>{

                                        setCountry( e)
                                        // getToCurrenciesFunc(e?.value)
                                    }}
                                    value={country}
                                    options={COUNTRIES}
                                    unstyled
                                    styles={{
                                        input: (base) => ({
                                            ...base,
                                            base: " hover:cursor-pointer",
                                            fontSize:"9px",
                                            "input:focus": {
                                                boxShadow: "none",
                                            },
                                        }),
                                        multiValueLabel: (base) => ({
                                            ...base,
                                            whiteSpace: "normal",
                                            overflow: "visible",
                                        }),
                                        control: (base) => ({
                                            ...base,
                                            transition: "none",
                                        }),
                                    }}

                                    classNames={{
                                        control: ({isFocused}) =>' w-full xl:h-[46px] focus:outline-none  text-[16px] px-2 md:px-1  ',
                                        multiValueLabel: () => 'bg-primary-dark-b  rounded-xl shadow-md',
                                        option: ({ isFocused, isSelected }) =>'bg-primary-dark-b px-4 py-1',
                                    }}
                                />
                            </div>
                            <div className='col-span-8 h-full'>
                                <MainInput
                                    register={register}
                                    label={'Your Email'}
                                    error={errors?.email?.message}
                                    name={'email'}
                                    type={'mail'}
                                    placeholder={'example@email.com Or 9123456789'}

                                />
                            </div>

                            <div className='col-span-12'>
                                <RegisterBtn loading={isPending} type={'submit'} disabled={getValues()?.email?.length < 1} otherClass={'w-full'}>
                                    {myTexts.sendCode}
                                </RegisterBtn>
                            </div>
                        </form>
                        <div className='w-full mt-8 flex flex-row items-center justify-start'>
                            <div className=''>
                                {myTexts.subText}
                            </div>
                            <Link href={'/login'} className={'ml-1 text-[#00E0FF]'}>
                                {myTexts.login}
                            </Link>
                        </div>
                    </div>
                    <div className='w-full flex flex-row items-center justify-between flex-wrap mt-3 text-[0.8rem] text-[#ACACAC] px-1'>
                        <Link href={'/privacy-and-policy'}>
                            {myTexts.privacy}
                        </Link>

                        <Link href={'/terms-and-conditions'}>
                            {myTexts.terms}
                        </Link>

                        <div >
                            {myTexts.copyRight}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default RegisterFirstStep;