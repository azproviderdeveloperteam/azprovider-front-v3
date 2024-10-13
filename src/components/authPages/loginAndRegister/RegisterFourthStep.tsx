'use client'
import React, {useState} from 'react';
import Image from "next/image";
import {texts} from "@/utils/texts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";

import RegisterBtn from "@/components/Buttons/RegisterBtn";
import {useMutation} from "@tanstack/react-query";
import {registerSetPassword} from "@/services/authServices";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useAuth} from "../../../contexts/AuthContext";
import {useRouter} from "next/navigation";
import {GrayEyeIcon} from "@/components/icons";
import { Button} from "@material-tailwind/react";

const RegisterFourthStep = ({nextStep , email}: any) => {

    const text = texts.eng
    const myTexts = text.register
    const errorStrPsss='Password must have contain at least one of the following : upper case letter, lower case letter, number and symbols'
    const [visible , setVisible] = useState<boolean>(false)
    const [visible2 , setVisible2] = useState<boolean>(false)

    const schema = Yup
        .object({

        }).shape({
            password:Yup.string().required('password is required')
                .min(10,'Password should be more than 9 characters')
                .matches(/^(?=.*[a-z])/, errorStrPsss)
                .matches(/^(?=.*[A-Z])/, errorStrPsss)
                .matches(/^(?=.*[0-9])/, errorStrPsss)
                .matches(/^(?=.*[!@#%&])/, errorStrPsss),
            confirmPassword:Yup.string().required('Confirm password is required')
                .oneOf([Yup.ref('password')] ,'Password and confirm password does not match !')
        })
        .required()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})


    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : registerSetPassword
    })



    const {user}= useAuth()
    const token = user?.token
    const router = useRouter()



    const submit = async (d : any) =>{

        const formData = {
            // current_password:null,
            password:d?.password,
            confirm_password:d?.confirmPassword,

        }
        try {
            const d = await mutateAsync({data:formData , token : token})
            toast.success('Register Successfully !')
            router.push('/dashboard')
            // nextStep(3)
        }catch (err) {
            if(err instanceof AxiosError){
                if(err?.response?.data?.msg){
                    toast.error(err?.response?.data?.msg)
                }else if(err?.response?.data?.message){
                    toast.error(err?.response?.data?.message)
                } else {
                    toast.error('An Error occurred')
                }
            }
        }
    }



    return (
        <>
            <div className='w-full  p-6 rounded-[1.5rem] bg-[#02131E] text-white relative z-[10] relative'>
                <Image src={'/pink-vector.svg'} alt={'pink-vector'} width={350} height={350} className={'hidden lg:block !absolute top-[50%] left-[-20%] z-[0]'}/>
                <Image src={'/gray-vector.svg'} alt={'gray-vector'} width={250} height={250} className={'hidden lg:block !absolute top-[10%] left-[93%]  rotate-180  '}/>
                <Image src={'/purple-vector.svg'} alt={'purple-vector'} width={550} height={550} className={'hidden lg:block absolute top-[-130%] left-[0%] z-[99999]'}/>
                <div className={'w-full flex flex-row items-center justify-start'}>
                    <Image src={'/register-title.svg'} alt={'register-title'} width={35} height={35} />

                    <h1 className='font-bold text-[1.7rem] ml-2'>
                        {myTexts.kycTitle}
                    </h1>

                </div>
                <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4' onSubmit={handleSubmit(submit)}>

                    <div className='min-w-full max-w-full  lg:max-w-[29%] lg:min-w-[22.5rem]  pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.emailOrPhone} <span className='text-secondary-red'>*</span>
                        </div>
                        <input  className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}
                               placeholder={email}
                                disabled
                        >

                        </input>
                    </div>

                    <div className='min-w-full max-w-full  lg:max-w-[29%] lg:min-w-[22.5rem]  pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.password} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'password'}
                            error={errors?.password?.message}
                            name={'password'}
                            placeholder={'password'}
                            type={visible ?'text' :'password'}
                            endContent={<Button onClick={()=>setVisible(!visible)} className={'bg-opacity-0'}><GrayEyeIcon /></Button>}
                         />
                    </div>


                    <div className='min-w-full max-w-full  lg:max-w-[29%] lg:min-w-[22.5rem]  pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.confirmPass} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'confirmPassword'}
                            error={errors?.confirmPassword?.message}
                            name={'confirmPassword'}
                            placeholder={'confirmPassword'}
                            type={visible ?'text' :'password'}
                            endContent={<Button onClick={()=>setVisible2(!visible2)} className={'bg-opacity-0'}><GrayEyeIcon /></Button>}
                         />
                    </div>





                    <div className='w-full mt-10 px-3 flex flex-row items-center justify-between capitalize'>
                        <div className='cursor-pointer text-primary-green-cb' onClick={()=>{
                            toast.success('Register Successfully !')
                            router.push('/dashboard')
                        }}>
                            {myTexts.skip}
                        </div>
                        <RegisterBtn type={'submit'}  otherClass={'min-w-[10rem]'}>
                            {myTexts.register}
                        </RegisterBtn>
                    </div>

                </form>
            </div>
        </>
    );
};

export default RegisterFourthStep;