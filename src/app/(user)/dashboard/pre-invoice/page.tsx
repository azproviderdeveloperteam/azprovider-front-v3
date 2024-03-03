'use client'

import React, {useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getAllMeasure, getGrantedOrganisationList, getMeasureList} from "@/services/measurementServices";
import {getDashboardPreInvoice} from "@/services/dashboardPreInvoiceServices";
import PreInvoiceCard from "@/components/Cards/PreInvoiceCard";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import AddPreInvoiceForm from "@/components/dashboard/AddPreInvoiceForm";
import ProductList from "@/components/dashboard/products/productList";
import AddProductCard from "@/components/dashboard/products/AddProductCard";

const PreInvoicePage = () => {

    const [viewAddProductForm , setViewAddProductForm] = useState(false)

    const [measureOptions , setMeasureOptions] = useState<any>([{value:'kilogram', label : 'kilogram'}] )
    const [submitting , setSubmitting]= useState<any>(0)

    const {data : allMeasureData, isPending :allMeasurePending, error : allMeasureError} = useQuery({
        queryKey: ['get-all-measure' ],
        queryFn: getMeasureList,
        retry:false,
    })

    const {data : productsData, isPending :productsPending, error : productsError} = useQuery({
        queryKey: ['getDashboardPreInvoice' ,submitting],
        queryFn: getDashboardPreInvoice,
        retry:false,
    })

    const {data : getGrantedOrganisationListData, isPending :getGrantedOrganisationListPending, error : getGrantedOrganisationListError} = useQuery({
        queryKey: ['get-getGrantedOrganisationList' ,submitting],
        queryFn: getGrantedOrganisationList,
        retry:false,
    })



    useEffect(()=>{
        let mo :any[] = []

        if(allMeasureData?.data){
            allMeasureData?.data?.map((x:any)=>mo.push({value:x?.id , label : x?.title}))
        }
        setMeasureOptions(mo)
    },[allMeasureData])

    useEffect(()=>{
        if(productsData?.data){
            if (productsData?.data?.length > 0){
                setViewAddProductForm(false)
            }else {
                setViewAddProductForm(true)

            }
        }else  setViewAddProductForm(true)
    },[productsData])

    return (

        viewAddProductForm ?
            <AddPreInvoiceForm allGrantedList={getGrantedOrganisationListData} allMeasureData={allMeasureData} exitKey={productsData?.data ? productsData?.data?.length > 0 ? true : false : false} onClose={()=>{
                setViewAddProductForm(false)
                setSubmitting(submitting + 1)
            }}/>

            :


            <div className='w-full overflow-x-hidden'>
                <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
                    <>
                        {/*<div className={`${0===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} >*/}
                        {/*    <PreInvoiceCard item={{}} theme={'light'} measureOptions={measureOptions} setSubmitting={setSubmitting} submitting={submitting}/>*/}
                        {/*</div>*/}
                        {
                            productsData?.data?.map((item : any ,index : number)=>{
                                return(
                                    <div className={`${index===0 ? ' ' :''}  w-[48.5%] min-w-[42rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                                        <PreInvoiceCard item={item} theme={'light'} measureOptions={measureOptions} setSubmitting={setSubmitting} submitting={submitting}/>
                                    </div>
                                )
                            })
                        }
                        <div className={`  w-[48.5%] min-w-[42rem] snap-start overflow-visible pt-4 pb-7 px-4`} >
                            <div className={`w-full aspect-[2.69]  flex flex-col items-center justify-between rounded-[1.6rem] opacity-0 `}>


                            </div>
                        </div>
                    </>


                </div>
                <div className={'max-w-[95rem] lg:w-[95rem] m-auto py-8 px-5'}>
                    <AddProductCard preInvoice={true} setViewForm={()=>setViewAddProductForm(true)}/>

                </div>
            </div>


    );
};

export default PreInvoicePage;