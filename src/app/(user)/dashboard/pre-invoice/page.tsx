'use client'

import React, {useEffect, useState} from 'react';
import {useQuery} from "@tanstack/react-query";
import {getAllMeasure, getGrantedOrganisationList, getMeasureList} from "@/services/measurementServices";
import {deletePreInvoiceDashboard, getDashboardPreInvoice} from "@/services/dashboardPreInvoiceServices";
import PreInvoiceCard from "@/components/Cards/PreInvoiceCard";
import AddProductForm from "@/components/dashboard/products/AddProductForm";
import AddPreInvoiceForm from "@/components/dashboard/AddPreInvoiceForm";
import ProductList from "@/components/dashboard/products/productList";
import AddProductCard from "@/components/dashboard/products/AddProductCard";
import {getAllPreInvoices} from "@/services/productSevices";
import AzDialog from "@/components/dialog/AzDialog";
import {useMutation} from "@tanstack/react-query";
import {deleteProductDashboard} from "@/services/dashboardProductsServices";
import toast from "react-hot-toast";
import {Button, DialogFooter, DialogHeader} from "@material-tailwind/react";

const PreInvoicePage = () => {

    const [viewAddProductForm , setViewAddProductForm] = useState<any>(undefined)

    const [measureOptions , setMeasureOptions] = useState<any>([{value:'kilogram', label : 'kilogram'}] )
    const [submitting , setSubmitting]= useState<any>(0)
    const [dialog , setDialog] = useState<any>(undefined)

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
       try {

           const data = async ()=> await getAllPreInvoices({sort:"" , page_size:1000})
            data()
       } catch (e) {

       }
    },[])
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
                setViewAddProductForm(undefined)
            }else {
                setViewAddProductForm(null)

            }
        }else  setViewAddProductForm(null)
    },[productsData])




    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : deletePreInvoiceDashboard
    })

    const deleteProduct = async () =>{
        try {
            const del = await mutateAsync(dialog?.toString())
            setDialog(undefined)
            toast.success('Pre-Invoice Deleted Successfully')
            setSubmitting(submitting+1)
        }catch (e) {

        }
    }

console.log(viewAddProductForm)
    return (

        viewAddProductForm !== undefined ?
            <AddPreInvoiceForm  viewAddProductForm={viewAddProductForm} allGrantedList={getGrantedOrganisationListData} allMeasureData={allMeasureData} exitKey={productsData?.data ? productsData?.data?.length > 0 ? true : false : false} onClose={()=>{
                setViewAddProductForm(undefined)
                setSubmitting(submitting + 1)
            }}/>

            :

            <>

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
                                            <div className='w-1/2 mt-4'>
                                                <div className='w-full flex flex-row items-center justify-between gap-4'>
                                                    <Button className={'w-1/2 bg-secondary-red normal-case'} onClick={()=>setDialog(item?.id)}>
                                                        Delete
                                                    </Button>
                                                    <Button className={'w-1/2 normal-case'} onClick={()=>setViewAddProductForm(item)}>
                                                        Edit
                                                    </Button>
                                                </div>
                                            </div>
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

                <AzDialog size={'xs'} open={dialog != undefined} handler={()=>setDialog(undefined)}>
                    <DialogHeader>
                        <div >
                            Are you sure?
                        </div>
                    </DialogHeader>
                    <DialogFooter>
                        <div className='w-full flex flex-row items-center justify-between gap-4'>
                            <Button className={'w-1/2 bg-secondary-red normal-case'} onClick={deleteProduct}>
                                Delete
                            </Button>
                            <Button className={'w-1/2 normal-case'} onClick={()=>setDialog(undefined)}>
                                Cancel
                            </Button>
                        </div>
                    </DialogFooter>
                </AzDialog>
            </>



    );
};

export default PreInvoicePage;