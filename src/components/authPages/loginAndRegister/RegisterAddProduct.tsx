'use client'
import React from 'react';
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import {useQuery} from "@tanstack/react-query";
import {getGrantedOrganisationList, getMeasureList} from "@/services/measurementServices";
import RegisterBtn from "@/components/Buttons/RegisterBtn";

const RegisterAddProduct = ({nextStep , email}: any) => {

    const {data : getGrantedOrganisationListData, isPending :getGrantedOrganisationListPending, error : getGrantedOrganisationListError} = useQuery({
        queryKey: ['get-getGrantedOrganisationList'],
        queryFn: getGrantedOrganisationList,
        retry:false,
        refetchOnWindowFocus:false

    })

    const {data : allMeasureData, isPending :allMeasurePending, error : allMeasureError} = useQuery({
        queryKey: ['get-all-measure' ],
        queryFn: getMeasureList,
        retry:false,
        refetchOnWindowFocus:false

    })

    return (
        <div className='w-full  p-6 rounded-[1.5rem] bg-[#02131E]  mt-16 md:mt-4'>
            <div className='w-full text-white'>
                Add Your First Product
            </div>
            <AddProductForm  viewAddProductForm={undefined}  allGrantedList={getGrantedOrganisationListData} allMeasureData={allMeasureData} exitKey={false} onClose={()=>{
                console.log(' ')
            }}/>

            <div className='w-full flex flex-row items-center justify-end'>
                <RegisterBtn
                    otherClass={'mt-6 w-full max-w-[20rem]'}
                    onClick={() => {
                        nextStep();
                    }}
                >
                    Skip
                </RegisterBtn>
            </div>
        </div>
    );
};

export default RegisterAddProduct;