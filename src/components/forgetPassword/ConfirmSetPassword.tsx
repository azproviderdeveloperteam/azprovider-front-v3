'use client'
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {confirmVerificationForgetPassword, executeForgetPassword} from "@/services/authServices";
import {useRouter} from "next/navigation";
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import Link from "next/link";
import {texts} from "@/utils/texts";
const ConfirmSetPassword = ({resetToken , email} : {resetToken : string , email : any}) => {
    const text = texts.eng
    const myTexts = text.register

    const router =useRouter()
    const errorStrPsss='Password must have contain at least one of the following : upper case letter, lower case letter, number and symbols'

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





    function validateEmail(email: string)
    {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const {data:vData  , isPending :vPending , error:vError  , mutateAsync :vMutateAsync} =useMutation({
        mutationFn : executeForgetPassword
    })
    const submit = async (d : any) =>{
        const formData = validateEmail(email)  ? {
            email:email,
            reset_token:resetToken,
            new_password:d?.password,
            confirm_new_password:d?.password
        } :{
            mobile:`${email}`,
            reset_token:resetToken,
            new_password:d?.password,
            confirm_new_password:d?.password
        }

        try{
            const da = await vMutateAsync(formData )
            router.push('/login')
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

    return (
        <form className='w-full flex flex-col items-start justify-between mt-2' onSubmit={handleSubmit(submit)}>
            <div className='min-w-full max-w-full    pr-2 h-full mt-7'>
                <div className=' text-[1.3rem]'>
                    {myTexts.password} <span className='text-secondary-red'>*</span>
                </div>
                <MainInput
                    register={register}
                    label={'password'}
                    error={errors?.password?.message}
                    name={'password'}
                    type={'password'}
                    placeholder={'password'}
                />
            </div>


            <div className='min-w-full max-w-full    pr-2 h-full mt-7'>
                <div className=' text-[1.3rem]'>
                    {myTexts.confirmPass} <span className='text-secondary-red'>*</span>
                </div>
                <MainInput
                    register={register}
                    label={'confirmPassword'}
                    error={errors?.confirmPassword?.message}
                    name={'confirmPassword'}
                    type={'password'}
                    placeholder={'confirmPassword'}
                />
            </div>

            <RegisterBtn type={'submit'} loading={vPending}  otherClass={'mt-4 w-full'}>
                {myTexts.register}
            </RegisterBtn>

        </form>
    );
};

export default ConfirmSetPassword;