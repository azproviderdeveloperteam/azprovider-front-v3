'use client'
import React from 'react';
import LightBtnWithBg from "@/components/Buttons/LightBtnWithBg";
import {Input} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {postSubscriber} from "@/services/otherServices";
import MainInput from "@/components/inputs/MainInput";

const FooterInput = ({myTexts} : any) => {

    const schema = Yup
        .object({

        }).shape({
            email:Yup.string().email('Invalid Email').required('Email is required')
        })
        .required()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues,
        reset
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})


    const {data :sentData , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : postSubscriber
    })



    const onSubmit = async (e:any) =>{
        try {
            const res = await mutateAsync(e)
            reset()
            toast.success('Email sent successfully!')
        }catch (e) {
            toast.error('Error')

        }
    }

    // const handleErrors = () =>{
    //     if(errors?.email?.message){
    //         // toast.error(errors?.email?.message?.toString())
    //     }
    // }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className='w-9/12 max-w-[33rem] border-[1px] border-secondary-yellow h-20  rounded-[1.7rem] flex flex-row items-center justify-between px-1 py-1'>
                {/*<Input*/}
                {/*    name={'email'}*/}
                {/*    {...register('email')}*/}
                {/*    className={'grow h-full !border-none !outline-none text-secondary-yellow focus:!shadow-none focus:!outline-none focus:!border-none'}*/}
                {/*    placeholder={myTexts.input.placeholder}*/}
                {/*/>*/}

                <MainInput
                    register={register}
                    label={''}

                    name={'email'}
                    type={'text'}
                    placeholder={myTexts.input.placeholder}
                    borderNone={true}
                    otherClass={'grow !border-none focus:!shadow-none focus:!outline-none focus:!border-none focus:!bg-transparent'}
                />
                <LightBtnWithBg loading={isPending} type={'submit'} otherClass={'!h-full !rounded-[1.5rem] !w-[53%]'}>
                    {myTexts.input.btn}
                </LightBtnWithBg>
            </form>
            {
                errors?.email?.message &&
                <div className='w-full text-[0.8rem] text-secondary-red px-4 mt-2'>
                    {errors?.email?.message}
                </div>
            }
        </>


    );
};

export default FooterInput;