'use client'

import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {texts} from "@/utils/texts";
import LoginTextSlider from "@/components/authPages/loginAndRegister/LoginTextSlider";
import RegisterFirstStep from "@/components/authPages/loginAndRegister/RegisterFirstStep";
import RegisterSecondStep from "@/components/authPages/loginAndRegister/RegisterSecondStep";
import RegisterThirdStep from "@/components/authPages/loginAndRegister/RegisterThirdStep";
import RegisterFourthStep from "@/components/authPages/loginAndRegister/RegisterFourthStep";
import {checkAuthUser} from "@/services/authServices";
import {useQuery} from "@tanstack/react-query";
import RegisterAddProduct from "@/components/authPages/loginAndRegister/RegisterAddProduct";
import RegisterAddService from "@/components/authPages/loginAndRegister/RegisterAddService";
import {useSearchParams} from "next/navigation";
import {useRouter} from "next/navigation";
import Cookies from "js-cookie";
import {app} from "@/services/instance";
import {getProfile} from "@/services/userProfileServices";
import {useAuthActions} from "../../../contexts/AuthContext";
import ThreeDotsLoaderGreen from "@/components/loaders/ThreeDotsLoaderGreen";


const Register = () => {

    const [step , setStep] = useState(0)
    const [email , setEmail] = useState<string>('')
    const [loading , setLoading] = useState(false)
    const text = texts.eng
    const myTexts = text.register
    const router = useRouter();
    const dispatch = useAuthActions()

    const searchParams = useSearchParams(); // خواندن query parameters
    // استخراج پارامترهای URL
    const accessToken = searchParams.get('access');
    const refreshToken = searchParams.get('refresh');
    const firstName = searchParams.get('first_name');
    const lastName = searchParams.get('last_name');
    const emailFromUrl = searchParams.get('email');
    const isNew = searchParams.get('is_new') === 'true'; // تبدیل به boolean


    useEffect(() => {
        const getProfileData = async () => {
            setLoading(true)
            try {
                // اگر کاربر از طریق Google ریدایرکت شده و توکن‌ها موجود هستند
                if (accessToken && refreshToken && emailFromUrl) {
                    // ذخیره توکن‌ها در کوکی‌ها
                    const inFifteenMinutes = new Date(new Date().getTime() + 15 * 3600 * 60 * 1000);
                    Cookies.set('cookieToken', accessToken, { expires: inFifteenMinutes });
                    Cookies.set('refreshJwt', refreshToken, { expires: inFifteenMinutes });
                    app.defaults.headers.Authorization = `Bearer ${accessToken}`;
                    // تنظیم ایمیل از URL
                    setEmail(emailFromUrl);
                    const user = await getProfile()
                    dispatch({type:"SIGNIN" , value:user?.data})
                    // اگر کاربر جدید نیست، به مرحله دوم برو
                    if (isNew) {
                        setStep(2);
                    } else {
                        // اگر کاربر جدید است، مستقیم به داشبورد هدایت شود
                        router.push('/dashboard');
                    }
                }
            }catch (e) {

            }finally {
                setLoading(false)
            }
        }
        getProfileData()

    }, [accessToken, refreshToken, emailFromUrl, isNew, router]);

    if(loading) return <div className={'w-full min-h-screen bg-white flex flex-row items-center justify-center'}>
        <ThreeDotsLoaderGreen />
    </div>
    return (
        <div className='w-full min-h-[100svh] bg-primary-dark-b'>
            <div className='relative !h-full min-h-[100svh] max-w-[71.2125rem] lg:w-[71.3125rem] m-auto w-full flex flex-row items-center justify-between'>
                {
                    step === 0 ?
                        <RegisterFirstStep nextStep={(e:string)=>{
                            setStep(1)
                            if(e){
                                setEmail(e)
                            }
                        }}/>

                        :
                        step === 1 ?
                            <RegisterSecondStep nextStep={()=>setStep(2)} email={email}/>

                            :
                            step === 2 ?
                                <RegisterThirdStep nextStep={()=>setStep(3)} emai={email}/>
                                :
                                step === 3 ?
                                    <RegisterFourthStep nextStep={()=>setStep(4)} email={email}/>
                                    :
                                    step === 4 ?
                                        <RegisterAddProduct nextStep={()=>setStep(5)} email={email}/>
                                        :
                                        step === 5 ?
                                            <RegisterAddService nextStep={()=>setStep(6)} email={email}/>
                                            :
                                            null
                }

            </div>
        </div>
    );
};

export default Register;