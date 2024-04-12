'use client'
import React, {useState} from 'react';
import {Accordion, AccordionBody, AccordionHeader, Button} from "@material-tailwind/react";
import {texts} from "@/utils/texts";
import Image from "next/image";
import MainInput from "@/components/inputs/MainInput";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import Link from "next/link";
import {useMutation} from "@tanstack/react-query";
import {loginSendOtp, loginUser} from "@/services/authServices";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation'
import {useAuth, useAuthActions} from "../../../contexts/AuthContext";
import {app} from "@/services/instance";

const LoginByOtpAccordion = () => {

    const text = texts.eng
    const myTexts = text.login.otp

    const [open, setOpen] = React.useState(1);

    const handleOpen = (value : any) => setOpen(open === value ? 0 : value);

    const [step , setStep ] = useState(0)
    const [loginWithEmail , setLoginWithEmail] = useState(true)
    const [loginWithPass , setLoginWithPass] = useState(false)

    const {user}= useAuth()
    const token = user?.token
    const router = useRouter()

    const schema = Yup
        .object({

        }).shape({
            email:Yup.string(),
            phone:Yup.string(),
            otp:Yup.string(),
            Password:Yup.string()
        })
        .required()
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting, isDirty, isValid },
        getValues
    } = useForm({ resolver: yupResolver(schema), mode:'onChange'})


    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : loginUser
    })


    const {data:vData  , isPending :vPending , error:vError  , mutateAsync :vMutateAsync} =useMutation({
        mutationFn : loginSendOtp
    })

    const dispatch = useAuthActions()


    function validatePhone(phone : string)
    {
        const re = /^(\+\d{3})?\d{9}$/;
        return re.test(phone.replace(/\s+/g, ''));
    }

    function validateEmail(email: string)
    {
        const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const sendVerification = async (d : any) =>{

        const formData = validateEmail(d?.email)  ? {
            email:d?.email
        } :{
            mobile:d?.email
        }

        try{
            const da = await vMutateAsync(formData )
            const token = da.data?.token?.access;
            const refresh = da?.data?.token?.refresh
            const inFifteenMinutes = new Date(new Date().getTime() + 15 * 3600 * 60 * 1000);
            Cookies.set('cookieToken', token , {expires:inFifteenMinutes});
            Cookies.set('refreshJwt', refresh  , {expires:inFifteenMinutes});
            app.defaults.headers.Authorization = `Bearer ${token}`;
            dispatch({type:"SET_TOKEN" , value:token})
            setStep(1)

        }catch (err){
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



    const submitWithPhone = async (d : any) =>{
        const formData = {
            mobile:d?.phone,
            otp:d?.otp
        }
        try{
            const da = await mutateAsync(formData)
            const token = da.data?.token?.access;
            const refresh = da?.data?.token?.refresh
            const inFifteenMinutes = new Date(new Date().getTime() + 15 * 3600 * 60 * 1000);
            Cookies.set('cookieToken', token , {expires:inFifteenMinutes});
            Cookies.set('refreshJwt', refresh  , {expires:inFifteenMinutes});
            dispatch({type:"SET_TOKEN" , value:token})
            toast.success('Login Successfully !')
            router.push('/dashboard')

        }catch (err){
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

    const submitWithEmail = async (d : any) =>{
        const formData = {
            email:d?.email,
            otp:d?.otp
        }
        try{
            const da = await mutateAsync(formData)
            const token = da.data?.token?.access;
            const refresh = da?.data?.token?.refresh
            const inFifteenMinutes = new Date(new Date().getTime() + 15 * 3600 * 60 * 1000);
            Cookies.set('cookieToken', token , {expires:inFifteenMinutes});
            Cookies.set('refreshJwt', refresh  , {expires:inFifteenMinutes});
            dispatch({type:"SET_TOKEN" , value:token})
            app.defaults.headers.Authorization = `Bearer ${token}`;
            toast.success('Login Successfully !')
            router.push('/dashboard')

        }catch (err){
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



    const submitWithEmailPassword = async (d : any) =>{

        const formData =  validateEmail(d?.email)  ? {
            email:d?.email,
            password:d?.password
        }:
            {
                mobile:d?.email,
                password:d?.password
            }
        try{
            const da = await mutateAsync(formData)
            const token = da.data?.token?.access;
            const refresh = da?.data?.token?.refresh
            const inFifteenMinutes = new Date(new Date().getTime() + 15 * 3600 * 60 * 1000);
            Cookies.set('cookieToken', token , {expires:inFifteenMinutes});
            Cookies.set('refreshJwt', refresh  , {expires:inFifteenMinutes});
            dispatch({type:"SET_TOKEN" , value:token})
            app.defaults.headers.Authorization = `Bearer ${token}`;
            toast.success('Login Successfully !')
            router.push('/dashboard')

        }catch (err){
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
        <Accordion className={'text-primary-dark-b bg-[#F8F8F8] rounded-[1.4rem] py-4 px-10 font-roboto'} open={open === 1}
                   // icon={<Image src={'/carousel-arrow.svg'} alt={'acc-otp-arrow'} width={10} height={10} className={`${open === 1 ? 'rotate-[-90deg]' :'rotate-90'} transition duration-500`} />  }
        >
            <AccordionHeader className={'border-none'} onClick={() => console.log(1)}>
                <div className='w-full flex flex-row items-center justify-start'>

                    <h1 className='font-bold text-[1.7rem] ml-2'>
                        {/*{`# ${myTexts.title}` }*/}
                        Login
                    </h1>
                </div>
            </AccordionHeader>
            <AccordionBody>

              <div className='text-primary-dark-b'>
                  {
                      step === 0 ?
                          <>

                              {/*<div className='w-full flex flex-row items-center justify-start'>*/}
                              {/*    <div className='font-bold !text-[1rem] text-[#A1A1A1]'>*/}
                              {/*        {myTexts.loginWith + ' :'}*/}
                              {/*    </div>*/}

                              {/*    <Button className={`px-4 py-2 rounded-full ml-2 font-normal normal-case capitalize !text-[1rem] ${loginWithEmail ? 'bg-primary-green-tb text-white' : 'bg-transparent text-[#A1A1A1] border-[1px] border-[#A1A1A1]'}` } onClick={()=>setLoginWithEmail(true)}>*/}
                              {/*        {myTexts.loginWithMail}*/}
                              {/*    </Button>*/}

                              {/*    <Button className={`px-4 py-2 rounded-full ml-2 font-normal normal-case capitalize !text-[1rem] ${!loginWithEmail ? 'bg-primary-green-tb text-white' : 'bg-transparent text-[#A1A1A1] border-[1px] border-[#A1A1A1]'}` } onClick={()=>setLoginWithEmail(false)}>*/}
                              {/*        {myTexts.loginWithPhone}*/}
                              {/*    </Button>*/}
                              {/*</div>*/}
                              <div className='  font-bold text-[1.4rem] text-primary-dark-b capitalize'>
                                  Phone Or Email
                                  {/*{*/}
                                  {/*    loginWithEmail ? myTexts.emailInput.title  : myTexts.phoneInput.title*/}
                                  {/*}*/}
                              </div>

                              {
                                  // loginWithEmail  ?

                                      <form className='w-full flex flex-col items-start justify-between mt-2' onSubmit={handleSubmit(sendVerification)}>
                                          <div className='w-full pr-3 h-full'>
                                              <MainInput
                                                  register={register}
                                                  label={'Your Email'}
                                                  error={errors?.email?.message}
                                                  name={'email'}
                                                  type={'mail'}
                                                  placeholder={'example@email.com Or +989123456789'}

                                              />
                                          </div>


                                          <div className={'w-full flex flex-row items-start justify-between mt-3'}>
                                              <div className='w-5/12'>
                                                  <RegisterBtn type={'submit'} loading={vPending} disabled={false}  otherClass={'!w-full'}>
                                                      {myTexts.sendCode}
                                                  </RegisterBtn>
                                              </div>
                                              <div className=' h-full flex flex-row items-center justify-center min-h-[3.85rem]'>
                                                  Or
                                              </div>
                                              <div className='w-5/12'>
                                                  <RegisterBtn onClick={()=>setStep(2)}  loading={false} disabled={false}  otherClass={'!w-full'}>
                                                      Enter Password
                                                  </RegisterBtn>
                                              </div>
                                          </div>



                                      </form>

                                      // :
                                      //
                                      // <form className='w-full flex flex-row items-start justify-between mt-2' onSubmit={handleSubmit(sendVerification)}>
                                      //     <div className='w-3/4 pr-3 h-full'>
                                      //         <MainInput
                                      //             register={register}
                                      //             label={'Your phone'}
                                      //             error={errors?.phone?.message}
                                      //             name={'phone'}
                                      //             type={'tell'}
                                      //             placeholder={'+98 9123456789'}
                                      //
                                      //         />
                                      //     </div>
                                      //
                                      //     <div className='w-1/4'>
                                      //         <RegisterBtn type={'submit'}  loading={vPending} disabled={false}  otherClass={'!w-full'}>
                                      //             {myTexts.sendCode}
                                      //         </RegisterBtn>
                                      //     </div>
                                      // </form>
                              }

                          </>
                          : step === 1 ?
                          <>
                              <div className='mt-4 font-bold text-[1.4rem] text-primary-dark-b capitalize'>

                                  {myTexts.verificationInput.title}

                              </div>
                              <form className='w-full flex flex-row items-start justify-between mt-2' onSubmit={handleSubmit(loginWithEmail ? submitWithEmail : submitWithPhone)}>
                                  <div className='w-3/4 pr-3 h-full'>
                                      <MainInput
                                          register={register}
                                          label={'OTP'}
                                          error={errors?.otp?.message}
                                          name={'otp'}
                                          // type={'password'}
                                          placeholder={'******'}

                                      />
                                  </div>

                                  <div className='w-1/4'>
                                      <RegisterBtn type={'submit'} loading={isPending} disabled={false}  otherClass={'!w-full'}>
                                          {myTexts.confirm}
                                      </RegisterBtn>
                                  </div>
                              </form>
                          </>

                          :
                              <>
                                  <div className='mt-4 font-bold text-[1.4rem] text-primary-dark-b capitalize'>

                                      Email Or Phone

                                  </div>
                                  <form className='w-full flex flex-col items-start justify-between mt-2' onSubmit={handleSubmit(submitWithEmailPassword)}>

                                      <div className='w-full  mt-3 h-full'>
                                          <MainInput
                                              register={register}
                                              label={'Your Email'}
                                              error={errors?.email?.message}
                                              name={'email'}
                                              type={'mail'}
                                              placeholder={'example@email.com Or +989123456789'}

                                          />
                                      </div>
                                      <div className='mt-4 font-bold text-[1.4rem] text-primary-dark-b capitalize'>

                                          Password

                                      </div>
                                      <div className='w-full  h-full mt-3'>
                                          <MainInput
                                              register={register}
                                              label={'Password'}
                                              error={errors?.password?.message}
                                              name={'password'}
                                              type={'password'}
                                              placeholder={'* * * * * * * *'}

                                          />
                                      </div>

                                      <div className='w-full mt-3'>
                                          <RegisterBtn type={'submit'} loading={isPending} disabled={false}  otherClass={'!w-full'}>
                                              Submit
                                          </RegisterBtn>
                                      </div>
                                      <div className='w-full mt-3 flex flex-row items-center justify-center'>
                                          --------- Or --------
                                      </div>
                                      <div className='w-full mt-3' onClick={()=>setStep(0)}>
                                          <RegisterBtn  loading={false} disabled={false}  otherClass={'!w-full !bg-[#3F3F3F] !text-[#fff] '}>
                                              Login With OTP
                                          </RegisterBtn>
                                      </div>
                                  </form>
                              </>

                  }

                  <div className='mt-4 w-full flex flex-row items-center justify-start font-bold text-[1rem]'>
                      <div>{myTexts.havAcc}</div>
                      <Link href={'/register'} className={'ml-2 text-[#0038FF] capitalize'}>
                          {myTexts.register}
                      </Link>
                  </div>
              </div>
            </AccordionBody>
        </Accordion>
    );
};

export default LoginByOtpAccordion;