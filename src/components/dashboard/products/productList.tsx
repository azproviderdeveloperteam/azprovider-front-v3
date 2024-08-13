'use client'
import React, {useState} from 'react';
import ProductCard from "@/components/Cards/ProductCard";
import {Button, DialogFooter, DialogHeader} from "@material-tailwind/react";
import AzDialog from "@/components/dialog/AzDialog";
import {useMutation} from "@tanstack/react-query";
import {deleteProductDashboard} from "@/services/dashboardProductsServices";
import toast from "react-hot-toast";

const ProductList = ({productsData , setSubmit , submit , setViewForm} : any) => {

    const [dialog , setDialog] = useState<any>(undefined)

    const {data  , isPending  , error  , mutateAsync} =useMutation({
        mutationFn : deleteProductDashboard
    })

    const deleteProduct = async () =>{
        try {
            const del = await mutateAsync(dialog?.toString())
            setDialog(undefined)
            toast.success('Product Deleted Successfully')
            setSubmit(submit+1)
        }catch (e) {

        }
    }
    return (
                <>
                    {
                        productsData?.map((item : any ,index : number)=>{

                            return(
                                <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                                    <ProductCard item={item} theme={'light'}/>
                                    <div className='w-full mt-4'>
                                        <div className='w-full flex flex-row items-center justify-between gap-4'>
                                            <Button className={'w-1/2 bg-secondary-red normal-case'} onClick={()=>setDialog(item?.id)}>
                                                Delete
                                            </Button>
                                            <Button className={'w-1/2 normal-case'} onClick={()=>setViewForm(item)}>
                                                Edit
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            )
                        })
                    }
                    <div className={`   w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`}  >
                        <div className={`w-full aspect-[0.7334] flex flex-col items-center justify-between rounded-[1.6rem] opacity-0 `}>
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

export default ProductList;