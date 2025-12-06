'use client'
import React, { useState } from 'react';
import { IconButton } from "@material-tailwind/react";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import AzDialog from "@/components/dialog/AzDialog";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import MainInput from "@/components/inputs/MainInput";
import Image from "next/image";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { AxiosError } from "axios";
import { useRouter } from "next-nprogress-bar";
import { useAuth} from "../../contexts/AuthContext";
import {sendRequestCompany} from "@/services/companyServices";

// ------------------------------
// SCHEMA
// ------------------------------
const schema = Yup.object({
    title: Yup.string().required("Enter title"),
    description: Yup.string().required("Enter description"),
}).required();

// ------------------------------
// COMPONENT
// ------------------------------
const RequestCompanyForm = ({ btnTitle = "Request Company" , companyId }    :{btnTitle?: string , companyId : string | number}) => {

    const [dialog, setDialog] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ resolver: yupResolver(schema), mode: "onChange" });

    // API mutation
    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: sendRequestCompany, // تابع ارسال داده که از بیرون پاس بدهی
    });

    // Submit
    const submitForm = async (e: any) => {
        try {
            await mutateAsync({data:{
                    title: e.title,
                    description: e.description,
                } , companyId});

            toast.success("Request sent successfully");
            setDialog(false);

        } catch (err) {
            if (err instanceof AxiosError) {
                toast.error(err.response?.data?.msg || "An error occurred");
            }
        }
    };

    return (
        <>
            {/* ---------------------- BUTTON ---------------------- */}
            {
                user?.login ?
                    <RegisterBtn onClick={() => setDialog(true)}>
                        {btnTitle}
                    </RegisterBtn>
                    :
                    <RegisterBtn onClick={() => router.push('/login')}>
                        Login to send request
                    </RegisterBtn>
            }

            {/* ---------------------- DIALOG ---------------------- */}
            <AzDialog open={dialog} handler={() => setDialog(false)} size={'md'}>

                <div className='w-full flex flex-row items-center justify-between p-3 rounded-xl text-primary-dark-b'>
                    <div className='flex flex-row items-center'>
                        <Image src={'/request-form.svg'} alt={'form'} width={25} height={25} />
                        <h3 className='font-bold ml-2 text-xl'>
                            Request Company
                        </h3>
                    </div>

                    <IconButton className="bg-transparent" onClick={() => setDialog(false)}>
                        <Image src={'/exit.svg'} alt={'exit'} width={15} height={15} />
                    </IconButton>
                </div>

                {/* ---------------------- FORM ---------------------- */}
                <form
                    className='w-full grid grid-cols-1 gap-4 px-4 pb-6'
                    onSubmit={handleSubmit(submitForm)}
                >
                    {/* TITLE */}
                    <div>
                        <label className='text-base font-bold text-black'>
                            Title <span className='text-red-500'>*</span>
                        </label>
                        <MainInput
                            register={register}
                            name="title"
                            label="title"
                            placeholder="Enter title"
                            error={errors?.title?.message}
                        />
                    </div>

                    {/* DESCRIPTION */}
                    <div>
                        <label className='text-base font-bold text-black'>
                            Description <span className='text-red-500'>*</span>
                        </label>
                        <MainInput
                            register={register}
                            name="description"
                            label="description"
                            placeholder="Enter description"
                            textarea={true}
                            error={errors?.description?.message}
                        />
                    </div>

                    {/* BUTTONS */}
                    <div className="mt-4 flex flex-row gap-4">
                        <RegisterBtn loading={isPending} type="submit" otherClass="w-full">
                            Save
                        </RegisterBtn>

                        <RegisterBtn
                            otherClass="w-full !bg-transparent text-primary-green-tb font-bold"
                            onClick={() => setDialog(false)}
                        >
                            Cancel
                        </RegisterBtn>
                    </div>

                    {/* ERROR */}
                    {error && error instanceof AxiosError ? (
                        <div className='w-full text-sm text-red-500 mt-2'>
                            {error.response?.data?.error || "An error occurred"}
                        </div>
                    ) : null}
                </form>
            </AzDialog>
        </>
    );
};

export default RequestCompanyForm;