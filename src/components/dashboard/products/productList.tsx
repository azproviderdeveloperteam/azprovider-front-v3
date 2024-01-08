'use client'
import React from 'react';
import ProductCard from "@/components/Cards/ProductCard";

const ProductList = ({productsData} : any) => {
    return (

                productsData?.map((item : any ,index : number)=>{
                    return(
                        <div className={`${index===0 ? ' ' :''}  w-[22.5%] min-w-[22rem] snap-start overflow-visible pt-4 pb-7 px-4`} key={index+1}>
                            <ProductCard item={item} theme={'light'}/>
                        </div>
                    )
                })

     );
};

export default ProductList;