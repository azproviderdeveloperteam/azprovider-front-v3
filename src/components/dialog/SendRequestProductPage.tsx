'use client'
import React, {useState} from 'react';
import {Button, DialogBody, IconButton} from "@material-tailwind/react";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import AzDialog from "@/components/dialog/AzDialog";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import Image from "next/image";
import AzDatePicker from "@/components/inputs/AzDatePicker";
import {useMutation} from "@tanstack/react-query";
import {sendChatReq} from "@/services/chatServices";
import {AxiosError} from "axios";
import toast from "react-hot-toast";

const SendRequestProductPage = ({data} : any) => {

    const [dialog , setDialog] = useState(false)
    const [date , setDate] = useState(new Date())
    const schema = Yup
        .object({

        }).shape({
            quantity:Yup.string().required('Enter this field'),
            location:Yup.string().required('Enter this field'),
            price:Yup.string().required('Enter this field'),
            payment:Yup.string().required('Enter this field'),
            // activeDate:Yup.string().required('Enter this field'),
            desc:Yup.string().required('Enter this field'),
        })
        .required()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})


    const {data :sentData , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : sendChatReq
    })



    const submitForm = async (e)=>{
        const formData = {
            target_user:data?.user?.id,
            quantity :parseInt(e?.quantity)  ,
            location:e?.location,
            price:parseInt(e?.price) ,
            payment:e?.payment,
            active_date:date,
            description:e?.desc
        }

        try {
            const d = await mutateAsync(formData)
            setDialog(false)
            toast.success('Request Sent Successfully')

        }catch (err){
            // setDialog(false)
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

    console.log(error)
    return (
        <>
            <RegisterBtn  onClick={()=>setDialog(true)}>
                Send Request
            </RegisterBtn>

            <AzDialog  open={dialog}  handler={()=>setDialog(false)} size={'xl'} >


                    <div className='w-full flex flex-row items-center justify-between p-2 lg:p-3 rounded-[1rem] relative text-primary-dark-b'>
                        <div className='flex flex-row items-center justify-start'>
                            <Image src={'/request-form.svg'} alt={'request-form-az'} width={25} height={25} />
                            <h3 className='font-bold ml-2 text-[1.7rem]'>
                                Request form
                            </h3>
                        </div>

                            <IconButton className={'bg-transparent focus:shadow-none'} onClick={()=>setDialog(false)}>
                                <Image src={'/exit.svg'} alt={'exit.svg'} width={15} height={15} />
                            </IconButton>

                    </div>
                    <form className='w-full grid grid-cols-3 gap-4 mt-2 text-primary-dark-b' onSubmit={handleSubmit(submitForm)}>
                        <div className='col-span-3 lg:col-span-1 h-full'>
                            <div className=' text-[1rem] font-bold capitalize'>
                                Quantity <span className='text-secondary-red'>*</span>
                            </div>
                            <MainInput
                                register={register}
                                label={'quantity'}
                                error={errors?.quantity?.message}
                                name={'quantity'}
                                type={'text'}
                                placeholder={'quantity'}

                            />
                        </div>

                        <div className='col-span-3 lg:col-span-1 h-full'>
                            <div className=' text-[1rem] font-bold capitalize'>
                                Location <span className='text-secondary-red'>*</span>
                            </div>
                            <MainInput
                                register={register}
                                label={'location'}
                                error={errors?.location?.message}
                                name={'location'}
                                type={'text'}
                                placeholder={'Iran, Tehran'}

                            />
                        </div>
                        <div className='col-span-3 lg:col-span-1 h-full'>
                            <div className=' text-[1rem] font-bold capitalize'>
                                Price <span className='text-secondary-red'>*</span>
                            </div>
                            <MainInput
                                register={register}
                                label={'price'}
                                error={errors?.price?.message}
                                name={'price'}
                                type={'text'}
                                placeholder={'150000'}

                            />
                        </div>
                        <div className='col-span-3 lg:col-span-1 h-full'>
                            <div className=' text-[1rem] font-bold capitalize'>
                                Payment <span className='text-secondary-red'>*</span>
                            </div>
                            <MainInput
                                register={register}
                                label={'Your Email'}
                                error={errors?.payment?.message}
                                name={'payment'}
                                type={'text'}
                                placeholder={'payment'}

                            />
                        </div>

                        <div className='col-span-3 lg:col-span-1 h-full'>
                            <div className=' text-[1rem] font-bold capitalize'>
                                Active Date <span className='text-secondary-red'>*</span>
                            </div>
                            <AzDatePicker   date={date} setDate={setDate}/>

                        </div>

                        <div className='col-span-3 lg:col-span-3 h-full'>
                            <div className=' text-[1rem] font-bold capitalize'>
                                Description <span className='text-secondary-red'>*</span>
                            </div>
                            <MainInput
                                register={register}
                                label={'desc'}
                                error={errors?.desc?.message}
                                name={'desc'}
                                type={'text'}
                                placeholder={'description...'}
                                textarea={true}

                            />
                        </div>

                        <div className={'col-span-3 lg:col-span-3'}>
                            <div className='my-5 grid grid-cols-12 gap-4'>
                                <div className='col-span-6 lg:col-span-2'>
                                    <RegisterBtn loading={isPending} type={'submit'} otherClass={'w-full'} >
                                        Save
                                    </RegisterBtn>
                                </div>
                                <div className='col-span-6 lg:col-span-2'>
                                    <RegisterBtn otherClass={'w-full !bg-transparent text-primary-green-tb font-bold'}   onClick={()=>setDialog(false)}>
                                        Cancel
                                    </RegisterBtn>
                                </div>
                            </div>
                            {
                                error &&
                                <div className='w-full text-[0.8rem] text-secondary-red px-4 mt-2'>
                                    {error?.response?.data?.error ? error?.response?.data?.error : 'An Error Occurred'}
                                </div>
                            }
                        </div>

                    </form>

            </AzDialog>
        </>

    );
};

export default SendRequestProductPage;