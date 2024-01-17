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
import {registerCompleteProfile} from "@/services/authServices";
import {useMutation} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useAuth} from "../../../contexts/AuthContext";

const RegisterThirdStep = ({nextStep}:any) => {

    const text = texts.eng
    const myTexts = text.register

    const schema = Yup
        .object({

        }).shape({
            firstName:Yup.string().required('Enter Your First Name'),
            lastName:Yup.string().required('Enter Your Last Name'),
            businessCode:Yup.string().required('Enter Business Code'),
            businessRole:Yup.string().required('Enter Business Role'),
            cityOrCountry:Yup.string().required('Enter City Or Country'),
            acceptTerms:Yup.bool().required('')

        })
        .required()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})

    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : registerCompleteProfile
    })

    const {user}= useAuth()
    const token = user?.token

    const submit = async (d : any) =>{

        const formData = {
                first_name:d?.firstName,
                last_name:d?.lastName,
                business_register_code:d?.businessCode,
                business_role:d?.businessRole,
                city_country:d?.cityOrCountry,
        }
        try {
            const d = await mutateAsync({data:formData , token :token})
            nextStep(3)
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

    console.log(errors , getValues())
    return (
        <>


            <div className='w-full  p-6 rounded-[1.5rem] bg-[#02131E] text-white relative z-[10] relative'>
                <Image src={'/pink-vector.svg'} alt={'pink-vector'} width={350} height={350} className={'!absolute top-[50%] left-[-20%] z-[0]'}/>
                <Image src={'/gray-vector.svg'} alt={'gray-vector'} width={250} height={250} className={'!absolute top-[10%] left-[90%]  rotate-180  '}/>
                <Image src={'/purple-vector.svg'} alt={'purple-vector'} width={550} height={550} className={'!absolute top-[-90%] left-[0%] z-[99999]'}/>
                <div className={'w-full flex flex-row items-center justify-start'}>
                    <Image src={'/register-title.svg'} alt={'register-title'} width={35} height={35} />

                    <h1 className='font-bold text-[1.7rem] ml-2'>
                        {myTexts.kycTitle}
                    </h1>

                </div>
                <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10' onSubmit={handleSubmit(submit)}>

                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.firstName} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'First name'}
                            error={errors?.firstName?.message}
                            name={'firstName'}
                            type={'text'}
                            placeholder={'First name'}
                        />
                    </div>

                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.lastName} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'Last Name'}
                            error={errors?.lastName?.message}
                            name={'lastName'}
                            type={'text'}
                            placeholder={'Last Name'}
                        />
                    </div>


                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.businessRegisterCode} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'businessCode'}
                            error={errors?.businessCode?.message}
                            name={'businessCode'}
                            type={'text'}
                            placeholder={'Business Code'}

                        />
                    </div>

                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.businessRole} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'Business Role'}
                            error={errors?.businessRole?.message}
                            name={'businessRole'}
                            type={'text'}
                            placeholder={'Business Role'}
                         />
                    </div>

                    <div className='max-w-[29%] min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.cityCountry} <span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'City Or Country'}
                            error={errors?.cityOrCountry?.message}
                            name={'cityOrCountry'}
                            type={'text'}
                            placeholder={'City Or Country'}
                         />
                    </div>



                <div className='w-full flex flex-row items-center justify-start mt-10'>
                    <Checkbox color="green" {...register('acceptTerms')}/>
                    <span>
                        {myTexts.iAgreeAll}
                    </span>
                    <Link href={'/terms-and-conditions'} className={'text-[#00E0FF] ml-2'} target="_blank">
                        {myTexts.terms}
                    </Link>
                </div>
                    {
                        errors?.acceptTerms?.message &&
                        <div className='w-full text-[0.8rem] text-secondary-red px-4 mt-2'>
                            {'Accept Our terms'}
                        </div>
                    }

                    <div className='w-full mt-5 px-3'>
                        <RegisterBtn type={'submit'} loading={isPending} disabled={false} otherClass={'min-w-[10rem]'}>
                            {myTexts.register}
                        </RegisterBtn>
                    </div>

                </form>
            </div>
        </>
    );
};

export default RegisterThirdStep;