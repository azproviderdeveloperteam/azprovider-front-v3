'use client'
import React from 'react';
import {useQuery} from "@tanstack/react-query";
import {getGrantedOrganisationList, getMeasureList} from "@/services/measurementServices";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import RegisterBtn from "@/components/Buttons/RegisterBtn";
import AddServiceForm from "@/components/dashboard/services/AddServiceForm";
import {useRouter} from "next-nprogress-bar";

const RegisterAddService = ({nextStep , email}: any) => {


    const router = useRouter()


    const {data : getGrantedOrganisationListData, isPending :getGrantedOrganisationListPending, error : getGrantedOrganisationListError} = useQuery({
        queryKey: ['get-getGrantedOrganisationList' ],
        queryFn: getGrantedOrganisationList,
        retry:false,
    })

    const {data : allMeasureData, isPending :allMeasurePending, error : allMeasureError} = useQuery({
        queryKey: ['get-all-measure' ],
        queryFn: getMeasureList,
        retry:false,
        refetchOnWindowFocus:false

    })

    return (
        <div className='w-full  p-6 rounded-[1.5rem] bg-[#02131E]  mt-16 lg:mt-4'>
            <div className='w-full text-white'>
                Add Your First Service
            </div>
            <AddServiceForm viewAddProductForm={null}
                            allGrantedList={getGrantedOrganisationListData} allMeasureData={allMeasureData}
                            exitKey={false}
                            onClose={() => {
                                nextStep()
                                router.push('/dashboard')
                            }}/>

            <div className='w-full flex flex-row items-center justify-end'>
                <RegisterBtn
                    otherClass={'mt-6 w-full max-w-[20rem]'}
                    onClick={() => {
                        // nextStep();
                        router.push('/dashboard')
                    }}
                >
                    Skip
                </RegisterBtn>
            </div>
        </div>
    );
};

export default RegisterAddService;