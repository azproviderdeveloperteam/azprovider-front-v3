'use client'
import React, {useState} from 'react';
import {Accordion, AccordionBody} from "@material-tailwind/react";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {COUNTRIES} from "@/utils/texts";
import Select from "react-select";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useMutation} from "@tanstack/react-query";
import {forgetPassword} from "@/services/authServices";
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import Link from "next/link";
import ConfirmVerificationForgetPass from "@/components/forgetPassword/ConfirmVerificationForgetPass";
import ConfirmSetPassword from "@/components/forgetPassword/ConfirmSetPassword";

const ForgetPassword = () => {
    const [open, setOpen] = React.useState(1);
    const [step , setStep ] = useState(0)
    const [country, setCountry] = useState<any>({ label: "🇮🇷 IR +98", key: "IR", value: "+98", countryName: "Iran" }); // Default selected value
    const [resetToken , setResetToken] = useState<any>('')
    const schema = Yup
        .object({

        }).shape({
            email:Yup.string().required(),
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
        mutationFn : forgetPassword
    })
    const sendEmailOrPhone = async (d : any) =>{
        const formData = validateEmail(d?.email)  ? {
            email:d?.email
        } :{
            mobile:`${country.value}${d?.email}`
        }

        try{
            const da = await vMutateAsync(formData )

            setStep(1)



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
        <Accordion className={'text-primary-dark-b bg-[#F8F8F8] rounded-[1.4rem] py-4 px-10 font-roboto'} open={open === 1} >
            <div className='w-full flex flex-row items-center justify-start'>

                <h1 className='font-bold text-[1.7rem] ml-2'>
                    {/*{`# ${myTexts.title}` }*/}
                    Reset Password
                </h1>
            </div>
            <AccordionBody>
                {
                    step === 0 ?
                        <>
                            <div className='  font-bold text-[1.4rem] text-primary-dark-b capitalize'>
                                Phone Or Email
                            </div>
                            <form className='w-full flex flex-col items-start justify-between mt-2' onSubmit={handleSubmit(sendEmailOrPhone)}>
                                <div className='w-full flex flex-row items-center justify-center gap-4'>
                                    <div className='w-1/3 h-full '>
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
                                                multiValueLabel: () => 'bg-white  rounded-xl shadow-md',
                                                option: ({ isFocused, isSelected }) =>'bg-white px-4 py-1',
                                            }}
                                        />

                                    </div>
                                    <div className='w-2/3 pr-3 h-full'>
                                        <MainInput
                                            register={register}
                                            label={'Your Email'}
                                            error={errors?.email?.message}
                                            name={'email'}
                                            type={'mail'}
                                            placeholder={'example@email.com Or 9123456789'}

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
                        : step === 1 ?
                        <ConfirmVerificationForgetPass setResetToken={(e : any)=>{
                            setStep(2)
                            setResetToken(e)
                        }} email={validateEmail(getValues('email'))  ? getValues('email') :`${country.value}${getValues('email')}`}/>
                        :<ConfirmSetPassword resetToken={resetToken} email={validateEmail(getValues('email'))  ? getValues('email') :`${country.value}${getValues('email')}`}/>

                }
            </AccordionBody>
        </Accordion>
    );
};

export default ForgetPassword;