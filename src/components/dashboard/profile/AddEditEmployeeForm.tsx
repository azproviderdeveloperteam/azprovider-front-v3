'use client'
import React from 'react';
import MainInput from "@/components/inputs/MainInput";
import AzDialog from "@/components/dialog/AzDialog";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useMutation} from "@tanstack/react-query";
import {postAddress, postEmployee} from "@/services/profileServices";
import toast from "react-hot-toast";
import * as Yup from "yup";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import {texts} from "@/utils/texts";

const AddEditEmployeeForm = ({item , open , onClose , modal = true}:any) => {
    const text = texts.eng

    const myTexts = text.dashboard.pages.profile.contact

    const schema = Yup
        .object({}).shape({
            firstName: Yup.string().required('Please enter first name'),
            lastName: Yup.string().required('Please enter last name'),
            position: Yup.string().required('Please enter position'),
            department: Yup.string().required('Please enter department'),
            land_line: Yup.string().required('Please enter land_line'),
            mobile: Yup.string().required('Please enter mobile'),
            email: Yup.string().required('Please enter email'),
            certificate: Yup.string().required('Please enter certificate'),
            membership: Yup.string().required('Please enter membership'),
            description: Yup.string().required('Please enter description'),
        })
        .required()

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors, isSubmitting, isDirty, isValid},
        getValues
    } = useForm({resolver: yupResolver(schema), mode: 'onChange'})

    const {data, isPending, error, mutateAsync} = useMutation({
        mutationFn: postEmployee
    })


    const onSubmit = async (d: any) => {

        try {
            const payload = {
                first_name: d?.firstName,
                last_name: d?.lastName,
                position: d?.position,
                department: d?.department,
                land_line: d?.land_line,
                mobile: d?.mobile,
                email: d?.email,
                certificate: d?.certificate,
                membership: d?.membership,
                description: d?.description,
            };
            const data = await mutateAsync(payload)
            toast.success('Employee Added Successfully')
        } catch (e) {
            toast.error('Error Occurred')
        }
    }


    return (

        modal ?


            <AzDialog size={'xl'} open={open} handler={onClose}>
                <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-row items-start justify-start-gap-4 flex-wrap">
                    {/** First Name */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            First Name <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="First Name"
                            error={errors?.firstName?.message}
                            name="firstName"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    {/** Last Name */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            Last Name <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="Last Name"
                            error={errors?.lastName?.message}
                            name="lastName"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    {/** Position */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            Position <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="Position"
                            error={errors?.position?.message}
                            name="position"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    {/** Department */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            Department <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="Department"
                            error={errors?.department?.message}
                            name="department"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    {/** Land Line */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            Land Line <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="Land Line"
                            error={errors?.land_line?.message}
                            name="land_line"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    {/** Mobile */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            Mobile <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="Mobile"
                            error={errors?.mobile?.message}
                            name="mobile"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    {/** Email */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            Email <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="Email"
                            error={errors?.email?.message}
                            name="email"
                            type="email"
                            placeholder=""
                        />
                    </div>

                    {/** Certificate */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            Certificate <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="Certificate"
                            error={errors?.certificate?.message}
                            name="certificate"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    {/** Membership */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            Membership <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="Membership"
                            error={errors?.membership?.message}
                            name="membership"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    {/** Description */}
                    <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                        <div className="text-[1.3rem] capitalize">
                            Description <span className="text-secondary-red">*</span>
                        </div>
                        <MainInput
                            register={register}
                            label="Description"
                            error={errors?.description?.message}
                            name="description"
                            type="text"
                            placeholder=""
                        />
                    </div>

                    {/** Submit Button */}
                    <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'}
                                 disabled={false}>
                        {myTexts.save}
                    </RegisterBtn>
                </form>
            </AzDialog>

            :
            <form onSubmit={handleSubmit(onSubmit)}
                  className="w-full flex flex-row items-start justify-start-gap-4 flex-wrap"
            >
                {/** First Name */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        First Name <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="First Name"
                        error={errors?.firstName?.message}
                        name="firstName"
                        type="text"
                        placeholder=""
                    />
                </div>

                {/** Last Name */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        Last Name <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="Last Name"
                        error={errors?.lastName?.message}
                        name="lastName"
                        type="text"
                        placeholder=""
                    />
                </div>

                {/** Position */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        Position <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="Position"
                        error={errors?.position?.message}
                        name="position"
                        type="text"
                        placeholder=""
                    />
                </div>

                {/** Department */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        Department <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="Department"
                        error={errors?.department?.message}
                        name="department"
                        type="text"
                        placeholder=""
                    />
                </div>

                {/** Land Line */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        Land Line <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="Land Line"
                        error={errors?.land_line?.message}
                        name="land_line"
                        type="text"
                        placeholder=""
                    />
                </div>

                {/** Mobile */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        Mobile <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="Mobile"
                        error={errors?.mobile?.message}
                        name="mobile"
                        type="text"
                        placeholder=""
                    />
                </div>

                {/** Email */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        Email <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="Email"
                        error={errors?.email?.message}
                        name="email"
                        type="email"
                        placeholder=""
                    />
                </div>

                {/** Certificate */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        Certificate <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="Certificate"
                        error={errors?.certificate?.message}
                        name="certificate"
                        type="text"
                        placeholder=""
                    />
                </div>

                {/** Membership */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        Membership <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="Membership"
                        error={errors?.membership?.message}
                        name="membership"
                        type="text"
                        placeholder=""
                    />
                </div>

                {/** Description */}
                <div className="w-full lg:w-[33.3%] pr-[1.3%] h-full mt-7">
                    <div className="text-[1.3rem] capitalize">
                        Description <span className="text-secondary-red">*</span>
                    </div>
                    <MainInput
                        register={register}
                        label="Description"
                        error={errors?.description?.message}
                        name="description"
                        type="text"
                        placeholder=""
                    />
                </div>

                {/** Submit Button */}
                <RegisterBtn loading={isPending} otherClass={'w-full lg:w-[12rem] mt-12'} type={'submit'}
                             disabled={false}>
                    {myTexts.save}
                </RegisterBtn>
            </form>
    )
        ;
};

export default AddEditEmployeeForm;