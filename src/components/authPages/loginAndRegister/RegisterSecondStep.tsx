'use client'
import React from 'react';
import LoginTextSlider from "@/components/authPages/loginAndRegister/LoginTextSlider";
import {texts} from "@/utils/texts";
import Image from "next/image";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import MainInput from "@/components/inputs/MainInput";
import Link from "next/link";
import {registerSendOtp, registerVerify} from "@/services/authServices";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useAuth} from "../../../contexts/AuthContext";
import {app} from "@/services/instance";
import Cookies from "js-cookie";
import ResecCodeSignUp from "@/components/authPages/ResecCodeSignUp";

const RegisterSecondStep = ({nextStep , email} : any) => {

    const text = texts.eng
    const myTexts = text.register

    const schema = Yup
        .object({

        }).shape({
            code:Yup.string().required('').min(6,'your verification code most be 6 digits').max(6 ,'your verification code most be 6 digits'),

        })
        .required()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})


    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : registerVerify
    })

    const {user}= useAuth()
     const token = user?.token
    const {data:vData  , isPending :vPending , error:vError  , mutateAsync :vMutateAsync} =useMutation({
        mutationFn : registerSendOtp
    })
    function validateEmail(email: string)
    {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }


    const convertPersianToEnglishNumbers = (input: string): string => {
        const persianNumbers = ['۰','۱','۲','۳','۴','۵','۶','۷','۸','۹'];
        const arabicNumbers = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];

        return input.replace(/[۰-۹٠-٩]/g, (char) => {
            const persianIndex = persianNumbers.indexOf(char);
            if (persianIndex > -1) return persianIndex.toString();

            const arabicIndex = arabicNumbers.indexOf(char);
            if (arabicIndex > -1) return arabicIndex.toString();

            return char;
        });
    };


    const submit = async (d : any) =>{

        const formData = validateEmail(email) ?
            { email:email , code:convertPersianToEnglishNumbers(d?.code)}
            :
            {mobile:email ,code:convertPersianToEnglishNumbers(d?.code)}

        try{
            const da = await mutateAsync({data:formData , token : token} )
            const Atoken = da.data?.tokens?.access;
            const refresh = da?.data?.tokens?.refresh
            // Cookies.set('cookieToken', token);
            // Cookies.set('refreshJwt', refresh);
            // dispatch({type:"SET_TOKEN" , value:Atoken})
            const inFifteenMinutes = new Date(new Date().getTime() + 15 * 3600 * 60 * 1000);
            app.defaults.headers.Authorization = `Bearer ${Atoken}`;
            Cookies.set('cookieToken', Atoken , {expires:inFifteenMinutes});
            Cookies.set('refreshJwt', refresh  , {expires:inFifteenMinutes});
            nextStep()
        }catch (err){
            if(err instanceof AxiosError){
                if(err?.response?.data?.msg){
                    toast.error(err?.response?.data?.msg)
                }else if(err?.response?.data?.message){
                    toast.error(err?.response?.data?.message)
                }else if(err?.response?.data?.error){
                    toast.error(err?.response?.data?.error)
                }else if(err?.response?.data?.detail) {
                    toast.error(err?.response?.data?.detail)
                }else {
                    toast.error('An Error occurred')
                }
            }
        }
    }

    const resendCode = async () =>{


        const formData = validateEmail(email) ?
            { email:email }
            :
            {mobile:email}
        try{
            const da = await vMutateAsync(formData)

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

    return (

        <>
        <div className='hidden lg:block w-[45%] relative'>
            <Image src={'/pink-vector.svg'} alt={'pink-vector'} width={350} height={350} className={'!absolute top-[44%] left-[-35%] z-[0]'}/>
            <Image src={'/gray-vector.svg'} alt={'gray-vector'} width={250} height={250} className={'!absolute top-[-2%] left-[82%] z-[0]'}/>
            <Image src={'/purple-vector.svg'} alt={'purple-vector'} width={550} height={550} className={'!absolute top-[-95%] left-[0%] z-[10]'}/>
               <div className='w-full flex flex-col items-start justify-center'>
                   <h1 className='w-full text-left capitalize leading-none	 text-transparent bg-clip-text font-bold text-[3.5rem]' style={{backgroundImage:"linear-gradient(88deg, #AE88FF 7.72%, #FFA3F7 48.06%, #FFCB8E 91.92%)"}}>
                       {myTexts.sayWelcome}
                   </h1>
               </div>

               <div className='w-full '>
                   <LoginTextSlider />
               </div>
           </div>

           <div className='w-full lg:w-1/2 px-5 lg:px-0 text-white'>
               <div className='w-full flex flex-col items-center justify-center relative z-[1]'>
                   <div className='w-full p-6 rounded-[1.5rem] bg-[#02131E]'>

                       <div className={'w-full flex flex-row items-center justify-start'}>
                           <Image src={'/register-title.svg'} alt={'register-title'} width={35} height={35}/>
                           <h1 className='font-bold text-[1.7rem] ml-2'>
                               {myTexts.title}
                           </h1>

                       </div>
                       <div className='w-full'>
                           {`Code Sent to ${email}`}
                       </div>
                       <div className='w-full flex flex-row items-center justify-between'>
                           <h3 className={'mt-4 text-[1.2rem]'}>
                               {myTexts.verificationCode}
                           </h3>
                           <span className='px-5'>
                                        <ResecCodeSignUp pending={vPending} resendCode={() => {
                                            resendCode()
                                        }}/>

                                  </span>
                       </div>

                       <form className='w-full flex flex-row items-start justify-between mt-2'
                             onSubmit={handleSubmit(submit)}>
                           <div className='w-3/4 pr-3 h-full'>
                               <MainInput
                                   maxLength={6}
                                   register={register}
                                   label={'******'}
                                   error={errors?.code?.message}
                                   name={'code'}
                                   type={'text'}
                                   placeholder={'******'}
                                   otherClass={'!tracking-[1rem]'}
                               />
                           </div>

                           <div className='w-1/4 flex flex-row items-start justify-end'>
                               <RegisterBtn loading={isPending} type={'submit'} disabled={getValues()?.code?.length < 1}
                                            otherClass={'w-full'}>
                                   {myTexts.confirm}
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

                   <div
                       className='w-full flex flex-row items-center justify-between flex-wrap mt-3 text-[0.8rem] text-[#ACACAC] px-1'>
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

export default RegisterSecondStep;