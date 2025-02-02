'use client'
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {COUNTRIES, texts} from "@/utils/texts";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import {Checkbox} from "@material-tailwind/react";
import Link from "next/link";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import {getUserRoleList, registerCompleteProfile} from "@/services/authServices";
import {useMutation , useQuery} from "@tanstack/react-query";
import {AxiosError} from "axios";
import toast from "react-hot-toast";
import {useAuth} from "../../../contexts/AuthContext";
import Select from "react-select";
import {getMeasureList} from "@/services/measurementServices";
import ThreeDotsLoader from "@/components/loaders/ThreeDotsLoader";
import {getCities, getCountries} from "@/services/cityCountryServices";
import {flushSync} from "react-dom";

const RegisterThirdStep = ({nextStep}:any) => {

    const text = texts.eng
    const myTexts = text.register
    const [bRole, setBRole] = useState<any>([]); // Default selected value
    const [bRoleOptions , setBRoleOptions] = useState<any>([] )
    const [selectedCountry, setSelectedCountry] = useState<any>(null); // Default selected value
    const [selectedCity, setSelectedCity] = useState<any>(null); // Default selected value
    const [inputValue, setInputValue] = useState('');
    const [typingTimeout, setTypingTimeout] = useState<any>(null);

    const schema = Yup
        .object({

        }).shape({
            firstName:Yup.string().matches(/^[a-zA-Z\s]+$/, 'Only English letters are allowed').required('Enter Your First Name'),
            lastName:Yup.string().matches(/^[a-zA-Z\s]+$/, 'Only English letters are allowed').required('Enter Your Last Name'),
            international_name:Yup.string().matches(/^[a-zA-Z\s]+$/, 'Only English letters are allowed').required('Enter Your International name'),
            businessRole:Yup.string(),
            cityOrCountry:Yup.string(),
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
                international_name:d?.international_name ,
                business_role_id:bRole?.map((x : any) => x?.value),
                country:selectedCountry?.label,
                city:selectedCity?.label,

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


    const {data : allRoleData, isPending :allRolePending, error : allRoleError} = useQuery({
        queryKey: ['get-all-Role' ],
        queryFn: getUserRoleList,
        retry:false,
    })

    useEffect(()=>{
        let mo :any[] = []

        if(allRoleData?.data){
            allRoleData?.data?.map((x:any)=>mo.push({value:x?.id , label : x?.title}))
        }
        setBRoleOptions(mo)
    },[allRoleData])



    const [isLoadingMore, setIsLoadingMore] = useState(false);
    const [page, setPage] = useState(1);
    const [cities, setCities] = useState<any[]>([]);


    const {
        data: countries,
        isPending: countriesPending,
        error: countriesError,
    } = useQuery({
        queryKey: ['get-countries'],
        queryFn: getCountries,
        retry: false,
    });



    const { data :initialCities, error: initialCitiesError, isPending : citiesPending } = useQuery({
        queryKey: ['cities', selectedCountry],
        queryFn: () => getCities(selectedCountry?.label, page, 50 , undefined),
    });

    useEffect(() => {
        if (initialCities) {
            setCities(initialCities?.data?.results ? initialCities?.data?.results?.map((x :any)=>{return{value:x.id , label :x?.name}}) || [] : []);
        }
    }, [initialCities]);

    const loadMoreCities = async (cityName : string | undefined) => {
        if (isLoadingMore) return;

        setIsLoadingMore(true);
        const nextPage = page + 1;

        try {

            if(cityName){
                const moreCitiesResponse = await getCities(selectedCountry?.label?.toString(), nextPage , 50 , cityName);
                const newCities = moreCitiesResponse?.data?.results?.map((x : any)=>{return{value:x.id , label :x?.name}}) || [];

                if (newCities.length === 0) {
                    setPage(1)
                    setIsLoadingMore(false);
                    return;
                }
                flushSync(()=>{
                    setCities(newCities)
                    setPage(1)
                })
            }else {
                const moreCitiesResponse = await getCities(selectedCountry?.label?.toString(), nextPage , 50 , undefined);
                const newCities = moreCitiesResponse?.data?.results?.map((x : any)=>{return{value:x.id , label :x?.name}}) || [];

                if (newCities.length === 0) {
                    setPage(1)
                    setIsLoadingMore(false);
                    return;
                }
                flushSync(()=>{
                    const a = cities.concat(newCities)
                    setCities(a)
                }) ;
                flushSync(()=>setPage(nextPage)) ;
            }




        } catch (error) {
            console.error("Error loading more cities:", error);
        } finally {
            setIsLoadingMore(false);
        }
    };

    const handleInputChange = (newValue: string) => {
        // Clear the previous timeout
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        }

        // Update input value and set a new timeout
        setInputValue(newValue);

        // Set a new timeout to delay the search
        setTypingTimeout(
            setTimeout(() => {
                loadMoreCities(newValue); // Trigger the search after 1 second of inactivity
            }, 1000)
        );
    };

    return (
        <>


            <div className='w-full  p-6 rounded-[1.5rem] bg-[#02131E] text-white relative z-[10] relative'>
                <Image src={'/pink-vector.svg'} alt={'pink-vector'} width={350} height={350} className={'hidden lg:block !absolute top-[50%] left-[-20%] z-[0]'}/>
                <Image src={'/gray-vector.svg'} alt={'gray-vector'} width={250} height={250} className={'hidden lg:block !absolute top-[10%] left-[90%]  rotate-180  '}/>
                <Image src={'/purple-vector.svg'} alt={'purple-vector'} width={550} height={550} className={'hidden lg:block !absolute top-[-90%] left-[0%] z-[99999]'}/>
                <div className={'w-full flex flex-row items-center justify-start'}>
                    <Image src={'/register-title.svg'} alt={'register-title'} width={35} height={35} />

                    <h1 className='font-bold text-[1.7rem] ml-2'>
                        {myTexts.kycTitle}
                    </h1>

                </div>
                <form className='w-full flex flex-row items-start justify-start flex-wrap mt-4 relative z-10' onSubmit={handleSubmit(submit)}>
                    <div className='min-w-full max-w-full  lg:max-w-[29%] lg:min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.international_name}<span className='text-secondary-red'>*</span>
                        </div>
                        <MainInput
                            register={register}
                            label={'international_name'}
                            error={errors?.international_name?.message}
                            name={'international_name'}
                            type={'text'}
                            placeholder={'International name'}

                        />
                    </div>
                    <div className='min-w-full max-w-full  lg:max-w-[29%] lg:min-w-[22.5rem] pr-2 h-full mt-7'>
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

                    <div className='min-w-full max-w-full  lg:max-w-[29%] lg:min-w-[22.5rem] pr-2 h-full mt-7'>
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




                    <div className='min-w-full max-w-full  lg:max-w-[29%] lg:min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            {myTexts.businessRole}<span className='text-secondary-red'>*</span>
                        </div>
                        <Select
                            className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}
                            isMulti
                            onChange={(e)=>{

                                setBRole( e)
                                // getToCurrenciesFunc(e?.value)
                            }}
                            value={bRole}
                            options={bRoleOptions}
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
                                multiValueLabel: () => 'bg-primary-dark-b  rounded-xl shadow-md',
                                option: ({ isFocused, isSelected }) =>'bg-primary-dark-b px-4 py-1',
                            }}
                        />
                    </div>

                    <div className='min-w-full max-w-full  lg:max-w-[29%] lg:min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            Country <span className='text-secondary-red'>*</span>
                        </div>
                        {/*<MainInput*/}
                        {/*    register={register}*/}
                        {/*    label={'City Or Country'}*/}
                        {/*    error={errors?.cityOrCountry?.message}*/}
                        {/*    name={'cityOrCountry'}*/}
                        {/*    type={'text'}*/}
                        {/*    placeholder={'City Or Country'}*/}
                        {/* />*/}

                        {
                            countriesPending ?

                                <div className='w-full h-[3rem] flex flex-row items-center justify-center'>
                                    <ThreeDotsLoader />
                                </div>

                                :<Select
                                    className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}

                                    onChange={(e)=>{

                                        setSelectedCountry( e)
                                        // getToCurrenciesFunc(e?.value)
                                    }}
                                    value={selectedCountry}
                                    options={countries?.data?.results ? countries?.data?.results?.map((x : any)=>{return{value:x.id , label :x?.name}}) || [] : []}
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
                                        multiValueLabel: () => 'bg-primary-dark-b  rounded-xl shadow-md',
                                        option: ({ isFocused, isSelected }) =>'bg-primary-dark-b px-4 py-1',
                                    }}
                                />
                        }
                    </div>

                    <div className='min-w-full max-w-full  lg:max-w-[29%] lg:min-w-[22.5rem] pr-2 h-full mt-7'>
                        <div className=' text-[1.3rem]'>
                            City <span className='text-secondary-red'>*</span>
                        </div>


                        <Select
                            onMenuScrollToBottom={()=>loadMoreCities(undefined)}  // Trigger when reaching the bottom of the list
                            className={`border border-1 border-slate-700 w-full flex px-3 min-h-[3.85rem] flex-row items-center justify-between bg-transparent rounded-[1.2rem] text-[#A1A1A1] border-[#A1A1A1]`}
                            onChange={(e)=>{
                                setSelectedCity( e)
                                // getToCurrenciesFunc(e?.value)
                            }}
                            onInputChange={(e)=>handleInputChange(e)}

                            value={selectedCity}
                            options={cities}
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
                                multiValueLabel: () => 'bg-primary-dark-b  rounded-xl shadow-md',
                                option: ({ isFocused, isSelected }) =>'bg-primary-dark-b px-4 py-1',
                            }}
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