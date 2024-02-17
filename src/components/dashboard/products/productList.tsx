'use client'
import React from 'react';
import ProductCard from "@/components/Cards/ProductCard";

const ProductList = ({productsData} : any) => {
    return (
                <>
                    {
                        productsData?.map((item : any ,index : number)=>{
                            return(
                                <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                                    <ProductCard item={item} theme={'light'}/>
                                </div>
                            )
                        })
                    }
                    <div className={`   w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`}  >
                        <div className={`w-full aspect-[0.7334] flex flex-col items-center justify-between rounded-[1.6rem] opacity-0 `}>
                        </div>
                    </div>
                    </>


     );
};

export default ProductList;