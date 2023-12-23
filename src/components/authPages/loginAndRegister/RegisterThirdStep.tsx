'use client'
import React from 'react';
import Image from "next/image";
import {texts} from "@/utils/texts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import {Checkbox} from "@material-tailwind/react";
import Link from "next/link";
import RegisterBtn from "@/components/Buttons/RegisterBtn";

const RegisterThirdStep = ({nextStep}:any) => {

    const text = texts.eng
    const myTexts = text.register

    const schema = Yup
        .object({

        }).shape({
            code:Yup.string().min(6),
            email:Yup.string().required('')

        })
        .required()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})


    const submit = () =>{
        nextStep(3)
    }

    return (
        <>
            <Image src={'/pink-vector.svg'} alt={'pink-vector'} width={350} height={350} className={'!absolute top-[60svh] left-[-0] z-[0]'}/>
            <Image src={'/gray-vector.svg'} alt={'gray-vector'} width={250} height={250} className={'!absolute top-[45svh] left-[100%] z-[0]'}/>
            <Image src={'/purple-vector.svg'} alt={'purple-vector'} width={550} height={550} className={'!absolute top-[-150px] left-[0%] z-[99999]'}/>

            <div className='w-full  p-6 rounded-[1.5rem] bg-[#02131E] text-white relative z-[10]'>
                <div className={'w-full flex flex-row items-center justify-start'}>
                    <Image src={'/register-title.svg'} alt={'register-title'} width={35} height={35} />

                    <h1 className='font-bold text-[1.7rem] ml-2'>
                        {myTexts.kycTitle}
                    </h1>

                </div>
                <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4' onSubmit={handleSubmit(submit)}>

                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.firstName} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'******'}
                            error={errors?.email?.message}
                            name={'code'}
                            type={'code'}
                            placeholder={'******'}
                            otherClass={'!tracking-[1rem]'}
                        />
                    </div>

                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.lastName} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'******'}
                            error={errors?.email?.message}
                            name={'code'}
                            type={'code'}
                            placeholder={'******'}
                            otherClass={'!tracking-[1rem]'}
                        />
                    </div>


                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.businessRegisterCode} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'******'}
                            error={errors?.email?.message}
                            name={'code'}
                            type={'code'}
                            placeholder={'******'}
                            otherClass={'!tracking-[1rem]'}
                        />
                    </div>

                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.businessRole} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'******'}
                            error={errors?.email?.message}
                            name={'code'}
                            type={'code'}
                            placeholder={'******'}
                            otherClass={'!tracking-[1rem]'}
                        />
                    </div>

                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.cityCountry} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'******'}
                            error={errors?.email?.message}
                            name={'code'}
                            type={'code'}
                            placeholder={'******'}
                            otherClass={'!tracking-[1rem]'}
                        />
                    </div>



                <div className='w-full flex flex-row items-center justify-start mt-10'>
                    <Checkbox color="green" />
                    <span>
                        {myTexts.iAgreeAll}
                    </span>
                    <Link href={'/terms-and-conditions'} className={'text-[#00E0FF] ml-2'} target="_blank">
                        {myTexts.terms}
                    </Link>
                </div>

                    <div className='w-full mt-5 px-3'>
                        <RegisterBtn type={'submit'}>
                            {myTexts.register}
                        </RegisterBtn>
                    </div>

                </form>
            </div>
        </>
    );
};

export default RegisterThirdStep;