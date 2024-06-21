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

const FooterInput = ({myTexts} : any) => {

    const schema = Yup
        .object({

        }).shape({
            email:Yup.string().email('Invalid Email').required('Email Or Phone is required')
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



    const onSubmit = async (e) =>{
        try {
            const res = mutateAsync(e)
            reset()
            toast.success('Email sent successfully!')
        }catch (e) {

        }
    }

    const handleErrors = () =>{
        if(errors?.email){
            toast.error(errors?.email?.message)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-9/12 max-w-[33rem] border-[1px] border-secondary-yellow h-20  rounded-[1.7rem] flex flex-row items-center justify-between px-1 py-1'>
            <Input
                name={'email'}
                {...register('email')}
                className={'grow h-full !border-none !outline-none text-secondary-yellow focus:!shadow-none focus:!outline-none focus:!border-none'}
                placeholder={myTexts.input.placeholder}
            />
            <LightBtnWithBg loading={isPending} type={'submit'} onClick={handleErrors}  otherClass={'!h-full !rounded-[1.5rem] !w-[53%]'}>
                {myTexts.input.btn}
            </LightBtnWithBg>
        </form>

    );
};

export default FooterInput;