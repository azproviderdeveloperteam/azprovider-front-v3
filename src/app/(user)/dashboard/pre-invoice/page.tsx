'use client'

import React, {useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getAllMeasure} from "@/services/measurementServices";
import {getDashboardPreInvoice} from "@/services/dashboardPreInvoiceServices";
import PreInvoiceCard from "@/components/Cards/PreInvoiceCard";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import AddPreInvoiceForm from "@/components/dashboard/AddPreInvoiceForm";

const PreInvoicePage = () => {

    const [viewAddProductForm , setViewAddProductForm] = useState(false)

    const [measureOptions , setMeasureOptions] = useState<any>([{value:'kilogram', label : 'kilogram'}] )
    const [submitting , setSubmitting]= useState<any>(0)

    const {data : allMeasureData, isPending :allMeasurePending, error : allMeasureError} = useQuery({
        queryKey: ['get-all-measure' ],
        queryFn: getAllMeasure,
        retry:false,
    })

    const {data : productsData, isPending :productsPending, error : productsError} = useQuery({
        queryKey: ['get-dashboard-products' ,submitting],
        queryFn: getDashboardPreInvoice,
        retry:false,
    })


    useEffect(()=>{
        let mo :any[] = []

        if(allMeasureData?.data){
            allMeasureData?.data?.map((x:any)=>mo.push({value:x?.title , label : x?.title}))
        }
        setMeasureOptions(mo)
    },[allMeasureData])

    useEffect(()=>{
        if(productsData?.data){
            if (productsData?.data?.results?.length > 0){
                setViewAddProductForm(false)
            }else {
                setViewAddProductForm(true)

            }
        }
    },[productsData])
    return (

        viewAddProductForm ?
            <AddPreInvoiceForm allMeasureData={allMeasureData} exitKey={productsData?.data?.results ? productsData?.data?.results?.length > 0 ? true : false : false} onClose={()=>{
                setViewAddProductForm(false)
                setSubmitting(submitting + 1)
            }}/>

            :
        <div className='max-w-[95rem] lg:w-[95rem] m-auto w-full flex flex-row items-start justify-start overflow-auto snap-x snap-mandatory '>
            <>
                {
                    productsData?.data?.results?.map((item : any ,index : number)=>{
                        return(
                            <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                                <PreInvoiceCard item={item} theme={'light'} measureOptions={measureOptions} setSubmitting={setSubmitting} submitting={submitting}/>
                            </div>
                        )
                    })
                }
                <div className={`   w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`}  >
                    <div className={`w-full aspect-[0.7334] flex flex-col items-center justify-between rounded-[1.6rem] opacity-0 `}>
                    </div>
                </div>
            </>


        </div>
    );
};

export default PreInvoicePage;