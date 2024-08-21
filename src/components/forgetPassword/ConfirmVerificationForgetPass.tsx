'use client'
import React, {useState} from 'react';
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {confirmVerificationForgetPassword} from "@/services/authServices";
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import Link from "next/link";

const ConfirmVerificationForgetPass = ({email , setResetToken} : any) => {


    const schema = Yup
        .object({

        }).shape({
            otp:Yup.string().required(),
        })
        .required()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues,
        setValue
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})



    function validateEmail(email: string)
    {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const {data:vData  , isPending :vPending , error:vError  , mutateAsync :vMutateAsync} =useMutation({
        mutationFn : confirmVerificationForgetPassword
    })
    const sendEmailOrPhone = async (d : any) =>{
        const formData = validateEmail(email)  ? {
            email:email,
            code:d?.otp
        } :{
            mobile:`${email}`,
            code:d?.otp
        }

        try{
            const da = await vMutateAsync(formData )

            setResetToken(da?.data?.reset_token)
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

                        <>
                            <div className='  font-bold text-[1.4rem] text-primary-dark-b capitalize'>
                                Enter OTP
                            </div>
                            <form className='w-full flex flex-col items-start justify-between mt-2' onSubmit={handleSubmit(sendEmailOrPhone)}>
                                <div className='w-full flex flex-row items-center justify-center gap-4'>

                                    <div className='w-full pr-3 h-full'>
                                        <MainInput
                                            register={register}
                                            label={'Otp'}
                                            error={errors?.otp?.message}
                                            name={'otp'}
                                            type={'text'}
                                            placeholder={'* * * * * *'}

                                        />
                                    </div>
                                </div>


                                <div className='mt-4 w-full flex flex-row items-center justify-start font-bold text-[1rem]'>
                                    You can login with password and otp,
                                    <Link href={'/login'} className={'ml-2 text-[#0038FF] capitalize'}>
                                        Login
                                    </Link>
                                </div>
                                <div className='w-full mt-3'>
                                    <RegisterBtn type={'submit'} loading={vPending} disabled={false}  otherClass={'!w-full'}>
                                        Submit
                                    </RegisterBtn>
                                </div>

                            </form>
                        </>
    );
};

export default ConfirmVerificationForgetPass;